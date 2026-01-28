const moment = require("moment");
const {
  getBarberById,
  updateBarber,
} = require("../../models/barber/barber.data");
const { getBookings } = require("../../models/booking/booking.data");

// TODO: make sure if booking is canceled it doesn't consider it.
async function calculateAvailability(futureBookings, hours) {
  // Helper function to generate 15-minute increment time slots within a time range
  const generateTimeSlots = (date, start, end) => {
    const slots = [];
    let current = date
      .clone()
      .set("hour", moment(start, "HH:mm").hour())
      .set("minute", moment(start, "HH:mm").minute());
    const endTime = date
      .clone()
      .set("hour", moment(end, "HH:mm").hour())
      .set("minute", moment(end, "HH:mm").minute());

    while (current.isBefore(endTime)) {
      // Format each slot to include both date and time
      slots.push(current.format("YYYY-MM-DD HH:mm"));
      current.add(15, "minutes");
    }
    return slots;
  };

  // Create an empty availability array for the next 14 days
  const startDate = moment().startOf("day"); // Start from today at midnight
  const availability = [];

  // Define the hours for each day and generate available slots
  for (let day = 0; day < 14; day++) {
    const date = startDate.clone().add(day, "days");
    const dayOfWeek = date.format("dddd").toLowerCase(); // Get the day of the week as lowercase string

    // Retrieve hours for the current day
    const dayHours = hours[dayOfWeek] || [];

    // Initialize an empty array for the slots of the current day
    let daySlots = [];

    // Generate the available slots based on the hours provided
    dayHours.forEach(([start, end]) => {
      daySlots = daySlots.concat(generateTimeSlots(date, start, end));
    });

    // Add the availability for this day
    availability.push({
      date: {
        month: date.format("MMMM"),
        day: date.date(),
        year: date.year(),
        dayOfWeek: date.format("dddd"),
      },
      slots: daySlots,
    });
  }

  // Convert bookings to intervals (local time for MST) and ensure they match the same day
  const bookedIntervals = futureBookings.map((booking) => {
    const bookingStart = moment(booking.startTime);
    const bookingEnd = moment(booking.endTime);
    return [bookingStart, bookingEnd];
  });

  // Remove booked slots from the availability
  availability.forEach((day) => {
    day.slots = day.slots.filter((slot) => {
      // Ensure slot and booking dates match (November 21, 2024 for example)
      const slotTime = moment(slot, "YYYY-MM-DD HH:mm");
      const slotDay = String(day.date.day).padStart(2, "0");
      return !bookedIntervals.some(([start, end]) => {
        const intervalStart = moment(start, "YYYY-MM-DD HH:mm");
        const intervalEnd = moment(end, "YYYY-MM-DD HH:mm");
        return (
          slotDay === intervalStart.format("DD") &&
          slotTime.isBetween(intervalStart, intervalEnd, null, "[)")
        );
      });
    });
  });
  return availability;
}

async function getBarberAvailability(barberId) {
  try {
    const barber = await getBarberById(barberId);

    const start = new Date();
    const futureBookings = await getBookings({
      barber: barberId,
      startTime: { $gt: start },
    });

    const availability = await calculateAvailability(
      futureBookings,
      barber.hours,
    );

    const simplifiedBarber = {
      _id: barber._id,
      name: barber.name,
      picture: barber.picture,
    };

    return { barber: simplifiedBarber, availability };
  } catch (err) {
    console.log("Error", err);
  }
}

module.exports = { getBarberAvailability };
