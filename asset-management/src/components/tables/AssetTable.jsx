import { useEffect, useState, useMemo } from "react";
import { getAssetList } from "../../api/assetService";
import AssetModal from "../../features/AssetModal";
import TableHeader from "./TableHeader";
import TablePagination from "./TablePagination";

export default function AssetTable() {
  const [assets, setAssets] = useState([]);
  const [filteredAssets, setFilteredAssets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortConfig, setSortConfig] = useState({
    key: "AssetCode",
    direction: "asc",
  });
  const [selectedAsset, setSelectedAsset] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 6;

  useEffect(() => {
    const loadAssets = async () => {
      try {
        setLoading(true);
        const result = await getAssetList();
        setAssets(result);
        setFilteredAssets(result);
      } catch {
        setError("Failed to load assets");
      } finally {
        setLoading(false);
      }
    };
    loadAssets();
  }, []);

  useEffect(() => {
    const filtered = assets.filter(
      (a) =>
        a.AssetName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        a.AssetCategoryName?.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredAssets(filtered);
    setCurrentPage(1);
  }, [searchTerm, assets]);

  const sortedAssets = useMemo(() => {
    let sortable = [...filteredAssets];
    if (sortConfig.key) {
      sortable.sort((a, b) => {
        const valA = a[sortConfig.key] ?? "";
        const valB = b[sortConfig.key] ?? "";
        if (typeof valA === "string" && typeof valB === "string") {
          return sortConfig.direction === "asc"
            ? valA.localeCompare(valB)
            : valB.localeCompare(valA);
        }
        return sortConfig.direction === "asc" ? valA - valB : valB - valA;
      });
    }
    return sortable;
  }, [filteredAssets, sortConfig]);

  const handleSort = (key) => {
    setSortConfig((prev) => ({
      key,
      direction: prev.key === key && prev.direction === "asc" ? "desc" : "asc",
    }));
  };

  const indexOfLastRow = currentPage * rowsPerPage;
  const indexOfFirstRow = indexOfLastRow - rowsPerPage;
  const currentRows = sortedAssets.slice(indexOfFirstRow, indexOfLastRow);
  const totalPages = Math.ceil(sortedAssets.length / rowsPerPage);

  if (loading)
    return (
      <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center justify-center">
        <div className="flex flex-col items-center">
          <svg
            className="animate-spin h-10 w-10 text-indigo-600"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            ></circle>
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
            ></path>
          </svg>
          <p className="mt-3 text-gray-600">Loading assets…</p>
        </div>
      </div>
    );
  if (error)
    return (
      <div className="bg-red-50 p-4 rounded-2xl border border-red-100 text-center text-red-600">
        {error}
      </div>
    );

  const columns = [
    { label: "Asset ID", key: "AssetCode" },
    { label: "Asset Name", key: "AssetName" },
    { label: "Category", key: "AssetCategoryName" },
    { label: "Purchase Date", key: "AssetPurchaseDate" },
    { label: "Status", key: "AssetStatusName" },
  ];

  return (
    <>
      <div className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100">
        <div className="flex flex-col md:flex-row justify-between mb-4 gap-3">
          <h2 className="text-lg font-semibold text-gray-700">Asset List</h2>
          <input
            type="text"
            placeholder="Search by name or category..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="border border-gray-300 rounded-lg px-3 py-2 text-sm w-full md:w-64 focus:ring-2 focus:ring-indigo-500 outline-none"
          />
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full border border-gray-100">
            <TableHeader columns={columns} onSort={handleSort} />
            <tbody>
              {currentRows.length === 0 ? (
                <tr>
                  <td colSpan="5" className="py-4 text-center text-gray-500">
                    No assets found.
                  </td>
                </tr>
              ) : (
                currentRows.map((asset, i) => (
                  <tr
                    key={i}
                    onClick={() => setSelectedAsset(asset)}
                    className="border-b border-gray-100 hover:bg-indigo-50 cursor-pointer transition"
                  >
                    <td className="py-2 px-4 text-sm text-gray-700">
                      {asset.AssetCode}
                    </td>
                    <td className="py-2 px-4 text-sm text-gray-700">
                      {asset.AssetName}
                    </td>
                    <td className="py-2 px-4 text-sm text-gray-700">
                      {asset.AssetCategoryName}
                    </td>
                    <td className="py-2 px-4 text-sm text-gray-700">
                      {asset.AssetPurchaseDate || "-"}
                    </td>
                    <td className="py-2 px-4 text-sm">
                      <span
                        className={`px-2 py-1 rounded-full text-xs ${
                          asset.AssetStatusName === "Active"
                            ? "bg-green-100 text-green-700"
                            : "bg-gray-100 text-gray-700"
                        }`}
                      >
                        {asset.AssetStatusName}
                      </span>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        <TablePagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
          totalItems={sortedAssets.length}
          startIndex={indexOfFirstRow}
          endIndex={indexOfLastRow}
        />
      </div>

      {selectedAsset && (
        <AssetModal
          asset={selectedAsset}
          onClose={() => setSelectedAsset(null)}
        />
      )}
    </>
  );
}
