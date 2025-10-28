import { useEffect, useState } from "react";
import { getDataDashboard } from "../../api/assetService";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

export default function AssetChart() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const COLORS = [
    "#6366F1",
    "#10B981",
    "#F59E0B",
    "#F43F5E",
    "#3B82F6",
    "#84CC16",
  ];

  useEffect(() => {
    const fetchChartData = async () => {
      setLoading(true);
      setError(null);

      try {
        const dashboard = await getDataDashboard();
        // dashboard is the wrapper that contains Result
        const categories = dashboard?.Result?.[3] || [];
        const groups = dashboard?.Result?.[4] || [];

        const chartData =
          categories.length > 0
            ? categories.map((item) => ({
                name: item.AssetCategoryName,
                value: item.AssetCount,
              }))
            : groups.map((item) => ({
                name: item.AssetGroupName,
                value: item.AssetCount,
              }));

        setData(chartData);
      } catch (err) {
        console.error("Chart error:", err);
        setError("Failed to load chart data.");
      } finally {
        setLoading(false);
      }
    };

    fetchChartData();
  }, []);

  if (loading)
    return (
      <div className="bg-white p-4 rounded-2xl border border-gray-100 shadow-sm text-center">
        <p className="text-gray-500">Loading chart...</p>
      </div>
    );

  if (error)
    return (
      <div className="bg-red-50 border border-red-200 p-4 rounded-xl text-center text-red-600">
        {error}
      </div>
    );

  return (
    <section className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100 ">
      <h2 className="text-lg font-semibold text-gray-700 mb-4">
        Asset Category Overview
      </h2>
      {data.length === 0 ? (
        <p className="text-center text-gray-500">No category data available</p>
      ) : (
        <div className="w-full h-72">
          <ResponsiveContainer>
            <PieChart>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                outerRadius={110}
                fill="#8884d8"
                dataKey="value"
                label={({ name, value }) => `${name} (${value})`}
              >
                {data.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>
      )}
    </section>
  );
}
