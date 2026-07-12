import { useEffect, useState } from "react";
import { getReports } from "../api/reportApi";
import ReportChart from "../components/report/ReportChart";
import Loader from "../components/common/Loader";
import { toast } from "react-toastify";

export default function Reports() {
  const [report, setReport] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getReports()
      .then((res) => setReport(res.data.data))
      .catch(() => toast.error("Failed to load reports"))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <Loader />;
  if (!report) return <p className="p-6 text-gray-500">No data available.</p>;

  const cards = [
    { label: "Total Trips", value: report.tripCount },
    { label: "Total Distance", value: `${report.totalDistance} km` },
    { label: "Fuel Expense", value: `₹${report.fuelExpense}` },
    { label: "Maintenance Expense", value: `₹${report.maintenanceExpense}` },
  ];

  return (
    <div className="p-6">
      <h1 className="text-xl font-semibold mb-4">Reports & Analytics</h1>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        {cards.map((c) => (
          <div key={c.label} className="bg-white border rounded-lg p-4 shadow-sm">
            <p className="text-sm text-gray-500">{c.label}</p>
            <p className="text-xl font-semibold mt-1">{c.value}</p>
          </div>
        ))}
      </div>

      <div className="bg-white border rounded-lg p-4 max-w-lg">
        <ReportChart data={report} />
      </div>
    </div>
  );
}
