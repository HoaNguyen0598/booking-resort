var Room = require('../../models/room.model')

module.exports.findAll = function(req,res){
    Room.find(function(err,data){
        if(err){
            console.log(err)
        }else{
            res.json(data)
        }
    })
}

module.exports.findFeatured = function(req,res){
    Room.find({featured: 1},function(err,data){
        if(err){
            console.log(err)
        }else{
            res.json(data)
        }
    })
}

module.exports.findOne = function(req,res){
    Room.findById(req.params.id,function(err,data){
        if(err){
            console.log(err)
        }else{
            res.json(data)
        }
    })
}