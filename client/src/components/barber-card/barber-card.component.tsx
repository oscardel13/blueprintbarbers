import Row from "react-bootstrap/Row"
import Col from "react-bootstrap/Col"
import Card from "react-bootstrap/Card"
import Figure from 'react-bootstrap/Figure'
import Button from "react-bootstrap/Button"
import InstagramIcon from '@mui/icons-material/Instagram';

import profilePic from "../../assets/enrique-profile-picture.jpg"

import InstagramEmbed from 'react-instagram-embed';
import InstagramGrid from "../instagram-grid/instagram-grid.component"

const BarberCard = () => {
    console.log(process.env.REACT_APP_INSTAGRAM_OSCAR_CODE)
    return(
        <Card>
            <Row>
                <Col md={6}>
                    <Card.Body>
                        <Figure>
                            <Figure.Image
                                // width={171}
                                // height={180}
                                alt="171x180"
                                src={profilePic}
                            />
                        </Figure>
                    </Card.Body>
                </Col>
                <Col md={6}>
                    <Card.Body>
                        <Card.Title>Enrique</Card.Title>
                        <Card.Subtitle>8 years</Card.Subtitle>
                        <Card.Text>Enrique the barber. The one and only</Card.Text>
                    </Card.Body>
                    <Card.Body>
                        <Button href="https://www.instagram.com/enriquethebarber__/"><InstagramIcon/></Button>{' '}
                        <Button href="https://booksy.com/en-us/382802_enrique-the-barber_barber-shop_134761_denver#ba_s=sh_1" style={{backgroundColor:"#0ba3ad"}}>Booksy</Button>
                    </Card.Body>
                    <Card.Body>
                        {/* <Row>
                            <Col md={4}>
                                <Figure>
                                    <Figure.Image
                                        // width={171}
                                        // height={180}
                                        alt="171x180"
                                        src={profilePic}
                                    />
                                </Figure>
                            </Col>
                            <Col md={4}>
                                <Figure>
                                    <Figure.Image
                                        // width={171}
                                        // height={180}
                                        alt="171x180"
                                        src={profilePic}
                                    />
                                </Figure>
                            </Col>
                            <Col md={4}>
                                <Figure>
                                    <Figure.Image
                                        // width={171}
                                        // height={180}
                                        alt="171x180"
                                        src={profilePic}
                                    />
                                </Figure>
                            </Col>
                            <Col md={4}>
                                <Figure>
                                    <Figure.Image
                                        // width={171}
                                        // height={180}
                                        alt="171x180"
                                        src={profilePic}
                                    />
                                </Figure>
                            </Col>
                            <Col md={4}>
                                <Figure>
                                    <Figure.Image
                                        // width={171}
                                        // height={180}
                                        alt="171x180"
                                        src={profilePic}
                                    />
                                </Figure>
                            </Col>
                            <Col md={4}>
                                <Figure>
                                    <Figure.Image
                                        // width={171}
                                        // height={180}
                                        alt="171x180"
                                        src={profilePic}
                                    />
                                </Figure>
                            </Col>
                        </Row> */}
                        <InstagramGrid limit={6} token={process.env.REACT_APP_INSTAGRAM_OSCAR_CODE}/>
                    </Card.Body>
                </Col>
            </Row>
        </Card>
    )
}

export default BarberCard;