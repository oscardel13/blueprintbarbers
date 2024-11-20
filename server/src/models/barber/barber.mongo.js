const mongoose = require("mongoose");
const bookingSchema = require("../booking/booking.mongo");

const ReviewSchema = new mongoose.Schema({
  user: { type: String, required: true }, // Reference to user
  rating: { type: Number, required: true, min: 1, max: 5 },
  comment: { type: String, default: "" },
  date: { type: Date, default: Date.now },
});

const BarberSchema = new mongoose.Schema({
  barbershopId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "barbershop",
  },
  name: { type: String, required: true },
  email: { type: String, required: true },
  gid: { type: String, required: true },
  nickname: { type: String, default: "" },
  picture: { type: String, default: "" },
  address: { type: String, default: "" },
  phone: { type: String, default: "" },
  about: { type: String, default: "" },
  instagramUrl: { type: String, default: "" },
  booksyUrl: { type: String },
  images: { type: [String], default: [] },
  createdAt: {
    type: Date,
    default: Date.now,
  },
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
  twoWeeksBooking: { type: [], default: [] }, // Array of strings
  availability: { type: [], default: [] }, // Array of strings
});

module.exports = mongoose.model("barber", BarberSchema);
