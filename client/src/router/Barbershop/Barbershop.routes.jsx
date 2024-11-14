import { Route } from "react-router-dom";
import Barbers from "./[barbershop]/barbers/barbers.route";

function BarbershopRoutes() {
  return (
    <Route path="barbershops">
      <Route index element={<Barbers />} />
      <Route path=":barbershop">
        <Route index element={<Barbers />} />
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
