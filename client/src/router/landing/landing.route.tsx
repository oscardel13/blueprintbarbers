import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

// import { ReactComponent as Logo } from '../../assets/BLUEPRINT.svg'
import Logo from "../../components/logo/logo.component";

import { HeroSectionContainer, HeroSectionTitleContainer } from "./landing.style";

const Landing = () => {
    return (
        <>
            <HeroSectionContainer>
                <HeroSectionTitleContainer className="container-fluid py-5 h-100">
                    <Row className="row d-flex justify-content-center align-items-center h-100">
                        <Col xs="auto">
                            <Logo/>
                        </Col>
                    </Row>
                </HeroSectionTitleContainer>
            </HeroSectionContainer>
        </>
    )
}

export default Landing;