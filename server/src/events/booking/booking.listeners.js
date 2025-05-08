const bookingEvents = require("./booking.events");
const { update2WeeksBooking } = require("../../services/barber/barber.service");
const { updateUserAppointments } = require("../../services/user/user.service");

bookingEvents.on("bookingCreated", async (data) => {
  // Update 2WeeksBooking and Availability logic
  const barber = await update2WeeksBooking(data);
  const user = await updateUserAppointments(data);
});

bookingEvents.on("bookingUpdated", async (data) => {
  // Update 2WeeksBooking and Availability logic
  const barber = await update2WeeksBooking(data);
  const user = await updateUserAppointments(data);
});
