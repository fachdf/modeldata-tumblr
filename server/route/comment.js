const express = require("express");
const commentAPI = require("../API/comment")
const router = express.Router();

/** create */
router.post("/createComment/:id", commentAPI.createComment)  // Params = post ID
router.delete("/deleteComment/:id", commentAPI.deleteComment) //params = comment ID
module.exports = router