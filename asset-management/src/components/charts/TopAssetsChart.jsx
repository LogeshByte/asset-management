import { useEffect, useState } from "react";
import { getDataDashboard } from "../../api/assetService";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";

export default function TopAssetsChart() {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchTopAssets = async () => {
      try {
        const dashboard = await getDataDashboard();
        const list = dashboard?.Result?.[7] || [];
        const sorted = list
          .sort((a, b) => b.AssetValue - a.AssetValue)
          .slice(0, 10)
          .map((a) => ({
            name: a.AssetName,
            value: a.AssetValue,
          }));

        setData(sorted);
      } catch (err) {
        console.error("TopAssetsChart error:", err);
      }
    };

    fetchTopAssets();
  }, []);

  return (
    <div className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100">
      <h2 className="text-gray-700 font-semibold mb-4">
        Top 10 Expensive Assets
      </h2>
      <div className="w-full h-72">
        <ResponsiveContainer>
          <BarChart
            data={data}
            layout="vertical"
            margin={{ top: 5, right: 20, left: 20, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis type="number" />
            <YAxis dataKey="name" type="category" width={120} />
            <Tooltip />
            <Legend />
            <Bar
              dataKey="value"
              fill="#10B981"
              barSize={20}
              radius={[4, 4, 0, 0]}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
