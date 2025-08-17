// src/pages/Dashboard/DashboardHome.jsx

import React from "react";


import DashboardPieChart from "./DashboardPieChart";
import LineChart from "./LineChart";

const DashboardHome = () => {
  return (
    <div className="space-y-8">
      <h2 className="text-3xl font-bold mb-4">📊 Admin Dashboard Overview</h2>

      <div className="bg-white p-4 rounded shadow">
        <DashboardPieChart />
      </div>

      <div className="bg-white p-4 rounded shadow">
        <LineChart />
      </div>

     
    </div>
  );
};

export default DashboardHome;
