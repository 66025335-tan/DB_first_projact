const mysql =require('mysql2');
require('dotenv').config()

const pool = mysql.createPool({
    host: process.env.HOST,
    user: process.env.USERDB,
    password: process.env.PASSWORDDB,
    database: process.env.DATABASENAME,
})

module.exports = pool.promise()