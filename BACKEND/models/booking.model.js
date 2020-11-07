var mongoose = require('mongoose')

var bookingSchema = new mongoose.Schema({
    name:String,
    phone:Number,
    email:String,
    roomname: String,
    image:String,
    dateArrive: Date,
    dateDepartment: Date,
    price: Number
})

module.exports = mongoose.model('Booking',bookingSchema,'booking')