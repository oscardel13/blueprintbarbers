const barbersCollection = require("./barber.mongo");
const mongoose = require("mongoose");

const getBarbers = async (skip, limit) => {
  return await barbersCollection.find({}).skip(skip).limit(limit);
};

const createBarber = async (barber) => {
  return await barbersCollection.findOneAndUpdate({ gid: barber.gid }, barber, {
    upsert: true,
    returnDocument: "after",
  });
};

const getBarber = async (identifier) => {
  let query = {};

  if (mongoose.Types.ObjectId.isValid(identifier)) {
    // Try to find by MongoDB _id
    query = { _id: identifier };
  } else {
    // Fallback to gid (custom ID)
    query = { gid: identifier };
  }

  return await barbersCollection.findOne(query);
};

const updateBarber = async (barber) => {
  return await barbersCollection.findOneAndUpdate({ _id: barber._id }, barber, {
    returnDocument: "after",
  });
};

const deleteBarber = async (barber) => {
  return await barbersCollection.deleteOne({ _id: barber._id });
};

module.exports = {
  createBarber,
  getBarbers,
  getBarber,
  updateBarber,
  deleteBarber,
};
