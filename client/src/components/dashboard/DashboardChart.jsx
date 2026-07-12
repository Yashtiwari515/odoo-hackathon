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

export default function DashboardChart({ stats }) {
  const chartData = {
    labels: ["Fuel Expense", "Other Expense"],
    datasets: [
      {
        label: "Amount (₹)",
        data: [stats.monthlyFuelExpense, stats.monthlyOtherExpense],
        backgroundColor: ["#E8590C", "#0F6E6B"],
        borderRadius: 4,
        maxBarThickness: 64,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: { display: false },
      tooltip: {
        backgroundColor: "#12181F",
        titleFont: { family: "monospace" },
        bodyFont: { family: "monospace" },
        padding: 10,
        cornerRadius: 4,
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        grid: { color: "#E4E2DC" },
        ticks: { font: { family: "monospace", size: 11 } },
      },
      x: {
        grid: { display: false },
        ticks: { font: { size: 12, weight: "500" } },
      },
    },
  };

  return (
    <div>
      <p className="text-[11px] font-semibold uppercase tracking-wider text-gray-500 mb-3">
        Monthly Expense Breakdown
      </p>
      <Bar data={chartData} options={options} />
    </div>
  );
}