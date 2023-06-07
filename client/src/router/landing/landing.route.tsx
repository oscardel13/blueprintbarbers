
import BarberSection from "../../components/barbers-section/barbers-section.component";

import { HeroSectionContainer, HeroSectionTitleContainer, BarbersSectionContainer } from "./landing.style";

const Landing = () => {
    return (
        <>
            <HeroSectionContainer>
                <HeroSectionTitleContainer>
                    <h1>BLUEPRINT BARBERS</h1>
                </HeroSectionTitleContainer>
            </HeroSectionContainer>
            <BarberSection/>
        </>
    )
}

export default Landing;