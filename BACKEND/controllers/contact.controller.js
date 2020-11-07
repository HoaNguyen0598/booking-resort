const Contact = require('../models/contact.model')

module.exports.findAll = function(req,res){
    Contact.find(function(err,item){
        if(err){
            console.log(err)
            res.render('home',{page:'contact',data:[]})
        }else{
            res.render('home',{page:'contact',data:item})
        }
    })
}

module.exports.create = function(req,res){
    var newContact = new Contact({
        name : req.body.name,
        email : req.body.email,
        subject : req.body.subject,
        message : req.body.message
    })
    newContact.save(function(err){
        if(err){
            console.log(err)
        }else{
            console.log('add successfully contact' + newContact)
            Contact.find(function(err,item){
                if(err){
                    console.log(err)
                    res.render('home',{page:'contact',data:[]})
                }else{
                    res.render('home',{page:'contact',data:item})
                }
            })
        }
    })
}

module.exports.delete = function(req,res){
    Contact.deleteOne({_id:req.params.id},function(err){
        if(err){
            console.log(err)
        }else{
            res.redirect('/page/contact')
        }
    })
}