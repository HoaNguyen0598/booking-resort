var mongoose = require('mongoose')

var tintucSchema = new mongoose.Schema({
    title:String,
    image:String,
    description:String,
    content: String
})

module.exports = mongoose.model('News',tintucSchema,'news')