const userCollection = "users";
//const berandaCollection = "beranda";
const db = require("../model/DBconnection");
//const app = express();

/* Create */
exports.createUser = async (req,res)=>{
    const userInput = req.body;
    console.log(userInput)
    console.log(req.body);
    db.getDB().collection(userCollection).insertOne(userInput,(err,result)=>{
        if(err){
            console.log(err);
        }else{
            res.json({result: result, document: result.ops[0]});
        }
    })
}

/* Read */
exports.getUser = async (req,res) => {
    db.getDB().collection(userCollection).find({}).toArray((err,documents)=>{
        if(err){
            console.log(err);
        }else{
            console.log(documents);
            res.json(documents);
        }
    });
}

exports.getUserByUsername = async (req,res) => {
    const userInput = req.params;
    console.log(userInput)
    db.getDB().collection(userCollection).find({username : userInput.username}).toArray((err,documents)=>{
        if(err){
            console.log(err);
        }else{
            console.log(documents);
            res.json(documents);
        }
    });
}

exports.getUserByName = async (req,res) => {
    const userInput = req.params;
    console.log(userInput)
    db.getDB().collection(userCollection).find({nama : userInput.nama}).toArray((err,documents)=>{
        if(err){
            console.log(err);
        }else{
            console.log(documents);
            res.json(documents);
        }
    });
}


/* Update */
exports.updateNamaUser = async (req,res)=>{
    const userID = req.params.id;
    const userInput = req.body;
    console.log(req.body);
    db.getDB().collection(userCollection).findOneAndUpdate(
        {_id : db.getPrimaryKey(userID)},
        
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
}

exports.updateEmailUser = async (req,res)=>{
    const userID = req.params.id;
    const userInput = req.body;
    console.log(req.body);
    db.getDB().collection(userCollection).findOneAndUpdate(
        {_id : db.getPrimaryKey(userID)},
        
        {$set : {email : userInput.email}
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
}

exports.updatePasswordUser = async (req,res)=>{
    const userID = req.params.id;
    const userInput = req.body;
    console.log(req.body);
    db.getDB().collection(userCollection).findOneAndUpdate(
        {_id : db.getPrimaryKey(userID)},
        
        {$set : {password : userInput.password}
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
}

exports.updateBioUser = async (req,res)=>{
    const userID = req.params.id;
    const userInput = req.body;
    console.log(req.body);
    db.getDB().collection(userCollection).findOneAndUpdate(
        {_id : db.getPrimaryKey(userID)},
        
        {$set : {bio : userInput.bio}
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
}

/* Delete */
//masikurang
exports.deleteUser =  async (req,res)=>{
    const userID = req.params.id;
    
    db.getDB().collection(userCollection).findOneAndDelete({_id : db.getPrimaryKey(userID)}, (err,result)=>{
        if(err){
            console.log(err);
        }else{
            res.json(result);
        }
    })
}