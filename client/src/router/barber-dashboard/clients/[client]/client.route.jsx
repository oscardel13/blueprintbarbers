import { useEffect, useMemo, useState } from "react";
import { useParams, Link } from "react-router-dom";
import PageHeader from "../../components/page-header/page-header.component";
import EditSectionCardComponent from "../../edit/components/edit-section-card/edit-section-card.component"; // adjust path
import { getAPI } from "../../../../utils/api";

import ClientHeaderCard from "./components/client-header-card/client-header-card.component";
import UpcomingBookingsCard from "./components/upcoming-bookings-card/upcoming-bookings-card.component";
import BookingHistoryCard from "./components/booking-history-card/booking-history-card.component";
import { selectLastClient } from "../../../../store/barber/barber.selector";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { setLastClient } from "../../../../store/barber/barber.reducer";

const ClientPage = () => {
  const dispatch = useDispatch();
  const lastClient = useSelector(selectLastClient);
  const { id } = useParams();

  const [client, setClient] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchClient = async () => {
      setLoading(true);
      setError(null);
      try {
        const clientIdToFetch = id !== ":id" ? id : lastClient;
        const res = await getAPI(`/users/${clientIdToFetch}`);
        setClient(res.data);
        dispatch(setLastClient(res.data._id));
      } catch (e) {
        setError(e);
      } finally {
        setLoading(false);
      }
    };

    fetchClient();
  }, [id]);

  if (loading) return <div className="container px-4">Loading...</div>;
  if (error)
    return (
      <div className="container px-4 text-red-600">
        <span className="text-red-600">Error loading client.</span>
        <span className="block">Please search client in clients list.</span>
      </div>
    );
  if (!client) return <div className="container px-4">Client not found.</div>;

  return (
    <div className="container px-4 pb-10">
      <div className="flex items-center justify-between gap-3">
        <PageHeader title="Client" />
        <Link
          to="/barber-dashboard/clients"
          className="text-sm font-medium text-gray-700 hover:text-gray-900 underline"
        >
          ← Back to Clients
        </Link>
      </div>

      <div className="flex flex-col gap-3">
        <ClientHeaderCard client={client} />

        {/* Upcoming bookings: small + useful to show immediately */}
        <UpcomingBookingsCard clientId={client._id} />

        {/* History: lazy loaded on expand */}
        <BookingHistoryCard clientId={client._id} />
      </div>
    </div>
  );
};

export default ClientPage;
