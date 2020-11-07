const User = require('../models/authen.model')
const bcrypt = require('bcrypt');
// var express = require('express');
// var app = express()
const passport = require('passport')

// module.exports.index = function(req,res){
//    res.render('home', {page:req.params.p, user: req.user})
//      console.log(req.user)
// }

// app.get('/page/:p',ensureAuthenticated,function(req,res){
//   res.render('home',{page:req.params.p})
// })
module.exports.getRegister = function(req,res){
    res.render('register')
}
module.exports.login = function(req,res){
  res.render('login')
}

module.exports.handleLogin = function(req,res,next){
  passport.authenticate('local',{
    successRedirect : '/',
    failureRedirect : '/login',
    failureFlash : true,
    })(req,res,next);
}

module.exports.logout = function(req,res){
  req.logout();
  req.flash('success_msg', 'Bạn đã đăng xuất');
  res.redirect('/login');
}

module.exports.addRegister = function(req,res){
    console.log(req.body)
    const { name, email, password, password2 } = req.body;
    let errors = [];
  
    if (!name || !email || !password || !password2) {
      errors.push({ msg: 'Vui lòng nhập dủ tất cả các thông tin' });
    }
  
    if (password != password2) {
      errors.push({ msg: 'Passwords không trùng khớp' });
    }
  
    if (password.length < 6) {
      errors.push({ msg: 'Mật khẩu phải nhiều hơn 6 ký tự' });
    }
  
    if(errors.length > 0 ) {
      console.log(errors);
      res.render('register', {
          errors : errors,
          name : name,
          email : email,
          password : password,
          password2 : password2})
       } else {
        User.findOne({email : email}).exec((err,user)=>{
        
          if(user){
            errors.push({msg: 'email đã tồn tại'});
            res.render('register',{errors,name,password,password2})
          }else{
            const newUser = new User({
              name: name,
              email: email,
              password: password
            })
           bcrypt.genSalt(10, (err, salt) => bcrypt.hash(newUser.password, salt, (err,hash)=>{
             if(err) throw err;
             //save pass to hash
                newUser.password = hash;
             newUser.save()
             .then(user =>{
               console.log(user)
               req.flash('success_msg', 'Đăng ký thành công và bạn có thể đăng nhập')
               res.redirect('/login');
             }) 
             .catch(err => console.log(err))
           }))
          }

        })
      }
}

