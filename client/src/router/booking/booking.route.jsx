import IosShareIcon from "@mui/icons-material/IosShare";
import barberImage from "../../assets/barbers/enrique/5.jpg";
import InfoCard from "./components/info-card/info-card.component";

const DATA = {
  name: "Enrique The Barbers",
  address: "11178 huron st, Suite 200, Northglenn, 80234",
  phone: "(720) 998-4505",
  hours: {
    sunday: [],
    monday: [
      ["10:00", "14:00"],
      ["15:00", "19:00"],
    ],
    tuesday: [["16:00", "20:00"]],
    wednesday: [
      ["10:00", "14:00"],
      ["15:00", "19:00"],
    ],
    thursday: [
      ["08:00", "14:00"],
      ["15:00", "19:00"],
    ],
    friday: [
      ["08:00", "14:00"],
      ["15:00", "19:00"],
    ],
    saturday: [
      ["08:00", "12:00"],
      ["13:00", "17:00"],
    ],
  },
  services: {},
  reviews: [],
};

const Booking = () => {
  return (
    <div className="flex justify-center">
      <div className="py-2 lg:py-5 mx-2 flex flex-col max-w-[1250px] lg:flex-row lg:justify-between w-full gap-10">
        <div className="relative flex flex-col w-full lg:w-2/3">
          <img
            className="d-block w-full h-[500px] object-cover rounded"
            src={barberImage}
            alt="barber image"
          />
          <div className="flex flex-col gap-1 py-3">
            <div className="flex flex-row justify-between">
              <h3 className="text-3xl font-bold">{DATA.name}</h3>
              <span className="cursor-pointer">
                <IosShareIcon />
              </span>
            </div>
            <span className="text-gray-500 text-xs">{DATA.address}</span>
          </div>
          {/* Rating and # revies box */}
          <div className="absolute top-0 right-0 z-50 bg-[rgb(0,0,0,0.75)] flex flex-col w-32 rounded justify-center items-center p-2">
            <h6 className="text-white font-semibold text-lg">5.0</h6>
            <span className="flex justify-center text-white text-sm">
              136 reviews
            </span>
          </div>
        </div>

        <div className="fle flex-col w-full lg:w-1/3">
          <InfoCard
            name={DATA.name}
            phone={DATA.phone}
            address={DATA.address}
            hours={DATA.hours}
          />
        </div>
      </div>
    </div>
  );
};

export default Booking;
