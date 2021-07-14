const postCollection = "postingan";
const userCollection = "users";
const responCollection = "respon";
const commentCollection = "comment";
const db = require("../model/DBconnection");

exports.createPostingan = async (req,res)=>{
    const userInput = req.body;
    console.log(req.body);
    var postId, resId
    db.getDB().collection(postCollection).insertOne(
        {username : userInput.username ,
         caption : userInput.caption,
         media : userInput.media,
         jumlah_like : 0,
         jumlah_comment : 0},
         (err,postResult)=>{
        if(err){
            console.log(err);
        }else{
            res.json({result: postResult, document: postResult.ops[0]});
            postId = postResult.insertedId;
            /* masukkin ke user */
            db.getDB().collection(userCollection).findOneAndUpdate(
                {username : userInput.username},
                
                {$addToSet : {postingan : postId},
                 $inc : {jumlah_postingan : +1}},
                (err,userResult)=>{
                    if(err){
                        console.log(err);
                    }
                    else{
                        //res.json(result);
                        console.log("Update User Success")
                    }
                }
            )
            /* buat respon nya */
            db.getDB().collection(responCollection).insertOne({like : [], comment : []},(err,responResult)=>{
                if(err){
                    console.log(err);
                }else{
                   // res.json({result: result, document: result.ops[0]});
                   resId = responResult.insertedId
                    db.getDB().collection(postCollection).findOneAndUpdate(
                        {_id : postId},
                        
                        {$set : {respon : db.getPrimaryKey(responResult.insertedId)}
                        },
                        (err,)=>{
                            if(err){
                                console.log(err);
                            }
                            else{
                                console.log("Reference respon to post success")
                            }
                        }
                    ) 
                    console.log("Create respond success")
                }
            })
        }
    })
    
}

exports.getAllPostingan = async (req,res) => {
    db.getDB().collection(postCollection).find({}).toArray((err,documents)=>{
        if(err){
            console.log(err);
        }else{
            console.log(documents);
            res.json(documents);
        }
    });
}

exports.getPostinganByText = async (req,res) => {
    const userInput = req.body
    db.getDB().collection(postCollection).find({ $text: { $search: userInput.text } }).toArray((err,documents)=>{
        if(err){
            console.log(err);
        }else{
            console.log(documents);
            res.json(documents);
        }
    });
}

exports.getPostinganById = async (req,res) => {
    const postId = req.params.id
    db.getDB().collection(postCollection).findOne(
        {_id : db.getPrimaryKey(postId)},(err,result)=>{
        if(err){
            console.log(err)
        }else{
            console.log(result)
           return res.status(200).json(result)
        }
    });
}

exports.deletePostingan = async (req,res) => {
    const postID = req.params.id;
    db.getDB().collection(postCollection).findOneAndDelete(
        { _id : db.getPrimaryKey(postID) },
        (err, result)=>{
            if(err){
                console.log(err)
            }else{
                //console.log(result)
                var responID = result.value.respon
                db.getDB().collection(responCollection).findOneAndDelete(
                    { _id : db.getPrimaryKey(responID) },
                    (err, result)=>{
                        if(err){
                            console.log(err)
                        }else{
                            //console.log(result)
                            var commentIDs = result.value.comment
                            
                            if(commentIDs){
                                for(const commentID of commentIDs){
                                    console.log(commentID)
                                    db.getDB().collection(commentCollection).findOneAndDelete({_id : db.getPrimaryKey(commentID)}, (err,result)=>{
                                        if(err){
                                            console.log(err);
                                        }else{
                                            console.log("Hapus comment berhasil")
                                        }
                                    })
                                }
                            }
                        }
                    }
                )
                res.json(result);
            }
        }
    )
    db.getDB().collection(userCollection).findOneAndUpdate(
        {postingan : {$in : [db.getPrimaryKey(postID)]}},
        {$pull : {postingan : db.getPrimaryKey(postID)},
         $inc : {jumlah_postingan : -1}},
        (err,result)=>{
            if(err){
                console.log(err)
            }else{
                console.log("berhasil")
            }
        }
    )
}