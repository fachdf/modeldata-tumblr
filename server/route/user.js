const express = require("express");
const userAPI = require("../API/user")
const router = express.Router();

/* Create */
router.post("/createUser", userAPI.createUser)

/* Read */
router.get("/get-all-users", userAPI.getUser)
router.get("/getUserByUsername/:username", userAPI.getUserByUsername)
router.get("/getUserByName/:nama", userAPI.getUserByName)
router.get("/getUserPostingan/:username", userAPI.getUserPostingan)
router.get("/getUserBio/:username", userAPI.getUserBio)
router.get("/getUserBlogName/:username", userAPI.getUserBlogName)
//kurangget

/* Update */
router.put("/updateNamaUser/:id", userAPI.updateNamaUser)
router.put("/updateEmailUser/:id", userAPI.updateEmailUser)
router.put("/updatePasswordUser/:id", userAPI.updatePasswordUser)
router.put("/updateBioUser/:id", userAPI.updateBioUser)
router.put("/updateBlogNameUser/:id", userAPI.updateBlogNameUser)

router.put("/follow/:username", userAPI.follow)
router.put("/unfollow/:username", userAPI.unfollow)
/* Delete */
router.delete("/deleteUser/:id", userAPI.deleteUser)


router.post("/userLogin", userAPI.userLogin)
router.get("/getSessionUser", userAPI.getSessionUser)
module.exports = router