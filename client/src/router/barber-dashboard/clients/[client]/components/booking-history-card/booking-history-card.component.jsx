import { useEffect, useMemo, useState } from "react";
import EditSectionCardComponent from "../../../../edit/components/edit-section-card/edit-section-card.component"; // adjust path
import { getAPI } from "../../../../../../utils/api";
import BookingRow from "../booking-row/booking-row.component";

const BookingHistoryCard = ({ clientId }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [hasFetched, setHasFetched] = useState(false);

  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const params = useMemo(() => {
    const p = {
      clientId,
      //   scope: "past",
      //   limit: 20,
      //   sort: "startTime:desc",
    };

    return p;
  }, [clientId]);

  useEffect(() => {
    if (!isOpen) return;
    if (hasFetched) return;

    const fetchHistory = async () => {
      setLoading(true);
      setError(null);
      try {
        const res = await getAPI(`/bookings`, params);
        const all = res.data || [];

        const now = Date.now();
        const past = all
          .filter((b) => new Date(b.startTime).getTime() < now)
          .sort((a, b) => new Date(b.startTime) - new Date(a.startTime))
          .slice(0, 20);

        setBookings(past);
        setHasFetched(true);
      } catch (e) {
        setError(e);
      } finally {
        setLoading(false);
      }
    };

    fetchHistory();
  }, [isOpen, hasFetched, params]);

  return (
    <EditSectionCardComponent
      title="Booking History"
      description="Past appointments for this client."
      defaultOpen={false}
      forceOpen={isOpen}
      onOpenChange={setIsOpen}
      collapsible={true}
      actions={
        !hasFetched ? (
          <span className="text-xs font-semibold px-2 py-1 rounded bg-gray-100 text-gray-700">
            Loads on expand
          </span>
        ) : null
      }
    >
      {error ? (
        <div className="text-red-600">Error loading booking history.</div>
      ) : loading ? (
        <div className="text-gray-600">Loading history...</div>
      ) : !hasFetched ? (
        <div className="text-gray-600">
          Expand to load this client’s past bookings.
        </div>
      ) : bookings.length === 0 ? (
        <div className="text-gray-600">No past bookings.</div>
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

export default BookingHistoryCard;
