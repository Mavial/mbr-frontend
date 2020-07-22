const router = require('express').Router();
const passport = require('passport');

const CONFIG = require('../config');

// logout
router.get('/logout', function (req, res) {
    req.logout();
    res.redirect('/');
})

// auth with google
router.get('/google', passport.authenticate('google', {
    scope: CONFIG.oauth2Credentials.scopes,
}));

// google callback route
router.get('/google/redirect', passport.authenticate('google', { failureRedirect: '/'}), function (req, res) {
    res.redirect('/admin');
})

module.exports = router;