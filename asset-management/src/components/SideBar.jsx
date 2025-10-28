import { CircleChevronLeft, CircleChevronRight, LayoutDashboard, Settings2 } from "lucide-react";
import { useState } from "react";

export default function Sidebar() {
  const [open, setOpen] = useState(true);

  const menuItems = [
    { name: "Dashboard", icon: <LayoutDashboard/> },
    { name: "Settings", icon: <Settings2/> },
  ];

  return (
    <aside
      className={`${
        open ? "w-64" : "w-20"
      } bg-white border-r border-gray-200 flex flex-col transition-all duration-300`}
    >
      {/* Header */}
      <div className="flex items-center justify-between p-3 border-b">
        {open && (
          <h2 className="text-lg font-bold text-indigo-600 tracking-wide">
            Assets
          </h2>
        )}
        <button
          onClick={() => setOpen(!open)}
          className="p-2 text-gray-500 hover:text-indigo-600"
        >
          <span className="material-icons">
            {open ? <CircleChevronLeft /> :  <CircleChevronRight />}
          </span>
        </button>
      </div>

      {/* Menu */}
      <nav className="flex-1 p-4">
        <ul className="space-y-2">
          {menuItems.map((item) => (
            <li
              key={item.name}
              className="flex items-center gap-3 p-2 rounded-lg hover:bg-indigo-50 cursor-pointer text-gray-700 transition "
            >
              <span className="material-icons text-[20px] text-gray-600">
                {item.icon}
              </span>
              {open && <span className="font-medium">{item.name}</span>}
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
}
