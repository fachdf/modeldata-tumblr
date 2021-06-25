/* Modules */
const express    = require('express'),
      bodyParser = require('body-parser'),
      path       = require('path'),
      db         = require("./model/DBconnection"),
      app        = express();

/* Routes */
const userRoutes = require('./route/user');
const berandaRoutes = require('./route/beranda');
const notifRoutes = require('./route/notification');
const postRoutes = require('./route/postingan'),
      responRoutes = require('./route/respon'),
      commentRoutes = require('./route/comment');
//const 

/* body parser */
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(bodyParser.raw());
//app.use(express.json())

var cors = require('cors')
app.use(cors())

app.use('/users', userRoutes);
app.use('/beranda', berandaRoutes);
app.use('/notification', notifRoutes);
app.use('/postingan', postRoutes);
app.use('/respon', responRoutes);
app.use('/comment', commentRoutes);

app.get('/',(req,res)=>{
    res.sendFile(path.join(__dirname,'index.html'));
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
