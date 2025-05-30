const mongoose = require("mongoose");
// const barberSchema = require("../barber/barbers.mongo");

const BarbershopSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },
  profilePicture: {
    type: String,
    required: true,
  },
  images: {
    type: [String],
    required: true,
    default: [],
  },
  description: {
    type: String,
    required: true,
  },
  rating: {
    type: Number,
    required: true,
  },
  openingTime: {
    type: String,
    required: true,
  },
  closingTime: {
    type: String,
    required: true,
  },
  latitude: {
    type: Number,
    required: true,
  },
  longitude: {
    type: Number,
    required: true,
  },
  barbers: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "barber",
    },
  ],
}, { timestamps: true });

module.exports = mongoose.model("barbershop", BarbershopSchema);
