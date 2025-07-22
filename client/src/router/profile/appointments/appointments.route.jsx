import { useState } from "react";
import { useSelector } from "react-redux";

import AppointmentCard from "./components/appointment-card/appointment-card.component";
import { selectCurrentUser } from "../../../store/user/user.selector";
import PageHeader from "../../../components/page-header/page-header.component";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import { getAPI } from "../../../utils/api";

/*
TODO add past appointments
have it closed. so be a toggle feature that when expanded calls API to get it
and only calls it once not for every expand
*/
const Appointments = () => {
  const user = useSelector(selectCurrentUser);
  const [finishedAppointments, setFinishedAppointments] = useState(null);
  const [isExpanded, setIsExpanded] = useState(false)

  if (!user) {
    return <div>Need to be logged in to view this page</div>;
  }

  const fetchFinishedAppointments = async () =>{
    if (finishedAppointments)
      return
    // TODO
    const res = await getAPI(`/bookings/past`, {
      client: user?._id,
      // now: new Date().toISOString(), // client-local time in UTC
    })

    console.log(res)
    
    setFinishedAppointments(res.data)
  }

  const triggerExpand = () => {
    setIsExpanded(expanded => !expanded)
    fetchFinishedAppointments()
  }

  return (
    <div className="flex flex-col max-w-[500px]">
      <PageHeader title="Appointments" />
      {
        // if there are no future appointments, display a message
        user.appointments.length === 0 ? (
          <h3 className="text-2xl font-bold">No future appointments</h3>
        ) : (
          <div className="flex flex-col gap-5 pb-5">
            <h3 className="text-2xl font-bold">Upcoming Appointments</h3>
            {user.appointments.map((appointment, index) => {
              return <AppointmentCard key={index} appointment={appointment} />;
            })}
          </div>
        )
      }
      <div>
        <div className="flex flex-row justify-between items-center">
          <h3 className="text-2xl font-bold">Finished Appointments</h3>
          <button className="cursor-pointer"  onClick={triggerExpand}>
            <ExpandMoreIcon/>
          </button>
        </div>
      </div>
      {
        // if there are no finished appointments, display a message
        isExpanded ? !finishedAppointments ? (
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
        ) : null
      }
    </div>
  );
};

export default Appointments;
