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
    db.query('INSERT INTO users (uuid, username, email, pass_hash) VALUES (?)', [data], (err, result) => {
        if(err) {
            console.error(err);
            res.send(err);
        }
        else {
            console.log(result); 
            res.send(result);
        }
    });
});

module.exports = router;