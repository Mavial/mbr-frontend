const router = require('express').Router();
const passport = require('passport');

const CONFIG = require('../config');
const EventModel = require('../models/event');
const authCheck = require('../custom_modules/authorisation-middleware').authCheck;


/* GET admin page */
router.get('/', authCheck, function (req, res, next) {
    EventModel.find().then(function (doc) {
        res.render('admin', {
            title: 'User1',
            events: doc,
        });
    });
});

module.exports = router;