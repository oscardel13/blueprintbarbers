const bookingEvents = require("./booking.events");

async function emitCreateBookingEvent(booking) {
  // Emit event after booking is created
  console.log("Emiting event bookingCreated");
  bookingEvents.emit("bookingCreated", booking);

  return booking;
}

async function emitUpdatingBookingEvent(booking) {
  // Emit event after booking is created
  console.log("Emiting event bookingUpdate");
  bookingEvents.emit("bookingUpdated", booking);

  return booking;
}

module.exports = { emitCreateBookingEvent, emitUpdatingBookingEvent };
