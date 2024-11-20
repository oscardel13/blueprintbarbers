const EventEmitter = require("events");
const {
  update2WeeksBooking,
  updateAvailability,
} = require("../barber/barber.service");

class AppEventEmitter extends EventEmitter {}
const bookingEvents = new AppEventEmitter();

bookingEvents.on("bookingCreated", async (data) => {
  // Update 2WeeksBooking and Availability logic
  const barber = await update2WeeksBooking(data);
  //   console.log("barber", barber);
});

bookingEvents.on("bookingUpdated", async (data) => {
  // Update 2WeeksBooking and Availability logic
  const barber = await update2WeeksBooking(data);
});

module.exports = bookingEvents;
