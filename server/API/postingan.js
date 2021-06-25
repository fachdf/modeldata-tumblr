const postCollection = "postingan";
const userCollection = "users";
const responCollection = "respon";
const db = require("../model/DBconnection");

exports.createPostingan = async (req,res)=>{
    const userInput = req.body;
    console.log(req.body);
    var resId
    db.getDB().collection(postCollection).insertOne(userInput,(err,result)=>{
        if(err){
            console.log(err);
        }else{
            //console.log(result.ops[0]._id)
            resId = result.insertedId
            res.json({result: result, document: result.ops[0]});
            /* masukkin ke user */
            db.getDB().collection(userCollection).findOneAndUpdate(
                {username : userInput.username},
                
                {$addToSet : {postingan : resId}},
                (err,result)=>{
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
            db.getDB().collection(responCollection).insertOne({postinganID : resId, like : [], comment : []},(err,result)=>{
                if(err){
                    console.log(err);
                }else{
                   // res.json({result: result, document: result.ops[0]});
                
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

