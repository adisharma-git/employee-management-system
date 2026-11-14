import { Navigate } from "react-router-dom";
import { useAuth } from "../../Context/AuthContext";
import { getRecentExitPath } from "../utils/session";


const ProtectedRoute = ({ children, permission }) => {
  const token = localStorage.getItem("token");
  const { permissions } = useAuth();

  if (!token) {
    // A session that just ended (logout, demo over) has its own destination.
    return <Navigate to={getRecentExitPath() || "/login"} replace />;
  }

  if (permission && !permissions.includes(permission)) {
    return (
      <div className="p-10 text-center text-red-500">
        Access Denied
      </div>
    );
  }

  return children;
};

export default ProtectedRoute;