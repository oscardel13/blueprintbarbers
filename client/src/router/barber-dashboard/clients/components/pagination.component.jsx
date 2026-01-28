const Pagination = ({ page, totalPages, onPageChange, className = "" }) => {
  if (totalPages <= 1) return null;

  const prevDisabled = page <= 1;
  const nextDisabled = page >= totalPages;

  return (
    <div className={`flex items-center justify-between ${className}`}>
      <button
        type="button"
        disabled={prevDisabled}
        onClick={() => onPageChange(page - 1)}
        className="px-3 py-2 rounded border bg-white disabled:opacity-50"
      >
        Prev
      </button>

      <div className="text-sm text-gray-700">
        Page <span className="font-semibold">{page}</span> of{" "}
        <span className="font-semibold">{totalPages}</span>
      </div>

      <button
        type="button"
        disabled={nextDisabled}
        onClick={() => onPageChange(page + 1)}
        className="px-3 py-2 rounded border bg-white disabled:opacity-50"
      >
        Next
      </button>
    </div>
  );
};

export default Pagination;
