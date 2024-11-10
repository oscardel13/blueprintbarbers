import { useState, useEffect } from "react";
import axios from "axios";

import Tab from "react-bootstrap/Tab";

import BarberCard from "../barber-card/barber-card.component";

import EnriqueGrid from "../image-grids/enrique-grid.component";
import LuisGrid from "../image-grids/luis-grid.component";
import JavierGrid from "../image-grids/javier-grid.component";
import TonyGrid from "../image-grids/tony-grid.component";
import ElvinGrid from "../image-grids/elvin-grid.component";

import { BarbersTab } from "./barbers-tabs.styles";
import Booking from "../../router/booking/booking.route";

const BARBERLIST = [
  {
    name: "Enrique",
    profilePicUrl: "enrique-profile-picture.jpg",
    instagramUrl: "https://www.instagram.com/enriquethebarber__/",
    booksyUrl: "https://booksy.com/en-us/dl/show-business/382802",
    ImageGrid: <EnriqueGrid />,
  },
  {
    name: "Luis",
    profilePicUrl: "luis-profile-picture.jpg",
    instagramUrl: "https://www.instagram.com/frezcoo/",
    booksyUrl:
      "https://booksy.com/en-us/467029_frezcoo_barber-shop_134761_denver",
    ImageGrid: <LuisGrid />,
  },
  {
    name: "Javier",
    profilePicUrl: "javier-profile-picture.jpg",
    instagramUrl: "https://www.instagram.com/artist_fadez/",
    booksyUrl:
      "https://booksy.com/en-us/500075_javier-guero-barber_barber-shop_134761_denver#ba_s=sh_1",
    ImageGrid: <JavierGrid />,
  },
  {
    name: "Tony",
    profilePicUrl: "tony-profile-picture.jpg",
    instagramUrl: "https://www.instagram.com/tonyblurrz/",
    booksyUrl:
      "https://booksy.com/en-us/602202_tony-blurrz_barber-shop_134761_denver#ba_s=sh_",
    ImageGrid: <TonyGrid />,
  },
  {
    name: "Elvin",
    profilePicUrl: "elvin-profile-picture.jpg",
    instagramUrl: "https://www.instagram.com/astro_blendzz/",
    booksyUrl:
      "https://booksy.com/en-us/497516_astro-blendzz_barber-shop_134761_denver#ba_s=sr_1",
    ImageGrid: <ElvinGrid />,
  },
];

function BarbersTabs() {
  const [key, setKey] = useState("Enrique");

  return (
    <BarbersTab
      id="controlled-tab-example"
      variant="underline"
      activeKey={key}
      onSelect={(k) => setKey(k)}
      className="xs-auto"
    >
      {BARBERLIST.map((barber) => {
        if (barber.name !== "Enrique") {
          return (
            <Tab eventKey={barber.name} title={barber.name}>
              <BarberCard barber={barber} />
            </Tab>
          );
        } else {
          return (
            <Tab eventKey={barber.name} title={barber.name}>
              <div className="bg-white">
                <Booking />
              </div>
            </Tab>
          );
        }
      })}
    </BarbersTab>
  );
}

export default BarbersTabs;
