import Row from "react-bootstrap/Row"
import Col from "react-bootstrap/Col"

import BarberCard from "../barber-card/barber-card.component"

import EnriqueProfilePic from "../../assets/enrique-profile-picture.jpg"
import LuisProfilePic from "../../assets/luis-profile-picture.jpg"

import { BarberDirectorySection } from "./barbers-section.styles"

const BarberSection = () => {
    return (
        <BarberDirectorySection>
            <div className="titlecontainer">
                <h2 style={{color:"lightgrey"}}>Barbers</h2>
            </div>

            <div className="barberscontainer">
                <Row>
                    <Col lg={{span: 10, offset:1}}>
                        <BarberCard profilePic={EnriqueProfilePic} name={"Enrique"} bio={"Enrique the barber. The one and only"}/>
                        <br/>
                        <BarberCard profilePic={LuisProfilePic} name={"Luis"} bio={"It is what it is"}/>
                    </Col>
                </Row>
                
            </div>
        </BarberDirectorySection>
    )
}

export default BarberSection;