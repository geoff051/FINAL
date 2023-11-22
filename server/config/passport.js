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
            
            try {
                const userEmail = profile.emails && profile.emails.length > 0 ? profile.emails[0].value : '';
                const user = await TeacherModel.findOne({ Email: userEmail }).exec();

                if (user) {
                    // Check if the Google email matches the stored email
                    if (profile.emails && profile.emails.length > 0 && user.Email === profile.emails[0].value) {
                        if (user.verified) {
                            done(null, {
                                id: user.id,
                                additionalData: {
                                    Firstname: user.Firstname,
                                    Lastname: user.Lastname,
                                    Middlename: user.Middlename,
                                    DOB: user.DOB,
                                    Street: user.Street,
                                    Barangay: user.Barangay,
                                    City: user.City,
                                    Province: user.Province,
                                    SectionHandled: user.SectionHandled,
                                    GradeHandled: user.GradeHandled,
                                    Email: user.Email,
                                    Contact: user.Contact
                                }
                            });
                        } else {
                            // Notify that the user is not verified
                            done(null, false, { message: 'User not verified. Please verify your account.' });
                        }
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
                done(null, user);
            })
            .catch(err => done(err));
    });
}