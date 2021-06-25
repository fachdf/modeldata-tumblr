const commentCollection = "comment";
const db = require("../model/DBconnection");

exports.createComment = async (req,res)=>{
    const postID = req.params.id;
    const userInput = req.body;
    userInput.commentID = db.getPrimaryKey(postID);
    console.log(req.body);
    db.getDB().collection(commentCollection).insertOne(userInput,(err,result)=>{
        if(err){
            console.log(err);
        }else{
            res.json({result: result, document: result.ops[0]});
        }
    })
}

exports.deleteComment =  async (req,res)=>{
    const commentID = req.params.id;
    
    db.getDB().collection(commentCollection).findOneAndDelete({_id : db.getPrimaryKey(commentID)}, (err,result)=>{
        if(err){
            console.log(err);
        }else{
            res.json(result);
        }
    })
}
