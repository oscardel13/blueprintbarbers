import { useState, useEffect } from "react"

import Row from "react-bootstrap/Row"
import Col from "react-bootstrap/Col"
import Card from "react-bootstrap/Card"
import Figure from 'react-bootstrap/Figure'
import InstagramIcon from '@mui/icons-material/Instagram';

import InstagramGrid from "../image-grids/enrique-grid.component"
import { BooksyButton, InstagramButton, BarberCardContainer } from "./barber-card.styles"

const BarberCard = ({ barber }) => {
    const{ name,bio,instagramUrl,booksyUrl, profilePicUrl, ImageGrid } = barber
    const [picUrl, setPicUrl] = useState("enrique-profile-picture.jpg");
    const profilePicture = require("../../assets/" + picUrl );
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
                            <img className="d-block w-100 max-h-[800px]" src={profilePicture}
                            />
                        </Figure>
                    </Card.Body>
                </Col>
                <Col md={6}>
                    <Card.Body>
                        <Card.Title>{name}</Card.Title>
                        <br/>
                        <InstagramButton href={instagramUrl}><InstagramIcon fontSize="large"/></InstagramButton>{' '}
                        <BooksyButton href={booksyUrl}>Book</BooksyButton>
                    </Card.Body>
                    <Card.Body>
                        {ImageGrid}
                    </Card.Body>
                </Col>
            </Row>
        </BarberCardContainer>
    )
}

export default BarberCard;