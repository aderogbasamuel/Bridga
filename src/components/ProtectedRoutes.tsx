import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

interface ProtectedRouteProps {
  children: React.ReactNode;
  role?: "admin" | "user"; // optional role restriction
}

export default function ProtectedRoute({ children, role }: ProtectedRouteProps) {
  const { user, role: userRole, loading } = useAuth();

  if (loading) return <p>Loading...</p>;

  if (!user) {
    // not logged in
    return <Navigate to="/login" replace />;
  }

  if (role && userRole !== role) {
    // logged in but not the right role
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
}

