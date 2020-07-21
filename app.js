var createError = require('http-errors');
var express = require('express');
var path = require('path');
var logger = require('morgan');
var bodyParser = require('body-parser');
var cors = require('cors');
var cookieParser = require('cookie-parser');


// CUSTOM MODULES
var db = require('./custom_modules/init-db');

// create express app
var app = express();


// MIDDLEWARES
app.use(cors());
app.use(bodyParser.urlencoded({
    extended: true
}));
// default middlewares
app.use(cookieParser());
app.use(logger('dev'));
app.use(express.json());


// ROUTERS
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var adminRouter = require('./routes/admin');
var eventFormRouter = require('./routes/event-form');
var addEventRouter = require('./routes/add-event');
var authRouter = require('./routes/auth');
var authCallbackRouter = require('./routes/auth-callback');

// ROUTES
app.use('/', indexRouter);
app.use('/users', usersRouter); // NOT USED!
app.use('/admin', adminRouter);
app.use('/event-form', eventFormRouter);
app.use('/add-event', addEventRouter);
app.use('/auth', authRouter);
app.use('/auth-callback', authCallbackRouter);


const {
    fstat
} = require('fs');

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

// STATIC FILES
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static('public')); // UNNECESSARY??
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