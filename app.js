var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var bodyParser = require('body-parser');
var cors = require('cors');

var multer = require('multer');
var fs = require('fs');


// CUSTOM MODULES
var db = require('./db');

// create express app
var app = express();

// MIDDLEWARES
app.use(cors());
app.use(bodyParser.urlencoded({
    extended: true
}));

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
upload = multer({
    storage: storage,
    fileFilter: fileFilter,
})

// ROUTERS
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var adminRouter = require('./routes/admin');
var eventFormRouter = require('./routes/event-form');
var addEventRouter = require('./routes/add-event');
const {
    fstat
} = require('fs');

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({
    extended: false
}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/admin', adminRouter);
app.use('/event-form', eventFormRouter);
app.use('/add-event', addEventRouter);

// STATIC FILES
app.use(express.static('public'));
app.use(express.static('uploads'));

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
});

module.exports = app;