import { Navigate } from "react-router-dom";
import { useAuth } from "../../Context/AuthContext";


const ProtectedRoute = ({ children, permission }) => {
  const token = localStorage.getItem("token");
  const { permissions } = useAuth();

  if (!token) {
    return <Navigate to="/login" replace />;
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