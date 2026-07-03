import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import Loader from "../components/Layout/Loader";

const ProtectedRoute = ({ children }) => {
  const { loading, isAuthenticated, user } = useSelector((state) => state.user);

  if (loading !== false) {
    return <Loader />;
  }

  if (!isAuthenticated || !user?._id) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default ProtectedRoute;
