const notifCollection = "notification";
const userCollection = "users";
const db = require("../model/DBconnection");

exports.createNotification = async (req,res)=>{
    const userInput = req.body;
    console.log(req.body);

    db.getDB().collection(notifCollection).insertOne(userInput,(err,result)=>{
        if(err){
            console.log(err);
        }else{
            res.json({result: result, document: result.ops[0]});
        }
    })
}

exports.getAllNotification = async (req,res) => {
    db.getDB().collection(notifCollection).find({}).toArray((err,documents)=>{
        if(err){
            console.log(err);
        }else{
            console.log(documents);
            res.json(documents);
        }
    });
}

exports.getUserNotification = async (req,res) => {
    const username = req.params.username;
    db.getDB().collection(notifCollection).find({username : username}).toArray((err,documents)=>{
        if(err){
            console.log(err);
        }else{
            console.log(documents);
            res.json(documents);
        }
    });
}