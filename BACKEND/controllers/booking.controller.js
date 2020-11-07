const Booking = require('../models/booking.model')
const moment = require('moment')

module.exports.findAll = function(req,res){
    Booking.find(function(err,items){
        if(err){
            console.log(err)
            res.render('home',{page:'booking',data:[]})
        }else{
            res.render('home',{page:'booking',data:items})
        }
    })
}

module.exports.create = function(req,res){
    const  oneDay = 24 * 60 * 60 * 1000;
    const firstDate = new Date(req.body.endDate);
    const secondDate = new Date(req.body.startDate);
    var count = Math.round(Math.abs((firstDate - secondDate) / oneDay));
    const total =  req.body.item.price * count;
    const km = function giatien(count){
        var discount = 0;
        if(count<10){
            discount = total * 0.9;
        
        }else if(10<=count<20){
            discount = total * 0.8;
    
        }else{ 
            discount = total * 0.7;
      
        }
        return discount;
    };
    
    var newBooking = new Booking({
        name: req.body.name,
        phone: req.body.phone,
        email: req.body.email,
        roomname: req.body.item.name,
        image: req.body.item.image,
        dateArrive: req.body.startDate,
        dateDepartment:  req.body.endDate,
        price: km(count)
    })
    newBooking.save(function(err){
        if(err){
            console.log("create account error:" + err)
            res.render('home',{page:'booking',message:'Create booking error'})
        }else{
            console.log('Create successfully' + newBooking)
            Booking.find(function(err,items){
                if(err){
                    console.log(err)
                    res.render('home',{page:'booking', data:[]})
                }else{
                    res.render('home',{page:'booking', data:items})
                }
            })
        }
    })
}

module.exports.delete = function(req,res){
    Booking.deleteOne({_id:req.params.id},function(err){
        if(err){
            console.log(err)
        }else{
            res.redirect('/page/booking')
        }
    })
}