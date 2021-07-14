const commentCollection = "comment";
const db = require("../model/DBconnection");
const responCollection = "respon";
const postCollection = "postingan";
const notifCollection = "notifikasi";
const userCollection = "users";
exports.createComment = async (req,res)=>{
    const postID = req.params.postid;
    const userInput = req.body;
    //console.log(req.body);
    db.getDB().collection(commentCollection).insertOne(
        {username : userInput.username,
         komentar : userInput.komentar},
        (err,result)=>{
        if(err){
            console.log("Error gan");
        }else{
            var commentID = result.insertedId
            var respondID
            res.json({result: result, document: result.ops[0]});
            db.getDB().collection(postCollection).findOneAndUpdate(
                {_id : db.getPrimaryKey(postID)}, 

                {$inc : {jumlah_comment : +1}},
                
                (err,postRes)=>{
                if(err){
                    console.log(err);
                }else{
                    respondID = postRes.value.respon
                    console.log(postRes.value.respon)
                    db.getDB().collection(responCollection).findOneAndUpdate(
                        {_id : db.getPrimaryKey(respondID)},
                        
                        {$addToSet : {comment : db.getPrimaryKey(commentID)}
                        },
                        (err,)=>{
                            if(err){
                                console.log(err);
                            }
                            else{
                                console.log("Reference comment to respon success")
                            }
                        }
                    )
                    notifUsername = postRes.value.username
                    var whocommented = userInput.username
                    var query = " mengomentari postinganmu!"
                    query = whocommented.concat(query)
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
                }
            })

            
            
        }
    })
}

exports.deleteComment =  async (req,res)=>{
    const commentID = req.params.commentid;
    db.getDB().collection(responCollection).findOneAndUpdate(
        {comment : {$in : [db.getPrimaryKey(commentID)]}}, 
        {$pull : {comment : db.getPrimaryKey(commentID)}},
        (err,result)=>{
        if(err){
            console.log(err);
        }else{
            var resId = result.value._id
            console.log(resId)
            db.getDB().collection(postCollection).findOneAndUpdate(
                {respon : db.getPrimaryKey(resId)}, 
                {$inc : {jumlah_comment : -1}},
                (err,result)=>{
                if(err){
                    console.log(err);
                }else{
                    console.log("Berhasil delete comment")
                    
                }
            })
        }
    })
    db.getDB().collection(commentCollection).findOneAndDelete({_id : db.getPrimaryKey(commentID)}, (err,result)=>{
        if(err){
            console.log(err);
        }else{
            res.json(result);
        }
    })
}

exports.getCommentByResponID = async (req,res)=>{
    const responID = req.params.id;
    db.getDB().collection(responCollection).findOne(
        {_id : db.getPrimaryKey(responID)},(err,result)=>{
        if(err){
            console.log(err)
        }else{
            //console.log(result.comment)
            var commentIDs = result.comment
            //return res.status(200).json(result)
            db.getDB().collection(commentCollection).find(
                {_id : {$in : commentIDs} }).toArray((err,documents)=>{
                if(err){
                    console.log(err);
                }else{
                    console.log(documents);
                    res.json(documents);
                }
            });
        }
    });
    
}
