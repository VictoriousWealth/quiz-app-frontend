import { Navigate } from "react-router-dom";
import { isTokenExpired } from "../utils/authUtils";

const PrivateRoute = ({ children }) => {
  const token = getToken();

  if (!token || isTokenExpired(token)) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default PrivateRoute;
