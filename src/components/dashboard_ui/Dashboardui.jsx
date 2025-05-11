import React from "react";
import crysta from "../../assets/images/crysta.png";
import "./dashboardui.css";

const Dashboardui = () => {
  return (
    <>
      <div className="bg-white text-black dark:bg-gray-800 dark:text-white split-screen">
        <div className="left-side">
          <img src={crysta} alt="Sample" className="image" />
        </div>
        <div className="right-side">
          <h1>Welcome to Travel Tally</h1>
          <p>
            we believe that travel is more than just a journey – it’s an
            opportunity to explore new cultures, discover hidden gems, and
            create lifelong memories. Whether you're looking to escape to a
            tropical paradise, venture into bustling cities, or trek through
            scenic landscapes, we’ve got the perfect tour package for you.
          </p>
        </div>
      </div>
    </>
  );
};

export default Dashboardui;
