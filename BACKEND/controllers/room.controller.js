const Room = require('../models/room.model')
const RoomType = require('../models/roomtype.model')

var multer = require('multer')

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'public/upload')
    },
    filename: function (req, file, cb) {
      cb(null, Date.now()  + "-" + file.originalname)
    }
});  
var upload = multer({ 
    storage: storage,
    fileFilter: function (req, file, cb) {
        console.log(file);
        if( file.mimetype=="image/bmp" ||
            file.mimetype=="image/png" ||
            file.mimetype=="image/gif" ||
            file.mimetype=="image/jpg" ||
            file.mimetype=="image/jpeg" 
        ){
            cb(null, true)
        }else{
            return cb(new Error('Only image are allowed!'))
        }
    }
}).single("txtImage");

module.exports.index = function(req,res){
    Room.find(function(err,data){
        if(err){
            console.log(err);
             res.render('home',{page:'roomlist', Room:[]})
        }else{
            // console.log(items);
            res.render('home',{page:'roomlist', Room:data})
        }
    })
}
module.exports.findType = function(req,res){
    RoomType.find(function(err,data){
        if(err){
            console.log(err);
             res.render('home',{page:'room', RoomTy:[]})
        }else{
            // console.log(items);
            res.render('home',{page:'room', RoomTy:data})
        }
    })
}


module.exports.create = function(req,res){
    upload(req, res, function (err) {
        if (err instanceof multer.MulterError) {
          res.json({"kq":0,"errMsg":"A multer error when uploading"}) 
        } else if (err) {
            res.json({"kq":0,"errMsg":"A multer error when uploading" + err}) 
        }else{
          var room = new Room({
            name: req.body.txtName,
            pets: req.body.txtPets ? true : false,
            breakfast: req.body.txtBreakfast ? true : false,
            featured: req.body.txtFeatured ? true : false,
            people: req.body.txtPeople,   
            acreage: req.body.txtDt,
            image: req.file.filename,
            description: req.body.txtDesc,
            extras: req.body.txtExtras,
            price: req.body.txtPrice,
            active: req.body.txtActive ? true : false
          })
            room.save(function(err){
                // if(err){
                //     res.json({"kq":0,"errMsg":err}) 
                // }else{
                //     res.json({"kq":1}) 
                // }
                if(err){
                    console.log("Save room error: " + err)
                    res.render('home',{page:'room', message:'Save room error'})
                }else{
                    RoomType.findOneAndUpdate({_id:req.body.selectRoomType}, {$push: { rooms_id: room._id}}, function(err){
                        if(err){
                            console.log(err);
                        }else{

                        }
                    })
                    RoomType.find(function(err,items){
                        if(err){
                            console.log(err);
                             res.render('home',{page:'room', RoomTy:[]})
                        }else{
                            // console.log(items);
                            res.render('home',{page:'room', RoomTy:items,message:"Save room successfully"})
                        }
                    })
                }
            })
        }

    });
}

module.exports.deleteRoom = function(req,res){
    Room.deleteOne({_id:req.params.id} , function(err){
        if(err){
            console.log(err);
            res.json(err)
        }else{
            // console.log(items);
            res.redirect('/page/roomlist')
        }
    })

}

module.exports.getEditRoom = function(req,res){
    Room.findById(req.params.id,function(err,data){
        if(err){
            res.json({'kq':0, 'errMsg':err})
        }else{
            res.render('home',{page:'roomedit', room:data})
        }
    })
}

module.exports.editRoom = function(req,res){

    upload(req, res, function (err) {
        console.log(req.body)
        console.log(req.file)
        if(!req.file){
            Room.updateOne({_id:req.body.txtId},{
                name: req.body.txtName,
                people: req.body.txtPeople,
                acreage: req.body.txtDt,
                pets: req.body.txtPets ? true : false,
                breakfast: req.body.txtBreakfast ? true : false,
                featured: req.body.txtFeatured ? true : false,
                people: req.body.txtPeople,   
                acreage: req.body.txtDt,
                description: req.body.txtDesc,
                extras: req.body.txtExtras,
                price: req.body.txtPrice,
                active: req.body.txtActive ? true : false
            },function(err){
                if(err){
                    res.json({'kq':0, 'errMsg':err})
                }else{
                    res.redirect('/page/roomlist')
                }
            })
        }else{

            if (err instanceof multer.MulterError) {
            res.json({"kq":0,"errMsg":"A multer error when uploading"}) 
            } else if (err) {
                res.json({"kq":0,"errMsg":"A multer error when uploading" + err}) 
            }else{
                Room.updateOne({_id:req.body.txtId},{
                    name: req.body.txtName,
                    pets: req.body.txtPets ? true : false,
                    breakfast: req.body.txtBreakfast ? true : false,
                    featured: req.body.txtFeatured ? true : false,
                    people: req.body.txtPeople,   
                    acreage: req.body.txtDt,
                    image: req.file.filename,
                    description: req.body.txtDesc,
                    extras: req.body.txtExtras,
                    price: req.body.txtPrice,
                    active: req.body.txtActive ? true : false
                },function(err){
                    if(err){
                        res.json({'kq':0, 'errMsg':err})
                    }else{
                        res.redirect('/page/roomlist')
                    }
                })
            }
        } 

    });

}