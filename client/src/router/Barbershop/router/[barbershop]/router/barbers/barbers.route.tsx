import BarbersTabs from "./components/barbers-tabs/barbers-tabs.component";

import { BarbersSectionContainer } from "./barbers.styles";

const Barbers = () => {
  return (
    <BarbersSectionContainer>
      <BarbersTabs />
    </BarbersSectionContainer>
  );
};

export default Barbers;
