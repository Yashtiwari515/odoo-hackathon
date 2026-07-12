// src/App.jsx
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Vehicles from "./pages/Vehicles";
import Drivers from "./pages/Drivers";
import Trips from "./pages/Trips";
import Maintenance from "./pages/Maintenance";
import Fuel from "./pages/Fuel";
import Expense from "./pages/Expense";
import Reports from "./pages/Reports";

function App() {
  return (
    <BrowserRouter>
      {/* ye temporary nav hai, Member 1 final Navbar/Sidebar bana raha hai layout ke saath */}
      <nav className="flex gap-4 p-4 border-b bg-white text-sm font-medium">
        <Link to="/vehicles">Vehicles</Link>
        <Link to="/drivers">Drivers</Link>
        <Link to="/trips">Trips</Link>
        <Link to="/maintenance">Maintenance</Link>
        <Link to="/fuel">Fuel</Link>
        <Link to="/expenses">Expenses</Link>
        <Link to="/reports">Reports</Link>
      </nav>

      <Routes>
        <Route path="/vehicles" element={<Vehicles />} />
        <Route path="/drivers" element={<Drivers />} />
        <Route path="/trips" element={<Trips />} />
        <Route path="/maintenance" element={<Maintenance />} />
        <Route path="/fuel" element={<Fuel />} />
        <Route path="/expenses" element={<Expense />} />
        <Route path="/reports" element={<Reports />} />
        <Route path="/" element={<Vehicles />} />
      </Routes>

      <ToastContainer position="top-right" autoClose={2500} />
    </BrowserRouter>
  );
}

export default App;