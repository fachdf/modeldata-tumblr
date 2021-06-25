const express = require("express");
const postinganAPI = require("../API/postingan")
const router = express.Router();

/** Create */
router.post("/createPostingan", postinganAPI.createPostingan)

/** Read */
router.get("/getAllPostingan", postinganAPI.getAllPostingan)
router.get("/getPostinganByText", postinganAPI.getPostinganByText)

module.exports = router