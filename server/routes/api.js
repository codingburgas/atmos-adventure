const express = require('express');
const bodyParser = require('body-parser');
const db = require('../db/db_config.js');
const bcrypt = require('bcrypt');
const uuid = require('uuid');
const session = require('express-session');
const randToken = require('rand-token');
const mailer = require('../controllers/email.js');
const moment = require('moment');
const fileUpload = require('express-fileupload');

const router = express.Router();

router.use(bodyParser.json());

router.use(fileUpload());

router.use(session({
    secret: 'this is our little secret',
    resave: true,
    saveUninitialized: false,
    cookie: {
        httpOnly: false,
        maxAge: 3600000, // 1 Hour
    }
}));


router.get('/', (req, res) => {
    res.send({"message":"Invalid API endpoint"});
});

router.post('/register',(req,res)=>{
    const date = moment().format('YYYY-MM-DD HH:mm:ss');
    const data = [
        uuid.v4(),
        req.body.username,
        req.body.email,
        bcrypt.hashSync(req.body.password, 10),
        date,
    ];
    console.log(`User with username: "${data[1]}" trying to register.`)
    db.query('SELECT * FROM users WHERE username = (?) OR email = (?)', [data[1], data[2]], (err, result) => {
        if (err)
        {
            console.error("Something went wrong");
            res.send({"message":"Something went wrong"});
        }
        else if (result.length > 0)
        {
            if(result[0].username === data[1])
            {
                console.log("Username already exists");
                res.send({"message":"Username already exists"});
            }
            else if(result[0].email === data[2])
            {
                console.log("Email already exists");
                res.send({"message":"Email already exists"});
            }
        }
        else
        {
            db.query('INSERT INTO users (uuid, username, email, pass_hash, date_created) VALUES (?)', [data], (err) => {
                if(err) 
                {
                    console.log(err)
                    console.error("Something went wrong");
                    res.send({"message":"Something went wrong"});
                }
                else 
                {
                    req.session.uuid = data[0];
                    console.log("User created"); 
                    res.send({"message":"User created"});
                }
            });
        }
    });
});

router.post('/login',(req,res)=>{
    const data = [
        req.body.username,
        req.body.password
    ];
    console.log(`User with username: "${data[0]}" trying to login.`)
    db.query('SELECT * FROM users WHERE username = (?) OR email = (?)', [data[0], data[0]], (err, result) => {
        if (err)
        {
            console.error("Something went wrong");
            res.send({"message":"Something went wrong"});
        }
        else if (result.length > 0)
        {
            if(bcrypt.compareSync(data[1], result[0].pass_hash))
            {
                req.session.uuid = result[0].uuid;
                console.log(`User ${data[0]} logged in`);
                res.send({"message":"User logged in"});
            }
            else
            {
                console.log("Wrong password");
                res.send({"message":"Wrong password"});
            }
        }
        else
        {
            console.log("User not found");
            res.send({"message":"User not found"});
        }
    });
});

router.get('/logout', (req,res) => {
    if(req.session.uuid)
    {
        console.log(`User with uuid: "${req.session.uuid}" trying to logout.`)
        req.session.destroy();
        res.send({"message":"User logged out"});
    }
    else
    {
        console.log("User not logged in");
        res.send({"message":"User not logged in"});
    }
});

router.get('/getUser', (req,res) => {
    if(req.session.uuid)
    {
        db.query('SELECT * FROM users WHERE uuid = (?)', [req.session.uuid], (err, result) => {
            if (err)
            {
                console.error("Something went wrong");
                res.send({"message":"Something went wrong"});
            }
            else if (result.length > 0)
            {
                console.log(`Retrieved information for user with uuid ${req.session.uuid}`);
                res.send(result[0]);
            }
            else
            {
                console.log("User not found");
                res.send({"message":"User not found"});
            }
        });
    }
    else
    {
        console.log("User not authenticated");
        res.send({"message":"User not authenticated"});
    }
});

