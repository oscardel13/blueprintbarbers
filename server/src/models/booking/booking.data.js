const { bookingCollection } = require("./booking.mongo");

//SHOULD TAKE INTO ACCOUNT barberID,
const getBookings = async (query={}, skip = 0, limit = 0) => {
  return await bookingCollection.find(query).skip(skip).limit(limit);
  
};

const createBooking = async (booking) => {
  return await bookingCollection.create(booking);
};

const getBooking = async (id) => {
  return await bookingCollection.findOne({ _id: id });
};

const updateBooking = async (booking) => {
  return await bookingCollection.findOneAndUpdate(
    { _id: booking._id },
    booking,
    {
      returnDocument: "after",
    }
  );
};

const deleteBooking = async (id) => {
  return await bookingCollection.deleteOne({ _id: id });
};

module.exports = {
  createBooking,
  getBookings,
  getBooking,
  updateBooking,
  deleteBooking,
};
