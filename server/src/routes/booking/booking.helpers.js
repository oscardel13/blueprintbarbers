function buildBookingBody({
  customer,
  barber,
  service,
  startTime,
  endTime,
  notes = "",
}) {
  return {
    customer: customer._id,
    barber: barber._id,
    service: {
      _id: service._id,
      name: service.name,
      description: service.description || "",
      price: service.price,
      duration: service.duration,
    },
    startTime,
    endTime,
    address: barber.address,
    notes,
  };
}

function getBookingsParser(params) {
  let { start, end, barberId, clientId } = params;
  start = start ? new Date(start) : null;
  end = end ? new Date(end) : null;

  let query = {};
  if (barberId) query.barber = barberId;
  if (clientId) query.customer = clientId;

  if (start || end)
    query.startTime = !end
      ? { $gt: start }
      : !start
        ? { $lte: end }
        : { $gte: start, $lte: end };

  let sortDir =
    start && !end
      ? 1 // future → ascending
      : !start && end
        ? -1 // past → descending
        : 1; // default ascending

  return { query, sortDir };
}

function inferActor({ bookingCustomerId, barberOwnerUserId, reqUser }) {
  if (!reqUser?._id)
    return { type: "system", userId: null, name: "", picture: "" };

  const reqUserId = String(reqUser._id);

  if (bookingCustomerId && reqUserId === String(bookingCustomerId)) {
    return {
      type: "customer",
      userId: reqUser._id,
      name: reqUser.name || "",
      picture: reqUser.picture || "",
    };
  }

  if (barberOwnerUserId && reqUserId === String(barberOwnerUserId)) {
    return {
      type: "barber",
      userId: reqUser._id,
      name: reqUser.name || "",
      picture: reqUser.picture || "",
    };
  }

  // if authorized but not matching either (admin/support)
  return {
    type: "system",
    userId: reqUser._id,
    name: reqUser.name || "",
    picture: reqUser.picture || "",
  };
}

async function buildBookingEventPayload(
  booking,
  eventName, // "booking.created" | "booking.updated" | ...
  barberOwnerUserId,
  reqUser, // optional
  actor, // optional override
  barberSnapshot, // optional
  customerSnapshot, // optional
) {
  console.log("Building booking event payload with booking:", booking);
  const barberId = booking.barber?._id || booking.barber;
  const customerId = booking.customer?._id || booking.customer;

  const finalActor =
    actor ||
    inferActor({
      bookingCustomerId: customerId,
      barberOwnerUserId,
      reqUser,
    });

  return {
    eventId: `${eventName}:${booking._id}`,
    occurredAt: new Date().toISOString(),

    bookingId: booking._id,
    status: booking.status,
    startTime: booking.startTime,
    endTime: booking.endTime,

    barberId,
    barberOwnerUserId,
    customerUserId: customerId,

    actor: finalActor,

    // optional snapshots for notifications/UI
    barber: barberSnapshot || undefined,
    customer: customerSnapshot || undefined,

    service: {
      name: booking.service?.name,
      price: booking.service?.price,
      duration: booking.service?.duration,
    },
  };
}

module.exports = {
  buildBookingBody,
  getBookingsParser,
  buildBookingEventPayload,
};
