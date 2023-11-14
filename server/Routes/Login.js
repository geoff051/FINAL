const express = require('express')
const router = express.Router()

// Login/Landing page
router.get('/', (req, res) => {
    res.send('Login')
})

// teacherHomepage
router.get('/teacherHomepage', (req, res) => {
    res.send('Dashboard')
})

module.exports = router