import { styled } from "styled-components";

import bgImage1 from "../../assets/Barbers-background1.jpg"
import bgImage2 from "../../assets/Barbers-background2.jpg"

export const BarbersSectionContainer = styled.section`
    text-align: center;
    background: url(${bgImage1});
    background-size: auto;
    background-position: center;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    box-shadow: inset 0 0 0 2000px rgb(0 0 0 / 40%);
    h3 {
        font-size: 3rem;
    }
`