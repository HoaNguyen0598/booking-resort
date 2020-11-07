var express = require('express')
var cors = require('cors')
var bodyParser = require('body-parser')
var session = require('express-session')
const flash = require('connect-flash')
const passport = require('passport')
const {ensureAuthenticated} = require("./config/auth")
const moment = require("moment");
const socket = require('socket.io')

var app = express();
const http = require('http')
const server = http.createServer(app)
const io = socket(server)

require('./config/passport')(passport)

var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/booking-resort',{useUnifiedTopology: true,useNewUrlParser: true}, (err) => {
    if (err)
        console.error(err);
    else
        console.log("Connected to the mongodb"); 
});

//socket realtime 
io.on('connection', socket =>{
    socket.emit('your id',socket.id);
    console.log('co nguoi ket noi' + socket.id)
    socket.on('message',({name,message,id})=>{
        io.emit('message',{name,message,id})
        console.log({name,message,id})
    })
})

//
app.set('view engine','ejs');
app.set('views','./views');

app.use(express.static('public'))
app.use(cors())
app.use(bodyParser.urlencoded({
    extended: false
}))
app.use(bodyParser.json())

app.use(session({
  secret : 'secret',
  resave : true,
  saveUninitialized : true
 }));

 // format date
 app.use((req, res, next)=>{
    res.locals.moment = moment;
    next();
  });

 //passport middleware
app.use(passport.initialize());
app.use(passport.session());

 // connect flash
app.use(flash());
app.use((req,res,next)=> {
  res.locals.success_msg = req.flash('success_msg');
  res.locals.error_msg = req.flash('error_msg');
  res.locals.error  = req.flash('error');
next();
})



//get router API
const roomApi = require('./api/routers/room.router')
const roomtypeApi = require('./api/routers/roomtype.router')
const newsApi = require('./api/routers/tintuc.router')
//use router API
app.use(roomApi)
app.use(newsApi)
app.use(roomtypeApi)

//get router
const roomtype = require('./routers/roomtype.router')
const room = require('./routers/room.router')
const user = require('./routers/user.router')
const auth = require('./routers/auth.router')
const booking = require('./routers/booking.router')
const news = require('./routers/tintuc.router')
const contact = require('./routers/contact.router')
//use router
app.use('',roomtype)
app.use('',room)
app.use('',user)
app.use('',auth)
app.use('',booking)
app.use('',news)
app.use('',contact)


app.get('/',ensureAuthenticated,function(req,res){
    res.render("home", {page:"index"});
})

// app.get('/register',function(req,res){
//     res.render('register');
// })

app.get('/page/:p',ensureAuthenticated,function(req,res){
    res.render('home',{page:req.params.p})
})
app.use(function(req,res){
    res.status(404).send({url: req.originalUrl + 'not found'})
})

server.listen(5000, function () {
    console.log('Server is running..');
});