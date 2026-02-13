// models/notification/notifications.handlers.js
const {
  createNotification,
} = require("../../models/notification/notification.data");

function safeActor(payload) {
  return payload.actor && typeof payload.actor === "object"
    ? payload.actor
    : { type: "system", userId: null, name: "", picture: "" };
}

function buildEntities(payload) {
  return {
    barber: {
      id: payload.barberId || null,
      name: payload.barber?.displayName || "",
      picture: payload.barber?.picture || "",
    },
    customer: {
      id: payload.customerUserId || null,
      name: payload.customer?.name || payload.actor?.name || "",
      picture: payload.customer?.picture || payload.actor?.picture || "",
    },
  };
}

function dedupeByType(type, bookingId, audience) {
  return `${type}:${bookingId}:${audience}`;
}

// ---- EXISTING ----

async function onBookingCreatedNotify(payload) {
  const actor = safeActor(payload);
  const entities = buildEntities(payload);

  await createNotification({
    userId: payload.barberOwnerUserId,
    type: "booking_created",
    title: "New booking",
    body: actor?.name
      ? `${actor.name} requested a booking.`
      : "You have a new booking request.",
    link: `/barber-dashboard/bookings/${payload.bookingId}`,
    bookingId: payload.bookingId,
    barberId: payload.barberId,
    customerId: payload.customerUserId,
    actor,
    entities,
    dedupeKey: dedupeByType("booking_created", payload.bookingId, "barber"),
  });

  await createNotification({
    userId: payload.customerUserId,
    type: "booking_created",
    title: "Booking created",
    body: payload.barber?.displayName
      ? `Your booking with ${payload.barber.displayName} was created.`
      : "Your booking was created.",
    link: `/account/appointments/${payload.bookingId}`,
    bookingId: payload.bookingId,
    barberId: payload.barberId,
    customerId: payload.customerUserId,
    actor,
    entities,
    dedupeKey: dedupeByType("booking_created", payload.bookingId, "customer"),
  });
}

async function onBookingUpdatedNotify(payload) {
  const actor = safeActor(payload);
  const entities = buildEntities(payload);

  const actorLabel =
    actor.type === "barber"
      ? "The barber"
      : actor.type === "customer"
        ? "The client"
        : "Someone";

  // Notify barber owner
  await createNotification({
    userId: payload.barberOwnerUserId,
    type: "booking_updated",
    title: "Booking updated",
    body: actor.name
      ? `${actor.name} updated a booking.`
      : `${actorLabel} updated a booking.`,
    link: `/barber-dashboard/bookings/${payload.bookingId}`,
    bookingId: payload.bookingId,
    barberId: payload.barberId,
    customerId: payload.customerUserId,
    actor,
    entities,
    dedupeKey: dedupeByType("booking_updated", payload.bookingId, "barber"),
  });

  // Notify customer
  await createNotification({
    userId: payload.customerUserId,
    type: "booking_updated",
    title: "Booking updated",
    body: actor.name
      ? `${actor.name} updated your booking.`
      : "Your booking was updated.",
    link: `/account/appointments/${payload.bookingId}`,
    bookingId: payload.bookingId,
    barberId: payload.barberId,
    customerId: payload.customerUserId,
    actor,
    entities,
    dedupeKey: dedupeByType("booking_updated", payload.bookingId, "customer"),
  });
}

async function onBookingCanceledNotify(payload) {
  const actor = safeActor(payload);
  const entities = buildEntities(payload);

  // Copy depends on who canceled
  const canceledBy =
    actor.type === "barber"
      ? "The barber canceled this booking."
      : actor.type === "customer"
        ? "The client canceled this booking."
        : "This booking was canceled.";

  // Notify barber owner
  await createNotification({
    userId: payload.barberOwnerUserId,
    type: "booking_canceled",
    title: "Booking canceled",
    body: actor.name ? `${actor.name} canceled a booking.` : canceledBy,
    link: `/barber-dashboard/bookings/${payload.bookingId}`,
    bookingId: payload.bookingId,
    barberId: payload.barberId,
    customerId: payload.customerUserId,
    actor,
    entities,
    dedupeKey: dedupeByType("booking_canceled", payload.bookingId, "barber"),
  });

  // Notify customer
  await createNotification({
    userId: payload.customerUserId,
    type: "booking_canceled",
    title: "Booking canceled",
    body: actor.name
      ? `${actor.name} canceled your booking.`
      : "Your booking was canceled.",
    link: `/account/appointments/${payload.bookingId}`,
    bookingId: payload.bookingId,
    barberId: payload.barberId,
    customerId: payload.customerUserId,
    actor,
    entities,
    dedupeKey: dedupeByType("booking_canceled", payload.bookingId, "customer"),
  });
}

async function onBookingConfirmedNotify(payload) {
  const actor = safeActor(payload);
  const entities = buildEntities(payload);

  // Usually barber confirms, but keep generic in case customer confirms in future
  const whoConfirmed =
    actor.type === "barber"
      ? "Booking confirmed"
      : actor.type === "customer"
        ? "Booking confirmed"
        : "Booking confirmed";

  // Notify barber owner
  await createNotification({
    userId: payload.barberOwnerUserId,
    type: "booking_confirmed",
    title: whoConfirmed,
    body: actor.name
      ? `${actor.name} confirmed a booking.`
      : "A booking was confirmed.",
    link: `/barber-dashboard/bookings/${payload.bookingId}`,
    bookingId: payload.bookingId,
    barberId: payload.barberId,
    customerId: payload.customerUserId,
    actor,
    entities,
    dedupeKey: dedupeByType("booking_confirmed", payload.bookingId, "barber"),
  });

  // Notify customer
  await createNotification({
    userId: payload.customerUserId,
    type: "booking_confirmed",
    title: "Booking confirmed",
    body: entities.barber?.name
      ? `${entities.barber.name} confirmed your booking.`
      : "Your booking was confirmed.",
    link: `/account/appointments/${payload.bookingId}`,
    bookingId: payload.bookingId,
    barberId: payload.barberId,
    customerId: payload.customerUserId,
    actor,
    entities,
    dedupeKey: dedupeByType("booking_confirmed", payload.bookingId, "customer"),
  });
}

// ---- RESCHEDULE FLOW (FUTURE) ----

async function onBookingRescheduleRequestedNotify(payload) {
  // TODO: implement reschedule requested notifications
}

async function onBookingRescheduleAcceptedNotify(payload) {
  // TODO: implement reschedule accepted notifications
}

async function onBookingRescheduleDeniedNotify(payload) {
  // TODO: implement reschedule denied notifications
}

module.exports = {
  onBookingCreatedNotify,
  onBookingUpdatedNotify,
  onBookingCanceledNotify,
  onBookingConfirmedNotify,
  onBookingRescheduleRequestedNotify,
  onBookingRescheduleAcceptedNotify,
  onBookingRescheduleDeniedNotify,
};