router.get('/getAllUsers', (req,res) => {
    if(req.session.uuid)
    {
        db.query('SELECT * FROM users WHERE uuid = (?) AND role = "admin"', [req.session.uuid], (err,result)=>{
            if(err)
            {
                console.log(err)
                console.error("Something went wrong");
                res.send({"message":"Something went wrong"});
            }
            else if(result.length > 0)
            {
                db.query('SELECT username, email, role, date_created, verified FROM users', (err, result) => {
                    if (err)
                    {
                        console.log(err);
                        console.error("Something went wrong");
                        res.send({"message":"Something went wrong"});
                    }
                    else if (result.length > 0)
                    {
                        console.log("Retrieved all users");
                        res.send(result);
                    }
                    else
                    {
                        console.log("No users found");
                        res.send({"message":"No users found"});
                    }
                });
            }
            else
            {
                console.log("User doesn't have permission to access this endpoint");
                res.send({"message":"User doesn't have permission to access this endpoint"});
            }
        })
    }
    else
    {
        console.log("User not authenticated");
        res.send({"message":"User not authenticated"});
    }
});

router.post('/changeUsername', (req, res) => {
    if(req.session.uuid)
    {
        db.query('SELECT * FROM users WHERE username = (?)', [req.body.newUsername], (err, result) => {
            if (err)
            {
                console.error("Something went wrong");
                res.send({"message":"Something went wrong"});
            }
            else if (result.length > 0)
            {
                console.log("Username already exists");
                res.send({"message":"Username already exists"});
            }
            else
            {
                db.query('UPDATE users SET username = (?) WHERE uuid = (?)', [req.body.newUsername, req.session.uuid], (err) => {
                    if(err)
                    {
                        console.error("Something went wrong");
                        res.send({"message":"Something went wrong"});
                    }
                    else
                    {
                        console.log("Username changed");
                        res.send({"message":"Username changed"});
                    }
                });
            }
        });
    }
    else
    {
        console.log("User not authenticated");
        res.send({"message":"User not authenticated"});
    }
});

router.delete('/deleteUser', (req, res) => {
    if(req.session.uuid)
    {
        db.query('SELECT * FROM users WHERE uuid = (?)', req.session.uuid, (err, result) => {
            if (err)
            {
                console.error("Something went wrong");
                res.send({"message":"Something went wrong"});
            }
            else
            {
                db.query('DELETE FROM users WHERE uuid = (?)', req.session.uuid, (err) => {
                    if(err)
                    {
                        console.error("Something went wrong");
                        res.send({"message":"Something went wrong"});
                    }
                    else if(result.length > 0)
                    {
                        console.log("User deleted");
                        req.session.destroy();
                        res.send({"message":"User deleted"});
                    }
                    else
                    {
                        console.log("User not found");
                        res.send({"message":"User not found"});
                    }
                });
            }

        });
    }
    else
    {
        console.log("User not authenticated");
        res.send({"message":"User not authenticated"});
    }
});

router.post('/changePassword', (req, res) => {
    if(req.session.uuid)
    {
        db.query('SELECT * FROM users WHERE uuid = (?)', [req.session.uuid], (err, result) => {
            if (err)
            {
                console.error("Something went wrong");
                res.send({"message":"Something went wrong"});
            }
            else if (result.length > 0)
            {
                if(bcrypt.compareSync(req.body.oldPassword, result[0].pass_hash))
                {
                    db.query('UPDATE users SET pass_hash = (?) WHERE uuid = (?)', [bcrypt.hashSync(req.body.newPassword, 10), req.session.uuid], (err) => {
                        if(err)
                        {
                            console.error("Something went wrong");
                            res.send({"message":"Something went wrong"});
                        }
                        else
                        {
                            console.log("Password changed");
                            res.send({"message":"Password changed"});
                        }
                    });
                }
                else
                {
                    console.log("Wrong password");
                    res.send({"message":"Wrong password"});
                }
            }
        });
    }
    else
    {
        console.log("User not authenticated");
        res.send({"message":"User not authenticated"});
    }
});

