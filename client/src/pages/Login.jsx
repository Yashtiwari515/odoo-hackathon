import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { login } from "../api/authApi";
import { saveAuth } from "../utils/auth";
import Input from "../components/common/Input";
import Button from "../components/common/Button";
import { toast } from "react-toastify";

const ROLES = ["Fleet Manager", "Driver", "Safety Officer", "Financial Analyst"];

export default function Login() {
  const [form, setForm] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const res = await login(form);
      saveAuth(res.data.token, res.data.user);
      toast.success("Logged in successfully");
      navigate("/dashboard");
    } catch (err) {
      toast.error(err.response?.data?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex bg-[#F5F4F0]">
      {/* Brand panel */}
      <div className="hidden lg:flex lg:w-1/2 relative bg-[#12181F] flex-col justify-between p-12 overflow-hidden">
        <div
          className="absolute -right-24 -bottom-24 w-96 h-96 opacity-20 pointer-events-none"
          style={{
            backgroundImage:
              "repeating-linear-gradient(135deg, #E8590C 0px, #E8590C 2px, transparent 2px, transparent 14px)",
          }}
        />

        <div className="flex items-center gap-2.5 relative z-10">
          <span className="w-8 h-8 rounded-md bg-[#E8590C] flex items-center justify-center text-white font-bold text-sm">
            T
          </span>
          <span
            className="text-white text-xl font-semibold tracking-tight"
            style={{ fontFamily: '"Space Grotesk", ui-sans-serif, sans-serif' }}
          >
            TransitOps
          </span>
        </div>

        <div className="relative z-10">
          <p
            className="text-white text-3xl leading-snug max-w-sm"
            style={{ fontFamily: '"Space Grotesk", ui-sans-serif, sans-serif' }}
          >
            Fleet dispatch, maintenance &amp; cost control — one board.
          </p>
          <p className="text-gray-400 text-sm mt-4 max-w-sm">
            Vehicles, drivers, trips and expenses tracked in real time so
            nothing slips through a spreadsheet again.
          </p>

          <div className="flex flex-wrap gap-2 mt-6">
            {ROLES.map((r) => (
              <span
                key={r}
                className="text-[11px] font-medium text-gray-300 border border-white/15 rounded-full px-3 py-1"
              >
                {r}
              </span>
            ))}
          </div>
        </div>

        <p className="text-gray-500 text-xs relative z-10">
          © {new Date().getFullYear()} TransitOps
        </p>
      </div>

      {/* Form panel */}
      <div className="flex-1 flex items-center justify-center p-6">
        <form
          onSubmit={handleSubmit}
          className="bg-white border border-[#E4E2DC] shadow-sm rounded-lg p-8 w-full max-w-sm relative"
        >
          <span className="absolute top-0 left-8 -translate-y-1/2 w-10 h-1 rounded-full bg-[#E8590C]" />

          <div className="mb-6 lg:hidden">
            <div className="flex items-center gap-2 mb-4">
              <span className="w-7 h-7 rounded-md bg-[#E8590C] flex items-center justify-center text-white font-bold text-xs">
                T
              </span>
              <span
                className="text-[#12181F] text-lg font-semibold"
                style={{ fontFamily: '"Space Grotesk", ui-sans-serif, sans-serif' }}
              >
                TransitOps
              </span>
            </div>
          </div>

          <div className="mb-6">
            <p className="text-[11px] font-semibold uppercase tracking-wider text-[#E8590C]">
              Welcome back
            </p>
            <h1
              className="text-xl font-semibold text-[#12181F] mt-1"
              style={{ fontFamily: '"Space Grotesk", ui-sans-serif, sans-serif' }}
            >
              Sign in to TransitOps
            </h1>
            <p className="text-sm text-gray-500 mt-1">
              Enter your credentials to access your fleet dashboard.
            </p>
          </div>

          <Input label="Email" name="email" type="email" value={form.email} onChange={handleChange} required />
          <Input label="Password" name="password" type="password" value={form.password} onChange={handleChange} required />

          <Button type="submit" disabled={loading} className="w-full mt-3">
            {loading ? "Logging in..." : "Login"}
          </Button>
        </form>
      </div>
    </div>
  );
}