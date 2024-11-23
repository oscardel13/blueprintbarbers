import { useEffect } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import { GLobalStyle } from "./global.styles";

import Layout from "./layout/layout";
import Landing from "./router/landing/landing.route";
import DashboardRoutes from "./router/dashboard/dashboard.routes";
import AccountRoutes from "./router/profile/profile.routes";
import MiscRoutes from "./router/Misc/misc.routes";
import StoreRoutes from "./router/store/store.routes";
import BarbershopRoutes from "./router/barbershop/barbershop.routes";

import { useDispatch } from "react-redux";
import { setCurrentUser } from "./store/user/user.reducer";
import { getAPI } from "./utils/api";

import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  const dispatch = useDispatch();
  const location = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0); // Scroll to top on route change
  }, [location]); // Triggered whenever the location changes

  useEffect(() => {
    const setUser = async () => {
      try {
        const user = await getAPI("/users/me");
        dispatch(setCurrentUser(user.data));
      } catch (err) {
        console.log(err);
      }
    };
    setUser();
  }, []);
  return (
    <>
      <GLobalStyle />
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Landing />} />
          {MiscRoutes()}
          {BarbershopRoutes()}
          {AccountRoutes()}
          {StoreRoutes()}
        </Route>
      </Routes>
      <DashboardRoutes />
    </>
  );
}

export default App;
