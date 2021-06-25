const postCollection = "postingan";
const responCollection = "respon";
const db = require("../model/DBconnection");

exports.updateLike = async (req,res)=>{
    const postID = req.params.id;
    const userInput = req.body;
    console.log(req.body);
    db.getDB().collection(responCollection).findOneAndUpdate(
        {postinganID : db.getPrimaryKey(postID)},
        
        {$addToSet : {like : userInput.username}
        }, 
        {returnOriginal : false},
        (err,result)=>{
            if(err){
                console.log(err);
            }
            else{
                res.json(result);
                console.log("Update Like Success")
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
                            
                        }
                    }
                )
            }
        }
    )
}

