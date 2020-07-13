var expresss = require('express');
var router = expresss.Router();

/* GET new event page */
router.get('/', function (req, res, next) {
    res.render('new-event', {
        title: 'New Event',
    });
});

module.exports = router;