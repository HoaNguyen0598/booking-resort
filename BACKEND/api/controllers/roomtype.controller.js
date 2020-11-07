var RoomType = require('../../models/roomtype.model')


module.exports.findAll = function(req,res){
    RoomType.find(function(err,data){
        if(err){
            console.log(err)
        }else{
            res.json(data)
        }
    })
}