const postCollection = "postingan";
const responCollection = "respon";
const notifCollection = "notifikasi";
const userCollection = "users";
const db = require("../model/DBconnection");

exports.updateLike = async (req,res)=>{
    const postID = req.params.id;
    console.log(postID);
    const userInput = req.body;
    console.log(req.body);
    db.getDB().collection(postCollection).findOneAndUpdate(
        {_id : db.getPrimaryKey(postID)},
        
        {$inc : {jumlah_like : +1}
        }, 
        {returnOriginal : false},
        (err,result)=>{
            if(err){
                console.log(err);
            }
            else{
                console.log("Increment Like Success")
                var responID = result.value.respon
                db.getDB().collection(responCollection).findOneAndUpdate(
                    {_id : db.getPrimaryKey(responID)},
                    
                    {$addToSet : {like : userInput.username}
                    }, 
                    {returnOriginal : false},
                    (err,)=>{
                        if(err){
                            console.log(err);
                        }
                        else{
                            console.log("Update Like Success")
                            
                        }
                    }
                )

                notifUsername = result.value.username
                    var wholiked = userInput.username
                    var query = " menyukai postinganmu!"
                    query = wholiked.concat(query)
                    db.getDB().collection(notifCollection).insertOne(
                        {keterangan : query,
                         time : new Date()
                        },
                         (err,result)=>{
                        if(err){
                            console.log(err);
                        }else{
                            console.log("Notifikasi dibuat")
                            db.getDB().collection(userCollection).findOneAndUpdate(
                                {username : notifUsername},
                                {$addToSet : {notifikasi : result.insertedId}},
                                (err,res)=>{
                                    if(err){
                                        console.log(err)
                                    }else{
                                        console.log(res)
                                    }
                                })
                        }
                    })
                res.json(result)
            }
        }
    )
}

exports.deleteLike = async (req,res)=>{
    const postID = req.params.id;
    console.log(postID);
    const userInput = req.body;
    console.log(req.body);
    db.getDB().collection(postCollection).findOneAndUpdate(
        {_id : db.getPrimaryKey(postID)},
        {$inc : {jumlah_like : -1}}, 
        (err,result)=>{
            if(err){
                console.log(err);
            }
            else{
                console.log("Delete Like Success")
                var responID = result.value.respon
                db.getDB().collection(responCollection).findOneAndUpdate(
                    {_id : db.getPrimaryKey(responID)},
                    
                    {$pull : {like : userInput.username}
                    }, 
                    (err,)=>{
                        if(err){
                            console.log(err);
                        }
                        else{
                            
                        }
                    }
                )
            }
        }
    )
}
exports.getPostinganLikers = async (req,res)=>{
    const responID = req.params.id;
    db.getDB().collection(responCollection).findOne(
        {_id : db.getPrimaryKey(responID)},(err,result)=>{
        if(err){
            console.log(err)
        }else{
            
            res.json(result.like);
            
        }
    });
    
}
