import { Navigate } from "react-router-dom";

function ProtectedRoute({ children, adminOnly = false }) {
  const token = localStorage.getItem("fitkit-token");
  const user = JSON.parse(localStorage.getItem("fitkit-user") || "null");

  if (!token || !user) {
    return <Navigate to="/login" replace />;
  }

  if (adminOnly && user.role !== "admin") {
    return <Navigate to="/products" replace />;
  }

  return children;
}

export default ProtectedRoute;
