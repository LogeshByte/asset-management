export default function TablePagination({
  currentPage,
  totalPages,
  onPageChange,
  totalItems,
  startIndex,
  endIndex,
}) {
  return (
    <div className="flex justify-between items-center mt-4 text-sm">
      <p className="text-gray-500">
        Showing {startIndex + 1}–{Math.min(endIndex, totalItems)} of {totalItems}
      </p>
      <div className="flex gap-2">
        <button
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className={`px-3 py-1 border rounded-lg ${
            currentPage === 1
              ? "text-gray-400 border-gray-200"
              : "hover:bg-gray-100"
          }`}
        >
          Prev
        </button>
        <span className="px-3 py-1">{currentPage}</span>
        <button
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className={`px-3 py-1 border rounded-lg ${
            currentPage === totalPages
              ? "text-gray-400 border-gray-200"
              : "hover:bg-gray-100"
          }`}
        >
          Next
        </button>
      </div>
    </div>
  );
}
