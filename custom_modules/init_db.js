/*

Module used to establish a connection to the 
MongoDB database with the credentials givein
inthe config file.

*/

var mongoose = require('mongoose');
var config = require('../config');

var connectionString = `mongodb+srv://${config.DB.username}:${config.DB.password}@${config.DB.url}/${config.DB.database}?authSource=admin`;

mongoose.connect(connectionString, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}, (err, client) => {
    if (err) return console.error(err)
    console.log('Connected to Database')
});

module.exports = mongoose.connection