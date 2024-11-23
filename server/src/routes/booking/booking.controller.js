const {
  createBooking,
  getBooking,
  getBookings,
  updateBooking,
  deleteBooking,
} = require("../../models/booking/booking.data");
const { bookingEmitters } = require("../../events/events");

const { checkIfBarber } = require("../auth/auth.barber");

const { getPagination } = require("../../utils/query");
const { createBookingDateTime } = require("./booking.helpers");

const httpGetBookings = async (req, res) => {
  const { skip, limit } = getPagination(req.query);
  try {
    const bookings = await getBookings(skip, limit);
    res.status(200).json(bookings);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

// TODO add check to see if they own it if not return error not owner
const httpGetBooking = async (req, res) => {
  try {
    const booking = await getBooking(req.params.id);
    res.status(200).json(booking);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

const httpsCreateBooking = async (req, res) => {
  const { startTime, endTime } = createBookingDateTime(
    req.body.time,
    req.body.service
  );
  const newBooking = {
    customer: {
      _id: req.body.user._id,
      name: req.body.user.name,
      picture: req.body.user.picture,
      email: req.body.user.email,
      phone: req.body.user.phone,
    },
    barber: {
      _id: req.body.barber._id,
      name: req.body.barber.name,
      nickname: req.body.barber.nickname,
      picture: req.body.barber.picture,
      phone: req.body.barber.phone,
      address: req.body.barber.address,
    },
    service: {
      _id: req.body.service._id,
      name: req.body.service.name,
      description: req.body.service.description,
      price: req.body.service.price,
      duration: req.body.service.duration,
    },
    startTime,
    endTime,
    address: req.body.barber.address,
    notes: req.body?.notes,
  };
  try {
    const booking = await createBooking(newBooking);
    bookingEmitters.emitCreateBookingEvent(booking);
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
    bookingEmitters.emitUpdatingBookingEvent(booking);
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
