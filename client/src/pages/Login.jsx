import { useNavigate } from "react-router-dom";
import { useState } from "react";
import Button from "../components/common/Button";

function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();

    // Temporary login
    localStorage.setItem("token", "demo-token");

    navigate("/dashboard");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="w-full max-w-md bg-white rounded-xl shadow-lg p-8">

        <h1 className="text-3xl font-bold text-center mb-2">
          Fleet Management
        </h1>

        <p className="text-center text-gray-500 mb-8">
          Sign in to continue
        </p>

        <form onSubmit={handleLogin} className="space-y-5">

          <div>
            <label className="block mb-2 font-medium">
              Email
            </label>

            <input
              type="email"
              placeholder="Enter email"
              className="w-full border rounded-lg px-4 py-3 outline-none focus:border-blue-500"
              value={email}
              onChange={(e)=>setEmail(e.target.value)}
            />
          </div>

          <div>
            <label className="block mb-2 font-medium">
              Password
            </label>

            <input
              type="password"
              placeholder="Enter password"
              className="w-full border rounded-lg px-4 py-3 outline-none focus:border-blue-500"
              value={password}
              onChange={(e)=>setPassword(e.target.value)}
            />
          </div>

          <Button
            type="submit"
            className="w-full py-3"
          >
            Login
          </Button>

        </form>
      </div>
    </div>
  );
}

export default Login;