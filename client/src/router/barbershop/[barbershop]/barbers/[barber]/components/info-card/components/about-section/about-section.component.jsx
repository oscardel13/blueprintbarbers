import { convertStringToHTML } from "../../info-card.helper-functions";

const AboutSection = ({ about }) => {
  return (
    <div className="py-3 mt-5 flex flex-col px-5">
      <h6 className="font-semibold pb-5 text-left">ABOUT US</h6>
      {convertStringToHTML(about)}
    </div>
  );
};

export default AboutSection;
