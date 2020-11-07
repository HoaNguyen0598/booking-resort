var mongoose = require('mongoose');

var roomtypeSchema = new mongoose.Schema({
    name: String,
    active: Boolean,
    rooms_id: [{type: mongoose.Schema.Types.ObjectId}]
})

module.exports = mongoose.model('RoomType', roomtypeSchema,'roomtype');

 