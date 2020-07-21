/*


    Module used for initializing and 
    configuring multer middleware. 


*/

multer = require('multer');
fs = require('fs');

// CONFIGURE MULTER FILE STORAGE AND NAME FORMATTING
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        var dir = `uploads/${req.body.name}`
        // create directory for event if non exsistant
        try {
            fs.mkdir(dir, error => cb(null, dir))
        } catch (err) {
            cb(null, dir)
        }
    },
    filename: function (req, file, cb) {
        var fileExtension = file.originalname.split('.')[1];
        var fileName = Date.now() + '-' + Math.round(Math.random() * 1E9) + '.' + fileExtension;
        cb(null, fileName);
    }
});
// check that uploaded files are indeed images
var fileFilter = function (req, file, cb) {
    var fileType = file.mimetype.split('/')[0];
    if (fileType == 'image') {
        cb(null, true)
    } else {
        console.log(`File ${file.originalname} is not an image!`);
        cb(null, false)
    }
};
var upload = multer({
    storage: storage,
    fileFilter: fileFilter,
})

module.exports = upload