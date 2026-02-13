const EventEmitter = require("events");
class AppEventEmitter extends EventEmitter {}
const notificationEvents = new AppEventEmitter();

module.exports = notificationEvents;
