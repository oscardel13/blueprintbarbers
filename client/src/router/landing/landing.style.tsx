import { styled } from "styled-components";
import Container from "react-bootstrap/Container";

import bgImage from '../../assets/pexels-stefan-lorentz-668196.jpg'
import enrique from '../../assets/IMG_0225.jpg'

export const HeroSectionContainer = styled.section`
    background: url(${enrique});
    transform: scale(1);
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    margin: 0;
    background-size: contain;
    background-position: center;
    overflow: hidden;
    box-shadow: inset 0 0 0 2000px rgb(0 0 0 / 40%);
    height: 100vh;
    position: sticky;
    z-index: -99;
` 

export const HeroSectionTitleContainer = styled(Container)`
    color: white;
    h1 {
        font-size: 4rem;
    }
`