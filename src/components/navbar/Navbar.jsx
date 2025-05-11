import React from "react";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";

const Navbar = () => {
  const corpDetails = localStorage.getItem("corpName");
  const [darkMode, setDarkMode] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("corpName");
  };

  useEffect(() => {
    const root = window.document.documentElement;
    if (darkMode) {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }
  }, [darkMode]);

  return (
    <>
      <nav className="fixed top-0 left-0 w-full z-50 bg-gradient-to-r from-gray-900 to-gray-950 shadow-md">
        <ul className="flex flex-wrap items-center justify-between px-6 py-4 text-white text-lg font-semibold">
          <li className="text-xl font-bold">{corpDetails}</li>

          <div className="flex gap-6 items-center flex-wrap">
            <li>
              <button
                onClick={() => setDarkMode(!darkMode)}
                className="px-4 py-2 bg-gray-300 text-black dark:bg-gray-700 dark:text-white rounded-lg hover:opacity-90 transition duration-200"
              >
                {darkMode ? "Light Mode" : "Dark Mode"}
              </button>
            </li>
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
                to="/vehicle_dashboard"
                className="hover:text-yellow-200 transition-colors duration-200"
              >
                Vehicle Details
              </Link>
            </li>
            <li>
              <Link
                to="/login"
                onClick={handleLogout}
                className="hover:text-red-200 transition-colors duration-200"
              >
                Logout
              </Link>
            </li>
          </div>
        </ul>
      </nav>
    </>
  );
};

export default Navbar;
