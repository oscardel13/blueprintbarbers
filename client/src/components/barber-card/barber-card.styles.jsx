import { styled } from "styled-components";
import Button from 'react-bootstrap/Button'
import Card from "react-bootstrap/Card";

export const InstagramButton = styled(Button)`
    // background: linear-gradient(0deg, rgba(255,220,128,1) 0%, rgba(252,175,69,1) 9%, rgba(247,119,55,1) 17%, rgba(245,96,64,1) 23%, rgba(253,29,29,1) 32%, rgba(225,48,108,1) 50%, rgba(193,53,132,1) 59%, rgba(131,58,180,1) 79%, rgba(91,81,216,1) 93%, rgba(83,85,220,1) 96%, rgba(64,93,230,1) 100%);
    background-color: #ffdc80;
    background-image: linear-gradient(17deg, #ffdc80 0%, #fcaf45 16%, #f56040 38%, #e1306c 60%, #833ab4 80%, #405de6 100%);
    padding: 0.1rem 1rem;
    `

export const BooksyButton = styled(Button)`
    background: #0ba3ad;
`

export const BarberCardContainer = styled(Card)`
    .card-title{
        font-size: 3rem;
    }
`