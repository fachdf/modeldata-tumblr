const express = require("express");
const notificationAPI = require("../API/notification")
const router = express.Router();

/* Create */
router.post("/createNotification", notificationAPI.createNotification)

/** Read */
router.get("/getAllNotification", notificationAPI.getAllNotification)
router.get("/getUserNotification/:username", notificationAPI.getUserNotification)

module.exports = router