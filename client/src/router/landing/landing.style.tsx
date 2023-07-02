import { styled } from "styled-components";
import Container from "react-bootstrap/Container";

import bgImage from '../../assets/dark_barber_pole.jpg'
import enrique from '../../assets/IMG_0225.jpg'

export const HeroSectionContainer = styled.section`
    background: url(${bgImage});
    transform: scale(1);
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    margin: 0;
    background-position: center;
    overflow: hidden;
    box-shadow: inset 0 0 0 2000px rgb(0 0 0 / 40%);
    height: 100vh;
    position: sticky;
    z-index: -99;
    @media only screen and (max-width: 576px){
        background-size: cover;
    }
` 

export const HeroSectionTitleContainer = styled(Container)`
    color: white;
    h1 {
        font-size: 4rem;
    }

    
    @media only screen and (max-width: 576px){
        svg{
            height: 400px;
            width: 400px;
        }
    }
    @media only screen and (min-width: 576px){
        svg{
            height: 500px;
            width: 500px;
        }
    }
    @media only screen and (min-width: 768px){
        svg{
            height: 600px;
            width: 600px;
        }
    }
    @media only screen and (min-width: 992px){
        svg{
            height: 700px;
            width: 700px;
        }
    }
    @media only screen and (min-width: 1200px){
        svg{
            height: 800px;
            width: 800px;
        }
    }
`