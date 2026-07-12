import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getDashboardStats } from "../api/dashboardApi";
import KPICard from "../components/dashboard/KPICard";
import DashboardChart from "../components/dashboard/DashboardChart";
import Loader from "../components/common/Loader";
import { toast } from "react-toastify";

function greeting() {
  const h = new Date().getHours();
  if (h < 12) return "Good morning";
  if (h < 17) return "Good afternoon";
  return "Good evening";
}

const QUICK_ACTIONS = [
  { label: "Add Vehicle", to: "/vehicles" },
  { label: "Add Driver", to: "/drivers" },
  { label: "New Trip", to: "/trips" },
];

export default function Dashboard() {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getDashboardStats()
      .then((res) => setStats(res.data))
      .catch(() => toast.error("Failed to load dashboard"))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <Loader />;

  const cards = stats
    ? [
        { label: "Total Vehicles", value: stats.totalVehicles, accent: "blue", icon: "truck" },
        { label: "Total Drivers", value: stats.totalDrivers, accent: "green", icon: "user" },
        { label: "Active Trips", value: stats.activeTrips, accent: "orange", icon: "route" },
        { label: "Maintenance Due", value: stats.maintenanceDue, accent: "red", icon: "wrench" },
      ]
    : [];

  return (
    <div className="bg-[#F5F4F0] min-h-full">
      {/* Hero banner — single smooth blended gradient, blurred glow, no hard edges */}
      <div
        className="relative overflow-hidden"
        style={{ background: "linear-gradient(135deg, #0B0F14 0%, #12181F 55%, #171F29 100%)" }}
      >
        <div className="absolute -right-32 -top-32 w-[380px] h-[380px] rounded-full bg-[#E8590C]/25 blur-[110px] pointer-events-none" />
        <div className="absolute right-16 -bottom-24 w-[300px] h-[300px] rounded-full bg-[#0F6E6B]/25 blur-[110px] pointer-events-none" />

        <div className="relative z-10 px-6 py-8 md:px-9 md:py-10">
          <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-[#E8590C]">
            Fleet Overview
          </p>
          <h1
            className="text-white text-[28px] md:text-[32px] font-semibold mt-2 leading-tight tracking-tight"
            style={{ fontFamily: '"Space Grotesk", ui-sans-serif, sans-serif' }}
          >
            {greeting()}, Fleet Manager
          </h1>
          <p className="text-gray-400 text-sm mt-2 max-w-md leading-relaxed">
            {new Date().toLocaleDateString("en-IN", { weekday: "long", day: "numeric", month: "long", year: "numeric" })}
            {" · "}here's how your fleet is running today.
          </p>

          <div className="flex flex-wrap gap-2.5 mt-6">
            {QUICK_ACTIONS.map((a) => (
              <Link
                key={a.label}
                to={a.to}
                className="text-sm font-medium text-white bg-white/[0.06] hover:bg-white/[0.12] backdrop-blur-md border border-white/10 rounded-full pl-3.5 pr-4 py-2 transition-colors"
              >
                <span className="text-[#E8590C] mr-1.5">+</span>{a.label}
              </Link>
            ))}
          </div>
        </div>
      </div>

      <div className="p-6">
        {!stats ? (
          <div className="border border-[#E4E2DC] rounded-lg p-14 bg-white text-center shadow-sm">
            <div
              className="w-14 h-14 rounded-full flex items-center justify-center mx-auto mb-5"
              style={{ background: "linear-gradient(135deg, rgba(232,89,12,0.12), rgba(15,110,107,0.12))" }}
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="#12181F" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
                <path d="M3 7h11v8H3V7zm11 3h4l3 3v2h-7v-5zM6 18a1.5 1.5 0 100-3 1.5 1.5 0 000 3zm11 0a1.5 1.5 0 100-3 1.5 1.5 0 000 3z" />
              </svg>
            </div>
            <p className="text-[15px] font-medium text-gray-800">No fleet data yet</p>
            <p className="text-sm text-gray-500 mt-1.5">
              Add a vehicle, driver or trip to see your fleet snapshot here.
            </p>
            <div className="flex justify-center gap-2.5 mt-7">
              <Link
                to="/vehicles"
                className="text-sm font-medium text-white bg-[#E8590C] hover:bg-[#D14E0A] rounded-md px-4 py-2 transition-colors shadow-sm"
              >
                Add Vehicle
              </Link>
              <Link
                to="/drivers"
                className="text-sm font-medium text-[#12181F] bg-white hover:bg-gray-50 border border-[#E4E2DC] rounded-md px-4 py-2 transition-colors"
              >
                Add Driver
              </Link>
              <Link
                to="/trips"
                className="text-sm font-medium text-[#12181F] bg-white hover:bg-gray-50 border border-[#E4E2DC] rounded-md px-4 py-2 transition-colors"
              >
                New Trip
              </Link>
            </div>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
              {cards.map((c) => (
                <KPICard key={c.label} {...c} />
              ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
              <div className="lg:col-span-2 bg-white border border-[#E4E2DC] rounded-lg p-5 shadow-sm">
                <div className="flex items-center justify-between mb-1">
                  <p className="text-[11px] font-semibold uppercase tracking-wider text-gray-500">
                    Monthly Expense Breakdown
                  </p>
                  <div className="flex items-center gap-3 text-xs text-gray-500">
                    <span className="flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-[#E8590C]" /> Fuel
                    </span>
                    <span className="flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-[#0F6E6B]" /> Other
                    </span>
                  </div>
                </div>
                <DashboardChart stats={stats} />
              </div>

              <div className="bg-[#12181F] rounded-lg p-5 flex flex-col justify-between text-white shadow-sm">
                <div>
                  <p className="text-[11px] font-semibold uppercase tracking-wider text-gray-400">
                    Total Operational Cost
                  </p>
                  <p
                    className="font-mono text-3xl font-semibold mt-2 text-[#E8590C]"
                    style={{ fontVariantNumeric: "tabular-nums" }}
                  >
                    ₹{(Number(stats.monthlyFuelExpense || 0) + Number(stats.monthlyOtherExpense || 0)).toLocaleString("en-IN")}
                  </p>
                  <p className="text-xs text-gray-400 mt-1">Fuel + other expenses this month</p>
                </div>
                <div className="mt-6 pt-4 border-t border-white/10 text-xs text-gray-400">
                  Updated {new Date().toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })}
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}