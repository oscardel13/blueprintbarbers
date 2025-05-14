import { Routes, Route } from "react-router-dom";

import Layout from "./layout/barber-dashbaord.layout";
import Home from "./barber-dashboard.route";
import ClientsPage from "./clients/clients.route";
import ClientPage from "./clients/[client]/client.route";
import BookingsPage from "./bookings/bookings.route";
import BookingPage from "./bookings/[booking]/booking.route";
import EditPage from "./edit/edit.route";
import SettingsPage from "./settings/settings.route";

function BarberRoutes() {
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
          <Route path=":id" element={<BookingPage />} />
        </Route>

        <Route path="edit" element={<EditPage />} />
        <Route path="settings" element={<SettingsPage />} />
      </Route>
    </Routes>
  );
}

export default BarberRoutes;
