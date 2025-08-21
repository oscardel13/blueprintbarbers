const mongoose = require("mongoose");

// maybe add data from customer, barber, service that will be used even if it repeats
const BookingSchema = new mongoose.Schema({
  customer: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
        required: true
      },
  barber: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "barber",
        required: true
      },
  service: {
    type: {
      _id: { type: mongoose.Schema.Types.ObjectId, required: true },
      name: { type: String, required: true },
      description: { type: String, default: "" },
      price: { type: Number, required: true },
      duration: { type: Number, required: true }, // Duration in minutes
    },
    required: true,
  },
  startTime: {
    type: Date, // Start time of the booking
    required: true,
  },
  endTime: {
    type: Date, // End time of the booking
    required: true,
  },
  address: {
    type: String, // Address of the booking
    required: true,
  },
  status: {
    type: String,
    enum: ["finished", "confirmed", "pending", "canceled", "no-show"],
    default: "pending",
  },
  notes: {
    type: String, // Additional notes for the booking
    default: "",
  },
}, { timestamps: true });

module.exports = {
  bookingCollection: mongoose.model("booking", BookingSchema),
  bookingSchema: BookingSchema,
};
