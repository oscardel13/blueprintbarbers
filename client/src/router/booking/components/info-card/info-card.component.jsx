import PhoneAndroidIcon from "@mui/icons-material/PhoneAndroid";
import NearMeIcon from "@mui/icons-material/NearMe";
import MapPreview from "../map-preview/map-preview.component";
import InstagramIcon from "@mui/icons-material/Instagram";
import { ReactComponent as BooksyIcon } from "../../../../assets/Booksy.svg";
import {
  formatTime,
  formatPhoneNumber,
  generateGoogleMapsLink,
  generateAppleMapsLink,
  daysOfTheWeek,
  convertStringToHTML,
} from "./info-card.helper-functions";

// these sections can be modulize as well (do it when it grows to new user and only show if they have info filled in)
const InfoCard = ({
  name,
  hours,
  phone,
  address,
  about,
  profilePicture,
  instagramUrl,
  booksyUrl,
}) => {
  const Pic = require(`../../../../assets/${profilePicture}`);
  return (
    <div className="bg-gray-100 ">
      {/* MAP with mini profile and address card */}
      <div className="relative w-full">
        <MapPreview address={address} />
        <div className="absolute px-2 bottom-1 z-10">
          <div className="flex flex-row justify-between bg-white border-gray-200 rounded shadow max-h-14 w-full">
            <div className="flex flex-row py-1">
              <div className="px-2 w-1/6">
                <img
                  src={Pic}
                  alt="Enrique"
                  className="w-full h-full rounded-full object-fill"
                />
              </div>
              <div className="pl-1 flex flex-col w-5/6">
                <h5 className="font-medium text-left">{name}</h5>
                <span className="text-gray-500 text-xs flex flex-wrap">
                  {address}
                </span>
              </div>
            </div>
            {/* href that open navigation to address */}

            <a
              className="flex items-center border border-gray-200 rounded px-2 cursor-pointer hover:bg-gray-300"
              href={generateAppleMapsLink(address)}
              target="_blank"
              rel="noopener noreferrer"
            >
              <NearMeIcon />
            </a>
          </div>
        </div>
      </div>
      {/* About */}
      {about && about.length > 0 && (
        <div className="py-3 mt-5 flex flex-col px-5">
          <h6 className="font-semibold pb-5 text-left">ABOUT US</h6>
          {convertStringToHTML(about)}
          {/* <p className="flex flex-wrap text-left">{about}</p> */}
        </div>
      )}

      {/* title (this could all be one (title, contact, businesness hoursl)) */}
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
      <hr />

      {/* Socials */}
      <div className="py-3 flex flex-col px-5">
        <h6 className="font-semibold pb-5 text-left">SOCIAL MEDIA</h6>
        <div className="flex flex-row justify-center items-center gap-5">
          <a href={instagramUrl}>
            <InstagramIcon fontSize="large" />
          </a>
          <a href={booksyUrl} className="w-28">
            <BooksyIcon />
          </a>
        </div>
      </div>
    </div>
  );
};

export default InfoCard;
