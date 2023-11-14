const GoogleStrategy = require('passport-google-oauth20').Strategy
const mongoose = require('mongoose')
const TeacherModel = require('../Models/TeacherInfo')

module.exports = function(passport) {
    passport.use(new GoogleStrategy({
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackURL: '/auth/google/callback'
    },
    async (accessToken, refreshToken, profile, done) => {
        console.log(profile)

        const newUser = {
            googleID: profile.id,
            displayName: profile.displayName,
            firstName: profile.name.givenName,
            lastName: profile.name.familyName,
            image: profile.photos[0].value
        }
        
        //creating or finding new user in the MongoDB
        try {
            const userEmail = profile.emails && profile.emails.length > 0 ? profile.emails[0].value : '';
            const user = await TeacherModel.findOne({ Email: userEmail });

            if (user) {
                // Check if the Google email matches the stored email
                if (profile.emails && profile.emails.length > 0 && user.Email === profile.emails[0].value) {
                    done(null, user);
                } else {
                    // Notify that the user is not allowed to access
                    done(null, false, { message: 'User not allowed to access.' });
                }
            } else {
                // Notify that the user is not allowed to access
                done(null, false, { message: 'User not allowed to access.' });
            }
        } catch (err) {
            console.error(err);
            done(err);
        }
    }))

    passport.serializeUser((user, done) => {
        done(null, user.id)
    })
    passport.deserializeUser((id, done) => {
        TeacherModel.findById(id,(err, user) => done (err, user))
    })
}