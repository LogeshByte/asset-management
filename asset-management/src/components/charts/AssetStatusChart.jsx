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

export default function AssetStatusChart() {
  const [data, setData] = useState([]);
  const COLORS = ["#10B981", "#F59E0B", "#F43F5E"];

  useEffect(() => {
    const fetch = async () => {
      try {
        const dashboard = await getDataDashboard();
        const statuses = dashboard?.Result?.[5] || [];
        setData(
          statuses.map((s) => ({
            name: s.AssetStatusName,
            value: s.AssetCount,
          }))
        );
      } catch (err) {
        console.error(err);
      }
    };

    fetch();
  }, []);

  return (
    <div className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100">
      <h2 className="text-gray-700 font-semibold mb-4">Assets by Status</h2>
      <div className="w-full h-64">
        <ResponsiveContainer>
          <PieChart>
            <Pie
              data={data}
              dataKey="value"
              nameKey="name"
              innerRadius={50}
              outerRadius={80}
              fill="#8884d8"
              label
            >
              {data.map((entry, i) => (
                <Cell key={i} fill={COLORS[i % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
