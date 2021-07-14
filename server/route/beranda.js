const express = require("express");
const berandaAPI = require("../API/beranda")
const router = express.Router();

/* Create */


/** Read */
router.get("/getAllBeranda", berandaAPI.getAllBeranda)
router.get("/getBerandaByID/:id", berandaAPI.getBerandaByID)

router.get("/fetchpost/:username", berandaAPI.fetchPost)
/*

router.put("/updateNamaUser/:id", berandaAPI.updateNamaUser)
router.put("/updateEmailUser/:id", berandaAPI.updateEmailUser)
router.put("/updatePasswordUser/:id", berandaAPI.updatePasswordUser)


router.put("/deleteUser/:id", userAPI.deleteUser)
*/

module.exports = router