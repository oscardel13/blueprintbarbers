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

module.exports = { createBookingDateTime };
