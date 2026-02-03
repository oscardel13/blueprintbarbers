// booking.listeners.js
const bookingEvents = require("./booking.events");
const {
  handleBookingCreated,
  handleBookingUpdated,
} = require("./booking.handlers");

// Register listeners ONCE
bookingEvents.on("bookingCreated", (booking) => {
  Promise.resolve(handleBookingCreated(booking)).catch((err) => {
    console.error("bookingCreated handler failed", err);
  });
});

bookingEvents.on("bookingUpdated", (booking) => {
  Promise.resolve(handleBookingUpdated(booking)).catch((err) => {
    console.error("bookingUpdated handler failed", err);
  });
});
