const router = require('express').Router();
const passport = require('passport');

const CONFIG = require('../config');
const EventModel = require('../schemas/event');



/* GET admin page */
router.get('/', function (req, res, next) {
    EventModel.find().then(function (doc) {
        res.render('admin', {
            title: 'User1',
            events: doc,
        });
    });
});

module.exports = router;