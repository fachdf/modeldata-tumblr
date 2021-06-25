const berandaCollection = "beranda";
const userCollection = "users";
const db = require("../model/DBconnection");

exports.createBeranda = async (req,res)=>{
    const userInput = req.body;
    //console.log(req.body);

    db.getDB().collection(berandaCollection).insertOne(userInput,(err,result)=>{
        if(err){
            console.log(err);
        }else{
            res.json({result: result, document: result.ops[0]});
        }
    })
    const userberanda = await db.getDB().collection(berandaCollection).findOne({username:userInput.username})
    console.log(userberanda)
    db.getDB().collection(userCollection).findOneAndUpdate(
        {username : userInput.username},
        
        {$set : {beranda : db.getPrimaryKey(userberanda._id)}
        },
        (err,result)=>{
            if(err){
                console.log(err);
            }
            else{
                //res.json(result);
                console.log("Update Success")
            }
        }
    )
}


exports.getAllBeranda = async (req,res) => {
    db.getDB().collection(berandaCollection).find({}).toArray((err,documents)=>{
        if(err){
            console.log(err);
        }else{
            console.log(documents);
            res.json(documents);
        }
    });
}

exports.getBerandaByID = async (req,res) => {
    const userInput = req.params._id
    db.getDB().collection(berandaCollection).find({_id : db.getPrimaryKey(userInput)}).toArray((err,documents)=>{
        if(err){
            console.log(err);
        }else{
            console.log(documents);
            res.json(documents);
        }
    });
}
/*
exports.fetchPost = async (req,res)=>{
    
    db.getDB().collection(berandaCollection).findOneAndUpdate(
        {username : db.getPrimaryKey(userID)},
        
        {$set : {nama : userInput.nama}
        }, 
        {returnOriginal : false},
        (err,result)=>{
            if(err){
                console.log(err);
            }
            else{
                res.json(result);
                console.log("Update Success")
            }
        }
    )
}*/