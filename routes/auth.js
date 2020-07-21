const router = require('express').Router();

const loginLink = require('../custom_modules/get-login-link')

/* GET auth page. */
router.get('/', function (req, res, next) {
    

    res.render('auth', {
        loginLink: loginLink,
    })
});

module.exports = router;