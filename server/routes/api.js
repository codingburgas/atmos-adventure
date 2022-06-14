const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const db = require('../db/db_config.js');
const bcrypt = require('bcrypt');
const uuid = require('uuid');
router.use(bodyParser.json());


router.get('/', (req, res) => {
    res.send('Invalid API endpoint');
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
            res.send("Something went wrong");
        }
        else if (results.length > 0)
        {
            if(results[0].username === data[1])
            {
                console.log("Username already exists");
                res.send('Username already exists');
            }
            else if(results[0].email === data[2])
            {
                console.log("Email already exists");
                res.send('Email already exists');
            }
        }
        else
        {
            db.query('INSERT INTO users (uuid, username, email, pass_hash) VALUES (?)', [data], (err, result) => {
                if(err) 
                {
                    console.error("Something went wrong");
                    res.send("Something went wrong");
                }
                else 
                {
                    console.log("User created"); 
                    res.send("User created");
                }
            });
        }
    });
});


module.exports = router;