router.post('/changeImage', (req, res) => {
    if(req.session.uuid)
    {
        const image = req.files.file;
        image.mv(`./public/profile_images/${req.session.uuid}.png`, (err) => {
            if(err)
            {
                console.error("Something went wrong");
                console.log(err)
                res.send({"message":"Something went wrong"});
            }
            else
            {
                console.log("Image changed");
                res.send({"message":"Image changed"});
            }
        });
    }
    else
    {
        console.log("User not authenticated");
        res.send({"message":"User not authenticated"});
    }
});

router.get('/getImage', (req, res) => {
    if(req.session.uuid)
    {
        res.sendFile(`${req.session.uuid}.png`, {root:'./public/profile_images'}, (err) => {
            if(err)
            {
                res.sendFile(`default.png`, {root:'./public/profile_images'});
            }
        });
    }
    else
    {
        console.log("User not authenticated");
        res.send({"message":"User not authenticated"});
    }
});

router.post('/changeBanner', (req, res) => {
    if(req.session.uuid)
    {
        const image = req.files.file;
        image.mv(`./public/profile_banners/${req.session.uuid}.png`, (err) => {
            if(err)
            {
                console.error("Something went wrong");
                console.log(err)
                res.send({"message":"Something went wrong"});
            }
            else
            {
                console.log("Image changed");
                res.send({"message":"Image changed"});
            }
        });
    }
    else
    {
        console.log("User not authenticated");
        res.send({"message":"User not authenticated"});
    }
});

router.get('/getBanner', (req, res) => {
    if(req.session.uuid)
    {
        res.sendFile(`${req.session.uuid}.png`, {root:'./public/profile_banners'}, (err) => {
            if(err)
            {
                res.sendFile(`default.png`, {root:'./public/profile_banners'});
            }
        });
    }
    else
    {
        console.log("User not authenticated");
        res.send({"message":"User not authenticated"});
    }
});

router.post('/sendForgotPasswordEmail', (req, res) => {
    db.query('SELECT * FROM users WHERE email = (?)', req.body.email, (err, result) => {
        if(result.length > 0)
        {
            const token = randToken.generate(60);
            mailer.sendForgotPasswordEmail(req.body.email, token);
            res.send({"message":"Sent a password reset email"});
        }
        else
        {
            console.log(`User with email: ${req.body.email} doesn't exist`);
            res.send({"message":"User doesn't exist"});
        }
    })
});



router.get('/sendConfirmationEmail', (req,res)=>{
    if(req.session.uuid)
    {
        console.log(`User with uuid: "${req.session.uuid}" requesting a confirmation email.`)
        const token = randToken.generate(60);
        db.query('UPDATE users SET token = (?) WHERE uuid = (?) AND verified = FALSE', [token, req.session.uuid], (err, result) => {
            if(err) 
            {
                console.error("Something went wrong");
                res.send({"message":"Something went wrong"});
            }
            else 
            {
                if(result.affectedRows > 0)
                {
                    console.log("Created temporary verification token"); 
                    mailer.sendConfirmationEmail(req.session.uuid, token);
                    res.send({"message":"Created temporary verification token"});
                }
                else 
                {
                    console.log("User already verified");
                    res.send({"message":"User already verified"});
                }
            }
        });
    }
    else
    {
        console.log("User not logged in");
        res.send({"message":"User not logged in"});
    }
});

router.get('/confirm/:token',(req,res)=>{
    console.log(`User trying to confirm their email.`)
    db.query('SELECT * FROM users WHERE token = (?)', [req.params.token], (err, result) => {
        if (err)
        {
            console.error("Something went wrong");
            res.send({"message":"Something went wrong"});
        }
        else if (result.length > 0)
        {
            db.query('UPDATE users SET token = NULL, verified = TRUE WHERE token = (?)', [req.params.token], (err) => {
                if(err)
                {
                    console.error("Something went wrong");
                    res.send({"message":"Something went wrong"});
                }
                else
                {
                    console.log("Email confirmed");
                    res.send({"message":"Email confirmed"});
                }
            });
        }
        else
        {
            console.log("Invalid token or email already confirmed");
            res.send({"message":"Invalid token or email already confirmed"});
        }
    });
});

module.exports = router;