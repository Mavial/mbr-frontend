const router = require('express').Router();

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', {
    title: 'Express',
    image: '/images/carousel1.jpeg',
  });
});

module.exports = router;