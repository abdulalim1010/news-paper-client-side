import BarChart from "./BarChart";
import DashboardPieChart from "./DashboardPieChart";
import LineChart from "./LineChart";

const AdminDashboard = () => {
  return (
    <div className="p-6 space-y-6">
      <h2 className="text-2xl font-bold">📊 Admin Dashboard</h2>
      <DashboardPieChart />
      <BarChart />
      <LineChart />
    </div>
  );
};

export default AdminDashboard;
