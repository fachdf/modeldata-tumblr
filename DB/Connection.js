const mongoose = require('mongoose');

const URI = "mongodb://localhost:127.0.0.1/tumblr"

const connectDB = ()=>{
    mongoose.connect(URI,{
        useUnifiedTopology: true,
        useNewUrlParser: true
    });
    console.log('db connected..!' );
}

module.exports = connectDB;