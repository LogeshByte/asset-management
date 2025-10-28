import { useEffect, useState } from "react";
import { getDataDashboard } from "../api/assetService";

export default function SummaryCards() {
  const [summary, setSummary] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchSummary = async () => {
      setLoading(true);
      setError(null);
      try {
        const dashboard = await getDataDashboard();

        const r =
          dashboard?.Result?.[0]?.[0] ||
          dashboard?.Result?.[0] ||
          dashboard?.data?.Result?.[0]?.[0] ||
          dashboard?.data?.Result?.[0] ||
          dashboard?.Data?.Result?.[0]?.[0] ||
          dashboard?.Data?.Result?.[0] ||
          null;

        if (r && typeof r === "object") {
          setSummary({
            total: r.TotalAssets || r.TotalAsset || 0,
            active: r.ActiveAssets || r.ActiveAsset || 0,
            assigned: r.AssignedAssets || r.AssignedAsset || 0,
            unassigned: r.UnassignedAssets || 0,
            value: r.TotalAssetValue || r.TotalValue || 0,
          });
        } else {
          console.warn(
            "SummaryCard: no summary object found in dashboard response",
            dashboard
          );
          setError("No summary data found.");
        }
      } catch (err) {
        console.error("Summary API error:", err);
        setError("Failed to load dashboard summary.");
      } finally {
        setLoading(false);
      }
    };

    fetchSummary();
  }, []);

  if (loading) {
    return (
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 animate-pulse">
        {[1, 2, 3, 4].map((i) => (
          <div
            key={i}
            className="h-24 bg-gray-200 rounded-xl border border-gray-100"
          ></div>
        ))}
      </div>
    );
  }

  if (error)
    return (
      <p className="text-center text-red-500 font-medium py-4 bg-red-50 rounded-lg">
        {error}
      </p>
    );

  if (!summary) return null;

  //  Cards data list
  const cards = [
    { label: "Total Assets", value: summary.total },
    { label: "Active Assets", value: summary.active },
    { label: "Assigned Assets", value: summary.assigned },
    { label: "Unassigned Assets", value: summary.unassigned },
    {
      label: "Total Asset Value",
      value: `₹${summary.value.toLocaleString("en-IN")}`,
    },
  ];

  return (
    <section className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
      {cards.map((card, idx) => (
        <div
          key={idx}
          className="p-4 bg-white rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition"
        >
          <p className="text-sm text-gray-500">{card.label}</p>
          <h2 className="text-xl font-semibold text-indigo-600 mt-1">
            {card.value}
          </h2>
        </div>
      ))}
    </section>
  );
}
