
const roomType = require('../models/roomtype.model');

module.exports.create = function(req,res){
    var rtNew = new roomType({
        name : req.body.txtName,
        active:req.body.txtAction ? true : false,
        room_id: []
    })
    rtNew.save(function(err){
        if(err){
            console.log("Save roomType error: " + err)
            res.render('home',{page:'roomtype', message:'Save roomType error'})
        }else{
            console.log('Save roomType successfully'+ rtNew)
            roomType.find(function(err,items){
                if(err){
                    console.log(err);
                     res.render('home',{page:'roomtype', roomtype:[]})
                }else{
                    // console.log(items);
                    res.render('home',{page:'roomtype', roomtype:items,message:"Save roomType successfully"})
                }
            })
        }
    })
}

module.exports.index = function(req,res){
    roomType.find(function(err,items){
        if(err){
            console.log(err);
             res.render('home',{page:'roomtype', roomtype:[]})
        }else{
            // console.log(items);
            res.render('home',{page:'roomtype', roomtype:items})
        }
    })
}

module.exports.delete = function(req,res){
    roomType.deleteOne({_id:req.params.id},function(err){
        if(err){
            console.log(err)
        }else{
            res.redirect('/page/roomtype')
        }
    })
}

module.exports.getEdit = function(req,res){
    roomType.findById(req.params.id,function(err,data){
        if(err){
            console.log(err)
        }else{
            res.render('home',{page:'roomTypeEdit',roomtype:data})
        }
    })
}
module.exports.editRoomType = function(req,res){
    roomType.updateOne({_id:req.body.txtId},{
        name: req.body.txtName,
        action: req.body.txtAction ? true : false
    },function(err){
        if(err){
            res.json({'kq':0,'errMsg':err})
        }else{
            res.redirect('/page/roomtype')
        }
    })
}
