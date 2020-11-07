module.exports = {
    ensureAuthenticated : function(req,res,next){
        if(req.isAuthenticated()){
            return next();
        }
        req.flash('error_msg','Xin vui lòng đăng nhập');
        res.redirect('/login');
    }
}