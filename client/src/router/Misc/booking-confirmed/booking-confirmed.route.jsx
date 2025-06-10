import EventAvailableIcon from "@mui/icons-material/EventAvailable";
import { Link } from "react-router-dom";

// consider adding some ads here
// have buttons to return to the barber page or barbershop (like book another)
const BookingConfirmed = () => {
  return (
    <div className="relative flex flex-col justify-center items-center p-10 bg-white h-screen w-screen rounded-lg shadow-lg border">
      <div className="absolute flex flex-col justify-center items-center top-32 gap-7 px-2">
        <div className="flex justify-center text-center">
          <EventAvailableIcon className="text-9xl" />
        </div>
        <h3 className="text-center text-3xl">
          Your booking is waiting on Confirmation!
        </h3>
        <Link
          to={"/account/appointments"}
          className="py-2 px-5 border bg-blue-500 text-white rounded-lg"
        >
          View Appointments
        </Link>
      </div>
    </div>
  );
};

export default BookingConfirmed;
