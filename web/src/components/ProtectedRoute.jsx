import { decodeToken, isExpired } from "react-jwt";
import { Navigate, Outlet } from "react-router";

export default function ProtectedRoute({ requiredRole = "admin" }) {
  console.log("required role", requiredRole);

  const token = localStorage.getItem("token");

  if (!token || isExpired(token)) {
    return <Navigate to="/login" replace />;
  }

  const decoded = decodeToken(token);

  if (requiredRole && decoded?.role !== requiredRole) {
    return <Navigate to="/users" replace />;
  }

  return <Outlet />;
}
