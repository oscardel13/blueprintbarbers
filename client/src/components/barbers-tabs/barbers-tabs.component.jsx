import { useState, useEffect } from "react";

import Tab from "react-bootstrap/Tab";

import { BarbersTab } from "./barbers-tabs.styles";
import Booking from "../../router/booking/booking.route";

import BARBERLIST from "./barbers-tabs.data";

function BarbersTabs() {
  // get query param
  const params = new URLSearchParams(window.location.search);
  let barberIndex = params.get("index");
  if (!barberIndex) {
    barberIndex = 0;
  }
  console.log(barberIndex);
  const [key, setKey] = useState(barberIndex);

  return (
    <BarbersTab
      id="controlled-tab-example"
      variant="underline"
      activeKey={key}
      onSelect={(k) => setKey(k)}
      className="xs-auto"
    >
      {BARBERLIST.map((barber, index) => (
        <Tab eventKey={index} title={barber.name} key={index}>
          <div className="bg-white">
            <Booking barber={barber} index={index} />
          </div>
        </Tab>
      ))}
    </BarbersTab>
  );
}

export default BarbersTabs;
