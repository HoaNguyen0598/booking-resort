var mongoose = require('mongoose')

var contactSchema = new mongoose.Schema({
    name : String,
    email : String,
    subject : String, 
    message: String,
    date: {
        type: Date,
        default: Date.now
    }
})

const Contact = mongoose.model('Contact',contactSchema,'contact')

module.exports = Contact;


