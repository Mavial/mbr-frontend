const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20');

const CONFIG = require('../config');
const UserModel = require('../models/user');

passport.use(
    new GoogleStrategy({
        callbackURL: CONFIG.oauth2Credentials.redirect_uris[0],
        clientID: CONFIG.oauth2Credentials.client_id,
        clientSecret: CONFIG.oauth2Credentials.client_secret
    },
    function (accessToken, refreshToken, profile, done) {
        // passport callback function 
        console.log(profile);
    })
);