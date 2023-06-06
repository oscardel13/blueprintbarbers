

import { HeroSectionContainer, HeroSectionTitleContainer, BarbersSectionContainer } from "./landing.style";

const Landing = () => {
    return (
        <>
            <HeroSectionContainer>
                <HeroSectionTitleContainer>
                    <h1>BLUEPRINT BARBERS</h1>
                </HeroSectionTitleContainer>
            </HeroSectionContainer>
            <BarbersSectionContainer>
                <h3>Barbers</h3>

            </BarbersSectionContainer>
        </>
    )
}

export default Landing;