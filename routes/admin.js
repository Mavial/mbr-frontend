var expresss = require('express');
var router = expresss.Router();

/* GET admin page */
router.get('/', function (req, res, next) {
    res.render('admin', {
        title: 'User1',
    });
});

module.exports = router;