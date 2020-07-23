const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20');

const CONFIG = require('../config');
const UserModel = require('../models/user');

// read & write cookies.
passport.serializeUser(function (user, done) {
    done(null, user.id);
})
passport.deserializeUser(function (id, done) {
    UserModel.findById(id).then(function (user) {
        done(null, user);
    })
})

//  setup google strategy for passport middleware
passport.use(
    new GoogleStrategy({
            callbackURL: CONFIG.oauth2Credentials.redirect_uris[0],
            clientID: CONFIG.oauth2Credentials.client_id,
            clientSecret: CONFIG.oauth2Credentials.client_secret
        },
        function (accessToken, refreshToken, profile, done) {
            // check if user already exists in db
            UserModel.findOne({
                googleId: profile.id
            }).then(function (currentUser) {
                if (currentUser) {
                    // user already in db
                    console.log(`User ${currentUser.username} logged in!`);
                    done(null, currentUser);
                } else {
                    new UserModel({
                        username: profile.displayName,
                        firstName: profile.name.givenName,
                        email: profile.emails[0].value,
                        googleId: profile.id,
                        photo: profile.photos[0].value,
                        admin: false,
                    }).save().then(function (newUser) {
                        console.log('New user created: ' + newUser);
                        done(null, newUser);
                    });
                }
            });
        })
);