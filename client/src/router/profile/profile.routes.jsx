import { Route } from "react-router-dom";
import ProfilePage from "./profile.route";
import OrdersPage from "./orders/orders.route";
import OrderPage from "./orders/order/order.route";

function AccountRoutes() {
  return (
    <>
      <Route path="account">
        <Route index element={<ProfilePage />} />
        <Route path="orders">
          <Route index element={<OrdersPage />} />
          <Route path=":orderId" element={<OrderPage />} />
        </Route>
      </Route>
    </>
  );
}

export default AccountRoutes;
