const router = require('express').Router();
const upload = require('../custom_modules/init-multer');

const CONFIG = require('../config');
const EventModel = require('../models/event');
const authCheck = require('../custom_modules/authorisation-middleware');
const createImageList = require('../custom_modules/create-image-list');


// Admin Page Index
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


// Form submission page.
// upload.array uses the multer middleware to process the uploaded files.
router.post('/new-event', authCheck, upload.array('images', 10), function (req, res, next) {
    var eventJson = {
        type: req.body.type,
        name: req.body.name,
        startDate: req.body.startDate,
        endDate: req.body.endDate,
        location: req.body.location,
        detail: req.body.detail,
        images: createImageList(req.body.name, req.files),
        public: (req.body.public) ? 1 : 0,
    }
    var event = new EventModel(eventJson);
    event.save((err, product) => {
        if (err) return console.log('There has been an issue saving ' + eventJson.name + ': ' + err)
        console.log('Successfully saved event: ' + eventJson.name)
    });
    res.render('event-submitted', {
        eventJson,
    });
});

// Deletes document based on recieved name.
// MISSING EVENT IMAGE DELETION!
router.post('/delete-event', authCheck, function (req, res, next) {
    EventModel.deleteOne({name: req.body.name}, function (err) {
        if (err) console.log(err);
    });
    console.log('User ' + req.user.username + ' deleted event ' + req.body.name)
});

router.post('/update-event', authCheck, function (req, res, next) {
    // REQUEST BODY RETURNS EMPTY ON UPDATE BUT WORKS ON CREATE
    var query = {'name': req.body.name};
    console.log(req.body.name)
});

module.exports = router;