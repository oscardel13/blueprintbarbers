import { useEffect, useMemo, useState } from "react";
import EditSectionCardComponent from "../../../../edit/components/edit-section-card/edit-section-card.component"; // adjust path
import { getAPI } from "../../../../../../utils/api";
import BookingRow from "../booking-row/booking-row.component";

const UpcomingBookingsCard = ({ clientId }) => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const params = useMemo(() => {
    const p = {
      clientId,
      start: new Date(),
    };

    return p;
  }, [clientId]);

  useEffect(() => {
    const fetchUpcoming = async () => {
      setLoading(true);
      setError(null);
      try {
        const res = await getAPI(`/bookings?`, params);
        const all = res.data || [];

        // Client-side filter for "upcoming" for now (even if API doesn't support scope yet)
        const now = Date.now();
        const upcoming = all
          .filter((b) => new Date(b.startTime).getTime() >= now)
          .filter((b) => b.status !== "canceled")
          .sort((a, b) => new Date(a.startTime) - new Date(b.startTime))
          .slice(0, 3);

        setBookings(upcoming);
      } catch (e) {
        setError(e);
      } finally {
        setLoading(false);
      }
    };

    fetchUpcoming();
  }, [params]);

  return (
    <EditSectionCardComponent
      title="Upcoming Bookings"
      description="Next appointments for this client."
      defaultOpen={true}
      collapsible={false}
    >
      {error ? (
        <div className="text-red-600">Error loading bookings.</div>
      ) : loading ? (
        <div className="text-gray-600">Loading upcoming bookings...</div>
      ) : bookings.length === 0 ? (
        <div className="text-gray-600">No upcoming bookings.</div>
      ) : (
        <div className="space-y-2">
          {bookings.map((b) => (
            <BookingRow key={b._id} booking={b} />
          ))}
        </div>
      )}
    </EditSectionCardComponent>
  );
};

export default UpcomingBookingsCard;
