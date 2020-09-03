const router = require('express').Router();

const EventModel = require('../models/event');

/* GET home page. */
router.get('/', function (req, res, next) {
    EventModel.findById('5f16d6ecea60f205f4a8ecc0').then(function (doc) {
        res.render('index', {
            mainImage: '/img/canyon.jpg',
            exampleEvent: doc
        });
    })
});

module.exports = router;