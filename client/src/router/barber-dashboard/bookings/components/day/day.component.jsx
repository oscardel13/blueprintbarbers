import { useState } from "react";

const Day = ({ selectedDay, setSelectedDay }) => {
  const [currentDay, setCurrentDay] = useState(selectedDay);

  // non-overlapping test data
  const bookings = [
    { start: "09:00", end: "09:45", name: "John Doe", service: "Haircut" },
    { start: "09:45", end: "10:30", name: "Doe John", service: "Haircut" },
    { start: "14:00", end: "15:00", name: "Billie Green", service: "Haircut" },
    { start: "11:30", end: "12:30", name: "Alex Brown", service: "Shave" },
  ];

  const goToPreviousDay = () => {
    const prev = new Date(currentDay);
    prev.setDate(prev.getDate() - 1);
    setCurrentDay(prev);
    setSelectedDay(prev);
  };
  const goToNextDay = () => {
    const next = new Date(currentDay);
    next.setDate(next.getDate() + 1);
    setCurrentDay(next);
    setSelectedDay(next);
  };

  // 1px per minute makes math trivial
  const pxPerMinute = 2.25;
  const dayStartMinutes = 8 * 60; // 8:00 AM

  // calculate top offset and height in px
  const getBookingStyles = ({ start, end }) => {
    const [sh, sm] = start.split(":").map(Number);
    const [eh, em] = end.split(":").map(Number);
    const startTotal = sh * 60 + sm;
    const endTotal = eh * 60 + em;
    const top = (startTotal - dayStartMinutes) * pxPerMinute;
    const height = (endTotal - startTotal) * pxPerMinute;
    return { top, height };
  };

  const formatFullTime = (h) =>
    new Date(0, 0, 0, h, 0).toLocaleTimeString([], {
      hour: "numeric",
      minute: "2-digit",
    });

  return (
    <div className="py-4 lg:px-60">
      {/* Date Navigation */}
      <div className="flex justify-between items-center mb-4">
        <button
          onClick={goToPreviousDay}
          className="w-8 h-8 rounded-full border border-black flex items-center justify-center hover:bg-black hover:text-white font-bold"
        >
          &lt;
        </button>
        <h2 className="text-lg font-semibold">
          {currentDay.toLocaleDateString(undefined, {
            weekday: "long",
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
        </h2>
        <button
          onClick={goToNextDay}
          className="w-8 h-8 rounded-full border border-black flex items-center justify-center hover:bg-black hover:text-white font-bold"
        >
          &gt;
        </button>
      </div>

      {/* Timeline */}
      <div className="relative border-l border-gray-300">
        {/* time markers */}
        {Array.from({ length: 12 }, (_, i) => {
          const hour = 8 + i;
          return (
            <div
              key={hour}
              className="relative"
              style={{ height: 60 * pxPerMinute }}
            >
              {/* solid line at top of each hour */}
              <div className="absolute top-0 left-0 right-0 flex items-center">
                <div className="w-[70px] text-right pr-2 text-sm font-medium">
                  {formatFullTime(hour)}
                </div>
                <div className="flex-1 border-t border-gray-700" />
              </div>
              {/* dashed lines at 15/30/45 */}
              {[15, 30, 45].map((m) => (
                <div
                  key={m}
                  className="absolute left-0 right-0 flex items-center"
                  style={{ top: m * pxPerMinute }}
                >
                  <div className="w-[70px] text-right pr-2 text-xs text-gray-500">{`${String(
                    m
                  ).padStart(2, "0")}`}</div>
                  <div className="flex-1 border-t border-dashed border-gray-500" />
                </div>
              ))}
            </div>
          );
        })}

        {/* bookings */}
        {bookings.map((b, idx) => {
          const { top, height } = getBookingStyles(b);
          return (
            <div
              key={idx}
              className="absolute bg-black border-l-4 border-gray-800 rounded p-2 shadow-sm z-10"
              style={{
                top: top + 13.5, // nudge just below the line
                height: height - 9, // end before next line
                left: 71, // match paddingLeft
                right: 1,
              }}
            >
              <div className="flex flex-row items-center gap-2 font-semibold text-white">
                <div>{b.name}</div>
                <span>&#8226;</span>
                <div>{b.service}</div>
              </div>
              <div className="text-white">{`${b.start} - ${b.end}`}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Day;
