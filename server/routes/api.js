const express = require('express');
const bodyParser = require('body-parser');
const db = require('../db/db_config.js');
const bcrypt = require('bcrypt');
const uuid = require('uuid');
const session = require('express-session');
const randToken = require('rand-token');
const mailer = require('../controllers/email.js');

const router = express.Router();

router.use(bodyParser.json());

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
    const data = [
        uuid.v4(),
        req.body.username,
        req.body.email,
        bcrypt.hashSync(req.body.password, 10)
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
            db.query('INSERT INTO users (uuid, username, email, pass_hash) VALUES (?)', [data], (err) => {
                if(err) 
                {
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


router.get(`/sendConfirmationEmail`,(req,res)=>{
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

router.get(`/confirm/:token`,(req,res)=>{
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