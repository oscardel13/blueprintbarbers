const mongoose = require("mongoose");
const { Schema } = mongoose;

const ActorSchema = new Schema(
  {
    type: {
      type: String,
      enum: ["customer", "barber", "system"],
      default: "system",
    },
    userId: { type: Schema.Types.ObjectId, ref: "user", default: null },
    name: { type: String, default: "" },
    picture: { type: String, default: "" },
  },
  { _id: false },
);

const EntitySnapshotSchema = new Schema(
  {
    id: { type: Schema.Types.ObjectId, default: null }, // barberId or userId depending
    name: { type: String, default: "" },
    picture: { type: String, default: "" },
  },
  { _id: false },
);

const NotificationSchema = new Schema(
  {
    // Who sees this notification
    userId: {
      type: Schema.Types.ObjectId,
      ref: "user",
      required: true,
      index: true,
    },

    // What kind of notification
    type: {
      type: String,
      required: true,
      enum: [
        "booking_created",
        "booking_requested",
        "booking_confirmed",
        "booking_canceled",
        "booking_updated",
      ],
      index: true,
    },

    // Minimal title/body for in-app display
    title: { type: String, default: "" },
    body: { type: String, default: "" },

    // Deep link
    link: { type: String, default: "" },

    // Related entities (ids for filtering / joins if needed)
    barberId: {
      type: Schema.Types.ObjectId,
      ref: "barber",
      default: null,
      index: true,
    },
    bookingId: {
      type: Schema.Types.ObjectId,
      ref: "booking",
      default: null,
      index: true,
    },
    customerId: { type: Schema.Types.ObjectId, ref: "user", default: null },

    // Actor snapshot (for “{Name} did X”)
    actor: { type: ActorSchema, default: () => ({}) },

    // Optional snapshots for UI (so no lookups needed)
    entities: {
      barber: { type: EntitySnapshotSchema, default: () => ({}) },
      customer: { type: EntitySnapshotSchema, default: () => ({}) },
    },

    // Read/archived state
    readAt: { type: Date, default: null, index: true },
    archivedAt: { type: Date, default: null, index: true },

    // Flexible extras (keep small)
    meta: { type: Schema.Types.Mixed, default: {} },

    // Prevent duplicates from events
    dedupeKey: { type: String, default: "", index: true },
  },
  { timestamps: true },
);

// Fast “my inbox” queries
NotificationSchema.index({ userId: 1, readAt: 1, createdAt: -1 });
NotificationSchema.index({ userId: 1, archivedAt: 1, createdAt: -1 });

// Dedupe: only enforce uniqueness when dedupeKey is present
NotificationSchema.index(
  { userId: 1, dedupeKey: 1 },
  {
    unique: true,
    partialFilterExpression: { dedupeKey: { $type: "string", $ne: "" } },
  },
);

module.exports = {
  notificationSchema: NotificationSchema,
  notificationCollection: mongoose.model("notification", NotificationSchema),
};
