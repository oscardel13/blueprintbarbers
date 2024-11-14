import MapSection from "./components/map-section/map-section.component";
import AboutSection from "./components/about-section/about-section.component";
import ContactAndHoursSection from "./components/contact+hours-section/contact+hours.component";
import SocialSection from "./components/socials-section/socials-section.component";

// these sections can be modulize as well (do it when it grows to new user and only show if they have info filled in)
const InfoCard = ({
  name,
  hours,
  phone,
  address,
  about,
  profilePicture,
  instagramUrl,
  booksyUrl,
}) => {
  return (
    <div className="bg-gray-100 ">
      {/* MAP with mini profile and address card */}
      <MapSection
        address={address}
        name={name}
        profilePicture={profilePicture}
      />
      {/* About */}
      {about && about.length > 0 && <AboutSection about={about} />}

      {/* title (this could all be one (title, contact, businesness hoursl)) */}
      <ContactAndHoursSection hours={hours} phone={phone} />
      <hr />

      {/* Socials */}
      <SocialSection instagramUrl={instagramUrl} booksyUrl={booksyUrl} />
    </div>
  );
};

export default InfoCard;
