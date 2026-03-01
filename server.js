const express = require('express')

const app = express()
const pool = require('./mysqlib')
const cookie = require('cookie-parser')

app.use(express.urlencoded({ extended: true }))
app.use(cookie())
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

app.get('/login', (req, res) => {
    const _username = req.cookies?.username
    if (_username) {
        return res.redirect('/console')
    }
    res.render('login')
})

app.get('/logout', (req, res) => {
    res.clearCookie('username')
    res.redirect('/login')
})

app.post('/login', async (req, res) => {
    const { username, password } = req.body
    //console.log(username, password)
    const cmd = 'SELECT * FROM member WHERE username = ?'
    const [results] = await pool.query(cmd, [username])

        if (!results || results.length === 0) {
            //return res.status(401).send('ไมมีผู้ใช้นี้ในระบบ')
            res.render('login', { error: 'Username หรือ Password ไม่ถูกต้อง' })
        }
        const user = results[0]
        if (user.password !== password) {
            res.render('login', { error: 'Username หรือ Password ไม่ถูกต้อง' })
        }else {
            res.cookie('username', username)
            res.redirect('/console')
        }
    })

app.get('/console', (req, res) => {
    const username = req.cookies?.username
    if (!username) {
        return res.redirect('/login')
    }   
    res.render('console')
})

app.get('/register', (req, res) => {
    res.render('register')
})

app.post('/register', async (req, res) => {
    const { username, password } = req.body
    const cmd = 'INSERT INTO member (username, password) VALUES (?, ?)' 
    await pool.query(cmd, [username, password])
    res.redirect('/login')
})

app.listen(3000, () => {
    console.log('http://localhost:3000');
});
