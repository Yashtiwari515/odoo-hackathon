import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const data = [
  { month: "Jan", trips: 40 },
  { month: "Feb", trips: 55 },
  { month: "Mar", trips: 70 },
  { month: "Apr", trips: 65 },
  { month: "May", trips: 90 },
];

function DashboardChart() {
  return (
    <div className="bg-white rounded-xl shadow p-5 mt-8">
      <h2 className="text-xl font-semibold mb-4">Monthly Trips</h2>

      <div className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data}>
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="trips" fill="#2563eb" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

export default DashboardChart;