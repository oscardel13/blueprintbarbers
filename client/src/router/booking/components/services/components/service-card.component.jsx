// Service card (service name, cost, duration) tailwind
const ServiceCard = ({ service }) => {
  const { name, price, duration } = service;
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
      <div className="card-body">
        <h2 className="card-title">{name}</h2>
      </div>
      <div className="flex flex-row gap-5 justify-right text-right">
        <div className="flex flex-col">
          <p className="text-black">{priceToDollars(price)}</p>
          <p className="text-gray-400 text-sm">{durationToMinutes(duration)}</p>
        </div>
        <div className="flex items-center p-1">
          <button className="flex justify-center items-center border border-[[#00a3ad]] bg-[#00a3ad] text-white rounded-lg text-sm px-2 py-1 hover:bg-[#53d3db]">
            Book
          </button>
        </div>
      </div>
    </div>
  );
};

export default ServiceCard;
