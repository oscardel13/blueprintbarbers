import { useEffect, useState } from "react";
import InfoCard from "./components/info-card/info-card.component";
import BookingHero from "./components/hero-section/hero-section.component";
import Services from "./components/services/services.component";
import { getAPI } from "../../../../../utils/api";

const Barber = ({ barberId, index }) => {
  const [barber, setBarber] = useState(null);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    const getBarber = async () => {
      try{
        setLoading(true)
        const res = await getAPI(`/barbers/${barberId}`);
        const data = await res.data;
        setBarber(data);
        setLoading(false)
      }
      catch(e){
        setLoading(false)
      }
      
    };
    getBarber();
  }, []);

  return (
    <div className="flex justify-center">
      { loading ? <div className="h-96 flex items-center justify-center"><div className="animate-spin">Loading...</div></div> : barber ? (
        <div className="py-2 lg:py-5 mx-2 flex flex-col max-w-[1250px] lg:flex-row lg:justify-between w-full gap-10">
          <div className="relative flex flex-col w-full lg:w-2/3">
            <BookingHero
              name={barber.nickname}
              address={barber.address}
              profilePicture={barber.picture}
              index={index}
            />
            <Services
              barber={barber}
              services={barber.services}
              booksyUrl={barber.booksyUrl}
            />
            {/* See Our Work */}
            {/* Reviews */}
          </div>

          <div className="fle flex-col w-full lg:w-1/3">
            <InfoCard
              name={barber.nickname}
              phone={barber.phone}
              address={barber.address}
              hours={barber.hours}
              about={barber.about}
              instagramUrl={barber.instagramUrl}
              booksyUrl={barber.booksyUrl}
              profilePicture={barber.picture}
            />
          </div>
        </div>
      ) : (
        <div className="flex h-full w-full justify-center items-center">
          <h1>Barber does not exist</h1>
        </div>
      )}
    </div>
  );
};

export default Barber;
