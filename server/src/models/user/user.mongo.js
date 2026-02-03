const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const itemSchema = new Schema(
  {
    product: { type: String, required: true },
    item: { type: String, required: true },
  },
  { _id: false },
);

const userSchema = new Schema(
  {
    name: { type: String, required: true },

    // If you truly always require email, remove sparse and keep required.
    // Keeping sparse makes it compatible with providers that don't always provide email.
    email: { type: String, unique: true, sparse: true, default: undefined },

    picture: { type: String, default: "" },

    // Multi-provider login identities (one account, multiple providers)
    authProviders: {
      google: {
        sub: { type: String, default: undefined }, // Google "sub"
      },
      x: {
        id: { type: String, default: undefined }, // X user id
        username: { type: String, default: "" },
      },
      meta: {
        id: { type: String, default: undefined }, // Meta/Facebook user id
        name: { type: String, default: "" },
      },
    },

    roles: { type: [String], default: ["customer"] },

    barberId: { type: mongoose.Schema.Types.ObjectId, ref: "barber" },

    items: { type: [itemSchema], default: [] },

    phone: { type: String, default: "" },

    address: { type: String, default: "" }, // can be structured later

    // Rename to avoid confusion with authProviders.meta (Meta login)
    appMeta: { type: Schema.Types.Mixed, default: {} },
  },
  { timestamps: true },
);

// Provider uniqueness (account linking safe)
// NOTE: partialFilterExpression prevents uniqueness errors when field is missing

userSchema.index(
  { "authProviders.google.sub": 1 },
  {
    unique: true,
    partialFilterExpression: {
      "authProviders.google.sub": { $type: "string" },
    },
  },
);

userSchema.index(
  { "authProviders.x.id": 1 },
  {
    unique: true,
    partialFilterExpression: {
      "authProviders.x.id": { $type: "string" },
    },
  },
);

userSchema.index(
  { "authProviders.meta.id": 1 },
  {
    unique: true,
    partialFilterExpression: {
      "authProviders.meta.id": { $type: "string" },
    },
  },
);

module.exports = {
  userSchema,
  userCollection: mongoose.model("user", userSchema),
};
