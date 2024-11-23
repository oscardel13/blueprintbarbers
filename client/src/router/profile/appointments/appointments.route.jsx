import { useState } from "react";
import { useSelector } from "react-redux";

import AppointmentCard from "./components/appointment-card/appointment-card.component";
import { selectCurrentUser } from "../../../store/user/user.selector";

const Appointments = () => {
  const user = useSelector(selectCurrentUser);
  const [finishedAppointments, setFinishedAppointments] = useState([]);
  if (!user) {
    return <div>Need to be logged in to view this page</div>;
  }
  return (
    <div className="flex flex-col max-w-[500px] min-h-screen p-2 md:p-10">
      <h1 className="text-3xl font-semibold">Appointments</h1>
      {
        // if there are no future appointments, display a message
        user.appointments.length === 0 ? (
          <h3 className="text-xl">No future appointments</h3>
        ) : (
          <div className="flex flex-col gap-5 pb-5">
            <h3 className="text-xl">Upcoming Appointments</h3>
            {user.appointments.map((appointment, index) => {
              return <AppointmentCard key={index} appointment={appointment} />;
            })}
          </div>
        )
      }
      {
        // if there are no finished appointments, display a message
        finishedAppointments.length === 0 ? (
          <h3 className="text-xl">No finished appointments</h3>
        ) : (
          finishedAppointments.map((appointment, index) => {
            return (
              <>
                <h3 className="text-xl">Finished Appointments</h3>
                <AppointmentCard key={index} appointment={appointment} />
              </>
            );
          })
        )
      }
    </div>
  );
};

export default Appointments;
