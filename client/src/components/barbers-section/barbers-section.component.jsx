import Row from "react-bootstrap/Row"
import Col from "react-bootstrap/Col"

import BarberCard from "../barber-card/barber-card.component"

import { BarberDirectorySection } from "./barbers-section.styles"

const BarberSection = () => {
    return (
        <BarberDirectorySection>
            <div className="titlecontainer">
                <h2>Barbers</h2>
            </div>

            <div className="barberscontainer">
                <Row>
                    <Col lg={{span: 10, offset:1}}>
                        <BarberCard/>
                    </Col>
                </Row>
                
            </div>
        </BarberDirectorySection>
    )
}

export default BarberSection;