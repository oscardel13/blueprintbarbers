const {
  createBooking,
  getBooking,
  getBookings,
  updateBooking,
  deleteBooking,
} = require("../../models/booking/booking.data");
const {
  emitCreateBookingEvent,
  emitUpdatingBookingEvent,
} = require("../../services/booking/booking.service");

const { checkIfBarber } = require("../auth/auth.barber");

const { getPagination } = require("../../utils/query");

const httpGetBookings = async (req, res) => {
  const { skip, limit } = getPagination(req.query);
  try {
    const bookings = await getBookings(skip, limit);
    res.status(200).json(bookings);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

const httpGetBooking = async (req, res) => {
  try {
    const booking = await getBooking(req.params.id);
    res.status(200).json(booking);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

const httpsCreateBooking = async (req, res) => {
  try {
    const booking = await createBooking(req.body);
    emitCreateBookingEvent(booking);
    res.status(200).json(booking);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

const httpUpdateBooking = async (req, res) => {
  if (!req.body._id) {
    req.body._id = req.params.id;
  }
  try {
    const booking = await updateBooking(req.body);
    emitUpdatingBookingEvent(booking);
    res.status(200).json(booking);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

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
