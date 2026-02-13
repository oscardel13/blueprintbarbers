const mongoose = require("mongoose");
const { Schema } = mongoose;

const HoursWindowSchema = new Schema(
  {
    start: { type: String, required: true }, // "09:00"
    end: { type: String, required: true }, // "17:00"
  },
  { _id: false },
);

const BarberSchema = new Schema(
  {
    // Ownership / single-login link
    ownerUserId: {
      type: Schema.Types.ObjectId,
      ref: "user",
      required: true,
      unique: true,
      index: true,
    },

    // Public profile
    displayName: { type: String, required: true }, // not unique
    nickname: { type: String, default: "" },
    slug: { type: String, unique: true, sparse: true, index: true },

    picture: { type: String, default: "" },
    about: { type: String, default: "" },

    contact: {
      email: { type: String, default: "" }, // not unique
      phone: { type: String, default: "" },
      instagramUrl: { type: String, default: "" },
      booksyUrl: { type: String, default: "" },
    },

    // Location
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
        coordinates: { type: [Number], default: undefined }, // [lng, lat]
      },
      geocode: {
        provider: {
          type: String,
          enum: ["mapbox", "google"],
          default: "mapbox",
        },
        placeId: { type: String, default: "" }, // Google place_id (optional)
        featureId: { type: String, default: "" }, // Mapbox feature id (optional)
        precision: { type: String, default: "" }, // "rooftop" | "street" | etc. (optional)
        geocodedAt: { type: Date, default: null },
      },
    },

    timeZone: { type: String, default: "America/Denver" },

    // Gallery (phase 1)
    gallery: { type: [String], default: [] },

    // Hours (phase 1 — structured windows)
    hours: {
      sunday: { type: [HoursWindowSchema], default: [] },
      monday: { type: [HoursWindowSchema], default: [] },
      tuesday: { type: [HoursWindowSchema], default: [] },
      wednesday: { type: [HoursWindowSchema], default: [] },
      thursday: { type: [HoursWindowSchema], default: [] },
      friday: { type: [HoursWindowSchema], default: [] },
      saturday: { type: [HoursWindowSchema], default: [] },
    },

    // Services (phase 1 — embedded)
    services: [
      {
        name: { type: String, required: true },
        description: { type: String, default: "" },
        images: { type: [String], default: [] },
        price: { type: Number, required: true }, // consider cents later
        duration: { type: Number, required: true }, // minutes
        isActive: { type: Boolean, default: true },
      },
    ],
    clients: [
      {
        type: Schema.Types.ObjectId,
        ref: "user",
        index: true,
      },
    ],

    // Aggregated reviews only (details should move to reviews collection later)
    reviews: {
      averageRating: { type: Number, default: 0 },
      totalReviews: { type: Number, default: 0 },
    },

    // Settings / policies (your requested stuff)
    settings: {
      bookingPolicy: {
        type: String,
        enum: ["instant", "request"],
        default: "instant",
      },

      cancellation: {
        // e.g. customer must cancel >= X hours before start
        windowHours: { type: Number, default: 24 },
        allowCustomerCancel: { type: Boolean, default: true },
        allowCustomerReschedule: { type: Boolean, default: true },
      },

      latePolicy: {
        graceMinutes: { type: Number, default: 10 },
        autoCancelAfterMinutes: { type: Number, default: 15 }, // optional
        noShowFeeCents: { type: Number, default: 0 }, // optional
      },

      notifications: {
        email: {
          bookingRequested: { type: Boolean, default: true },
          bookingAccepted: { type: Boolean, default: true },
          bookingCanceled: { type: Boolean, default: true },
          dailySummary: { type: Boolean, default: false },
        },
        sms: {
          bookingRequested: { type: Boolean, default: false },
          bookingAccepted: { type: Boolean, default: false },
          bookingCanceled: { type: Boolean, default: false },
        },
        push: {
          bookingRequested: { type: Boolean, default: true },
          bookingAccepted: { type: Boolean, default: true },
          bookingCanceled: { type: Boolean, default: true },
        },
      },

      security: {
        // If barber wants to require approval even in instant mode (future use)
        requireManualApproval: { type: Boolean, default: false },

        // Optional: restrict who can request (future)
        allowNewClients: { type: Boolean, default: true },

        // Optional: anti-spam throttling knobs (future)
        maxActiveRequestsPerCustomer: { type: Number, default: 3 },
      },
    },

    // Optional: status/onboarding
    status: {
      type: String,
      enum: ["draft", "active", "suspended"],
      default: "draft",
      index: true,
    },
  },
  { timestamps: true },
);

// Geo index for search
BarberSchema.index({ "address.location": "2dsphere" });

module.exports = mongoose.model("barber", BarberSchema);
