import { Link } from "react-router-dom";
import {
  FaHome,
  FaUser,
  FaTruck,
  FaCar,
} from "react-icons/fa";

function Sidebar() {
  return (
    <div className="w-64 bg-slate-900 text-white min-h-screen p-5">

      <h2 className="text-2xl font-bold mb-8">
        Fleet Manager
      </h2>

      <nav className="space-y-4">

        <Link className="flex items-center gap-3 hover:text-blue-400" to="/dashboard">
          <FaHome />
          Dashboard
        </Link>

        <Link className="flex items-center gap-3 hover:text-blue-400" to="/profile">
          <FaUser />
          Profile
        </Link>

        <Link className="flex items-center gap-3 hover:text-blue-400" to="/vehicles">
          <FaTruck />
          Vehicles
        </Link>

        <Link className="flex items-center gap-3 hover:text-blue-400" to="/drivers">
          <FaCar />
          Drivers
        </Link>

      </nav>
    </div>
  );
}

export default Sidebar;