import IosShareIcon from "@mui/icons-material/IosShare";
import barberImage from "../../../../assets/barbers/enrique/5.jpg";

const BookingHero = ({ name, address }) => {
  return (
    <div>
      <div className="relative">
        <div className="absolute top-0 right-0 z-50 bg-[rgb(0,0,0,0.75)] flex flex-col w-32 rounded justify-center items-center p-2">
          <h6 className="text-white font-semibold text-lg">5.0</h6>
          <span className="flex justify-center text-white text-sm">
            136 reviews
          </span>
        </div>
      </div>
      <img
        className="d-block w-full h-[500px] object-cover rounded"
        src={barberImage}
        alt="barber image"
      />
      <div className="flex flex-col gap-1 py-3">
        <div className="flex flex-row justify-between">
          <h3 className="text-3xl font-bold">{name}</h3>
          <span className="cursor-pointer">
            <IosShareIcon />
          </span>
        </div>
        <span className="text-gray-500 text-xs">{address}</span>
      </div>
    </div>
  );
};

export default BookingHero;
