import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import BarberSection from "../../components/barbers-section/barbers-section.component";

import { HeroSectionContainer, HeroSectionTitleContainer } from "./landing.style";

const Landing = () => {
    return (
        <>
            <HeroSectionContainer>
                <HeroSectionTitleContainer className="container-fluid py-5 h-100">
                    <Row className="row d-flex justify-content-center align-items-center h-100">
                        <Col className="col col-md-8">
                            <h1>BLUEPRINT BARBERS</h1>
                            <p>

                            </p>
                        </Col>
                    </Row>
                </HeroSectionTitleContainer>
            </HeroSectionContainer>
            {/* <BarberSection/> */}
        </>
    )
}

export default Landing;