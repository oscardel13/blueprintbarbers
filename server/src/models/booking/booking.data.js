const { bookingCollection } = require("./booking.mongo");

// SHOULD TAKE INTO ACCOUNT barberID,
const getBookings = async (query = {}, skip = 0, limit = 0, sortDir = 1) => {
  return await bookingCollection
    .find(query)
    .skip(skip)
    .limit(limit)
    .sort({ startTime: sortDir })
    .populate("customer", "name picture email phone") // only these fields
    .populate("barber", "name nickname picture address phone");
};

const upsertBooking = async (filter, update) => {
  return await bookingCollection
    .findOneAndUpdate(
      filter, // Usually _id
      { $set: update },
      { new: true, upsert: true, returnDocument: "after", }
    )
    .populate("customer", "name picture email phone")
    .populate("barber", "name nickname picture address phone");
};

const createBooking = async (booking) => {
  const newBooking = await bookingCollection.create(booking);
  return await bookingCollection
    .findById(newBooking._id)
    .populate("customer", "name picture email phone")
    .populate("barber", "name nickname picture address phone");
};

const getBooking = async (id) => {
  return await bookingCollection
    .findOne({ _id: id })
    .populate("customer", "name picture email phone")
    .populate("barber", "name nickname picture address phone");
};

const updateBooking = async (booking) => {
  return await bookingCollection
    .findOneAndUpdate({ _id: booking._id }, booking, { returnDocument: "after" })
    .populate("customer", "name picture email phone")
    .populate("barber", "name nickname picture address phone");
};

const deleteBooking = async (id) => {
  return await bookingCollection.deleteOne({ _id: id });
};

module.exports = {
  createBooking,
  upsertBooking,
  getBookings,
  getBooking,
  updateBooking,
  deleteBooking,
};
