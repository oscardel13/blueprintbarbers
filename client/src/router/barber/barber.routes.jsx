import { Route } from "react-router-dom";
import BarberLanding from "./barber.route";
import Barber from "./[barber]/[barber].route";

function BarberRoutes() {
  return (
    <Route path="barber">
      <Route index element={<BarberLanding />} />
      <Route path=":barberId">
        <Route index element={<Barber />} />
          {/* <Route path="reviews" element={<NA />} />
          <Route path="gallery" element={<NA />} />
          <Route path="contact" element={<NA />} /> */}
      </Route>
    </Route>
  );
}

export default BarberRoutes;
