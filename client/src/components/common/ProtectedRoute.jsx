import { Navigate } from "react-router-dom";
import { isAuthenticated, getToken } from "../../utils/auth";

export default function ProtectedRoute({ children }) {
  console.log("Auth check running. Token found:", getToken());

  if (!isAuthenticated()) {
    return <Navigate to="/login" replace />;
  }
  return children;
}