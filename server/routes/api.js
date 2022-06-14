const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const db = require('../db/db_config.js');
const bcrypt = require('bcrypt');
const uuid = require('uuid');
router.use(bodyParser.json());


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
    db.query('SELECT * FROM users WHERE username = (?) OR email = (?)', [data[1], data[2]], (err, results) => {
        if (err)
        {
            console.error("Something went wrong");
            res.send({"message":"Something went wrong"});
        }
        else if (results.length > 0)
        {
            if(results[0].username === data[1])
            {
                console.log("Username already exists");
                res.send({"message":"Username already exists"});
            }
            else if(results[0].email === data[2])
            {
                console.log("Email already exists");
                res.send({"message":"Email already exists"});
            }
        }
        else
        {
            db.query('INSERT INTO users (uuid, username, email, pass_hash) VALUES (?)', [data], (err, result) => {
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
    console.log(req.body.username);
    console.log(`User with username: "${data[0]}" trying to login.`)
    db.query('SELECT * FROM users WHERE username = (?) OR email = (?)', [data[0], data[0]], (err, results) => {
        if (err)
        {
            console.error("Something went wrong");
            res.send({"message":"Something went wrong"});
        }
        else if (results.length > 0)
        {
            if(bcrypt.compareSync(data[1], results[0].pass_hash))
            {
                console.log("User logged in");
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


module.exports = router;