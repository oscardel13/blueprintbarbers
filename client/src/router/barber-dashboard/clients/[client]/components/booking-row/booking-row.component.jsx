import { Link } from "react-router-dom";

const statusStyles = {
  finished: "bg-gray-500 text-green-800",
  confirmed: "bg-green-200 text-green-900",
  pending: "bg-yellow-200 text-yellow-900",
  canceled: "bg-red-200 text-red-900",
  "no-show": "bg-red-100 text-red-800",
};

const formatMoney = (n) => {
  const num = Number(n);
  if (!Number.isFinite(num)) return "—";
  return `$${num.toFixed(0)}`;
};

const formatDateTime = (iso) => {
  if (!iso) return "—";
  const d = new Date(iso);
  return d.toLocaleString([], {
    month: "short",
    day: "numeric",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
};

const BookingRow = ({ booking }) => {
  const s = booking.status || "pending";
  const pill = statusStyles[s] || "bg-gray-200 text-gray-800";

  return (
    <Link
      to={`/barber-dashboard/bookings/${booking._id}`}
      className="border rounded-xl bg-gray-50 p-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3"
    >
      <div className="min-w-0">
        <p className="font-semibold text-gray-900 truncate">
          {booking.service?.name || "Service"}
        </p>
        <p className="text-sm text-gray-700">
          {formatDateTime(booking.startTime)}
        </p>
        <p className="text-xs text-gray-500 truncate">
          {booking.address || "—"}
        </p>
      </div>

      <div className="flex items-center gap-3">
        <span className={`text-xs font-semibold px-2 py-1 rounded ${pill}`}>
          {s}
        </span>
        <span className="text-sm font-semibold text-gray-900">
          {formatMoney(booking.service?.price)}
        </span>
      </div>
    </Link>
  );
};

export default BookingRow;
