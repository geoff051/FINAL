const express = require('express')
const passport = require('passport')
const router = express.Router()
const { v4: uuidv4 } = require('uuid');




// Authenticate with google
router.get('/google', passport.authenticate('google', {
     scope: ['profile', 'email']}))

// Google callback
router.get(
    '/google/callback',
     passport.authenticate('google', { failureRedirect: '/'}),
    (req, res) => {
        
        const { temporaryToken } = req.user;
        console.log('Temporary Token:', temporaryToken);
      
        req.session.user = req.user;
      
        const frontendRedirectURL = `http://localhost:5173/teacherHomepage?temporaryToken=${temporaryToken}`;
        res.redirect(frontendRedirectURL);
    })

router.get('/token', (req, res) => {
        const teacherToken = uuidv4();
        console.log('Teacher Token:', teacherToken)
        res.json({teacherToken})
    })


//log out
router.get('/logout', (req, res) => {
    req.logout((err) => {
        if (err) {
            console.error(err);
            return res.status(500).send('Logout failed');
        }
        res.redirect('/');
    });
});


module.exports = router