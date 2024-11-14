import { styled } from "styled-components";

import bgImage from "../../../../assets/Barbers-background1.jpg";

export const BarbersSectionContainer = styled.section`
  text-align: center;
  background: url(${bgImage});
  background-size: auto;
  background-position: center;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  box-shadow: inset 0 0 0 2000px rgb(0 0 0 / 40%);
  // position: relative;
  overflow: hidden;
  h3 {
    font-size: 3rem;
  }
`;
