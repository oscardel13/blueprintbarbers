const moment = require("moment-timezone");

function createBookingDateTime(time, service) {
  // Combine date and time into a single string
  // Parse and convert to MST
  const startTime = moment(time, "YYYY-MM-DD HH:mm");
  // Ensure the date is valid
  if (!startTime.isValid()) {
    throw new Error("Invalid date or time provided.");
  }

  // Calculate endTime by adding the service duration (in minutes) to startTime
  const duration = service.duration; // Duration is in minutes
  const endTime = startTime.clone().add(duration, "minutes");

  return {
    startTime: startTime.toDate(), // Convert to a native JavaScript Date object
    endTime: endTime.toDate(), // Convert to a native JavaScript Date object
  };
}

/*
  const bookings = [
    { start: "09:00", end: "09:45", name: "John Doe", service: "Haircut" },
    { start: "09:45", end: "10:30", name: "Doe John", service: "Haircut" },
    { start: "14:00", end: "15:00", name: "Billie Green", service: "Haircut" },
    { start: "11:30", end: "12:30", name: "Alex Brown", service: "Shave" },
  ];
*/
function simplifiedBookings(bookings){
  const formatted = bookings.map((b) => {
    return {
    _id: b._id,
    start: b.startTime.toISOString().substring(11, 16), // "HH:mm"
    end: b.endTime.toISOString().substring(11, 16),
    name: b.customer.name,
    service: b.service.name,
  }});
  return formatted
}

module.exports = { createBookingDateTime, simplifiedBookings };
