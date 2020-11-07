var mongoose = require('mongoose')

var roomSchema = new mongoose.Schema({
    name: String, 
    people: Number, 
    pets: Boolean,  
    acreage: Number,
    breakfast: Boolean,
    featured: Boolean,
    image: String,
    description: String,
    extras: String,
    price: Number,
    active: Boolean
})

module.exports = mongoose.model('Room', roomSchema,'room');