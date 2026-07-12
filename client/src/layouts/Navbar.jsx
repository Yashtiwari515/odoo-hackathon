import { useNavigate } from "react-router-dom";
import { getUser, logout } from "../utils/auth";

export default function Navbar() {
  const navigate = useNavigate();
  const user = getUser();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <header className="h-14 border-b bg-white flex items-center justify-between px-6">
      <h1 className="font-semibold text-gray-800">TransitOps</h1>
      <div className="flex items-center gap-4">
        <span className="text-sm text-gray-600">{user?.name || "User"}</span>
        <button onClick={handleLogout} className="text-sm text-red-600 hover:underline">
          Logout
        </button>
      </div>
    </header>
  );
}