const router = require('express').Router();

const CONFIG = require('../config');
const EventModel = require('../models/event');
const authCheck = require('../custom_modules/authorisation-middleware');


/* GET admin page */
router.get('/', authCheck, function (req, res, next) {
    EventModel.find().then(function (doc) {
        res.render('admin', {
            user: req.user,
            userPhoto: req.user.photo,
            title: 'Admin Page',
            events: doc,
        });
    });
});

router.get('/new-event', authCheck, function (req, res, next) {
    res.render('event-form', {
        title: 'New Event',
    });
});

module.exports = router;