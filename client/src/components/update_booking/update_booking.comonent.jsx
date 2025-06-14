import { useEffect, useState } from "react";
import EventBusyIcon from "@mui/icons-material/EventBusy";

import Popover from "../../components/popover/popover.component";
import DaysSection from "./components/days-section/days-section.component";
import SummarySection from "./components/summary-section/summary-section.component";
import TimeSection from "./components/times-section/times-section.component";
import TotalSection from "./components/total-section/total-section.component";
import { getAPI, putAPI } from "../../utils/api";
import { getFirstBookingDay, updateAvailability } from "./booking.helpers";
import Confirmation from "./components/confirmation/confirmation.component";
import { createBooking_Start_End_Time } from "../../utils/helper-functions";

// if no availability on a date add way to notify me if something opens

const UpdateBooking = ({ service, barberId, bookingId, closeBooking }) => {
  const [barber, setBarber] = useState(null);

  let availability = [];
  if (barber?.availability) {
    availability = updateAvailability(barber.availability, service.duration);
  }

  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTime, setSelectedTime] = useState(null);
  const [slots, setSlots] = useState([]);
  const [confirmedBooking, setConfirmedBooking] = useState(false);

  console.log(selectedDate);

  useEffect(() => {
    const getBarber = async () => {
      try {
        const res = await getAPI(`/barbers/${barberId}`);
        setBarber(res.data);
        setSelectedDate(
          getFirstBookingDay(
            updateAvailability(res.data.availability, service.duration)
          )
        );
      } catch (err) {
        alert(err);
      }
    };
    getBarber();
  }, []);

  useEffect(() => {
    const newSlots = availability.find(({ date }) => {
      return date === selectedDate;
    });
    if (newSlots?.slots) setSlots(newSlots.slots);
  }, [selectedDate]);

  if (!barber || !selectedDate) {
    return (
      <Popover closeTrigger={closeBooking}>
        <div className="flex justify-center items-center w-screen md:w-[768px] h-96 bg-white rounded-lg shadow-lg border">
          <p className="text-gray-500 text-lg">Loading barber info...</p>
        </div>
      </Popover>
    );
  }

  const updateSelectedDate = (date) => {
    setSelectedDate(date);
  };

  const updateSelectedTime = (time) => {
    setSelectedTime(time);
  };

  const getNextAvailableDate = () => {
    let nextDate;
    let selectedDateFound = false;
    for (let index in availability) {
      if (selectedDateFound && availability[index].slots.length > 0) {
        nextDate = availability[index].date;
        break;
      }
      if (availability[index].date === selectedDate) {
        selectedDateFound = true;
      }
    }
    if (!nextDate) {
      nextDate = availability[availability.length - 1].date;
    }
    setSelectedDate(nextDate);
  };

  // have this redirect to booking confirmed. it could say on the popover
  const confirmBooking = async () => {
    const { startTime, endTime } = createBooking_Start_End_Time(
      selectedTime,
      service
    );
    const booking = {
      startTime,
      endTime,
    };

    try {
      const res = await putAPI(`/bookings/${bookingId}`, booking);

      // If the booking was successful
      if (res.status === 200) {
        // Navigate to the booking confirmation page
        setConfirmedBooking(true);
      }
    } catch (err) {
      console.error("Booking failed:", err);
    }
  };

  return (
    <Popover closeTrigger={closeBooking}>
      {confirmedBooking ? (
        <Confirmation />
      ) : (
        <div className="relative flex flex-col px-3 py-5 bg-white w-screen md:w-[768px] rounded-lg shadow-lg border">
          <DaysSection
            selectedDate={selectedDate}
            updateSelectedDate={updateSelectedDate}
            availability={availability}
            slots={slots}
          />
          {slots.length > 0 && (
            <TimeSection
              slots={slots}
              selectedTime={selectedTime}
              updateSelectedTime={updateSelectedTime}
              serviceDuration={service.duration}
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
              <TotalSection
                confirmBooking={confirmBooking}
                total={service.price}
                duration={service.duration}
              />
            </>
          )}
          <button
            onClick={closeBooking}
            className="absolute flex justify-center items-center top-5 right-5 text-black text-4xl hover:animate-spin90 hover:text-gray-500 w-4 h-4"
          >
            &times;
          </button>
        </div>
      )}
    </Popover>
  );
};

export default UpdateBooking;
