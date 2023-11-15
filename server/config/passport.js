const GoogleStrategy = require('passport-google-oauth20').Strategy
const mongoose = require('mongoose')
const TeacherModel = require('../Models/TeacherInfo')

module.exports = function(passport) {
    passport.use(new GoogleStrategy({
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackURL: '/auth/google/callback',
    },
    async (accessToken, refreshToken, profile, done) => {
        console.log(profile)

        const email = profile.emails && profile.emails.length > 0 ? profile.emails[0].value : null;
        

        if (email) {
            console.log('User Email:', email);

            // Create a new user object
            const newUser = {
                googleID: profile.id,
                displayName: profile.displayName,
                firstName: profile.name.givenName,
                lastName: profile.name.familyName,
                image: profile.photos[0].value,
                email: email // Add the email to the user object
            };
            
            
            try {
                const userEmail = profile.emails && profile.emails.length > 0 ? profile.emails[0].value : '';
                const user = await TeacherModel.findOne({ Email: userEmail }).exec();

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
        } else {
            // Handle the case where the email is not available in the profile
            console.error('User email not found in the profile');
            done(null, false, { message: 'User email not found' });
        }
    }));

    passport.serializeUser((user, done) => {
        done(null, user.id)
    })
    passport.deserializeUser((id, done) => {
        TeacherModel.findOne({ _id: id })
            .then(user => {
                // Log the user's email from the collection
                const userEmail = user && user.Email;
                console.log('User Email from MongoDB (deserializeUser):', userEmail);
    
                done(null, user);
            })
            .catch(err => done(err));
    });
}