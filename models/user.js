/* 

This module contains the user schema
and model used by the mongoose ORM for OAuth2.0.

*/

const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const userSchema = new Schema({
    username: {
        type: String,
        required: true
    },
    firstName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    googleId: {
        type: String,
        required: true
    },
    photo: {
        type: String,
        required: false
    }
}, {
    collection: 'users'
});

const UserModel = mongoose.model('UserModel', userSchema);

module.exports = UserModel;