import { Bell } from "lucide-react";
import React from "react";

const Navbar = () => {
  return (
    <header className="flex justify-between items-center bg-white border-b border-gray-200 px-6 py-3 sticky top-0 z-10 shadow-sm">
      <h1 className="text-xl font-semibold text-gray-800">Asset Dashboard</h1>

      <div className="flex items-center gap-3">
        <button className="p-2 rounded-lg bg-gray-100 hover:bg-gray-200 transition">
          <span className="material-icons text-gray-600">
            <Bell/>
          </span>
        </button>

        <img
          src="https://i.pravatar.cc/35"
          alt="User Avatar"
          className="w-9 h-9 rounded-full border"
        />
      </div>
    </header>
  );
};

export default Navbar;
