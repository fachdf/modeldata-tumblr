const notifCollection = "notifikasi";
const userCollection = "users";
const db = require("../model/DBconnection");

exports.createNotification = async (req,res)=>{
    const userInput = req.body;
    console.log(req.body);

    db.getDB().collection(notifCollection).insertOne(
        {keterangan : userInput.keterangan,
         time : new Date()
        },
         (err,result)=>{
        if(err){
            console.log(err);
        }else{
            console.log("Notifikasi dibuat")
            res.json(result)
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
    db.getDB().collection(userCollection).findOne(
        {username : username},(err,user)=>{
            if(err){
                console.log(err)
            }else{
                var notifIDs = user.notifikasi
                db.getDB().collection(notifCollection).find({_id : {$in : notifIDs}}).toArray((err,documents)=>{
                    if(err){
                        console.log(err);
                    }else{
                        console.log(documents);
                        res.json(documents);
                    }
                });
            }
        }
    )
    
}

exports.deleteUserNotification = async (req,res)=>{
    const username = req.params.username
    db.getDB().collection(userCollection).findOne(
        {username : username},(err,user)=>{
            if(err){
                console.log(err)
            }else{
                var notifIDs = user.notifikasi
                db.getDB().collection(notifCollection).deleteMany(
                    {_id : {$in : notifIDs}}, (err,result)=>{
                        if(err){
                            console.log(err)
                        }else{
                            
                            console.log(result)
                        }
                    }
                )
                db.getDB().collection(userCollection).findOneAndUpdate(
                    {username : username},
                    {$set : {notifikasi : []}},
                    (err,user)=>{
                        if(err){
                            console.log(err)
                        }else{
                            console.log(user)
                        }
                    }
                )
                res.json({status : "Success"})
            }
        }
    )
}