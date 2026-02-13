// models/booking/booking.reschedule.js
const mongoose = require("mongoose");
const { bookingCollection } = require("./booking.mongo");

/**
 * Helper: ensure valid ObjectId
 */
function toObjectId(id, name = "id") {
  if (!mongoose.Types.ObjectId.isValid(String(id))) {
    throw new Error(`Invalid ${name}`);
  }
  return new mongoose.Types.ObjectId(id);
}

/**
 * Helper: actor normalization
 * actor: { type: 'customer'|'barber'|'system', userId/_id, name, picture }
 */
function normalizeActor(actor) {
  return {
    type: actor?.type || "system",
    userId: actor?._id || actor?.userId || null,
    name: actor?.name || "",
    picture: actor?.picture || "",
  };
}

/**
 * Optional safety check: don't allow reschedule if booking already terminal
 */
function assertReschedulable(booking) {
  if (!booking) throw new Error("Booking not found");
  if (["canceled", "finished", "no-show"].includes(booking.status)) {
    throw new Error(`Cannot reschedule a ${booking.status} booking`);
  }
}

/**
 * requestReschedule
 * - Immediately moves booking to the new time (holds only one slot)
 * - Stores previous time in booking.reschedule
 * - Sets actionRequiredBy to the other party
 *
 * @param {string|ObjectId} bookingId
 * @param {{startTime: Date, endTime: Date}} nextTimes
 * @param {{type: string, userId?: any, _id?: any}} actor
 */
async function requestReschedule(bookingId, nextTimes, actor) {
  const _id = toObjectId(bookingId, "bookingId");
  const a = normalizeActor(actor);

  if (!nextTimes?.startTime || !nextTimes?.endTime) {
    throw new Error("Missing next startTime/endTime");
  }

  // Load current booking first (so we can snapshot previous times)
  const existing = await bookingCollection.findById(_id);
  assertReschedulable(existing);

  // If a reschedule is already pending, you can either:
  // - overwrite it (simple), or
  // - reject (stricter)
  // We'll overwrite (simple MVP).
  const actionRequiredBy =
    a.type === "customer" ? "barber" : a.type === "barber" ? "customer" : null;

  const update = {
    startTime: nextTimes.startTime,
    endTime: nextTimes.endTime,
    actionRequiredBy,
    reschedule: {
      state: "pending",
      previousStartTime: existing.startTime,
      previousEndTime: existing.endTime,
      requestedBy: a.type,
      requestedByUserId: a.userId,
      requestedAt: new Date(),
    },
    lastAction: {
      type: "reschedule_requested",
      by: a.type,
      byUserId: a.userId,
      at: new Date(),
    },
  };

  const updated = await bookingCollection.findOneAndUpdate(
    { _id },
    { $set: update },
    { returnDocument: "after" },
  );

  return updated;
}

/**
 * acceptReschedule
 * - Clears reschedule + actionRequiredBy
 * - Keeps current startTime/endTime
 */
async function acceptReschedule(bookingId, actor) {
  const _id = toObjectId(bookingId, "bookingId");
  const a = normalizeActor(actor);

  const existing = await bookingCollection.findById(_id);
  assertReschedulable(existing);

  if (!existing.reschedule || existing.reschedule.state !== "pending") {
    throw new Error("No pending reschedule to accept");
  }

  const updated = await bookingCollection.findOneAndUpdate(
    { _id, "reschedule.state": "pending" },
    {
      $set: {
        actionRequiredBy: null,
        lastAction: {
          type: "reschedule_accepted",
          by: a.type,
          byUserId: a.userId,
          at: new Date(),
        },
      },
      $unset: { reschedule: "" },
    },
    { returnDocument: "after" },
  );

  return updated;
}

/**
 * denyReschedule
 * - Reverts startTime/endTime to previousStartTime/previousEndTime
 * - Clears reschedule + actionRequiredBy
 *
 * IMPORTANT: if old slot got booked meanwhile, you'll decide later whether:
 * - deny should fail, or
 * - deny should cancel, or
 * - deny should keep new time anyway.
 * For now, this always reverts.
 */
async function denyReschedule(bookingId, actor) {
  const _id = toObjectId(bookingId, "bookingId");
  const a = normalizeActor(actor);

  const existing = await bookingCollection.findById(_id);
  assertReschedulable(existing);

  if (!existing.reschedule || existing.reschedule.state !== "pending") {
    throw new Error("No pending reschedule to deny");
  }

  const prevStart = existing.reschedule.previousStartTime;
  const prevEnd = existing.reschedule.previousEndTime;

  const updated = await bookingCollection.findOneAndUpdate(
    { _id, "reschedule.state": "pending" },
    {
      $set: {
        startTime: prevStart,
        endTime: prevEnd,
        actionRequiredBy: null,
        lastAction: {
          type: "reschedule_denied",
          by: a.type,
          byUserId: a.userId,
          at: new Date(),
        },
      },
      $unset: { reschedule: "" },
    },
    { returnDocument: "after" },
  );

  return updated;
}

module.exports = {
  requestReschedule,
  acceptReschedule,
  denyReschedule,
};
