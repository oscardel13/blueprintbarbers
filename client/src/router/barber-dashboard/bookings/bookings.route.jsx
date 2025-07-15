import { useState } from "react";

import Weekly from "./components/weekly/weekly.compnent";
import Monthly from "./components/monthly/monthly.component";
import Day from "./components/day/day.component";
import PageHeader from "../components/page-header/page-header.component";

const BookingsPage = () => {
  const [view, setView] = useState("monthly"); // default to monthly
  const now = new Date();
  const [selectedDay, setSelectedDay] = useState(new Date(now.getFullYear(), now.getMonth(), now.getDate())); // default to today

  const handleViewChange = (newView) => {
    setView(newView);
  };

  return (
    <div className="container">
      {/* Top Button Group */}
      <PageHeader title="Bookings" />
      <div className="flex gap-4 mb-6">
        <button
          onClick={() => handleViewChange("monthly")}
          className={`px-4 py-2 rounded hover:bg-gray-500 hover:text-white ${
            view === "monthly" ? "bg-black text-white" : "bg-gray-200"
          }`}
        >
          Monthly
        </button>
        <button
          onClick={() => handleViewChange("weekly")}
          className={`px-4 py-2 rounded hover:bg-gray-500 hover:text-white ${
            view === "weekly" ? "bg-black  text-white" : "bg-gray-200"
          }`}
        >
          Weekly
        </button>
        <button
          onClick={() => handleViewChange("day")}
          className={`px-4 py-2 rounded hover:bg-gray-500 hover:text-white ${
            view === "day" ? "bg-black  text-white" : "bg-gray-200"
          }`}
        >
          Day
        </button>
      </div>

      {/* Main View Outlet */}
      <div className="mb-8">
        {view === "monthly" && (
          <Monthly selectedDay={selectedDay} setSelectedDay={setSelectedDay} />
        )}
        {view === "weekly" && (
          <Weekly selectedDay={selectedDay} setSelectedDay={setSelectedDay} />
        )}
        {view === "day" && (
          <Day selectedDay={selectedDay} setSelectedDay={setSelectedDay} />
        )}
      </div>

      {/* Bookings Section */}
      {view !== "day" && (
        <div className="mt-4">
          <Day selectedDay={selectedDay} setSelectedDay={setSelectedDay} />
        </div>
      )}
    </div>
  );
};

export default BookingsPage;
