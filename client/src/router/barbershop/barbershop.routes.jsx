import { Route } from "react-router-dom";
import BarbershopSearchPage from "./barbershops.page";
import Barbershop from "./[barbershop]/barbershop.route";

function BarbershopRoutes() {
  return (
    <Route path="barbershops">
      <Route index element={<BarbershopSearchPage />} />
      <Route path=":barbershopId">
        <Route index element={<Barbershop />} />
        {/* <Route path="barbers">
            <Route index element={<Barbers />} />
            <Route path=":barber">
              <Route index element={<NA />} />
            </Route>
          </Route>
          <Route path="reviews" element={<NA />} />
          <Route path="gallery" element={<NA />} />
          <Route path="contact" element={<NA />} /> */}
      </Route>
    </Route>
  );
}

export default BarbershopRoutes;
