const express = require("express");
const commentAPI = require("../API/comment")
const router = express.Router();

/** create */
router.post("/createComment/:postid", commentAPI.createComment)  // Params = post ID
router.delete("/deleteComment/:commentid", commentAPI.deleteComment) //params = comment ID
router.get("/getCommentByResponID/:id", commentAPI.getCommentByResponID)
module.exports = router