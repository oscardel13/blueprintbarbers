const userCollection = require("./user.mongo");

const getUsers = async (skip, limit) => {
  return await userCollection.find().skip(skip).limit(limit).sort("name");
};

const getUser = async (id) => {
  return await userCollection.findOne({ _id: id });
};

const createUser = async (user) => {
  return await userCollection.findOneAndUpdate({ gid: user.gid }, user, {
    upsert: true,
    returnDocument: "after",
  });
};

const updateUser = async (user) => {
  return await userCollection.findOneAndUpdate({ _id: user._id }, user, {
    returnDocument: "after",
  });
};

const deleteUser = async (id) => {
  return await userCollection.deleteOne({ _id: id });
};

const checkAdmin = async (id) => {
  const user = await getUser(id);
  return user.accessLevel > 0;
};

module.exports = {
  getUsers,
  getUser,
  updateUser,
  deleteUser,
  createUser,
  checkAdmin,
};
