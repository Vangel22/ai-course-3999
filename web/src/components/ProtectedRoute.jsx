import { Navigate, Outlet } from "react-router";
import { isExpired, decodeToken } from "react-jwt";

export default function ProtectedRoute({ requiredRole }) {
  const token = localStorage.getItem("token");

  if (!token || isExpired(token)) {
    localStorage.removeItem("token");
    return <Navigate to="/login" replace />;
  }

  const decoded = decodeToken(token);
  if (requiredRole && decoded?.role !== requiredRole) {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
}
