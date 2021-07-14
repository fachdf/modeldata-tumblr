const express = require("express");
const responAPI = require("../API/respon")
const router = express.Router();

/* Create */
router.post("/likePostingan/:id", responAPI.updateLike)
router.post("/unlikePostingan/:id", responAPI.deleteLike)

router.get("/getPostinganLikers/:id", responAPI.getPostinganLikers)
//router.get("/getAllPostingan", postinganAPI.getAllPostingan)

module.exports = router