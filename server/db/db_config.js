//Require the MySQL module
const mysql = require('mysql2');
require('dotenv').config();

//Create connection config
const db = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
});

//Connect to the database
db.connect((err) => {
    if (err) throw err;
    else console.log('Successfully connected to database');
});

//Export the database module
module.exports = db;