/* 

This module contains the event schema
and model used by the mongoose ORM.

*/

const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2');
const Schema = mongoose.Schema;


const eventSchema = new Schema({
    type: {type: String, required: true},
    name: {type: String, required: true},
    startDate: Date,
    endDate: Date,
    location: String,
    detail: String,
    images: Array,
    public: Boolean,

    // WIP
    addedTime: Date,
    lastUpdated: Date,
    addedBy: String,
}, {collection: 'events'});

eventSchema.plugin(mongoosePaginate);

var EventModel = mongoose.model('EventModel', eventSchema);

module.exports = EventModel;