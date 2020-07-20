var express = require('express');
var router = express.Router();


var EventModel = require('../schemas/event');


// load data from uploaded files and create list of image paths
function listImages(eventName, uploadedImages) {
    var imgList = []
    for (i in uploadedImages) {
        img = uploadedImages[i]
        var imgPath = eventName + '/' + img.filename
        imgList.push(imgPath)
    }
    return imgList
}

// upload.array uses the multer middleware to process the uploaded files.
router.post('/', upload.array('images', 10) , (req, res, next) => {
    var eventJson = {
        type: req.body.type,
        name: req.body.name,
        startDate: req.body.startDate,
        endDate: req.body.endDate,
        location: req.body.location,
        detail: req.body.detail,
        images: listImages(req.body.name, req.files),
        public: (req.body.public) ? 1 : 0,
    }
    var event = new EventModel(eventJson);
    event.save((err, product) => {
        if (err) return console.log('There has been an issue saving ' + eventJson.name + ': ' + err)
        console.log('Successfully saved event: ' + eventJson.name)
    });
    res.render('add-event', {
        eventJson,
    });
});
module.exports = router;