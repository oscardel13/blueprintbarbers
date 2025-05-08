import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { getAPI } from "../../../../utils/api";
import MapSection from "../../../barbershop/[barbershop]/barbers/[barber]/components/info-card/components/map-section/map-section.component";

import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import PageHeader from "../../../../components/page-header/page-header.component";

const Appointment = () => {
  let { appointmentId } = useParams();
  const [appointment, setAppointment] = useState(null);

  useEffect(() => {
    const fetchAppointment = async () => {
      try {
        const res = await getAPI(`/bookings/${appointmentId}`);
        setAppointment(res.data);
      } catch (err) {
        if (err.response.data.error === "Not the owner")
          window.alert("You are not the owner of this appointment");
        else window.alert("Could not find appointment");
      }
    };
    fetchAppointment();
  }, [appointmentId]);
  if (!appointment)
    return (
      <div className="flex justify-center items-center h-screen">
        <h1 className="font-semibold text-5xl">Loading...</h1>
      </div>
    );
  // const appointment = APPOINTMENT_TMP;

  const statusComponent = (status) => {
    switch (status) {
      case "pending":
        return (
          <span className="px-5 py-2 border text text-gray-100 bg-yellow-700 rounded-full">
            Pending
          </span>
        );
      case "confirmed":
        return (
          <span className="px-5 py-2 border text text-gray-100 bg-green-500 rounded-full">
            Confirmed
          </span>
        );
      case "finished":
        return (
          <span className="px-5 py-2 border text text-gray-700 bg-gray-300 rounded-full">
            Finished
          </span>
        );
      default:
        return (
          <span className="px-5 py-2 border text text-gray-700 bg-gray-300 rounded-full">
            Pending
          </span>
        );
    }
  };
  return (
    <div className="flex flex-col gap-5 w-full max-w-[500px] min-h-screen">
      <PageHeader title="Appointment" />
      <div className="relative">
        <Link
          to="/account/appointments"
          className="absolute top-1 left-1 hover:text-gray-500"
        >
          {/* <ArrowBackIcon className="text-3xl font-bold" /> */}
        </Link>
        <h1 className="text-3xl font-semibold text-center">
          {new Date(appointment.startTime).toLocaleDateString("en-US", {
            month: "short", // Abbreviated month (e.g., Jan, Feb)
            day: "2-digit", // Day of the month (e.g., 01, 02)
            year: "numeric", // Full year (e.g., 2024)
          })}
        </h1>
      </div>
      <div className="flex flex-row justify-center">
        {statusComponent(appointment.status)}
      </div>
      <div>
        <MapSection
          address={appointment.barber.address}
          name={appointment.barber.name}
          profilePicture={appointment.barber.picture}
        />
      </div>

      <div className="flex flex-row justify-between">
        <div className="flex flex-col gap-3">
          <h6 className="font-semibold">{appointment.service.name}</h6>
          <p className="text-gray-600 text-sm">
            {appointment.service.description}
          </p>
          <div className="flex flex-row gap-3">
            <img
              src={appointment.barber.picture}
              className="w-8 h-8 rounded-full"
              alt=""
            />
            <span>{appointment.barber.name}</span>
          </div>
        </div>
        <div className="flex flex-col justify-center text-right">
          <span className="">${appointment.service.price}.00</span>
          <span className="text-sm text-gray-600">
            {new Date(appointment.startTime).toLocaleTimeString("en-US", {
              hour: "2-digit",
              minute: "2-digit",
            })}{" "}
            -{" "}
            {new Date(appointment.endTime).toLocaleTimeString("en-US", {
              hour: "2-digit",
              minute: "2-digit",
            })}
          </span>
        </div>
      </div>
      <hr />
      <div className="px-1">
        {appointment.status === "finished" ? (
          <button
            className="py-1 w-full h-20 bg-blue-500 text-white rounded-lg z-30 hover:bg-blue-300"
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
            className="py-1 w-full h-12 bg-blue-500 text-white rounded-lg z-30 hover:bg-blue-300"
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
    </div>
  );
};

export default Appointment;
