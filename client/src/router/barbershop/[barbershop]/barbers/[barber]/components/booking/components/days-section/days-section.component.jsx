import { useRef } from "react";
import DayCard from "../day-card/day-card.component";

// ADD WAY TO SCROLL BY DRAGGING
// MODULIZE THE SCROLLING PART AS ITS USED IN TIME SECTION TOO

const DaysSection = () => {
  const scrollContainerRef = useRef(null);
  /*
  Ideally we want to get this day by the dates present. so if 30, 31, 1, 2 , 3 it will print November - December. so
  so we need first day (27) and if the first visible day is greater or equal to (days in current month - 5) 
  to display the between and if its 1 display next month. we can do better if we can get how many days are visible
  */
  function getMonthYear() {
    const date = new Date();
    return date.toLocaleString("en-US", {
      month: "long",
      year: "numeric",
    });
  }

  // Generate the list of days
  const days = Array.from({ length: 14 }, (_, i) => {
    const date = new Date();
    date.setDate(date.getDate() + i);
    return {
      day: date.toLocaleString("en-US", { weekday: "short" }),
      date: date.toLocaleString("en-US", { day: "numeric" }),
    };
  });

  // Scroll functions
  const scrollLeft = () => {
    const childWidth = scrollContainerRef.current.offsetWidth + 8; // Add gap
    scrollContainerRef.current.scrollBy({
      left: -childWidth,
      behavior: "smooth",
    });
  };

  const scrollRight = () => {
    const childWidth = scrollContainerRef.current.offsetWidth + 8; // Add gap
    scrollContainerRef.current.scrollBy({
      left: childWidth,
      behavior: "smooth",
    });
  };

  return (
    <div className="py-5">
      <h3 className="w-full text-cente text-3xl font-semibold">
        {getMonthYear()}
      </h3>
      <div className="flex flex-row py-5">
        {/* Left Scroll Button */}
        <div className="hidden justify-center items-center pr-2 sm:flex sm:w-1/6">
          <button
            onClick={scrollLeft}
            className="flex justify-center items-center h-3 w-3 border p-5 rounded-full hover:shadow-xl font-bold"
          >
            &lt;
          </button>
        </div>

        {/* Scrollable Days Section */}
        <div
          ref={scrollContainerRef}
          className="flex flex-row sm:w-4/6 gap-2 py-4 overflow-auto invisible-scrollbar"
        >
          {days.map((day, index) => (
            <DayCard key={index} day={day} />
          ))}
        </div>

        {/* Right Scroll Button */}
        <div className="hidden justify-center items-center pl-2 sm:flex sm:w-1/6">
          <button
            onClick={scrollRight}
            className="flex justify-center items-center h-3 w-3 border p-5 rounded-full hover:shadow-xl font-bold"
          >
            &gt;
          </button>
        </div>
      </div>
    </div>
  );
};

export default DaysSection;
