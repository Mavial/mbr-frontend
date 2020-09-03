const router = require('express').Router();

const EventModel = require('../models/event');

router.post('/', function (req, res, next) {
    EventModel.find({ 'name': 'Beachwoche auf Menorca' }).then(function (doc) {
        console.log(doc.name)
        res.render('event-page', {
            event: doc,
        });
    })
});

module.exports = router;