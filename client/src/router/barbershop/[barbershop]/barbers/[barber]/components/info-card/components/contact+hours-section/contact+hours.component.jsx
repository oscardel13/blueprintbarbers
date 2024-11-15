import {
  daysOfTheWeek,
  formatPhoneNumber,
  formatTime,
} from "../../../../utils/helper-functions";
import PhoneAndroidIcon from "@mui/icons-material/PhoneAndroid";

const ContactAndHoursSection = ({ phone, hours }) => {
  return (
    <>
      <div className="py-3 px-5 mt-5 text-left">
        <h5>CONTACT & BUSINESS HOURS</h5>
      </div>
      <hr />
      {/* Contact */}
      <div className="py-3 flex flex-row justify-between px-5">
        <h5 className="flex flex-row items-center">
          <PhoneAndroidIcon />
          <div>{formatPhoneNumber(phone)}</div>
        </h5>
        <a
          href={`tel:${phone}`}
          className="cursor-pointer border border-black py-1 px-2 rounded hover:bg-[#212529] hover:text-white"
        >
          Call
        </a>
      </div>
      <hr />
      {/* Business Hours */}
      <div className="py-3 flex flex-col px-5">
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
    </>
  );
};

export default ContactAndHoursSection;
