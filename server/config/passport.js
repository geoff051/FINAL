const GoogleStrategy = require('passport-google-oauth20').Strategy
const mongoose = require('mongoose')
const TeacherModel = require('../Models/TeacherInfo')
const { v4: uuidv4 } = require('uuid');

module.exports = function (passport) {
    passport.use(new GoogleStrategy({
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackURL: '/auth/google/callback',
    },
        async (accessToken, refreshToken, profile, done) => {
            const temporaryToken = uuidv4();
            profile.temporaryToken = temporaryToken;
            console.log(temporaryToken)

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
                                    },
                                    temporaryToken: profile.temporaryToken,
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
        done(null, { id: user.id, temporaryToken: user.temporaryToken });
    });

    passport.deserializeUser(async ({ id, temporaryToken }, done) => {
        try {
            const user = await TeacherModel.findOne({ _id: id }).exec();
            if (user) {
                // Attach the temporaryToken to the deserialized user
                user.temporaryToken = temporaryToken;
                done(null, user);
            } else {
                done(null, false);
            }
        } catch (err) {
            console.error(err);
            done(err);
        }
    });
}