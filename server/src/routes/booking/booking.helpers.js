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

function getBookingsParser(params){
  let { start, end, barberId, clientId } = params
  start = start ? new Date(start) : null
  end = end ? new Date(end) : null

  let query = {};
  if (barberId) query.barber = barberId;
  if (clientId) query.customer = clientId;

  query.startTime =
    start && !end ? { $gt: start } :
    !start && end ? { $lte: end } :
    start && end  ? { $gte: start, $lte: end } :
    undefined;

  return query
}

module.exports = {
  buildBookingBody,
  getBookingsParser
};
