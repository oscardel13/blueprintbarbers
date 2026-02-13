const mongoose = require("mongoose");
const { Schema } = mongoose;

const RescheduleSchema = new Schema(
  {
    state: {
      type: String,
      enum: ["pending", "accepted", "denied"],
      default: "pending",
      index: true,
    },

    // what we reverted FROM (so deny can roll back)
    previousStartTime: { type: Date, required: true },
    previousEndTime: { type: Date, required: true },

    requestedBy: {
      type: String,
      enum: ["barber", "customer", "system"],
      required: true,
    },
    requestedByUserId: {
      type: Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },

    requestedAt: { type: Date, default: Date.now },

    // optional note/message
    message: { type: String, default: "" },
  },
  { _id: false },
);

const LastActionSchema = new Schema(
  {
    type: {
      type: String,
      enum: [
        "created",
        "updated",
        "confirmed",
        "canceled",
        "reschedule_requested",
        "reschedule_accepted",
        "reschedule_denied",
        "finished",
        "no_show",
      ],
      default: "created",
    },
    by: {
      type: String,
      enum: ["barber", "customer", "system"],
      default: "system",
    },
    byUserId: { type: Schema.Types.ObjectId, ref: "user", default: null },
    at: { type: Date, default: Date.now },
  },
  { _id: false },
);

const BookingSchema = new mongoose.Schema(
  {
    customer: { type: Schema.Types.ObjectId, ref: "user", required: true },
    barber: { type: Schema.Types.ObjectId, ref: "barber", required: true },

    service: {
      _id: { type: Schema.Types.ObjectId, required: true },
      name: { type: String, required: true },
      description: { type: String, default: "" },
      price: { type: Number, required: true },
      duration: { type: Number, required: true },
    },

    // ✅ current held time slot
    startTime: { type: Date, required: true },
    endTime: { type: Date, required: true },

    timezone: { type: String, default: "America/Denver" },

    address: {
      street1: { type: String, default: "" },
      street2: { type: String, default: "" },
      city: { type: String, default: "" },
      state: { type: String, default: "" },
      zip: { type: String, default: "" },
      country: { type: String, default: "USA" },
      formatted: { type: String, default: "" },
      location: {
        type: { type: String, enum: ["Point"], default: "Point" },
        coordinates: { type: [Number], default: undefined },
      },
    },

    status: {
      type: String,
      enum: ["finished", "confirmed", "pending", "canceled", "no-show"],
      default: "pending",
      index: true,
    },

    // ✅ who must respond to the reschedule (or other approvals)
    actionRequiredBy: {
      type: String,
      enum: ["barber", "customer", null],
      default: null,
      index: true,
    },

    // ✅ if present, booking is in a reschedule flow
    // startTime/endTime have ALREADY been updated to the new time
    reschedule: { type: RescheduleSchema, default: null },

    notes: { type: String, default: "" },

    lastAction: { type: LastActionSchema, default: () => ({}) },
  },
  { timestamps: true },
);

// Indexes
BookingSchema.index({ customer: 1, startTime: -1 });
BookingSchema.index({ barber: 1, startTime: -1 });
BookingSchema.index({ barber: 1, status: 1, startTime: -1 });

// Dashboard “needs action”
BookingSchema.index({
  barber: 1,
  actionRequiredBy: 1,
  status: 1,
  startTime: -1,
});
BookingSchema.index({
  customer: 1,
  actionRequiredBy: 1,
  status: 1,
  startTime: -1,
});

module.exports = {
  bookingCollection: mongoose.model("booking", BookingSchema),
  bookingSchema: BookingSchema,
};
