import { useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';

import Landing from './router/landing/landing.route';
import Navigation from './router/navigation/navigation.route';

import { GLobalStyle } from "./global.styles";
import 'bootstrap/dist/css/bootstrap.min.css';
import Barbers from './router/barbers/barbers.route';
import Store from './router/store/store.route';
import ProductPage from './router/store/routes/[product]/product.route';
import Checkout from './router/checkout/checkout.route';
import SignInPage from './router/sign-in/sign-in.router';
import ProfilePage from './router/profile/profile.router';
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
            <Route path='profile'>
              <Route index element={<ProfilePage/>}/>
            </Route>
            <Route path='store'>
              <Route index element={<Store/>}/>
              <Route path=':productName' element={<ProductPage/>}/>
            </Route>
            <Route path='checkout'>
              <Route index element={<Checkout/>}/>
            </Route>
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
