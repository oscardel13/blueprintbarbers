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
const {
  buildBookingBody,
  getBookingsParser,
  buildBookingEventPayload,
} = require("./booking.helpers");

const {
  getBookingIfAllowed,
  getBarberOwnerFromBooking,
} = require("./booking.auth");

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
    // Always set customer from session to prevent spoofing
    const bookingBody = buildBookingBody(req.body);
    bookingBody.customer = req.user._id;

    const booking = await upsertBooking(bookingBody);
    // Derive barberOwnerUserId from DB (don’t trust req.body.barber.ownerUserId)
    const barberOwner = await getBarberOwnerFromBooking(booking);
    const payload = await buildBookingEventPayload(
      booking,
      "booking.created",
      barberOwner.barberOwner,
      req.user,
    );

    bookingEmitters.emitCreateBookingEvent(payload);
    return res.status(200).json(booking);
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "Server error" });
  }
};

// ADMIN ONLY NEW ENDPOINTS WILL BE CREATED
const httpUpdateBooking = async (req, res) => {
  try {
    const bookingId = req.body._id || req.params.id;
    if (!bookingId)
      return res.status(400).json({ message: "Missing booking id" });

    // Auth: must own (customer) or own barber (barberId)
    const existing = await getBookingIfAllowed({ bookingId, user: req.user });
    if (!existing) return res.status(403).json({ message: "Forbidden" });

    // Optional: prevent changing protected fields
    const update = { ...req.body, _id: bookingId };
    delete update.customer;
    delete update.barber; // if you don’t want them changing ownership

    const booking = await updateBooking(update);

    const barberOwner = await getBarberOwnerFromBooking(booking);

    const payload = await buildBookingEventPayload(
      booking,
      "booking.updated",
      barberOwner.barberOwner,
      req.user,
    );

    bookingEmitters.emitUpdatingBookingEvent(payload);
    return res.status(200).json(booking);
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "Server error" });
  }
};

const httpConfirmBooking = async (req, res) => {
  try {
    const bookingId = req.body._id || req.params.id;
    if (!bookingId)
      return res.status(400).json({ message: "Missing booking id" });

    const existing = await getBookingIfAllowed({ bookingId, user: req.user });
    if (!existing) return res.status(403).json({ message: "Forbidden" });

    // Barber-only confirm
    const isBarberForThisBooking =
      req.user.barberId &&
      String(existing.barber) === String(req.user.barberId);

    if (!isBarberForThisBooking) {
      return res
        .status(403)
        .json({ message: "Only the barber can confirm this booking" });
    }

    const booking = await updateBooking({
      ...req.body,
      _id: bookingId,
      status: "confirmed",
    });

    const barberOwner = await getBarberOwnerFromBooking(booking);

    const payload = await buildBookingEventPayload(
      booking,
      "booking.confirmed",
      barberOwner.ownerUserId,
      actor = req.user,
      barberSnapshot = barberOwner
    );

    bookingEmitters.emitConfirmBookingEvent(payload);
    return res.status(200).json(booking);
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "Server error" });
  }
};

const httpCancelBooking = async (req, res) => {
  try {
    const bookingId = req.body._id || req.params.id;
    if (!bookingId)
      return res.status(400).json({ message: "Missing booking id" });

    const existing = await getBookingIfAllowed({ bookingId, user: req.user });
    if (!existing) return res.status(403).json({ message: "Forbidden" });

    const booking = await updateBooking({
      ...req.body,
      _id: bookingId,
      status: "canceled",
    });

    const barberOwner= await getBarberOwnerFromBooking(booking);

    const payload = await buildBookingEventPayload(
      booking,
      "booking.canceled",
      barberOwner.barberOwner,
      req.user,
    );

    bookingEmitters.emitCancelBookingEvent(payload);
    return res.status(200).json(booking);
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "Server error" });
  }
};

const httpRescheduleBooking = async (req, res) => {
  // TODO
};

const httpRescheduleBookingConfirm = async (req, res) => {
  // TODO
};

const httpRescheduleBookingDenied = async (req, res) => {
  // TODO
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
  httpRescheduleBooking,
  httpRescheduleBookingConfirm,
  httpRescheduleBookingDenied,
  httpCancelBooking,
  httpConfirmBooking,
  httpDeleteBooking,
};
