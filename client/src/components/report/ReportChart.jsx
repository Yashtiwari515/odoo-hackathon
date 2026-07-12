import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend);

export default function ReportChart({ data }) {
  const chartData = {
    labels: ["Fuel Expense", "Maintenance Expense"],
    datasets: [
      {
        label: "Amount (₹)",
        data: [data.fuelExpense, data.maintenanceExpense],
        backgroundColor: ["#3b82f6", "#f97316"],
      },
    ],
  };

  return <Bar data={chartData} options={{ responsive: true, plugins: { legend: { display: false } } }} />;
}