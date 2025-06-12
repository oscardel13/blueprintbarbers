import { Routes, Route } from "react-router-dom";

import Layout from "./layout/barber-dashbaord.layout";
import Home from "./barber-dashboard.route";
import ClientsPage from "./clients/clients.route";
import ClientPage from "./clients/[client]/client.route";
import BookingsPage from "./bookings/bookings.route";
import BookingPage from "./bookings/[booking]/booking.route";
import EditPage from "./edit/edit.route";
import SettingsPage from "./settings/settings.route";
import { useEffect } from "react";
import { getAPI } from "../../utils/api";
import { useSelector } from "react-redux";
import { selectCurrentUser } from "../../store/user/user.selector";
import { useDispatch } from "react-redux";
import { setCurrentBarber } from "../../store/barber/barber.reducer";

function BarberRoutes() {
  const dispatch = useDispatch()
  const user = useSelector(selectCurrentUser)
  useEffect(()=>{    
      const setBarber = async() =>{
        try{
          // update api so it checks user to get it maybe have me like user
          if (user?.gid){
            const barber = await getAPI(`/barbers/${user.gid}`)
            dispatch(setCurrentBarber(barber.data))
          }
        }
        catch(err){
          alert("ERROR")
        }
      }
      setBarber()
  }, [user])
  return (
    <Routes>
      <Route path="barber-dashboard" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="clients">
          <Route index element={<ClientsPage />} />
          <Route path=":id" element={<ClientPage />} />
        </Route>
        <Route path="bookings">
          <Route index element={<BookingsPage />} />
          <Route path=":bookingId" element={<BookingPage />} />
        </Route>

        <Route path="edit" element={<EditPage />} />
        <Route path="settings" element={<SettingsPage />} />
      </Route>
    </Routes>
  );
}

export default BarberRoutes;
