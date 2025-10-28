import AssetCompanyChart from "../components/charts/AssetCompanyChart";
import AssetStatusChart from "../components/charts/AssetStatusChart";
import AssetCategoryChart from "../components/charts/AssetCategoryChart";

import Navbar from "../components/NavBar";
import Sidebar  from "../components/SideBar";
import SummaryCard  from "../components/SummaryCard";

import AssetTrendChart from "../components/charts/AssetTrendChart";
import TopAssetsChart from "../components/charts/TopAssetsChart";
import AssetTable from "../components/tables/AssetTable";

export default function Dashboard() {
  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Navbar */}
        <Navbar />

        <main className="p-6 overflow-y-auto">
          {/* Title */}
          <h1 className="text-2xl font-semibold text-gray-800 mb-6">
            Asset Dashboard
          </h1>

          {/* Summary Cards */}
          <SummaryCard />

          {/* Row 2: 3 Charts in one line */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
            <AssetCompanyChart />
            <AssetStatusChart />
            <AssetCategoryChart />
          </div>

          {/* Row 3: Trend + Top 10 expensive */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
            <AssetTrendChart />
            <TopAssetsChart />
          </div>

          {/* Row 4: Table */}
          <div className="mt-6">
            <AssetTable/>
          </div>
        </main>
      </div>
    </div>
  );
}
