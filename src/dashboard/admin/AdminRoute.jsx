
import { Navigate, useLocation } from "react-router";
import UseAuth from "../../hooks/UseAuth";
import useAdmin from "./useAdmin";


const AdminRoute = ({ children }) => {
  const { user, loading } = UseAuth()
  const [isAdmin, adminLoading] = useAdmin()
  const location = useLocation()

  
  if (loading || adminLoading) {
    return <p className="text-center">⏳ Checking permission...</p>;
  }

  if (user && isAdmin) {
    return children;
  }

  return <Navigate to="/" state={{ from: location }} replace />;
};


export default AdminRoute;
