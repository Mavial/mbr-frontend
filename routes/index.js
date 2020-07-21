var express = require('express');
var router = express.Router();

var loginLink = require('../custom_modules/get-login-link');

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', {
    title: 'Express',
    image: '/images/carousel1.jpeg',
    loginLink,
  });
});

module.exports = router;