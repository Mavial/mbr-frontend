/* 

This module contains the event schema
and model used by the mongoose ORM.

*/

var mongoose = require('mongoose');
var mongoosePaginate = require('mongoose-paginate-v2');

var Schema = mongoose.Schema;

var eventSchema = new Schema({
    type: {type: String, required: true},
    name: {type: String, required: true},
    startDate: String,
    endDate: String,
    location: String,
    detail: String,
    images: String,
    public: String,

    // WIP
    addedTime: Date,
    lastUpdated: Date,
    addedBy: String,
}, {collection: 'events'});

eventSchema.plugin(mongoosePaginate);

var eventModel = mongoose.model('eventModel', eventSchema);

module.exports = eventModel;