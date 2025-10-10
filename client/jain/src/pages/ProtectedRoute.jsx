import { useContext } from "react";
import { AuthContext } from "../context/Authcontext";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ element }) => {
  const { admin, isLoading } = useContext(AuthContext);

  if (isLoading) return <div className="text-center mt-10">Loading...</div>;
  if (!admin) return <Navigate to="/login" />;

  return element;
};
export default ProtectedRoute;
