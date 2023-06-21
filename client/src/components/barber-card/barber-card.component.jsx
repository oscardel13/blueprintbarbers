import { useState, useEffect } from "react"

import Row from "react-bootstrap/Row"
import Col from "react-bootstrap/Col"
import Card from "react-bootstrap/Card"
import Figure from 'react-bootstrap/Figure'
import InstagramIcon from '@mui/icons-material/Instagram';

import InstagramGrid from "../instagram-grid/instagram-grid.component"
import { BooksyButton, InstagramButton, BarberCardContainer } from "./barber-card.styles"

const BarberCard = ({ barber }) => {
    const{ name,nickname,bio,instagramUrl,booksyUrl, profilePicUrl, posts } = barber
    const [picUrl, setPicUrl] = useState("enrique-profile-picture.jpg");
    const profilePicture = require("../../assets/" + picUrl );
    console.log(barber.instagram)
    useEffect(()=>{
        if (profilePicUrl)
            setPicUrl(profilePicUrl)
    },[])

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
                                src={profilePicture}
                            />
                        </Figure>
                    </Card.Body>
                </Col>
                <Col md={6}>
                    <Card.Body>
                        <Card.Title>{name}</Card.Title>
                        <Card.Subtitle>{nickname}</Card.Subtitle>
                        <Card.Text>{bio}</Card.Text>
                    </Card.Body>
                    <Card.Body>
                        <InstagramButton href={instagramUrl}><InstagramIcon fontSize="large"/></InstagramButton>{' '}
                        <BooksyButton href={booksyUrl}>Booksy</BooksyButton>
                    </Card.Body>
                    <Card.Body>
                        <InstagramGrid posts={barber.instagram}/>
                    </Card.Body>
                </Col>
            </Row>
        </BarberCardContainer>
    )
}

export default BarberCard;