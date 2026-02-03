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
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
};

const formatMoney = (value) => {
  const num = Number(value);
  if (!Number.isFinite(num)) return "--";
  return `$${num.toFixed(0)}`;
};

const getClientName = (booking) => {
  const customer = booking?.customer;
  if (!customer) return "Client";
  const name = `${customer.firstName || ""} ${customer.lastName || ""}`.trim();
  return name || customer.name || customer.email || "Client";
};

const NextBookingWidget = ({ booking, loading = false }) => {
  return (
    <div className="border rounded-2xl bg-white shadow-sm p-6 h-full">
      <div className="flex items-center justify-between">
        <p className="text-lg font-semibold text-gray-900">Next booking</p>
        <Link
          to="/barber-dashboard/bookings"
          className="text-sm text-gray-600 hover:text-gray-900 underline"
        >
          View all
        </Link>
      </div>

      {loading ? (
        <div className="mt-5 space-y-3">
          <div className="h-6 w-40 rounded bg-gray-200 animate-pulse" />
          <div className="h-4 w-56 rounded bg-gray-200 animate-pulse" />
          <div className="h-4 w-32 rounded bg-gray-200 animate-pulse" />
        </div>
      ) : booking ? (
        <div className="mt-5 space-y-3">
          <div className="flex items-center justify-between gap-3">
            <p className="text-xl font-semibold text-gray-900">
              {booking.service?.name || "Service"}
            </p>
            <span
              className={`text-xs font-semibold px-2 py-1 rounded ${
                statusStyles[booking.status] || "bg-gray-200 text-gray-800"
              }`}
            >
              {booking.status || "pending"}
            </span>
          </div>
          <p className="text-md text-gray-700 font-semibold">
            {formatDateTime(booking.startTime)}
          </p>
          <div className="flex flex-row items-center justify-between gap-2">
            <div className="flex flex-row">
              <img
                src={
                  booking.customer?.picture ||
                  "/assets/images/default-user-image.png"
                }
                alt="Client"
                className="w-12 h-12 rounded-full object-cover"
              />
              <div className="ml-2">
                <p className="text-sm font-semibold text-gray-900">
                  {getClientName(booking)}
                </p>
                <a
                  className="text-sm text-gray-600 underline hover:text-gray-900"
                  href={`tel:${booking.customer?.phone}`}
                >
                  {booking.customer?.phone || "--"}
                </a>
              </div>
            </div>
            <p className="text-sm font-semibold text-gray-900">
              {formatMoney(booking.service?.price)}
            </p>
          </div>
          <Link
            to={`/barber-dashboard/bookings/${booking._id}`}
            className="inline-block text-sm text-gray-700 underline hover:text-gray-900"
          >
            View booking details →
          </Link>
        </div>
      ) : (
        <div className="mt-5">
          <p className="text-sm text-gray-600">No upcoming bookings.</p>
        </div>
      )}
    </div>
  );
};

export default NextBookingWidget;
