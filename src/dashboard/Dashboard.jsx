import React from "react";
import { Link, Outlet, useLocation } from "react-router-dom";

const Sidebar = () => {
  const location = useLocation();

  const links = [
    { to: "/dashboard/allusers", label: "All Users" },
    { to: "/dashboard/allarticles", label: "All Articles" },
    { to: "/dashboard/addpublisher", label: "Add Publisher" },
  ];
  return (
    <div className="w-64 bg-gray-800 text-white min-h-screen p-6">
      <h2 className="text-xl font-bold mb-6">Dashboard</h2>
      <nav className="flex flex-col space-y-3">
        {links.map(({ to, label }) => (
          <Link
            key={to}
            to={to}
            className={`px-4 py-2 rounded hover:bg-gray-700 ${
              location.pathname.endsWith(to) ? "bg-gray-700" : ""
            }`}
          >
            {label}
          </Link>
        ))}
      </nav>
    </div>
  );
};

const Dashboard = () => {
  return (
    <div className="flex">
      <Sidebar />
      <main className="flex-1 p-6 bg-green-400 min-h-screen overflow-auto">
        <Outlet />
      </main>
    </div>
  );
};

export default Dashboard;
