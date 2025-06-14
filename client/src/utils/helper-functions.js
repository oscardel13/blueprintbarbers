import moment from "moment";

export function formatTime(hourString) {
  hourString = hourString.slice(-5);
  let [hour, minute] = hourString.split(":").map(Number);

  // Normalize minutes if greater than or equal to 60
  if (minute >= 60) {
    const extraHours = Math.floor(minute / 60);
    minute = minute % 60; // Remainder becomes the new minutes
    hour += extraHours;
  }

  // Adjust for 24-hour to 12-hour format
  const period = hour >= 12 ? "PM" : "AM";
  const hour12 = hour % 12 || 12; // Converts 0 or 12 to 12, 13-23 to 1-11

  // Format the hours and minutes to always have two digits
  return `${hour12.toString().padStart(2, "0")}:${minute
    .toString()
    .padStart(2, "0")} ${period}`;
}

export function formatPhoneNumber(phoneNumber) {
  const cleaned = phoneNumber.replace(/\D/g, "");
  const match = cleaned.match(/^(\d{3})(\d{3})(\d{4})$/);
  if (match) {
    return `(${match[1]}) ${match[2]}-${match[3]}`;
  }
  return null;
}

export function generateGoogleMapsLink(address) {
  const encodedAddress = encodeURIComponent(address);
  return `https://www.google.com/maps/search/?api=1&query=${encodedAddress}`;
}

export function generateAppleMapsLink(address) {
  const encodedAddress = encodeURIComponent(address);
  return `https://maps.apple.com/?q=${encodedAddress}`;
}

//function that converts string that has \n and makes new lines that html can read also if they are 2 \n add empty line
export function convertStringToHTML(string) {
  const lines = string.split("\n");
  const htmlLines = lines.map((line, index) => {
    if (line === "") {
      return <br key={index} />;
    }
    return (
      <p key={index} className="text-left">
        {line}
      </p>
    );
  });
  return htmlLines;
}

export function durationToMinutes(duration) {
  if (duration < 60) {
    return `${duration}min`;
  } else if (duration % 60 === 0) {
    return `${duration / 60}h`;
  } else {
    return `${Math.floor(duration / 60)}h ${duration % 60}min`;
  }
}

export const daysOfTheWeek = [
  "sunday",
  "monday",
  "tuesday",
  "wednesday",
  "thursday",
  "friday",
  "saturday",
];

export function createBooking_Start_End_Time(time, service) {
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
