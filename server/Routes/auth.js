const express = require('express')
const passport = require('passport')
const router = express.Router()
const TeacherModel = require('../Models/TeacherInfo')




// Authenticate with google
router.get('/google', passport.authenticate('google', {
     scope: ['profile', 'email']}))

// Google callback
router.get(
    '/google/callback',
     passport.authenticate('google', { failureRedirect: '/'}),
    (req, res) => {
        
       req.session.user = req.user;
       res.redirect('http://localhost:5173/teacherHomepage');
    })

//log out
router.get('/logout', (req, res) => {
    req.logout((err) => {
        if (err) {
            console.error('Logout failed:', err);
            // Handle error if needed
            return res.redirect('/');  // Redirect even if an error occurs
        }
        res.redirect('/');
    });
});

module.exports = router