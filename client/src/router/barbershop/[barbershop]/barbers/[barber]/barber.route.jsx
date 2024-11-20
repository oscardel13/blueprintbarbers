import InfoCard from "./components/info-card/info-card.component";
import BookingHero from "./components/hero-section/hero-section.component";
import Services from "./components/services/services.component";

const Barber = ({ barber, index }) => {
  const {
    name,
    nickname,
    picture,
    address,
    phone,
    about,
    instagramUrl,
    booksyUrl,
    hours,
    services,
    reviews,
  } = barber;
  return (
    <div className="flex justify-center">
      <div className="py-2 lg:py-5 mx-2 flex flex-col max-w-[1250px] lg:flex-row lg:justify-between w-full gap-10">
        <div className="relative flex flex-col w-full lg:w-2/3">
          <BookingHero
            name={nickname}
            address={address}
            profilePicture={picture}
            index={index}
          />
          <Services barber={barber} services={services} booksyUrl={booksyUrl} />
          {/* See Our Work */}
          {/* Reviews */}
        </div>

        <div className="fle flex-col w-full lg:w-1/3">
          <InfoCard
            name={nickname}
            phone={phone}
            address={address}
            hours={hours}
            about={about}
            instagramUrl={instagramUrl}
            booksyUrl={booksyUrl}
            profilePicture={picture}
          />
        </div>
      </div>
    </div>
  );
};

export default Barber;
