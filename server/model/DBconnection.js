const MongoClient = require("mongodb").MongoClient;
const ObjectID = require('mongodb').ObjectID;
const dbname = "tumblr";
const Joi = require('joi')
const mongoOption = {useNewUrlParser : true, useUnifiedTopology: true};

// Connection URL
const url = "mongodb+srv://user_polban:Kzu4gbdge3PfQw9i@cluster0.15zf6.mongodb.net/tumblr?retryWrites=true&w=majority";
//const url = "mongodb://localhost:27017";
/** Schema Input Validation */
const userInputSchema = Joi.object({
    username: Joi.string()
        .alphanum()
        .min(3)
        .max(30)
        .required(),
    password: Joi.string()
        .pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')),
    repeat_password: Joi.ref('password'),
    email: Joi.string()
        .email({ minDomainSegments: 2 }),
    nama: Joi.string()
        .required()
});

const postinganInputSchema = Joi.object({
    username: Joi.string()
        .required(),
    password: Joi.string()
        .pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')),
    repeat_password: Joi.ref('password'),
    email: Joi.string()
        .email({ minDomainSegments: 2 }),
    nama: Joi.string()
        .required()
});

const state = {
    db : null
};

const connect = (cb) =>{
    if(state.db){
        cb();
    }else{
        MongoClient.connect(url,mongoOption,(err,client)=>{
            if(err){
                cb(err);
            }else{
                state.db = client.db(dbname);
                cb();
            }
        });
    }
}

const getPrimaryKey = (_id)=>{
    return ObjectID(_id);
}

const getDB = ()=>{
    return state.db;
}

module.exports = {getDB,connect,getPrimaryKey, userInputSchema, postinganInputSchema};