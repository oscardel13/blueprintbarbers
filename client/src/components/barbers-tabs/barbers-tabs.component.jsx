import { useState, useEffect } from "react";

import Tab from "react-bootstrap/Tab";

import { BarbersTab } from "./barbers-tabs.styles";
import Booking from "../../router/booking/booking.route";

import BARBERLIST from "./barbers-tabs.data";

function BarbersTabs() {
  const [key, setKey] = useState(0);

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
            <Booking barber={barber} />
          </div>
        </Tab>
      ))}
    </BarbersTab>
  );
}

export default BarbersTabs;
