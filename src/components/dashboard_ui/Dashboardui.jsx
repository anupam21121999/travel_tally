import React from "react";
import crysta from "../../assets/images/crysta.png";

const Dashboardui = () => {
  return (
    <>
      <div className="min-h-screen bg-white text-black dark:bg-gray-950 dark:text-white flex h-100vh font-sans">
        <div className="flex-1 justify-center items-center flex">
          <img src={crysta} alt="Sample" className="h-auto w-auto object-contain" />
        </div>
        <div className="flex-1 justify-center flex-col items-center flex p-4">
          <h1 className="mb-4 text-[2.5rem] font-bold">Welcome to Travel Tally</h1>
          <p className="text-lg mb-4">
            We believe that travel is more than just a journey – it’s an
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
