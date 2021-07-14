/* Modules */
const express    = require('express'),
      bodyParser = require('body-parser'),
      path       = require('path'),
      db         = require("./model/DBconnection"),
      app        = express(),
      session    = require("express-session"),
      cookieParser = require("cookie-parser"),
      {v4: uuidv4} = require("uuid"),
      jwt        = require("jsonwebtoken");
      bcrypt     = require("bcrypt");

/* Routes */
const userRoutes    = require('./route/user'),
      berandaRoutes = require('./route/beranda'),
      notifRoutes   = require('./route/notifikasi'),
      postRoutes    = require('./route/postingan'),
      responRoutes  = require('./route/respon'),
      commentRoutes = require('./route/comment');
//const 
app.use(session({
    secret: uuidv4(), //  '1b9d6bcd-bbfd-4b2d-9b5d-ab8dfbbd4bed'
    resave: false,
    saveUninitialized: true
    
}));
var cors = require('cors')
app.use(cors())
/* body parser */
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(bodyParser.raw());
//app.use(express.json())


app.use(cookieParser());
app.use('/users', userRoutes);
app.use('/beranda', berandaRoutes);
app.use('/notifikasi', notifRoutes);
app.use('/postingan', postRoutes);
app.use('/respon', responRoutes);
app.use('/comment', commentRoutes);

//app.get('/',(req,res)=>{
//    res.sendFile(path.join(__dirname,'index.html'));
//});

app.get('/', function(req, res){
    if(req.session.user){
       res.send("Your Email : " + req.session.user);
    } else {
       res.send("You're not logged in");
    }
 });

db.connect((err)=>{
    if(err){
        console.log("Unable to Connect to Database");
        process.exit(1);
    }else{
        app.listen(3000,()=>{
            console.log("Connected to Database, listening on port 3000.");
        });
    }
})
