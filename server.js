const express = require('express')

const app = express()
const pool = require('./mysqlib')

app.set('view engine', 'ejs')

app.get('/', (req, res) => {
})

app.get('/customers', async (req, res) => {
    const [rows] = await pool.query('SELECT * FROM customers')
    res.json({ customers: rows })
})

app.get('/customers/:customerNumber', async (req, res) => {
    const customerNumber = req.params.customerNumber
    const cmd = 'SELECT * FROM customers WHERE customerNumber = ?'
    const [rows] = await pool.query(cmd, [customerNumber])
    //res.json({ customer: rows[0] })
    res.render('customer', { customer: rows[0] })
})

app.listen(3000, () => {
    console.log('http://localhost:3000');
});
