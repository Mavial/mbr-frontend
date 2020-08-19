const router = require('express').Router();

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', {
    title: 'Express',
    image: '/img/carousel1.jpeg',
  });
});

module.exports = router;