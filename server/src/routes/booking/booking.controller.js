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
const { createBookingDateTime, simplifiedBookings } = require("./booking.helpers");

const httpGetBookings = async (req, res) => {
  const { skip, limit } = getPagination(req.query);
  try {
    const bookings = await getBookings(query={}, skip, limit);
    res.status(200).json(bookings);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

const httpGetBookingsForDay = async(req, res) => {
  try{
    // should get this from body not params
    const barberId = req.query.barberId
    const clientId = req.query.cleintId
    const dateString = req.query.date
    const start = new Date(dateString); // e.g., "2024-12-04"
    const end = new Date(dateString);
    end.setDate(end.getDate() + 1);
    let query = {startTime: {
      $gte: start,
      $lt: end
    }}

    if (barberId !== undefined) {
      query = { 'barber._id': barberId, ...query };
    }

  if (clientId !== undefined){
      query = {'customer._id': clientId, ...query}
    }
      const bookings = await getBookings(query)
      
    
    res.status(200).json(simplifiedBookings(bookings));
  }
  catch(err){
    res.status(500).json({message: "Server error"})
  }
}

/* TODO 
add check to see if they own it if not return error not owner
make it more specific instead of id say barberId
or clientId
*/
const httpGetBooking = async (req, res) => {
  try {
    console.log(req.params.id)
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
  if (req.body._id === undefined || req.body._id === null || req.body._id === ""){
    res.status(401).json({message: "unauthurized"})
  }
  try {
    const booking = await updateBooking(req.body);
    // remember to uncomment it and test it
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
  httpGetBookingsForDay
};
