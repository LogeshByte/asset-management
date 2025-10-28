import { useEffect, useState } from "react";
import { getDataDashboard } from "../../api/assetService";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";

export default function AssetTrendChart() {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchTrend = async () => {
      try {
        const dashboard = await getDataDashboard();
        const trend = dashboard?.Result?.[6] || [];
        const formatted = trend.map((t) => ({
          year: t.PurchaseYear,
          value: t.TotalValue,
        }));
        setData(formatted);
      } catch (err) {
        console.error("Trend chart error:", err);
      }
    };

    fetchTrend();
  }, []);

  return (
    <div className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100">
      <h2 className="text-gray-700 font-semibold mb-4">Purchase Value Trend</h2>
      <div className="w-full h-72">
        <ResponsiveContainer>
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="year" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line
              type="monotone"
              dataKey="value"
              stroke="#6366F1"
              strokeWidth={2}
              dot={{ r: 4 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
