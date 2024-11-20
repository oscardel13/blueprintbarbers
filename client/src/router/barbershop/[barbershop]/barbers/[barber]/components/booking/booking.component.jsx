import { useEffect, useState } from "react";
import bookingData from "./booking.data";
import EventBusyIcon from "@mui/icons-material/EventBusy";

import Popover from "../../../../../../../components/popover/popover.component";
import DaysSection from "./components/days-section/days-section.component";
import SummarySection from "./components/summary-section/summary-section.component";
import TimeSection from "./components/times-section/times-section.component";
import TotalSection from "./components/total-section/total-section.component";

// if no availability on a date add way to notify me if something opens up

const Booking = ({ service, barber, closeBooking }) => {
  // function that gets the first bookingDay with open slots
  const getFirstBookingDay = () => {
    const firstBookingDay = bookingData.find(({ slots }) => {
      return slots.length > 0;
    });
    return firstBookingDay.date;
  };
  const firstBookingDay = getFirstBookingDay();
  const [selectedDate, setSelectedDate] = useState(firstBookingDay);
  const [selectedTime, setSelectedTime] = useState(null);
  const [slots, setSlots] = useState([]);

  useEffect(() => {
    const newSlots = bookingData.find(({ date }) => {
      return date === selectedDate;
    });
    setSlots(newSlots.slots);
  }, [selectedDate]);

  const updateSelectedDate = (date) => {
    setSelectedDate(date);
  };

  const updateSelectedTime = (time) => {
    setSelectedTime(time);
  };

  const getNextAvailableDate = () => {
    let nextDate;
    let selectedDateFound = false;
    for (let index in bookingData) {
      if (selectedDateFound && bookingData[index].slots.length > 0) {
        nextDate = bookingData[index].date;
        break;
      }
      if (bookingData[index].date === selectedDate) {
        selectedDateFound = true;
      }
    }
    if (!nextDate) {
      nextDate = bookingData[bookingData.length - 1].date;
    }
    setSelectedDate(nextDate);
  };

  return (
    <Popover closeTrigger={closeBooking}>
      <div className="relative flex flex-col px-3 py-5 bg-white w-screen md:w-[768px] rounded-lg shadow-lg border">
        <DaysSection
          selectedDate={selectedDate}
          updateSelectedDate={updateSelectedDate}
          availability={bookingData}
        />
        {slots.length > 0 && (
          <TimeSection
            slots={slots}
            selectedTime={selectedTime}
            updateSelectedTime={updateSelectedTime}
          />
        )}
        {slots.length === 0 && (
          <div className="flex flex-col justify-center items-center py-5 gap-5">
            <EventBusyIcon className="text-gray-500 text-6xl" />
            <h6 className="text-lg font-semibold">
              There is no availability left on this date
            </h6>
            <button
              className="py-2 px-5 flex justify-center items-center bg-blue-500 border rounded-lg text-white hover:bg-blue-300 cursor-pointer"
              onClick={getNextAvailableDate}
            >
              Find Next Available Date
            </button>
          </div>
        )}
        {slots.length > 0 && (
          <SummarySection
            barber={barber}
            service={service}
            startTime={selectedTime}
          />
        )}
        {slots.length > 0 && (
          <>
            <hr className="my-5" />
            <TotalSection total={service.price} duration={service.duration} />
          </>
        )}
        <button
          onClick={closeBooking}
          className="absolute flex justify-center items-center top-5 right-5 text-black text-4xl hover:animate-spin90 hover:text-gray-500 w-4 h-4"
        >
          &times;
        </button>
      </div>
    </Popover>
  );
};

export default Booking;
