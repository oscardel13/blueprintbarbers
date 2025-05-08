import { Link } from "react-router-dom";

const AppointmentCard = ({ appointment }) => {
  const status = "confirmed";
  const statusComponent = (status) => {
    switch (status) {
      case "pending":
        return (
          <span className="px-3 w-min border text-sm text-gray-100 bg-yellow-700 rounded-full">
            Pending
          </span>
        );
      case "confirmed":
        return (
          <span className="px-3 w-min border text-sm text-gray-100 bg-green-500 rounded-full">
            Confirmed
          </span>
        );
      case "finished":
        return (
          <span className="px-3 w-min border text-sm text-gray-700 bg-gray-300 rounded-full">
            Finished
          </span>
        );
      default:
        return (
          <span className="px-3 w-min border text-sm text-gray-700 bg-gray-300 rounded-full">
            Pending
          </span>
        );
    }
  };

  //function that takes appointment startTime (date) and make object with  Month short (3 letters), day, time
  const dateObject = (startTime) => {
    const date = new Date(startTime);
    const month = date.toLocaleString("default", { month: "short" });
    const day = date.getDate();
    const time = date.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
    });
    return { month, day, time };
  };

  const date = dateObject(appointment.startTime);

  return (
    <Link
      className="flex flex-row bg-gray-200 justify-between border border-gray-500 shadow rounded-xl"
      to={`/account/appointments/${appointment._id}`}
    >
      <div className="flex flex-col gap-3 p-3 md:mr-10">
        {statusComponent(appointment.status)}
        <h5 className="font-semibold">{appointment.service.name}</h5>
        <div className="flex flex-row items-center gap-2">
          <img
            src={appointment.barber.picture}
            className="w-8 h-8 rounded-full"
            alt=""
          />{" "}
          {/* need function to get picture */}
          <span>{appointment.barber.name}</span>
        </div>
        {status === "finished" ? (
          <button
            className="py-1 w-60 bg-gray-800 text-white rounded-lg z-30 hover:bg-gray-700"
            onClick={(e) => {
              e.preventDefault(); // Prevent the default navigation
              e.stopPropagation(); // Prevents the click event from reaching the <Link>
              console.log("Booking again");
            }}
          >
            Book again
          </button>
        ) : (
          <button
            className="py-1 w-60 bg-gray-800 text-white rounded-lg z-30 hover:bg-gray-700"
            onClick={(e) => {
              e.preventDefault(); // Prevent the default navigation
              e.stopPropagation(); // Prevents the click event from reaching the <Link>
              console.log("Reschedule/Cancel");
            }}
          >
            Reschedule/Cancel
          </button>
        )}
      </div>
      <div className="flex flex-col justify-center items-center px-7 border-l-2 border-gray-400 rounded-r-xl">
        <span className="text-center text-sm text-gray-500">{date.month}</span>
        <span className="text-center text-2xl tracking-wider font-semibold">
          {date.day}
        </span>
        <span className="text-center text-sm text-gray-500">{date.time}</span>
      </div>
    </Link>
  );
};

export default AppointmentCard;
