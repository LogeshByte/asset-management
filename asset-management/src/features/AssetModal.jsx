import React from "react";

export default function AssetModal({ asset, onClose }) {
  if (!asset) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-md p-6 relative animate-fade-in">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-400 hover:text-gray-600"
        >
          ✕
        </button>

        {/* Modal Header */}
        <h2 className="text-xl font-semibold text-gray-800 mb-4 border-b pb-2">
          Asset Details
        </h2>

        {/* Asset Image */}
        {asset.AssetImageUrl && (
          <img
            src={asset.AssetImageUrl}
            alt={asset.AssetName}
            className="w-full h-48 object-cover rounded-lg mb-4 border"
          />
        )}

        {/* Details */}
        <div className="space-y-3 text-sm">
          <div>
            <p className="text-gray-500">Asset Name</p>
            <p className="font-medium text-gray-800">{asset.AssetName || "-"}</p>
          </div>

          <div>
            <p className="text-gray-500">Category</p>
            <p className="font-medium text-gray-800">
              {asset.AssetCategoryName || "-"}
            </p>
          </div>

          <div>
            <p className="text-gray-500">Description</p>
            <p className="font-medium text-gray-800">
              {asset.AssetDescription || "—"}
            </p>
          </div>

          <div>
            <p className="text-gray-500">Purchase Date</p>
            <p className="font-medium text-gray-800">
              {asset.AssetPurchaseDate || "-"}
            </p>
          </div>

          <div>
            <p className="text-gray-500">Created Date</p>
            <p className="font-medium text-gray-800">
              {asset.CreatedDateTime || "-"}
            </p>
          </div>

          <div>
            <p className="text-gray-500">Assigned User</p>
            <p className="font-medium text-gray-800">{asset.vEmpName || "Unassigned"}</p>
          </div>

          <div>
            <p className="text-gray-500">Status</p>
            <span
              className={`px-2 py-1 rounded-full text-xs font-medium ${
                asset.AssetStatusName === "Active"
                  ? "bg-green-100 text-green-700"
                  : "bg-gray-100 text-gray-700"
              }`}
            >
              {asset.AssetStatusName || "-"}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
