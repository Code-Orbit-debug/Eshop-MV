import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import Loader from "../components/Layout/Loader";

const SellerProtectedRoute = ({ children }) => {
  const { isLoading, isSeller, seller } = useSelector((state) => state.seller);
  if (isLoading !== false) {
    return <Loader />;
  }
  if (!isSeller || !seller?._id) {
    return <Navigate to={`/shop-login`} replace />;
  }
  return children;
};

export default SellerProtectedRoute;
