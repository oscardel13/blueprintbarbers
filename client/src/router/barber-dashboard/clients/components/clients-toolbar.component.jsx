const ClientsToolbar = ({
  search,
  setSearch,
  hasAddress,
  setHasAddress,
  sort,
  setSort,
  total,
  loading,
}) => {
  return (
    <div className="border rounded-2xl bg-white p-4 shadow-sm">
      <div className="flex flex-col sm:flex-row gap-3 sm:items-center sm:justify-between">
        <div className="flex flex-col sm:flex-row gap-3 sm:items-center w-full">
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search name, phone, email, city..."
            className="w-full sm:w-[320px] border p-2 rounded"
          />

          <label className="flex items-center gap-2 text-sm font-medium text-gray-700">
            <input
              type="checkbox"
              checked={Boolean(hasAddress)}
              onChange={(e) => setHasAddress(e.target.checked)}
            />
            Has address
          </label>

          <select
            value={sort}
            onChange={(e) => setSort(e.target.value)}
            className="border p-2 rounded"
          >
            <option value="lastAppointmentAt:desc">
              Last appointment (newest)
            </option>
            <option value="lastAppointmentAt:asc">
              Last appointment (oldest)
            </option>
            <option value="name:asc">Name (A–Z)</option>
            <option value="name:desc">Name (Z–A)</option>
          </select>
        </div>

        <div className="text-sm text-gray-600">
          {loading ? "Loading..." : `${total} client${total === 1 ? "" : "s"}`}
        </div>
      </div>
    </div>
  );
};

export default ClientsToolbar;
