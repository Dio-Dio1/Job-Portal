import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const ProtectedRoute = ({ allowedRoles }) => {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="flex flex-col items-center gap-3">
          <div className="w-12 h-12 border-4 border-green-200 border-t-green-700 rounded-full animate-spin"></div>
          <p className="text-gray-500 font-medium text-sm">Verifying session...</p>
        </div>
      </div>
    );
  }

  // If not logged in, redirect to auth page
  if (!user) {
    return <Navigate to="/auth" replace />;
  }

  // If logged in, check if user role is allowed
  if (allowedRoles && !allowedRoles.includes(user.role)) {
    // Redirect wrong roles to their correct default dashboards
    const fallbackPath = user.role === "company" ? "/employer/dashboard" : "/dashboard";
    return <Navigate to={fallbackPath} replace />;
  }

  // If checks pass, render child routes
  return <Outlet />;
};

export default ProtectedRoute;
