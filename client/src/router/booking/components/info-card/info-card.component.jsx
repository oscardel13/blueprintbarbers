import PhoneAndroidIcon from "@mui/icons-material/PhoneAndroid";
import NearMeIcon from "@mui/icons-material/NearMe";
import MapPreview from "../map-preview/map-preview.component";
import profilePic from "../../../../assets/enrique-profile-picture.jpg";

const InfoCard = ({ name, hours, phone, address }) => {
  function formatTime(hourString) {
    const [hour, minute] = hourString.split(":").map(Number);
    const period = hour >= 12 ? "PM" : "AM";
    const hour12 = hour % 12 || 12; // Converts 0 or 12 to 12, 13-23 to 1-11
    return `${hour12.toString().padStart(2, "0")}:${minute
      .toString()
      .padStart(2, "0")} ${period}`;
  }

  const daysOfTheWeek = [
    "sunday",
    "monday",
    "tuesday",
    "wednesday",
    "thursday",
    "friday",
    "saturday",
  ];
  return (
    <div className="bg-gray-100 ">
      <div className="relative w-full">
        <MapPreview address={address} />
        <div className="absolute px-2 bottom-1 z-10">
          <div className="flex flex-row justify-between bg-white border-gray-200 rounded shadow max-h-14 w-full">
            <div className="flex flex-row py-1">
              <div className="px-2 w-1/6">
                <img
                  src={profilePic}
                  alt="Enrique"
                  className="w-full h-full rounded-full object-fill"
                />
              </div>
              <div className="pl-1 flex flex-col w-5/6">
                <h5 className="font-medium">{name}</h5>
                <span className="text-gray-500 text-xs flex flex-wrap">
                  {address}
                </span>
              </div>
            </div>
            <div className="flex items-center border border-gray-200 rounded px-2 cursor-pointer hover:bg-gray-300">
              <NearMeIcon />
            </div>
          </div>
        </div>
      </div>
      <div className="py-3 px-5 mt-5">
        <h5>CONTACT & BUSINESS HOURS</h5>
      </div>
      <hr />
      <div className="py-3 flex flex-row justify-between px-5">
        <h5 className="flex flex-row items-center">
          <PhoneAndroidIcon />
          <div>{phone}</div>
        </h5>
        <button className="border border-black py-1 px-2 rounded hover:bg-[#212529] hover:text-white">
          Call
        </button>
      </div>
      <hr />
      <div className="py-3 flex-col px-5">
        {daysOfTheWeek.map((day) => {
          return (
            <div className="flex flex-row justify-between py-2" key={day}>
              <span>
                {String(day).charAt(0).toUpperCase() + String(day).slice(1)}
              </span>
              <div className="flex flex-col">
                {hours[day].length > 0
                  ? hours[day].map((time, index) => (
                      <span key={index}>
                        {formatTime(time[0])} - {formatTime(time[1])}
                      </span>
                    ))
                  : "Closed"}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default InfoCard;
