const express = require('express')
const passport = require('passport')
const router = express.Router()

router.get('/', (req, res) => {
    res.send('Hello from /auth route!');
  });

// Authenticate with google
router.get('/google', passport.authenticate('google', { scope: ['profile'] }))

// Google callback
router.get(
    '/google/callback',
     passport.authenticate('google', { failureRedirect: '/'}),
    (req, res) => {
        res.redirect('/teacherHomepage')
    })

module.exports = router