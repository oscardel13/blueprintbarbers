const mongoose = require("mongoose");
const { bookingCollection } = require("../../models/booking/booking.mongo"); // or use your getBooking()
const { getBarberById } = require("../../models/barber/barber.data");

async function getBookingIfAllowed({ bookingId, user }) {
  if (!mongoose.Types.ObjectId.isValid(bookingId)) return null;

  // Admin hook (optional)
  // if (user?.roles?.includes("admin")) return await bookingCollection.findById(bookingId);

  const or = [{ customer: user._id }];

  // If user is a barber, they can access bookings for their barberId
  if (user.barberId && mongoose.Types.ObjectId.isValid(String(user.barberId))) {
    or.push({ barber: user.barberId });
  }

  // Only return booking if scoped to this user
  const booking = await bookingCollection.findOne({ _id: bookingId, $or: or });
  return booking;
}

async function getBarberOwnerFromBooking(booking) {
  const barberId = booking.barber?._id || booking.barber;
  const barber = await getBarberById(barberId);
  return barber || null;
}

module.exports = {
  getBookingIfAllowed,
  getBarberOwnerFromBooking,
};
