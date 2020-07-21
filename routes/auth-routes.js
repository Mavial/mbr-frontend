const router = require('express').Router();
const passport = require('passport');

const CONFIG = require('../config');

// auth login
router.get('/login', function (req, res) {
    res.render('login', {});
});

// auth logout
router.get('/logout', function (req, res) {
    // handle with passport
    res.send('logging out');
});

// auth with google
router.get('/google', passport.authenticate('google', {
    scope: CONFIG.oauth2Credentials.scopes,
}));

// google callback route
router.get('/google/redirect', passport.authenticate('google'), function (req, res) {
    res.send('callback uri');
})

module.exports = router;