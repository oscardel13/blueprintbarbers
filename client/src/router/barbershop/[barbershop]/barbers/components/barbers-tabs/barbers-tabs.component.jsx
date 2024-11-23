import { useState, useEffect } from "react";

import Tab from "react-bootstrap/Tab";

import { BarbersTab } from "./barbers-tabs.styles";

import Barber from "../../[barber]/barber.route";
import { getAPI } from "../../../../../../utils/api";

function BarbersTabs() {
  const [barbers, setBarbers] = useState([]);

  useEffect(() => {
    const fetchBarbers = async () => {
      const response = await getAPI("/barbers");
      const data = await response.data;
      setBarbers(data);
    };
    try {
      fetchBarbers();
    } catch (err) {
      // console.log(err);
    }
  }, []);

  const params = new URLSearchParams(window.location.search);
  let barberIndex = params.get("index");
  if (!barberIndex) {
    barberIndex = 0;
  }
  const [key, setKey] = useState(barberIndex);

  return (
    <BarbersTab
      id="controlled-tab-example"
      variant="underline"
      activeKey={key}
      onSelect={(k) => setKey(k)}
      className="xs-auto"
    >
      {barbers.map((barber, index) => (
        <Tab eventKey={index} title={barber.name} key={index}>
          <div className="bg-white">
            <Barber barberId={barber._id} index={index} />
          </div>
        </Tab>
      ))}
    </BarbersTab>
  );
}

export default BarbersTabs;
