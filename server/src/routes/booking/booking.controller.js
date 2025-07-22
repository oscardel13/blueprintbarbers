const {
  createBooking,
  getBooking,
  getBookings,
  updateBooking,
  deleteBooking,
  upsertBooking,
} = require("../../models/booking/booking.data");
const { bookingEmitters } = require("../../events/events");

const { checkIfBarber } = require("../auth/auth.barber");

const { getPagination } = require("../../utils/query");
const {
  createBookingDateTime,
  simplifiedBookings,
  buildBookingBody,
} = require("./booking.helpers");

const httpGetBookings = async (req, res) => {
  const { skip, limit } = getPagination(req.query);
  try {
    const bookings = await getBookings((query = {}), skip, limit);
    res.status(200).json(bookings);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

const httpGetBookingsForDay = async (req, res) => {
  try {
    // should get this from body not params
    const barberId = req.query.barberId;
    const clientId = req.query.cleintId;
    const dateString = req.query.date;
    const start = new Date(dateString)
    // const start = new Date(
    //   startDateTime.getFullYear(),
    //   startDateTime.getMonth(),
    //   startDateTime.getDate(),
    //   0, 0, 0, 0
    // );
    const end = new Date(dateString);
    end.setDate(end.getDate() + 1);
    console.log(start, end)
    let query = {
      startTime: {
        $gte: start,
        $lt: end,
      },
    };

    if (barberId !== undefined) {
      query = { "barber._id": barberId, ...query };
    }

    if (clientId !== undefined) {
      query = { "customer._id": clientId, ...query };
    }
    const bookings = await getBookings(query);

    res.status(200).json(simplifiedBookings(bookings));
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

// ADD MORE CHECKS CLIENT IS REQUIRED
const httpGetPastBookings = async (req, res) => {
  const { skip, limit } = getPagination(req.query);
  const now = req.query.now ? new Date(req.query.now) : new Date(); // fallback to server time if not sent

  const query = {
    startTime: { $lt: now },
  };

  if (req.query.client) {
    query.client = req.query.client;
  }

  try {
    const bookings = await getBookings(query, skip, limit);
    res.status(200).json(bookings);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

/* TODO 
add check to see if they own it if not return error not owner
make it more specific instead of id say barberId
or clientId
*/
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
    const bookingBody = buildBookingBody(req.body);
    const booking = await upsertBooking(bookingBody);
    bookingEmitters.emitCreateBookingEvent(booking);
    res.status(200).json(booking);
  } catch (err) {
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
  httpGetBookingsForDay,
  httpGetPastBookings
};
