require("./booking/booking.listeners");
require("./notification/notification.listeners");
// require("./barber/barber/listeners");
// require("./product/product/listeners");
// require("./user/user.listeners");

// Import emitters
const bookingEmitters = require("./booking/booking.emitters");
const notificationEmitters = require("./notification/notification.emitters");
// const barberEmitters = require("./barber/emitters");
// const productEmitters = require("./product/emitters");
// const userEmitters = require("./user/emitters");

module.exports = {
  bookingEmitters,
  notificationEmitters,
  //   barberEmitters,
  //   productEmitters,
  //   userEmitters,
};
