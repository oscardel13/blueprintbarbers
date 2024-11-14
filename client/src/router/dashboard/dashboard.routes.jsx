import { Routes, Route } from "react-router-dom";

import Dashboard from "./dashboard-layout.router";
import ProductsPage from "./router/products/products.route";
import Home from "./router/home/home.route";
import CreateProduct from "./router/create-product/create-product.route";
import User from "./router/user/user.route";
import Users from "./router/users/users.route";
import Barbers from "./router/barbers/barbers.route";
import Barber from "./router/barber/barber.route";
import Order from "./router/order/order.route";
import Orders from "./router/orders/orders.route";
import Account from "./router/account/account.route";
import EditProduct from "./router/edit-product/edit-product.route";
import ViewProduct from "./router/view-product/view-product.route";
import EditBarber from "./router/barbers/router/edit/edit.route";

function DashboardRoutes() {
  return (
    <Routes>
      <Route path="dashboard" element={<Dashboard />}>
        <Route index element={<Home />} />
        <Route path="products" element={<ProductsPage />} />
        <Route path="products/create" element={<CreateProduct />} />
        <Route path="products/:productName" element={<ViewProduct />} />
        <Route path="products/:productName/edit" element={<EditProduct />} />
        <Route path="users" element={<Users />} />
        <Route path="users/:id" element={<User />} />
        <Route path="barbers">
          <Route index element={<Barbers />} />
          <Route path=":id" element={<Barber />} />
          <Route path=":id/edit" element={<EditBarber />} />
        </Route>

        <Route path="orders" element={<Orders />} />
        <Route path="orders/:orderId" element={<Order />} />
        <Route path="account" element={<Account />} />
      </Route>
    </Routes>
  );
}

export default DashboardRoutes;
