const notificationEvents = require("./notification.events");

async function emitNewNotificationEvent(notification) {
  // Emit event after notification is created
  console.log("Emiting event newNotification");
  notificationEvents.emit("newNotification", notification);
}

module.exports = { emitNewNotificationEvent };
