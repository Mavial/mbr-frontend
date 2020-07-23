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

// Form to add an event to the database
router.get('/new-event', authCheck, function (req, res, next) {
    res.render('event-form', {
        title: 'New Event',
    });
});

// Form submission page.
// upload.array uses the multer middleware to process the uploaded files.
router.post('/new-event/submit', authCheck, upload.array('images', 10), (req, res, next) => {
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


module.exports = router;