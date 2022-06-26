//Require the MySQL module
const mysql = require('mysql2');

//Create connection config
const db = mysql.createConnection({
    host: 'sql.atmos.systems',
    user: 'atmos',
    password: 'AtmosDatabase.123',
    database: 'atmos'
});

//Connect to the database
db.connect((err) => {
    if (err) throw err;
    else console.log('Successfully connected to database');
});

//Export the database module
module.exports = db;