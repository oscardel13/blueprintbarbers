const formatPhone = (digits) => {
  const d = (digits || "").replace(/\D/g, "");
  if (d.length !== 10) return digits || "—";
  return `${d.slice(0, 3)}-${d.slice(3, 6)}-${d.slice(6)}`;
};

const ClientHeaderCard = ({ client }) => {
  const a = client.address || {};
  const addressLine =
    a.formatted ||
    [
      a.street1,
      a.street2,
      a.city && `${a.city}${a.state ? `, ${a.state}` : ""}`,
      a.zip,
    ]
      .filter(Boolean)
      .join(", ");

  return (
    <div className="border rounded-2xl shadow-sm bg-white p-6">
      <div className="flex items-start gap-4">
        <img
          src={client.picture || "/default-profile.png"}
          alt=""
          className="w-16 h-16 rounded-full object-cover"
        />

        <div className="flex-1 min-w-0">
          <p className="text-xl font-semibold text-gray-900 truncate">
            {client.name || "Unnamed client"}
          </p>

          <div className="mt-2 grid grid-cols-1 sm:grid-cols-2 gap-2">
            <div className="text-sm text-gray-700">
              <span className="font-medium">Phone:</span>{" "}
              {formatPhone(client.phone)}
            </div>
            <div className="text-sm text-gray-700 truncate">
              <span className="font-medium">Email:</span>{" "}
              {client.email || client.email || "—"}
            </div>
          </div>

          <div className="mt-2 text-sm text-gray-700">
            <span className="font-medium">Address:</span> {addressLine || "—"}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ClientHeaderCard;
