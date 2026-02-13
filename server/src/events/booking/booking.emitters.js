const bookingEvents = require("./booking.events");

async function emitCreateBookingEvent(booking) {
  // Emit event after booking is created
  console.log("Emiting event bookingCreated");
  bookingEvents.emit("bookingCreated", booking);

  return booking;
}

async function emitConfirmBookingEvent(booking) {
  // Emit event after booking is created
  console.log("Emiting event bookingConfirmed");
  bookingEvents.emit("bookingConfirmed", booking);

  return booking;
}

async function emitCancelBookingEvent(booking) {
  // Emit event after booking is created
  console.log("Emiting event bookingCanceled");
  bookingEvents.emit("bookingCanceled", booking);

  return booking;
}

async function emitUpdatingBookingEvent(booking) {
  // Emit event after booking is created
  console.log("Emiting event bookingUpdate");
  bookingEvents.emit("bookingUpdated", booking);

  return booking;
}

async function emitRescheduleBookingEvent(booking) {
  console.log("Emiting event booking.reschedule_requested");
  bookingEvents.emit("booking.reschedule_requested", booking);

  return booking;
}

async function emitRescheduleAcceptedBookingEvent(booking) {
  console.log("Emiting event booking.reschedule_accepted");
  bookingEvents.emit("booking.reschedule_accepted", booking);

  return booking;
}

async function emitRescheduleDeniedBookingEvent(booking) {
  console.log("Emiting event booking.reschedule_denied");
  bookingEvents.emit("booking.reschedule_denied", booking);

  return booking;
}

module.exports = {
  emitCreateBookingEvent,
  emitConfirmBookingEvent,
  emitCancelBookingEvent,
  emitUpdatingBookingEvent,
  emitRescheduleBookingEvent,
  emitRescheduleAcceptedBookingEvent,
  emitRescheduleDeniedBookingEvent,
};
