const Account = require('../models/authen.model')

module.exports.findAll = function(req,res){
    Account.find(function(err,data){
        if(err){
            console.log(err)
            res.render('home',{page:'account', listUser:[]})
        }else{
            res.render('home',{page:'account', listUser:data})
        }
    })
}

module.exports.create = function(req,res){
    var newUser = new Account({
        name: req.body.txtName,
        email: req.body.txtEmail,
        password: req.body.txtPassword
    })
    newUser.save(function(err){
        if(err){
            console.log("create account error:" + err)
            res.render('home',{page:'account',message:'Create account error'})
        }else{
            console.log('Create Account successfully' + newUser)
            Account.find(function(err,items){
                if(err){
                    console.log(err)
                    res.render('home',{page:'account', listUser:[]})
                }else{
                    res.render('home',{page:'account', listUser:items})
                }
            })
        }
    })
}

module.exports.delete = function(req,res){
    Account.deleteOne({_id:req.params.id},function(err){
        if(err){
            console.log(err)
        }else{
            res.redirect('/page/account')
        }
    })
}

module.exports.getAccount = function(req,res){
    Account.findById(req.params.id,function(err,data){
        if(err){
            console.log(err)
        }else{
            res.render('home',{page:'accountEdit',user:data})
        }
    })
}
module.exports.accountEdit = function(req,res){
    Account.updateOne({_id:req.body.txtId},{
        name: req.body.txtName,
        email: req.body.txtEmail,
        password: req.body.txtPassword
    },function(err){
        if(err){
            res.json({'kq':0,'errMsg':err})
        }else{
            res.redirect('/page/account')
        }
    })
}