const barbersCollection = require("./barber.mongo");

const getBarbers = async (skip, limit) => {
  return await barbersCollection.find({}).skip(skip).limit(limit);
};

const createBarber = async (barber) => {
  return await barbersCollection.findOneAndUpdate({ gid: barber.gid }, barber, {
    upsert: true,
  });
};

const getBarber = async (id) => {
  return await barbersCollection.findOne({ _id: id });
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
