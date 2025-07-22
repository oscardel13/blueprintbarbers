const express = require("express");

const {
  httpGetBookings,
  httpGetBooking,
  httpsCreateBooking,
  httpUpdateBooking,
  httpDeleteBooking,
  httpGetBookingsForDay,
  httpGetPastBookings
} = require("./booking.controller");

const BookingRouter = express.Router();

BookingRouter.get("/", httpGetBookings);
BookingRouter.post("/", httpsCreateBooking);
BookingRouter.get("/day", httpGetBookingsForDay)
BookingRouter.get("/past", httpGetPastBookings)
BookingRouter.get("/:id", httpGetBooking);
BookingRouter.put("/:id", httpUpdateBooking);
BookingRouter.delete("/:id", httpDeleteBooking);


module.exports = BookingRouter;
