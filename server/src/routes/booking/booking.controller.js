const {
  createBooking,
  getBooking,
  getBookings,
  updateBooking,
  deleteBooking,
  upsertBooking,
} = require("../../models/booking/booking.data");
const { bookingEmitters } = require("../../events/events");

const { getPagination } = require("../../utils/query");
const { buildBookingBody, getBookingsParser } = require("./booking.helpers");

const httpGetBookings = async (req, res) => {
  const { skip, limit } = getPagination(req.query);
  const { query, sortDir } = getBookingsParser(req.query);
  try {
    const bookings = await getBookings(query, skip, limit, sortDir);
    res.status(200).json(bookings);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

const httpGetBooking = async (req, res) => {
  const userId = req.user._id;
  const barberId = req.user.barberId;
  try {
    const booking = await getBooking(req.params.id);
    if (
      String(booking.barber._id) !== String(barberId) &&
      String(booking.customer._id) !== String(userId)
    ) {
      return res.status(401).json({ message: "Unauthorized" });
    }
    res.status(200).json(booking);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

const httpsCreateBooking = async (req, res) => {
  try {
    const bookingBody = buildBookingBody(req.body);
    const booking = await upsertBooking(bookingBody);
    bookingEmitters.emitCreateBookingEvent(booking);
    res.status(200).json(booking);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Server error" });
  }
};

const httpUpdateBooking = async (req, res) => {
  // not sure if this does what i think it does
  if (!req.body._id) {
    req.body._id = req.params.id;
  }
  if (
    req.body._id === undefined ||
    req.body._id === null ||
    req.body._id === ""
  ) {
    res.status(401).json({ message: "unauthorized" });
  }

  try {
    const booking = await updateBooking(req.body);
    // bookingEmitters.emitUpdatingBookingEvent(booking);
    res.status(200).json(booking);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

// TODO make sure only barber or customer can delete
const httpDeleteBooking = async (req, res) => {
  try {
    const booking = await deleteBooking(req.params.id);
    res.status(200).json(booking);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = {
  httpGetBookings,
  httpGetBooking,
  httpsCreateBooking,
  httpUpdateBooking,
  httpDeleteBooking,
};
