import { useEffect, useMemo, useState } from "react";
import PageHeader from "./components/page-header/page-header.component"; // adjust path
import { getAPI } from "../../utils/api"; // adjust path

import StatCard from "./components/widgets/stat-card.component";
import NextBookingWidget from "./components/widgets/next-booking-widget.component";
import BookingsWidget from "./components/widgets/bookings-widget.component";
import PerformanceWidget from "./components/widgets/performance-widget.component";
import TopClientsWidget from "./components/widgets/top-clients-widget.component";
import { useSelector } from "react-redux";
import { selectCurrentBarber } from "../../store/barber/barber.selector";

const BarberDashboardHome = () => {
  const barber = useSelector(selectCurrentBarber);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // You can split these later (summary endpoint vs bookings endpoint)
  const [upcomingBookings, setUpcomingBookings] = useState([]);

  useEffect(() => {
    const fetchDashboardData = async () => {
      setLoading(true);
      setError(null);
      try {
        // Best practice later:
        // const summary = await getAPI("/dashboard/barber/summary");
        // const bookings = await getAPI("/bookings?scope=upcoming&limit=10");
        // const clients = await getAPI("/barbers/me/top-clients?limit=5");

        // For now just call what you already have (edit later)
        const bookingsRes = await getAPI("/bookings", {
          barberId: barber._id,
          start: new Date(),
        }); // adjust if needed
        const bookings = bookingsRes.data || [];
        setUpcomingBookings(bookings);
      } catch (e) {
        setError(e);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, [barber]);

  const nextBooking = useMemo(() => {
    const now = Date.now();
    const future = upcomingBookings
      .filter((b) => new Date(b.startTime).getTime() >= now)
      .filter((b) => b.status !== "canceled")
      .sort((a, b) => new Date(a.startTime) - new Date(b.startTime));
    return future[0] || null;
  }, [upcomingBookings]);

  if (error) {
    console.log("Error loading dashboard:", error);
    return (
      <div className="container px-4">
        <PageHeader title="Dashboard" />
        <div className="text-red-600">Error loading dashboard.</div>
      </div>
    );
  }

  return (
    <div className="container px-4 pb-10">
      <PageHeader title="Dashboard" />

      {/* Main widgets */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-3">
        <div className="lg:col-span-2">
          <NextBookingWidget booking={nextBooking} loading={loading} />
        </div>

        <BookingsWidget bookings={upcomingBookings} loading={loading} />
      </div>

      {/* Stats row */}
      <PerformanceWidget barber={barber} defaultTab="week" />

      {/* Bottom widgets */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 mt-3">
        <TopClientsWidget />
        {/* Optional: add “Quick actions” later */}
        <div className="border rounded-2xl bg-white shadow-sm p-6">
          <p className="text-lg font-semibold text-gray-900">Quick actions</p>
          <div className="mt-4 flex flex-col gap-2">
            <a
              className="underline text-gray-700 hover:text-gray-900"
              href="/barber-dashboard/bookings"
            >
              View bookings →
            </a>
            <a
              className="underline text-gray-700 hover:text-gray-900"
              href="/barber-dashboard/clients"
            >
              View clients →
            </a>
            <a
              className="underline text-gray-700 hover:text-gray-900"
              href="/barber-dashboard/edit"
            >
              Edit profile →
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BarberDashboardHome;
