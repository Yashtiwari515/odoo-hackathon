import DashboardChart from "../components/dashboard/DashboardChart";
import MainLayout from "../layouts/MainLayout";
import StatCard from "../components/dashboard/StatCard";
import { stats } from "../data/dashboardData";

function Dashboard() {
  return (
    <MainLayout>
      <h1 className="text-3xl font-bold">Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 mt-6">
        {stats.map((item) => (
          <StatCard
            key={item.title}
            title={item.title}
            value={item.value}
          />
        ))}
      </div>
      
      <DashboardChart />
    </MainLayout>
  );
}

export default Dashboard;