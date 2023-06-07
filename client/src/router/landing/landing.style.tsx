import { styled } from "styled-components";

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
` 

export const HeroSectionTitleContainer = styled.div`
    padding: 20%;
    text-align: center;
    color: white;
    h1 {
        font-size: 4rem;
    }
`

export const BarbersSectionContainer = styled.section`
    padding-top: 2rem;
    padding-bottom: 7.5rem;
    text-align: center;

    h3 {
        font-size: 3rem;
    }
`