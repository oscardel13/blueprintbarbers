import profilePicture from "../../../../../../../../../assets/enrique-profile-picture.jpg";
import { formatTime } from "../../../../utils/helper-functions";

const SummarySection = ({ service, startTime, barber }) => {
  service = {
    name: "Haircut",
    description:
      "Any type of haircut of your choice (skin fades, regulat, etc)!! Eyebrows optional! Any type of haircut of your choice (skin fades, regulat, etc)!! Eyebrows optional!",
    price: 50,
    duration: 30,
  };
  // function that take startTime and servce.duration and return string startTime - endTime (02:00 PM - 02:45 AM) startTime : "15:00" called get Time Slot ("02:00 PM - 02:45 AM") should return "02:00 PM - 02:45 AM"
  const getTimeSlot = (startTime, duration) => {
    const startTimeHour = startTime.split(":")[0];
    const startTimeMinute = startTime.split(":")[1];
    const endTimeHour = parseInt(startTimeHour) + Math.floor(duration / 60);
    const endTimeMinute = parseInt(startTimeMinute) + (duration % 60);
    const endTime = `${endTimeHour}:${endTimeMinute}`;
    return `${formatTime(startTime)} - ${formatTime(endTime)}`;
  };
  console.log(getTimeSlot("15:00", 45));

  return (
    <div className="md:px-8">
      <div className="flex flex-col w-full py-3 bg-gray-200 rounded-lg">
        <div className="flex flex-row justify-between px-6 pt-2 pb-5">
          <div className="flex flex-col text-left">
            <h6 className="text-lg font-semibold">{service.name}</h6>
            <span className="text-sm text-gray-600">{service.description}</span>
          </div>
          <div className="flex flex-col font-semibold text-right w-72">
            <h6 className="text-lg">${service.price}.00</h6>
            <span className="text-sm text-gray-600">
              {getTimeSlot("15:00", 45)}
            </span>
          </div>
        </div>
        <hr />
        <div className="flex flex-row pt-3 px-6">
          <div className="flex flex-row items-center">
            <span className="text-gray-600">Staff: </span>
          </div>

          <div className="ml-2 flex flex-row items-center gap-2">
            <img className="h-8 rounded-full" src={profilePicture} alt="" />
            <span className="text-gray-800">Oscar</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SummarySection;
