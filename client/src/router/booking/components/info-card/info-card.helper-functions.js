export function formatTime(hourString) {
  const [hour, minute] = hourString.split(":").map(Number);
  const period = hour >= 12 ? "PM" : "AM";
  const hour12 = hour % 12 || 12; // Converts 0 or 12 to 12, 13-23 to 1-11
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

export const daysOfTheWeek = [
  "sunday",
  "monday",
  "tuesday",
  "wednesday",
  "thursday",
  "friday",
  "saturday",
];
