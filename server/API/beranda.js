const berandaCollection = "beranda";    
const db = require("../model/DBconnection"),
postCollection = "postingan",
userCollection = "users";

exports.getAllBeranda = async (req,res) => {
    db.getDB().collection(berandaCollection).find({}).toArray((err,documents)=>{
        if(err){
            console.log(err);
        }else{
            //console.log(documents);
            res.json(documents);
        }
    });
}

exports.getBerandaByID = async (req,res) => {
    const berandaID = req.params.id;
    db.getDB().collection(berandaCollection).findOne(
        {_id : db.getPrimaryKey(berandaID)},(err,result)=>{
        if(err){
            console.log(err)
        }else{
            console.log(result)
           return res.status(200).json(result)
        }
    })
}

exports.fetchPost = async (req,res)=>{
    var username = req.params.username
    //console.log(username)
    db.getDB().collection(userCollection).findOne(
        {username : username},(err,user)=>{
            if(err){
                console.log(err)
            }else{
                var followedUsers = user.mengikuti
                followedUsers.unshift(username)
                var berandaId = user.beranda
                console.log(followedUsers)
                db.getDB().collection(userCollection).find(
                    {username : {$in : followedUsers}}).toArray((err,documents)=>{
                    if(err){
                        console.log(err);
                    }else{
                        
                        var allPostingan = [];
                        for(let i = 0 ; i < documents.length; i++){
                            allPostingan.unshift(documents[i].postingan)
                        }
                        allPostingan = [].concat.apply([], allPostingan);
                        db.getDB().collection(berandaCollection).findOneAndUpdate(
                            {_id : db.getPrimaryKey(berandaId)},
                            {$set : { postingan : allPostingan}},
                            (err,berandaResult)=>{
                                if(err){
                                    console.log(err)
                                }else{
                                    res.json(berandaResult)
                                }
                            })
                    }
                });
                
            }
        })
}