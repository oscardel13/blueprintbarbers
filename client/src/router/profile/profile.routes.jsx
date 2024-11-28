import { Route } from "react-router-dom";
import ProfilePage from "./profile.route";
import OrdersPage from "./orders/orders.route";
import OrderPage from "./orders/order/order.route";
import Appointments from "./appointments/appointments.route";
import Appointment from "./appointments/[appointment]/appointment.route";
import ProfileLayout from "./layout/profile.layout";
import EditPage from "./edit/edit.route";

function AccountRoutes() {
  return (
    <>
      <Route path="account" element={<ProfileLayout />}>
        <Route index element={<ProfilePage />} />
        <Route path="orders">
          <Route index element={<OrdersPage />} />
          <Route path=":orderId" element={<OrderPage />} />
        </Route>
        <Route path="appointments">
          <Route index element={<Appointments />} />
          <Route path=":appointmentId">
            <Route index element={<Appointment />} />
          </Route>
        </Route>
        <Route path="edit" element={<EditPage />} />
      </Route>
    </>
  );
}

export default AccountRoutes;
