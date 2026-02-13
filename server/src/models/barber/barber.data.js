const barbersCollection = require("./barber.mongo");
const mongoose = require("mongoose");

const getBarbers = async (skip, limit) => {
  return await barbersCollection.find({}).skip(skip).limit(limit);
};

const createBarber = async (barber) => {
  return await barbersCollection.create(barber);
};

const getBarber = async (query) => {
  return await barbersCollection.findOne(query);
};

const getBarberById = async (identifier) => {
  let query = {};
  if (mongoose.Types.ObjectId.isValid(identifier)) query = { _id: identifier };
  else query = { gid: identifier };

  return await barbersCollection.findOne(query);
};

const getBarberByUserId = async (userId) => {
  // if you rename field to ownerUserId later, change here once
  return await barbersCollection.findOne({ user: userId });
};

const getBarberClients = async (barberId) => {
  const barber = await barbersCollection.findById(barberId).populate({
    path: "clients",
    select: "name email phone picture",
  });
  return barber?.clients || [];
};

const updateBarber = async (barber) => {
  return await barbersCollection.findOneAndUpdate({ _id: barber._id }, barber, {
    returnDocument: "after",
  });
};

const deleteBarber = async (barber) => {
  return await barbersCollection.deleteOne({ _id: barber._id });
};

const addClientToBarber = async (barberId, customerId) => {
  return await barbersCollection.findOneAndUpdate(
    { _id: barberId },
    { $addToSet: { clients: customerId } },
    { returnDocument: "after" },
  );
};

module.exports = {
  createBarber,
  getBarbers,
  getBarber,
  getBarberById,
  getBarberByUserId,
  getBarberClients,
  updateBarber,
  deleteBarber,
  addClientToBarber,
};
