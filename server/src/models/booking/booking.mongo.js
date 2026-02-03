const mongoose = require("mongoose");

// maybe add data from customer, barber, service that will be used even if it repeats
const BookingSchema = new mongoose.Schema(
  {
    customer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },
    barber: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "barber",
      required: true,
    },
    service: {
      _id: { type: mongoose.Schema.Types.ObjectId, required: true },
      name: { type: String, required: true },
      description: { type: String, default: "" },
      price: { type: Number, required: true },
      duration: { type: Number, required: true },
    },
    startTime: {
      type: Date, // Start time of the booking
      required: true,
    },
    endTime: {
      type: Date, // End time of the booking
      required: true,
    },
    timezone: { type: String, default: "America/Denver" },
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
        coordinates: { type: [Number], default: undefined }, // [lng, lat]
      },
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
  },
  { timestamps: true },
);

BookingSchema.index({ customer: 1, startTime: -1 });
BookingSchema.index({ barber: 1, startTime: -1 });
BookingSchema.index({ barber: 1, status: 1, startTime: -1 });

module.exports = {
  bookingCollection: mongoose.model("booking", BookingSchema),
  bookingSchema: BookingSchema,
};
