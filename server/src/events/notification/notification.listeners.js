// models/notification/notifications.listeners.js
const bookingEvents = require("../booking/booking.events");
const {
  onBookingCreatedNotify,
  onBookingUpdatedNotify,
  onBookingCanceledNotify,
  onBookingConfirmedNotify,
  onBookingRescheduleRequestedNotify,
  onBookingRescheduleAcceptedNotify,
  onBookingRescheduleDeniedNotify,
} = require("./notification.handlers");

// Core lifecycle events
bookingEvents.on("bookingCreated", (payload) => {
  Promise.resolve(onBookingCreatedNotify(payload)).catch((err) => {
    console.error("onBookingCreatedNotify failed", err);
  });
});

bookingEvents.on("bookingUpdated", (payload) => {
  Promise.resolve(onBookingUpdatedNotify(payload)).catch((err) => {
    console.error("onBookingUpdatedNotify failed", err);
  });
});

bookingEvents.on("bookingCanceled", (payload) => {
  Promise.resolve(onBookingCanceledNotify(payload)).catch((err) => {
    console.error("onBookingCanceledNotify failed", err);
  });
});

bookingEvents.on("bookingConfirmed", (payload) => {
  Promise.resolve(onBookingConfirmedNotify(payload)).catch((err) => {
    console.error("onBookingConfirmedNotify failed", err);
  });
});

// Reschedule flow events (future)
bookingEvents.on("booking.reschedule_requested", (payload) => {
  Promise.resolve(onBookingRescheduleRequestedNotify(payload)).catch((err) => {
    console.error("onBookingRescheduleRequestedNotify failed", err);
  });
});

bookingEvents.on("booking.reschedule_accepted", (payload) => {
  Promise.resolve(onBookingRescheduleAcceptedNotify(payload)).catch((err) => {
    console.error("onBookingRescheduleAcceptedNotify failed", err);
  });
});

bookingEvents.on("booking.reschedule_denied", (payload) => {
  Promise.resolve(onBookingRescheduleDeniedNotify(payload)).catch((err) => {
    console.error("onBookingRescheduleDeniedNotify failed", err);
  });
});
