const router = require('express').Router();
const passport = require('passport');

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
    scope: ['profile'],
}));

// google callback route
router.get('/google/redirect', function (req, res) {
    res.send('callback uri');
})

module.exports = router;