const News = require('../models/tintuc.model')

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


module.exports.findAll = function(req,res){
    News.find(function(err,data){
        if(err){
            console.log(err)
            res.render('home',{page:'news', listNew:[]})
        }else{
            res.render('home',{page:'news', listNew:data})
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
          var news = new News({
            title: req.body.txtTitle,
            image: req.file.filename,
            description: req.body.txtDesc,
            content: req.body.txtContent
          })
            news.save(function(err){
                // if(err){
                //     res.json({"kq":0,"errMsg":err}) 
                // }else{
                //     res.json({"kq":1}) 
                // }
                if(err){
                    console.log("Add news error: " + err)
                    res.render('home',{page:'news', message:'Add news error'})
                }else{
                    News.find(function(err,items){
                        if(err){
                            console.log(err);
                             res.render('home',{page:'news', listNew:[]})
                        }else{
                            // console.log(items);
                            res.render('home',{page:'news', listNew:items,message:"Add news successfully"})
                        }
                    })
                }
            })
        }

    });
}

module.exports.getEdit = function(req,res){
    News.findById(req.params.id,function(err,data){
        if(err){
            console.log(err)
        }else{
            res.render('home',{page:'newEdit',listNew:data})
        }
    })
}

module.exports.editNews = function(req,res){

    upload(req, res, function (err) {
        console.log(req.body)
        console.log(req.file)
        if(!req.file){
            News.updateOne({_id:req.body.txtId},{
                title: req.body.txtTitle,
                description: req.body.txtDesc,
                content: req.body.txtContent,
              
            },function(err){
                if(err){
                    res.json({'kq':0, 'errMsg':err})
                }else{
                    res.redirect('/page/news')
                }
            })
        }else{

            if (err instanceof multer.MulterError) {
            res.json({"kq":0,"errMsg":"A multer error when uploading"}) 
            } else if (err) {
                res.json({"kq":0,"errMsg":"A multer error when uploading" + err}) 
            }else{
                News.updateOne({_id:req.body.txtId},{
                    title: req.body.txtTitle,
                    description: req.body.txtDesc,
                    content: req.body.txtContent,
                    image: req.file.filename
                   
                },function(err){
                    if(err){
                        res.json({'kq':0, 'errMsg':err})
                    }else{
                        res.redirect('/page/news')
                    }
                })
            }
        } 

    });

}

module.exports.delete = function(req,res){
    News.deleteOne({_id:req.params.id},function(err){
        if(err){
            console.log(err)
        }else{
            res.redirect('/page/news')
        }
    })
}

