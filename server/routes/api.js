const express = require('express');
const bodyParser = require('body-parser');
const db = require('../db/db_config.js');
const bcrypt = require('bcrypt');
const uuid = require('uuid');
const session = require('express-session');
const randToken = require('rand-token');
const { application } = require('express');

const router = express.Router();

router.use(bodyParser.json());

router.use(session({
    secret: 'this is our little secret',
    resave: false,
    saveUninitialized: false,
    cookie: {
        maxAge: 3600000 // 1 Hour
    }
}));
var currentSession = null;


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
                currentSession = req.session;
                currentSession.uuid = result[0].uuid;
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

router.get(`/sendConfirmationEmail`,(req,res)=>{
    if(currentSession)
    {
        console.log(`User with uuid: "${currentSession.uuid}" requesting a confirmation email.`)
        const token = randToken.generate(60);
        db.query('UPDATE users SET token = (?) WHERE uuid = (?)', [token, currentSession.uuid], (err) => {
            if(err) 
            {
                console.error("Something went wrong");
                res.send({"message":"Something went wrong"});
            }
            else 
            {
                console.log("Created temporary verification token"); 
                res.send({"message":"Created verification temporary token"});
            }
        });
    }
    else
    {
        console.log("User not logged in");
        res.send({"message":"User not logged in"});
    }
});

router.get('/logout', (req,res) => {
    if(currentSession)
    {
        console.log(`User with uuid: "${currentSession.uuid}" trying to logout.`)
        currentSession.destroy();
        currentSession = null;
        res.send({"message":"User logged out"});
    }
    else
    {
        console.log("User not logged in");
        res.send({"message":"User not logged in"});
    }
});


module.exports = router;