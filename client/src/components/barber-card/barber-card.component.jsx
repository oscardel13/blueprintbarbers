import Row from "react-bootstrap/Row"
import Col from "react-bootstrap/Col"
import Card from "react-bootstrap/Card"
import Figure from 'react-bootstrap/Figure'
import Button from "react-bootstrap/Button"
import InstagramIcon from '@mui/icons-material/Instagram';

import InstagramGrid from "../instagram-grid/instagram-grid.component"
import { BooksyButton, InstagramButton, BarberCardContainer } from "./barber-card.styles"

const BarberCard = ({profilePic, name, bio}) => {
    console.log(process.env.REACT_APP_INSTAGRAM_OSCAR_CODE)
    return(
        <BarberCardContainer>
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
                        <Card.Title>{name}</Card.Title>
                        <Card.Subtitle>8 years</Card.Subtitle>
                        <Card.Text>{bio}</Card.Text>
                    </Card.Body>
                    <Card.Body>
                        <InstagramButton href="https://www.instagram.com/enriquethebarber__/"><InstagramIcon fontSize="large"/></InstagramButton>{' '}
                        <BooksyButton href="https://booksy.com/en-us/dl/show-business/382802">Booksy</BooksyButton>
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
        </BarberCardContainer>
    )
}

export default BarberCard;