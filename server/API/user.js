const userCollection = "users";
const berandaCollection = "beranda";
const db = require("../model/DBconnection");
const postCollection = "postingan";
const responCollection = "postingan";
const commentCollection = "comment";
const notifCollection = "notifikasi",
jwt        = require("jsonwebtoken");
/* Create */
exports.createUser = async (req,res)=>{
    const userInput = req.body;
db.getDB().collection(userCollection).insertOne(
    {
    username : userInput.username,
    nama : userInput.nama,
    bio : "My name is " + userInput.nama + ". Welcome to my blog!",
    blog_name : userInput.blog_name,
    email : userInput.email,
    password : bcrypt.hashSync(userInput.password, 10),
    diikuti : [],
    mengikuti : [],
    postingan : [],
    notifikasi : [],
    jumlah_diikuti : 0,
    jumlah_mengikuti : 0,
    jumlah_postingan : 0
    },
    (err,result)=>{
        if(err){
            console.log(err);
        }else{
            res.json({result: result, document: result.ops[0]});
            console.log("User Created")
            var resId = result.insertedId
            db.getDB().collection(berandaCollection).insertOne(
                {postingan : []},(err,res)=>{
                if(err){
                    console.log(err);
                }else{
                    console.log("Beranda Created")
                    var resBeranda = res
                    db.getDB().collection(userCollection).findOneAndUpdate(
                        {_id : resId},
                        
                        {$set : {beranda : db.getPrimaryKey(resBeranda.insertedId)}
                        },
                        (err,)=>{
                            if(err){
                                console.log(err);
                            }
                            else{
                                console.log("Reference beranda to user success")
                            }
                        }
                    ) 
                }
            })

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
            return res.status(200).json(documents)
        }
    });
}

exports.getUserByUsername = async (req,res) => {
    const username = req.params.username;
    console.log(username)
    db.getDB().collection(userCollection).findOne(
        {username : username},(err,result)=>{
        if(err){
            console.log(err)
        }else{
           return res.status(200).json(result)
        }
    })
}

exports.getUserBio = async (req,res) => {
    const username = req.params.username;
    console.log(username)
    db.getDB().collection(userCollection).findOne(
        {username : username},(err,result)=>{
        if(err){
            console.log(err)
        }else{
            console.log(result.postingan);
            return res.status(200).json({
                title: 'user bio grabbed',
                bio: result.bio
            })
        }
    })
}

exports.getUserBlogName = async (req,res) => {
    const username = req.params.username;
    console.log(username)
    db.getDB().collection(userCollection).findOne(
        {username : username},(err,result)=>{
        if(err){
            console.log(err)
        }else{
            console.log(result.postingan);
            return res.status(200).json({
                title: 'user blog_name grabbed',
                blog_name: result.blog_name
            })
        }
    })
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

exports.getUserPostingan = async (req,res) => {
    const username = req.params.username;
    console.log(username)
    db.getDB().collection(userCollection).findOne(
        {username : username},(err,result)=>{
        if(err){
            console.log(err)
        }else{
            console.log(result.postingan);
            return res.status(200).json({
                title: 'user grabbed',
                postinganIDs: result.postingan
            })
        }
    })
}
/* Update */
exports.updateNamaUser = async (req,res)=>{
    const userID = req.params.id;
    const userInput = req.body;
    console.log(req.body);
    db.getDB().collection(userCollection).findOneAndUpdate(
        {_id : db.getPrimaryKey(userID)},
        
        {$set : {nama : userInput.nama}}, 
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
        
        {$set : {password : bcrypt.hashSync(userInput.password, 10)}
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

exports.updateBlogNameUser = async (req,res)=>{
    const userID = req.params.id;
    const userInput = req.body;
    console.log(req.body);
    db.getDB().collection(userCollection).findOneAndUpdate(
        {_id : db.getPrimaryKey(userID)},
        {$set : {blog_name : userInput.blog_name}}, 
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
            /** Hapus postingan */
            var postinganIDs = result.value.postingan
            for(const postinganID of postinganIDs){
                console.log("Hapus postingan berhasil")
                db.getDB().collection(postCollection).findOneAndDelete(
                    { _id : db.getPrimaryKey(postinganID) },
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
                                        
                                        if(commentIDs != null){
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
            }
            /** Hapus beranda */
            var berandaID = result.value.beranda
            db.getDB().collection(berandaCollection).findOneAndDelete(
                {_id : db.getPrimaryKey(berandaID)}, (err,)=>{
                    if(err){
                        console.log(err)
                    }
                }
            )
            /** Hapus komen user tsb */
            var username = result.value.username
            db.getDB().collection(commentCollection).deleteMany(
                {username : username}, (err,res)=>{
                    if(err){
                        console.log(err)
                    }else{
                        console.log("Deleted " + res.deletedCount + " comments");
                    }
                }
            )  
                
        }
    })
}

exports.follow = async (req,res) =>{
    const user = req.body.username
    const followTarget = req.params.username
    console.log(user)
    console.log(followTarget)
    db.getDB().collection(userCollection).findOneAndUpdate(
        {username : user},
        {$addToSet : {mengikuti : followTarget},
         $inc : {jumlah_mengikuti : +1}}, 
        (err,result)=>{
            if(err){
                console.log(err);
            }
            else{
                
                console.log("Update Following Success")
            }
        }
    )
    db.getDB().collection(userCollection).findOneAndUpdate(
        {username : followTarget},
        {$addToSet : {diikuti : user},
        $inc : {jumlah_diikuti : +1}}, 
        (err,result)=>{
            if(err){
                console.log(err);
            }
            else{
                //res.json(result);
                console.log("Update Followers Success")
            }
        }
    )

    notifUsername = followTarget
    var whofollowed = user
    var query = " mengikuti kamu!"
    query = whofollowed.concat(query)
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
                        //console.log(res)
                    }
                })
        }
    })

    res.json({result : "follow success"});
}

