const DayCard = ({ day, openSlots }) => {
  if (!openSlots) {
    openSlots = Array(15).fill(0);
    if (day.date === "15") {
      openSlots = Array(8).fill(0);
    }
    if (day.date === "16") {
      openSlots = Array(3).fill(0);
    }
    if (day.date === "19" || day.date === "20") {
      openSlots = [];
    }
  }
  const selectedDay = 16;
  const selected = day.date === selectedDay.toString();
  const isToday = day.date === new Date().getDate().toString();
  return (
    <div
      className={`flex flex-col flex-shrink-0 justify-center h-24 w-16 px-1 py-2 border border-gray-400 rounded-lg cursor-pointer hover:bg-gray-100 invisible-scrollbar ${
        selected ? "bg-blue-500" : openSlots.length === 0 ? "text-gray-500" : ""
      }`}
    >
      <span
        className={`${
          selected
            ? "text-white"
            : isToday
            ? "text-blue-500"
            : openSlots.length === 0
            ? "text-gray-500"
            : ""
        }`}
      >
        {day.day}
      </span>
      <span
        className={`${
          selected
            ? "text-white font-bold"
            : isToday
            ? "text-blue-500 font-semibold"
            : "font-semibold"
        }`}
      >
        {day.date}
      </span>
      {openSlots.length === 0 ? null : openSlots.length < 4 ? (
        <div className="flex px-5 pt-2">
          <div className="h-[6px] w-full bg-red-600 rounded-lg border border-white"></div>
        </div>
      ) : openSlots.length <= 10 ? (
        <div className="flex px-4 pt-2">
          <div className="h-[6px] w-full bg-yellow-600 rounded-lg border border-white"></div>
        </div>
      ) : (
        <div className="flex px-3 pt-2">
          <div className="h-[6px] w-full bg-green-600 rounded-lg border border-white"></div>
        </div>
      )}
    </div>
  );
};

export default DayCard;
