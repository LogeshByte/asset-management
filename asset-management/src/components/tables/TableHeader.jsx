import { ArrowUpDown } from "lucide-react";

export default function TableHeader({ columns, onSort }) {
  return (
    <thead className="bg-gray-100 text-gray-600 text-sm">
      <tr>
        {columns.map((col) => (
          <th
            key={col.key}
            onClick={() => onSort(col.key)}
            className="py-3 px-4 text-left cursor-pointer select-none"
          >
            {col.label} <ArrowUpDown size={14} className="inline ml-1" />
          </th>
        ))}
      </tr>
    </thead>
  );
}
