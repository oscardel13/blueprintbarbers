const mongoose = require("mongoose");
const { bookingSchema } = require("../booking/booking.mongo");
const { userSchema } = require("../user/user.mongo");

const ReviewSchema = new mongoose.Schema({
  user: { type: String, required: true }, // Reference to user
  rating: { type: Number, required: true, min: 1, max: 5 },
  comment: { type: String, default: "" },
  date: { type: Date, default: Date.now },
});

const BarberSchema = new mongoose.Schema(
  {
    barbershopId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "barbershop",
    },
    name: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    gid: { type: String, required: true },
    nickname: { type: String, default: "" },
    barbershop: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "barbershop",
    },
    picture: { type: String, default: "" },
    address: {
      street1: { type: String, default: "" },
      street2: { type: String, default: "" },
      city: { type: String, default: "" },
      state: { type: String, default: "" },
      zip: { type: String, default: "" },
      country: { type: String, default: "USA" },

      formatted: { type: String, default: "" }, // "123 Main St, Denver, CO 80202"
      location: {
        type: { type: String, enum: ["Point"], default: "Point" },
        coordinates: { type: [Number] }, // [lng, lat]
      },
    },
    phone: { type: String, default: "" },
    about: { type: String, default: "" },
    instagramUrl: { type: String, default: "" },
    booksyUrl: { type: String },
    images: { type: [String], default: [] },
    hours: {
      sunday: { type: [[String]], default: [] },
      monday: { type: [[String]], default: [] },
      tuesday: { type: [[String]], default: [] },
      wednesday: { type: [[String]], default: [] },
      thursday: { type: [[String]], default: [] },
      friday: { type: [[String]], default: [] },
      saturday: { type: [[String]], default: [] },
    },
    services: [
      {
        name: { type: String, required: true },
        description: { type: String, default: "" },
        images: { type: [String], default: [] },
        price: { type: Number, required: true },
        duration: { type: Number, required: true }, // Duration in minutes
      },
    ],
    reviews: {
      details: { type: [ReviewSchema], default: [] }, // Array of individual reviews
      averageRating: { type: Number, default: 0 }, // Store pre-calculated average
      totalReviews: { type: Number, default: 0 }, // Store total number of reviews
    },
    availability: {
      type: [
        {
          date: {
            type: {
              year: { type: Number, required: true },
              month: { type: String, required: true },
              day: { type: Number, required: true },
              dayOfWeek: { type: String, required: true },
            },
            required: true,
          },
          slots: { type: [String], required: true },
        },
      ],
      default: [],
    }, // Array of strings
    clients: { type: [userSchema], default: [] }, // Array of client IDs
  },
  { timestamps: true },
);

module.exports = mongoose.model("barber", BarberSchema);
