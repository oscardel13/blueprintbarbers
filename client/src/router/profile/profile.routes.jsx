import { Route } from "react-router-dom";
import ProfilePage from "./profile.router";
import OrdersPage from "./router/orders/orders.router";
import OrderPage from "./router/orders/router/order/order.router";

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
