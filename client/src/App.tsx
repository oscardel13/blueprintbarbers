import { useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import {loadStripe} from '@stripe/stripe-js';

import Landing from './router/landing/landing.route';
import Navigation from './router/navigation/navigation.route';

import { GLobalStyle } from "./global.styles";
import 'bootstrap/dist/css/bootstrap.min.css';
import Barbers from './router/barbers/barbers.route';
import Store from './router/store/store.route';
import ProductPage from './router/store/routes/[product]/product.route';
import Cart from './router/cart/cart.route';
import SignInPage from './router/sign-in/sign-in.router';
import ProfilePage from './router/profile/profile.router';
import OrdersPage from './router/orders/orders.router';
import OrderPage from './router/order/order.router';
import ProductItemPage from './router/store/routes/product-item/product-item.router';
import Checkout from './router/checkout/checkout.route';
// import Dashboard from './router/dashboard/dashboard-layout.router';
// import ProductsPage from './router/dashboard/router/products/products.router';
// import Home from './router/dashboard/router/home/home.router';
// import CreateProduct from './router/dashboard/router/create-product/create-product.component';
import DashboardRoutes from './router/dashboard/dashboard.routes';
import { useDispatch } from 'react-redux';
import { setCurrentUser } from './store/user/user.reducer';
import { getAPI } from './utils/api';

function App() {
  const dispatch = useDispatch();
  const stripePromise = loadStripe('pk_test_51MVmanJs5AxisWVj8UwPq1KYjavDf5yQh2u1V9Qt424V11EGFT49z8Q7j8RQCiqPQmKnYjsoos1JJuVPRkXYZoBG00DuKgCjVK');
  useEffect(()=>{
    const setUser = async () => {
      try{
        const user = await getAPI('/clients/me');
        dispatch(setCurrentUser(user.data));
      }
      catch(err){
        console.log(err);
      }
    }
    setUser();
  },[])
  return (
    <>
      <GLobalStyle/>
        <Routes>
          <Route path='/' element={<Navigation/>}>
            <Route index element={<Landing/>}/>
            <Route path='barbers' element={<Barbers/>}/>
            <Route path='sign-in' element={<SignInPage/>}/>
            <Route path="account">
              <Route index element={<ProfilePage/>}/>
              <Route path="orders">
                <Route index element={<OrdersPage/>}/>
                <Route path=':orderId' element={<OrderPage/>}/>
              </Route>
            </Route>
            <Route path='store'>
              <Route index element={<Store/>}/>
              <Route path=':productName' element={<ProductPage/>}/>
              <Route path=':productName/:itemId' element={<ProductItemPage/>}/>
            </Route>
            <Route path='cart'>
              <Route index element={<Cart/>}/>
            </Route>
            <Route path='checkout' element={<Checkout stripePromise={stripePromise}/>}/>
          </Route>
          {/* <Route path='dashboard' element={<Dashboard/>}>
            <Route index element={<Home/>}/>
            <Route path='products'>
              <Route index element={<ProductsPage/>}/>
              <Route path='create' element={<CreateProduct/>}/>
            </Route>
          </Route> */}
        </Routes>
        <DashboardRoutes/>
      </>
  );
}

export default App;
