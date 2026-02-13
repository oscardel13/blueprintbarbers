const express = require("express");
const {
  httpGetMyNotifications,
  httpUpdateMyNotification,
  httpMarkAllMyNotificationsRead,
} = require("./notification.controller");

const NotificationRouter = express.Router();

NotificationRouter.get("/me", httpGetMyNotifications);
NotificationRouter.patch("/me/:id", httpUpdateMyNotification);
NotificationRouter.post("/me/mark-read", httpMarkAllMyNotificationsRead);

module.exports = NotificationRouter;
