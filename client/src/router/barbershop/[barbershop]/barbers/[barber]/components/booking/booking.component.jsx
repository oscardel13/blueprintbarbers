import Popover from "../../../../../../../components/popover/popover.component";
import DaysSection from "./components/days-section/days-section.component";
import SummarySection from "./components/summary-section/summary-section.component";
import TimeSection from "./components/times-section/times-section.component";
import TotalSection from "./components/total-section/total-section.component";

const Booking = ({ closeBooking }) => {
  return (
    <Popover closeTrigger={closeBooking}>
      <div className="relative flex flex-col px-3 py-5 bg-white w-screen md:w-[768px] rounded-lg shadow-lg border">
        <DaysSection />
        <TimeSection />
        <SummarySection />
        <hr className="my-5" />
        <TotalSection />
        <button
          onClick={closeBooking}
          className="absolute top-1 right-2 m-4 text-black text-4xl"
        >
          &times;
        </button>
      </div>
    </Popover>
  );
};

export default Booking;
