import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  const corpDetails = localStorage.getItem("corpName");

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("corpName");
  };

  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-gradient-to-r from-gray-900 to-gray-950 shadow-md">
      <ul className="flex flex-wrap items-center justify-between px-6 py-4 text-white text-lg font-semibold">
        <li className="text-xl font-bold">{corpDetails}</li>
        <div className="flex gap-10 flex-wrap justify-end">
          <li>
            <Link
              to="/billing_system"
              className="hover:text-yellow-200 transition-colors duration-200"
            >
              Billing System
            </Link>
          </li>
          <li>
            <Link
              to="/service_record"
              className="hover:text-yellow-200 transition-colors duration-200"
            >
              Service Record
            </Link>
          </li>
          <li>
            <Link
              to="/display_bills"
              className="hover:text-yellow-200 transition-colors duration-200"
            >
              Display Bills
            </Link>
          </li>
          <li>
            <Link
              to="/driver_dashboard"
              className="hover:text-yellow-200 transition-colors duration-200"
            >
              Driver Details
            </Link>
          </li>
          <li>
            <Link
              to="/"
              onClick={handleLogout}
              className="hover:text-red-200 transition-colors duration-200"
            >
              Logout
            </Link>
          </li>
        </div>
      </ul>
    </nav>
  );
};

export default Navbar;
