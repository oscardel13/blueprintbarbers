import { useEffect, useMemo, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { getAPI } from "../../../../utils/api"; // adjust path to match your project

const formatMoney = (value) => {
  const num = Number(value);
  if (!Number.isFinite(num)) return "--";
  return `$${num.toFixed(0)}`;
};

const getClientName = (client) => {
  if (!client) return "Client";
  const name = `${client.firstName || ""} ${client.lastName || ""}`.trim();
  return name || client.name || client.email || "Client";
};

const TopClientsWidget = ({
  limit = 5,
  sortBy = "totalSpent", // "totalSpent" | "totalBookings" | "lastAppointmentAt"
  sortDir = "desc", // "asc" | "desc"
  lazy = true, // fetch when visible
}) => {
  const ref = useRef(null);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [clients, setClients] = useState([]);

  const [isVisible, setIsVisible] = useState(!lazy);

  useEffect(() => {
    if (!lazy) return;

    const el = ref.current;
    if (!el) return;

    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          io.disconnect();
        }
      },
      { rootMargin: "200px" },
    );

    io.observe(el);
    return () => io.disconnect();
  }, [lazy]);

  const params = useMemo(() => {
    // Optional: if your backend supports sorting/limit, this will work.
    // If not, no problem — we still sort locally below.
    return {
      limit,
      sortBy,
      sortDir,
    };
  }, [limit, sortBy, sortDir]);

  useEffect(() => {
    if (!isVisible) return;

    const fetchClients = async () => {
      setLoading(true);
      setError(null);

      try {
        // Keep this for later (when testing with clients and bookings for now use other)
        // const res = await getAPI("/barbers/me/top-clients?limit=5");

        // For now: pull full list
        const res = await getAPI("/barbers/me/clients", params);

        // Support either shape:
        // 1) { clients: [...] }
        // 2) [...]
        const list = res.data?.clients || res.data || [];
        setClients(Array.isArray(list) ? list : []);
      } catch (e) {
        setError(e);
      } finally {
        setLoading(false);
      }
    };

    fetchClients();
  }, [isVisible, params]);

  const items = useMemo(() => {
    const dir = sortDir === "asc" ? 1 : -1;

    const sorted = [...clients].sort((a, b) => {
      if (sortBy === "totalSpent") {
        const av = Number(a.totalSpent || 0);
        const bv = Number(b.totalSpent || 0);
        return (av - bv) * dir;
      }

      if (sortBy === "totalBookings") {
        const av = Number(a.totalBookings || 0);
        const bv = Number(b.totalBookings || 0);
        return (av - bv) * dir;
      }

      if (sortBy === "lastAppointmentAt") {
        const av = a.lastAppointmentAt
          ? new Date(a.lastAppointmentAt).getTime()
          : 0;
        const bv = b.lastAppointmentAt
          ? new Date(b.lastAppointmentAt).getTime()
          : 0;
        return (av - bv) * dir;
      }

      return 0;
    });

    // We want desc by default, so with dir= -1 above, the comparison should be reversed
    // (because we used (av - bv) * dir). That already handles it.

    return sorted.slice(0, limit);
  }, [clients, limit, sortBy, sortDir]);

  return (
    <div
      ref={ref}
      className="border rounded-2xl bg-white shadow-sm p-6 h-full overflow-x-hidden"
    >
      <div className="flex items-center justify-between">
        <p className="text-lg font-semibold text-gray-900">Top clients</p>
        <Link
          to="/barber-dashboard/clients"
          className="text-sm text-gray-600 hover:text-gray-900 underline"
        >
          View all
        </Link>
      </div>

      {lazy && !isVisible ? (
        <div className="mt-5">
          <p className="text-sm text-gray-600">Loads when visible…</p>
        </div>
      ) : loading ? (
        <div className="mt-5 space-y-3">
          {Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="h-10 rounded bg-gray-200 animate-pulse" />
          ))}
        </div>
      ) : error ? (
        <div className="mt-5">
          <p className="text-sm text-red-600">Error loading clients.</p>
        </div>
      ) : items.length ? (
        <div className="mt-5 space-y-3">
          {items.map((client) => (
            <Link
              key={client._id || client.email || client.name}
              to={
                client._id
                  ? `/barber-dashboard/clients/${client._id}`
                  : "/barber-dashboard/clients"
              }
              className="border rounded-xl bg-gray-50 p-3 flex items-center justify-between gap-3 hover:bg-gray-100"
            >
              <div className="min-w-0">
                <p className="text-sm font-semibold text-gray-900 truncate">
                  {getClientName(client)}
                </p>
                <p className="text-xs text-gray-600">
                  {client.totalBookings
                    ? `${client.totalBookings} bookings`
                    : "Client profile"}
                </p>
              </div>

              <p className="text-sm font-semibold text-gray-900">
                {formatMoney(client.totalSpent)}
              </p>
            </Link>
          ))}
        </div>
      ) : (
        <div className="mt-5">
          <p className="text-sm text-gray-600">
            No client data yet. This will populate once you track spend.
          </p>
        </div>
      )}
    </div>
  );
};

export default TopClientsWidget;
