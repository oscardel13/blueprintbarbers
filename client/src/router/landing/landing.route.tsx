import { useEffect, useState } from "react";

// import { ReactComponent as Logo } from '../../assets/BLUEPRINT.svg'
import Logo from "../../components/logo/logo.component";
import bgImage1 from "../../assets/landing_bg_1.jpg";
import bgImage2 from "../../assets/landing_bg_2.jpg";

const Landing = () => {
  const [smallScreen, setSmallScreen] = useState(window.innerWidth < 640);

  useEffect(() => {
    const handleResize = () => {
      setSmallScreen(window.innerWidth <= 576);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div
      className="flex flex-col items-center justify-center h-screen w-full bg-cover bg-bottom"
      style={{ backgroundImage: `url(${smallScreen ? bgImage1 : bgImage2})` }}
    >
      {/* Dark overlay */}
      <div className={`absolute inset-0 bg-black/40`} />
      <div className="flex flex-col items-center w-full text-white text-center space-y-6 z-20">
        <Logo styling={"scale-75 sm:scale-100 md:scale-125 lg:scale-150"} />
        <p className="text-lg font-medium">
          Call to make appointment:{" "}
          <a
            href="tel:7202335047"
            className="font-semibold hover:underline hover:text-blue-200 transition"
          >
            720-233-5047
          </a>
        </p>
      </div>
    </div>
  );
};

export default Landing;
