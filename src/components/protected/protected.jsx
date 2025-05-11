import { Navigate, Outlet } from "react-router-dom";
import Navbar from "../navbar/Navbar";
import { jwtDecode } from "jwt-decode";

const isTokenValid = (token) => {
  try {
    const decoded = jwtDecode(token);
    const currentTime = Date.now() / 1000;
    return decoded.exp > currentTime;
  } catch {
    return false;
  }
};

const ProtectedRoute = () => {
  const token = localStorage.getItem("token");

  if (!token || !isTokenValid(token)) {
    return <Navigate to="/login" replace />;
  }

  return (
    <>
      <div className="bg-white text-black dark:bg-gray-900 dark:text-white transition-all">
        <Navbar />
        <Outlet />
      </div>
    </>
  );
};

export default ProtectedRoute;
