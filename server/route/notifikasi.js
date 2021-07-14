const express = require("express");
const notificationAPI = require("../API/notifikasi")
const router = express.Router();

/* Create */
router.post("/createNotification", notificationAPI.createNotification)

/** Read */
router.get("/getAllNotification", notificationAPI.getAllNotification)
router.get("/getUserNotification/:username", notificationAPI.getUserNotification)

router.delete("/deleteUserNotification/:username", notificationAPI.deleteUserNotification)
module.exports = router