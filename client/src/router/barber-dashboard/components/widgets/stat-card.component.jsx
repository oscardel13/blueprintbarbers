const StatCard = ({ title, value, subtitle, loading = false }) => {
  return (
    <div className="border rounded-2xl bg-white shadow-sm p-5">
      <p className="text-sm text-gray-500">{title}</p>
      {loading ? (
        <div className="mt-3 h-8 w-28 rounded bg-gray-200 animate-pulse" />
      ) : (
        <p className="mt-2 text-2xl font-semibold text-gray-900">
          {value ?? "--"}
        </p>
      )}
      {subtitle ? <p className="mt-1 text-xs text-gray-500">{subtitle}</p> : null}
    </div>
  );
};

export default StatCard;
