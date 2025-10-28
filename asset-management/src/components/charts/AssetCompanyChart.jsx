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

export default function AssetCompanyChart() {
  const [data, setData] = useState([]);
  const COLORS = ["#6366F1", "#10B981", "#F59E0B", "#F43F5E", "#3B82F6"];

  useEffect(() => {
    const fetch = async () => {
      try {
        const dashboard = await getDataDashboard();
        const companies = dashboard?.Result?.[1] || [];
        setData(
          companies.map((c) => ({
            name: c.vCompanyName,
            value: c.AssetCount,
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
      <h2 className="text-gray-700 font-semibold mb-4">Assets by Company</h2>
      <div className="w-full h-64">
        <ResponsiveContainer>
          <PieChart>
            <Pie
              data={data}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="50%"
              outerRadius={80}
              label
            >
              {data.map((entry, index) => (
                <Cell key={index} fill={COLORS[index % COLORS.length]} />
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
