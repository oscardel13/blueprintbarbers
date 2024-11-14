import Popover from "../../../../../../../components/popover/popover.component";
import DaysSection from "./components/days-section/days-section.component";
import SummarySection from "./components/summary-section/summary-section.component";
import TimeSection from "./components/times-section/times-section.component";
import TotalSection from "./components/total-section/total-section.component";

const Booking = ({ closeBooking }) => {
  return (
    <Popover closeTrigger={closeBooking}>
      <div className="relative flex flex-col p-3 bg-white w-full max-w-[770px]">
        <h3>Booking</h3>
        <DaysSection />
        <TimeSection />
        <SummarySection />
        <TotalSection />
      </div>
    </Popover>
  );
};

export default Booking;
