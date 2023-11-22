const express = require('express')
const router = express.Router()

// Login/Landing page
router.get('/', (req, res) => {
    res.send('Login')
})


module.exports = router