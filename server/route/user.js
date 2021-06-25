const express = require("express");
const userAPI = require("../API/user")
const router = express.Router();

/* Create */
router.post("/createUser", userAPI.createUser)

/* Read */
router.get("/get-all-users", userAPI.getUser)
router.get("/getUserByUsername/:username", userAPI.getUserByUsername)
router.get("/getUserByName/:nama", userAPI.getUserByName)
//kurang

/* Update */
router.put("/updateNamaUser/:id", userAPI.updateNamaUser)
router.put("/updateEmailUser/:id", userAPI.updateEmailUser)
router.put("/updatePasswordUser/:id", userAPI.updatePasswordUser)
router.put("/updateBioUser/:id", userAPI.updateBioUser)

/* Delete */
router.delete("/deleteUser/:id", userAPI.deleteUser)

module.exports = router