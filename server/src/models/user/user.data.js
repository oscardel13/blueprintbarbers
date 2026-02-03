const { userCollection } = require("./user.mongo");

const getUsers = async (skip, limit) => {
  return await userCollection.find().skip(skip).limit(limit).sort("name");
};

const getMyUser = async (id) => {
  return await userCollection.findOne({ _id: id });
};

const getUser = async (id, options = {}) => {
  const query = userCollection.findOne({ _id: id });

  if (options.select) {
    query.select(options.select);
  }

  if (options.lean) {
    query.lean();
  }

  return await query;
};

const createUser = async (user) => {
  const googleSub = user?.authProviders?.google?.sub || user?.gid;

  if (!googleSub) {
    throw new Error(
      "createUser: Missing Google sub (authProviders.google.sub / gid)",
    );
  }

  // Build update payload. Don't blindly $set the whole user object if it contains undefined fields.
  const update = {
    name: user.name,
    email: user.email,
    picture: user.picture || "",
    "authProviders.google.sub": googleSub,
  };

  // Optional: keep legacy gid during transition (remove later)
  if (user.gid) update.gid = user.gid;

  return await userCollection.findOneAndUpdate(
    { "authProviders.google.sub": googleSub },
    { $set: update, $setOnInsert: { roles: ["customer"] } },
    { upsert: true, returnDocument: "after" },
  );
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

const findUserByEmail = async (email) => {
  return await userCollection.findOne({ email });
};

const findUserByProvider = async (providerPath, providerId) => {
  return await userCollection.findOne({ [providerPath]: providerId });
};

const linkProviderToUser = async (
  userId,
  providerPath,
  providerId,
  extras = {},
) => {
  return await userCollection.findByIdAndUpdate(
    userId,
    { $set: { [providerPath]: providerId, ...extras } },
    { new: true },
  );
};

const createUserFromProvider = async ({
  name,
  email,
  picture,
  provider, // 'google' | 'meta'
  providerId,
  username,
}) => {
  const authProviders = { google: {}, x: {}, meta: {} };
  if (provider === "google") authProviders.google.sub = providerId;
  if (provider === "x") authProviders.x.id = providerId;
  if (provider === "meta") authProviders.meta.id = providerId;

  // Nice-to-have provider fields
  if (provider === "x" && username) authProviders.x.username = username;
  if (provider === "meta" && name) authProviders.meta.name = name;

  return await userCollection.create({
    name: name || username || "New User",
    email: email || undefined,
    picture: picture || "",
    authProviders,
    roles: ["customer"],
  });
};

module.exports = {
  getUsers,
  getMyUser,
  getUser,
  updateUser,
  deleteUser,
  createUser,
  checkAdmin,

  findUserByEmail,
  findUserByProvider,
  linkProviderToUser,
  createUserFromProvider,
};
