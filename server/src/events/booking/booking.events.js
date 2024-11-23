const EventEmitter = require("events");
class AppEventEmitter extends EventEmitter {}
const bookingEvents = new AppEventEmitter();

module.exports = bookingEvents;
