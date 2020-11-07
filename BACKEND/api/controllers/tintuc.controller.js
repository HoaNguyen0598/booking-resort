const News = require('../../models/tintuc.model')

module.exports.findAll = function(req,res){
    News.find(function(err,data){
        if(err){
            console.log(err)
        }else{
            res.json(data)
        }
    })
}

module.exports.findOne = function(req,res){
    News.findById(req.params.id,function(err,data){
        if(err){
            res.json({'kq':0, 'errMsg':err})
        }else{
            res.json(data);
        }
    })
}

module.exports.findNew = function(req,res,next){
    News.find({},{},{limit: 3},function(err,data){
        if(err){
            res.json({'kq':0, 'errMsg':err})
        }else{
            res.json(data);
        }
    })
}

