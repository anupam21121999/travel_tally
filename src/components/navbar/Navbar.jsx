import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  const corpDetails = localStorage.getItem("corpName");
  console.log(corpDetails);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("corpName");
  };

  return (
    <>
      <nav>
        <ul className="flex items-center justify-between px-6 py-4 shadow-md bg-blue-300 mt-5 text-lg font-bold">
          <li>
            <h5>{corpDetails}</h5>
          </li>
          <li>
            <Link to="/billing_system">Billing System</Link>
          </li>
          <li>
            <Link to="/service_record">Service Record</Link>
          </li>
          <li>
            <Link to="/display_bills">Display Bills</Link>
          </li>
          <li>
            <Link to="/driver_details1">Driver Details</Link>
          </li>
          <li>
            <Link to="/" onClick={() => handleLogout()}>
              Logout
            </Link>
          </li>
        </ul>
      </nav>
    </>
  );
};

export default Navbar;
