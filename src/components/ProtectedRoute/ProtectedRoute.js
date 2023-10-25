import { Navigate } from "react-router-dom";


function ProtectedRoute({ isLoggedIn, children, redirect }) {
  return isLoggedIn ? children : <Navigate to={redirect} />;
}

export default ProtectedRoute;