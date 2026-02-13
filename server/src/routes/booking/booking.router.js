const express = require("express");

const {
  httpGetBookings,
  httpGetBooking,
  httpsCreateBooking,
  httpUpdateBooking,
  httpRescheduleBooking,
  httpRescheduleBookingConfirm,
  httpRescheduleBookingDenied,
  httpCancelBooking,
  httpConfirmBooking,
  httpDeleteBooking,
} = require("./booking.controller");

const BookingRouter = express.Router();

BookingRouter.get("/", httpGetBookings);
BookingRouter.post("/", httpsCreateBooking);
BookingRouter.get("/:id", httpGetBooking);
BookingRouter.patch("/:id/confirm", httpConfirmBooking);
BookingRouter.patch("/:id/cancel", httpCancelBooking);
BookingRouter.patch("/:id/reschedule", httpRescheduleBooking);
BookingRouter.patch("/:id/reschedule/confirm", httpRescheduleBookingConfirm);
BookingRouter.patch("/:id/reschedule/deny", httpRescheduleBookingDenied);
BookingRouter.put("/:id", httpUpdateBooking);
BookingRouter.delete("/:id", httpDeleteBooking);

module.exports = BookingRouter;
