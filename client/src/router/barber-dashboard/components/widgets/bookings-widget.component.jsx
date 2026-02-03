import { Link } from "react-router-dom";

const statusStyles = {
  finished: "bg-gray-200 text-gray-800",
  confirmed: "bg-green-200 text-green-900",
  pending: "bg-yellow-200 text-yellow-900",
  canceled: "bg-red-200 text-red-900",
  "no-show": "bg-red-100 text-red-800",
};

const formatDateTime = (iso) => {
  if (!iso) return "--";
  const d = new Date(iso);
  return d.toLocaleString([], {
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
};

const getClientName = (booking) => {
  const customer = booking?.customer;
  if (!customer) return "Client";
  const name = `${customer.firstName || ""} ${customer.lastName || ""}`.trim();
  return name || customer.name || customer.email || "Client";
};

const BookingsWidget = ({ bookings = [], loading = false }) => {
  const recent = bookings.slice(0, 3);

  return (
    <div className="border rounded-2xl bg-white shadow-sm p-6 h-full">
      <div className="flex items-center justify-between">
        <p className="text-lg font-semibold text-gray-900">Upcoming bookings</p>
        <Link
          to="/barber-dashboard/bookings"
          className="text-sm text-gray-600 hover:text-gray-900 underline"
        >
          View all
        </Link>
      </div>

      {loading ? (
        <div className="mt-5 space-y-3">
          {Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="h-10 rounded bg-gray-200 animate-pulse" />
          ))}
        </div>
      ) : recent.length ? (
        <div className="mt-5 space-y-3">
          {recent.map((booking) => (
            <Link
              key={booking._id}
              to={`/barber-dashboard/bookings/${booking._id}`}
              className="border rounded-xl bg-gray-50 p-3 flex items-center justify-between gap-3"
            >
              <div className="min-w-0">
                <p className="text-sm font-semibold text-gray-900 truncate">
                  {booking.service?.name || "Service"}
                </p>
                <p className="text-xs text-gray-600">
                  {formatDateTime(booking.startTime)} - {getClientName(booking)}
                </p>
              </div>
              <span
                className={`text-[11px] font-semibold px-2 py-1 rounded ${
                  statusStyles[booking.status] || "bg-gray-200 text-gray-800"
                }`}
              >
                {booking.status || "pending"}
              </span>
            </Link>
          ))}
        </div>
      ) : (
        <div className="mt-5">
          <p className="text-sm text-gray-600">No upcoming bookings.</p>
        </div>
      )}
    </div>
  );
};

export default BookingsWidget;
