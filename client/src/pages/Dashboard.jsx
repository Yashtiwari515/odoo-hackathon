import MainLayout from "../layouts/MainLayout";

function Dashboard() {
  return (
    <MainLayout>
      <h1 className="text-3xl font-bold">Dashboard</h1>

      <div className="grid grid-cols-4 gap-5 mt-6">
        <div className="bg-white rounded-xl shadow p-5">
          <h3 className="text-gray-500">Vehicles</h3>
          <p className="text-3xl font-bold mt-2">24</p>
        </div>

        <div className="bg-white rounded-xl shadow p-5">
          <h3 className="text-gray-500">Drivers</h3>
          <p className="text-3xl font-bold mt-2">18</p>
        </div>

        <div className="bg-white rounded-xl shadow p-5">
          <h3 className="text-gray-500">Trips</h3>
          <p className="text-3xl font-bold mt-2">156</p>
        </div>

        <div className="bg-white rounded-xl shadow p-5">
          <h3 className="text-gray-500">Expenses</h3>
          <p className="text-3xl font-bold mt-2">₹45,000</p>
        </div>
      </div>
    </MainLayout>
  );
}

export default Dashboard;