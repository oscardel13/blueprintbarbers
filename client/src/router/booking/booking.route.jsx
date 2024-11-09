import InfoCard from "./components/info-card/info-card.component";
import BookingHero from "./components/hero-section/hero-section.component";

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
  services: [
    {
      name: "Haircut",
      price: 50,
      duration: 40,
    },
    {
      name: "Haircut & Beard",
      price: 60,
      duration: 60,
    },
    {
      name: "Haircut & Design",
      price: 55,
      duration: 60,
    },
  ],
  reviews: [],
};

const Booking = () => {
  console.log("HERE BITCH");
  console.log(process.env.REACT_APP_MAPBOX_ACCESS_TOKEN);
  return (
    <div className="flex justify-center">
      <div className="py-2 lg:py-5 mx-2 flex flex-col max-w-[1250px] lg:flex-row lg:justify-between w-full gap-10">
        <div className="relative flex flex-col w-full lg:w-2/3">
          <BookingHero name={DATA.name} address={DATA.address} />
          {/* Services */}
          {/* See Our Work */}
          {/* Revies */}
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
