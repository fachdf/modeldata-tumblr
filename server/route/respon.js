const express = require("express");
const responAPI = require("../API/respon")
const router = express.Router();

/* Create */
router.post("/likePostingan/:id", responAPI.updateLike)

//router.get("/getAllPostingan", postinganAPI.getAllPostingan)

module.exports = router