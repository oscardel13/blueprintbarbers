// booking.handlers.js
mongoose = require("mongoose");

const { addClientToBarber } = require("../../models/barber/barber.data");

async function handleBookingCreated(booking) {
  const barberId = booking.barber?._id || booking.barber;
  const customerId = booking.customer?._id || booking.customer;

  const updatedBarber = await addClientToBarber(barberId, customerId);

  console.log("Client added to barber from booking", booking._id);

  return updatedBarber;
}

async function handleBookingUpdated(booking) {
  // future: reschedule, cancel, status change logic
}

module.exports = {
  handleBookingCreated,
  handleBookingUpdated,
};
