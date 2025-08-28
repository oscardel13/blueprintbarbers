import { useEffect, useState } from "react"
import { useSelector } from "react-redux";

import AppointmentCard from "../../appointments/components/appointment-card/appointment-card.component"
import { selectCurrentUser } from "../../../../store/user/user.selector";
import { getAPI } from "../../../../utils/api";


const UpcomingAppointments = () => {
    const user = useSelector(selectCurrentUser);
    const [ upcomingAppointments, setUpcomingAppointments ] = useState([])

    useEffect(()=>{
        const getUpcomingAppointments = async () => {
            try{
                const res = await getAPI(`/bookings`, {
                clientId: user._id,
                start: new Date().toISOString(), // client-local time in UTC
                })
                setUpcomingAppointments(res.data)
            }
            catch(err){
                console.log(`Error: ${err?.message}`)
            }
        }

        getUpcomingAppointments()
    }, [user])

      if (!user) {
        return <div>Need to be logged in to view this page</div>;
      }


    return (
        <>
        {user && upcomingAppointments.length > 0 ? (
            <div className="w-full">
              <h6 className="pb-2">Upcoming Appointments</h6>
              <div className="flex flex-col w-full lg:flex-row flex-wrap gap-3">
                {upcomingAppointments.map((appointment, index) => (
                  <AppointmentCard key={index} appointment={appointment} />
                ))}
              </div>
            </div>
          ) : (
            <h6>No upcoming appointments</h6>
          )}
        </>
    )
}

export default UpcomingAppointments;