exports.unfollow = async (req,res) =>{
    const user = req.body.username
    const followTarget = req.params.username
    db.getDB().collection(userCollection).findOneAndUpdate(
        {username : user},
        {$pull : {mengikuti : followTarget},
         $inc : {jumlah_mengikuti : -1}}, 
        (err,result)=>{
            if(err){
                console.log(err);
            }
            else{
                //res.json(result);
                console.log("Update Following Success")
            }
        }
    )
    db.getDB().collection(userCollection).findOneAndUpdate(
        {username : followTarget},
        {$pull : {diikuti : user},
        $inc : {jumlah_diikuti : -1}}, 
        (err,result)=>{
            if(err){
                console.log(err);
            }
            else{
                //res.json(result);
                console.log("Update Followers Success")
            }
        }
    )
    res.json({result : "unfollow Success"});
}




/** Login */

exports.userLogin = async (req,res)=>{
    const userDetails = req.body;

   // console.log(userDetails)
    db.getDB().collection(userCollection).findOne(
        {email : userDetails.email}, (err,userExist)=>{
        //console.log(userExist)
        if (err) return res.status(500).json({
            title: 'server error',
            error: err
        })
        if (!userExist) {
            return res.status(401).json({
              title: 'user not found',
              error: 'invalid credentials'
            })
        }
        console.log(req.body.password )
        console.log( userExist.password)
        //incorrect password
        if (!bcrypt.compareSync(req.body.password, userExist.password)) {
            return res.status(401).json({
            tite: 'login failed',
            error: 'invalid credentials'
            })
        }
        //IF ALL IS GOOD create a token and send to frontend
        let token = jwt.sign({ userId: userExist._id}, 'secretkey');
        return res.status(200).json({
            title: 'login sucess',
            token: token
        })
    })

}

exports.getSessionUser = async (req, res)=>{
    
    let token = req.headers.token; //token
    jwt.verify(token, 'secretkey', (err, decoded) => {
        if (err){
            console.log("unauthorized")
            return res.status(401).json({
                title: 'unauthorized'
            })
        }
        //token is valid
        console.log(decoded)
        db.getDB().collection(userCollection).findOne({ _id: db.getPrimaryKey(decoded.userId) }, (err, user) => {
        if (err) return console.log(err)
        return res.status(200).json({
            title: 'user grabbed',
            user: {
            email: user.email,
            username: user.username,
            mengikuti : user.mengikuti,
            diikuti : user.diikuti,
            beranda : user.beranda,
            _id : user._id
        }
        })
        })

    })
  }