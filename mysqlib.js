const mysql =require('mysql2');

const pool = mysql.createPool({
    host: 'localhost',
    user: 'wedtech',
    password: '1234',
    database: 'classicmodels',
})

module.exports = pool.promise()