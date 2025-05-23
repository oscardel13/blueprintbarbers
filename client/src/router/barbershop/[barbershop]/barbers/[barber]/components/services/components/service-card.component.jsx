import { useState } from "react";
import Booking from "../../booking/booking.component";
// Service card (service name, cost, duration) tailwind
const ServiceCard = ({ service, booksyUrl }) => {
  const [showBooking, setShowBooking] = useState(false);

  const triggerBooking = () => {
    setShowBooking((prev) => !prev);
  };

  const { name, description, price, duration } = service;
  //   function that turn duration to minutes but if more than an hour says 1h XXmin also if its just 1 hour don't add the minutes but 60 should come as 1h
  function durationToMinutes(duration) {
    if (duration < 60) {
      return `${duration}min`;
    } else if (duration % 60 === 0) {
      return `${duration / 60}h`;
    } else {
      return `${Math.floor(duration / 60)}h ${duration % 60}min`;
    }
  }

  //   function that turn price already in dollars to dollars and cents
  function priceToDollars(price) {
    return `$${(price / 1).toFixed(2)}`;
  }

  return (
    <div className="flex flex-row justify-between py-5">
      <div className="flex flex-col card-body text-left">
        <h2 className="card-title">{name}</h2>
        <p className="text-gray-400 text-xs">{description}</p>
      </div>
      <div className="flex flex-row gap-5 justify-right text-right">
        <div className="flex flex-col">
          <p className="text-black">{priceToDollars(price)}</p>
          <p className="text-gray-400 text-sm">{durationToMinutes(duration)}</p>
        </div>
        <div className="flex items-center p-1">
          <a
            href={booksyUrl}
            // onClick={triggerBooking}
            className="flex justify-center items-center border border-[[#00a3ad]] bg-[#00a3ad] text-white rounded-lg text-sm px-2 py-1 hover:bg-[#53d3db]"
          >
            Book
          </a>
        </div>
      </div>
      {showBooking && <Booking closeBooking={triggerBooking} />}
    </div>
  );
};

export default ServiceCard;
