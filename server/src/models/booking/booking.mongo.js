const mongoose = require("mongoose");

// maybe add data from customer, barber, service that will be used even if it repeats
const BookingSchema = new mongoose.Schema({
  customerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user", // Assuming you have a User model to reference the customer
    required: true,
  },
  barberId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "barber", // Assuming you have a Barber model to reference the barber
    required: true,
  },
  serviceId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "service", // Assuming you have a Service model to reference the service
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
    enum: ["confirmed", "pending", "canceled", "no-show"],
    default: "confirmed",
  },
  notes: {
    type: String, // Additional notes for the booking
    default: "",
  },
});

module.exports = mongoose.model("booking", BookingSchema);
