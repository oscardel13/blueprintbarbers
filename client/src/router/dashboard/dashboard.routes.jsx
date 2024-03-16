import { Routes, Route } from 'react-router-dom';

import Dashboard from './dashboard-layout.router';
import ProductsPage from './router/products/products.router';
import Home from './router/home/home.router';
import CreateProduct from './router/create-product/create-product.component';
import User from './router/user/user.router';
import Users from './router/users/users.router';
import Barbers from './router/barbers/barbers.router';
import Barber from './router/barber/barber.router';
import Order from './router/order/order.router';
import Orders from './router/orders/orders.router';
import Account from './router/account/account.router';
import EditProduct from './router/edit-product/edit-product.router';
import ViewProduct from './router/view-product/view-product.router';
import EditBarber from './router/barbers/router/edit/edit.router';


function DashboardRoutes() {
  return (
    <Routes>
      <Route path='dashboard' element={<Dashboard/>}>
          <Route index element={<Home/>}/>
          <Route path='products' element={<ProductsPage/>}/>
          <Route path='products/create' element={<CreateProduct/>}/>
          <Route path='products/:productName' element={<ViewProduct/>}/>
          <Route path='products/:productName/edit' element={<EditProduct/>}/>
          <Route path='users' element={<Users/>}/>
          <Route path='users/:id' element={<User/>}/>
          <Route path='barbers'>
              <Route index element={<Barbers/>}/>
              <Route path=':id' element={<Barber/>}/>
              <Route path=':id/edit' element={<EditBarber/>}/>
          </Route>
          
          <Route path='orders' element={<Orders/>}/>
          <Route path='orders/:orderId' element={<Order/>}/>
          <Route path='account' element={<Account/>}/>
      </Route>
    </Routes>
  );
}

export default DashboardRoutes;
