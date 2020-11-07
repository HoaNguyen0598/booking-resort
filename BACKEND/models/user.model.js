var mongoose = require('mongoose')

var UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    phone: {
        type: Number,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    isAdmin: Boolean
})

module.exports = mongoose.model('Account',UserSchema,'user');

