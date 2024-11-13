import React, { useEffect, useState } from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

// import { ReactComponent as Logo } from '../../assets/BLUEPRINT.svg'
import Logo from "../../components/logo/logo.component";

import {
  HeroSectionContainer,
  HeroSectionTitleContainer,
} from "./landing.style";

const Landing = () => {
  const [smallScreen, setSmallScreen] = useState(window.innerWidth <= 576);

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
    <HeroSectionContainer smallScreen={smallScreen.toString()}>
      <HeroSectionTitleContainer className="container-fluid py-5 h-100">
        <Row className="row d-flex justify-content-center align-items-center ">
          <Col xs="auto">
            <Logo />
          </Col>
        </Row>
      </HeroSectionTitleContainer>
    </HeroSectionContainer>
  );
};

export default Landing;
