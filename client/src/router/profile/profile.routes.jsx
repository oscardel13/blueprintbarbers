import { Route } from "react-router-dom";
import ProfilePage from "./profile.route";
import OrdersPage from "./orders/orders.route";
import OrderPage from "./orders/order/order.route";
import Appointments from "./appointments/appointments.route";
import Appointment from "./appointments/[appointment]/appointment.route";

function AccountRoutes() {
  return (
    <>
      <Route path="account">
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
      </Route>
    </>
  );
}

export default AccountRoutes;
