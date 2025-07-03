import { isExpired } from "react-jwt";
import { Navigate, Outlet } from "react-router";

const isAuthenticated = () => {
  const token = localStorage.getItem("token");
  if (!token) return false;
  if (isExpired(token)) {
    localStorage.removeItem("token");
    return false;
  }

  return true;
};

export default function ProtectedRoute() {
  return isAuthenticated() ? <Outlet /> : <Navigate to="/login" replace />;
}
