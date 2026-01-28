import { Link } from "react-router-dom";

const formatPhone = (digits) => {
  const d = (digits || "").replace(/\D/g, "");
  if (d.length !== 10) return digits || "—";
  return `${d.slice(0, 3)}-${d.slice(3, 6)}-${d.slice(6)}`;
};

const ClientsTable = ({ clients, loading }) => {
  if (loading) {
    return (
      <div className="mt-4 border rounded-2xl bg-white p-4 shadow-sm">
        <div className="text-gray-600">Loading clients...</div>
      </div>
    );
  }

  if (!clients?.length) {
    return (
      <div className="mt-4 border rounded-2xl bg-white p-6 shadow-sm text-gray-600">
        No clients found.
      </div>
    );
  }

  return (
    <div className="mt-4 border rounded-2xl bg-white shadow-sm overflow-hidden">
      <div className="hidden sm:grid grid-cols-[2fr_1fr_2fr_1fr_auto] gap-3 px-4 py-3 border-b text-xs font-semibold text-gray-600">
        <div>Client</div>
        <div>Phone</div>
        <div>Email</div>
        <div>Last appt</div>
        <div />
      </div>

      <div className="divide-y">
        {clients.map((c) => (
          <Link
            key={c._id}
            to={`/barber-dashboard/clients/${c._id}`}
            className="block hover:bg-gray-50"
          >
            <div className="grid grid-cols-1 sm:grid-cols-[2fr_1fr_2fr_1fr_auto] gap-3 px-4 py-4">
              <div className="flex items-center gap-3">
                <img
                  src={c.picture || "/default-profile.png"}
                  alt=""
                  className="w-10 h-10 rounded-full object-cover"
                />
                <div className="min-w-0">
                  <p className="font-semibold text-gray-900 truncate">
                    {c.name || "Unnamed client"}
                  </p>
                  <p className="text-sm text-gray-600 truncate">
                    {c.address?.city
                      ? `${c.address.city}${c.address.state ? `, ${c.address.state}` : ""}`
                      : "—"}
                  </p>
                </div>
              </div>

              <div className="text-sm text-gray-800">
                {formatPhone(c.phone)}
              </div>
              <div className="text-sm text-gray-800 truncate">
                {c.email || "—"}
              </div>
              <div className="text-sm text-gray-800">
                {c.lastAppointmentAt
                  ? new Date(c.lastAppointmentAt).toLocaleDateString()
                  : "—"}
              </div>

              <div className="text-sm font-medium text-gray-700 sm:text-right">
                View →
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default ClientsTable;
