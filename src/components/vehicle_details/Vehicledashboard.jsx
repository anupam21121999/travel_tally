import React from "react";
import { useState, useEffect } from "react";
import { toast, Toaster } from "react-hot-toast";
import { Link } from "react-router-dom";
import { motion } from 'framer-motion';

const pageVariants = {
  initial: { x: "100vw", opacity: 0 },
  in: { x: 0, opacity: 1 },
  out: { x: "-100vw", opacity: 0 },
};

const pageTransition = {
  type: "tween",
  ease: "easeInOut",
  duration: 0.5,
};

const Vehicledashboard = () => {
  const token = localStorage.getItem("token");
  const [vehicles, setVehicles] = useState([]);
  const [search, setSearch] = useState("");

  const getAllVehicles = async () => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_DOMAIN}/api/vehicle/getAll`,
        {
          method: "GET",
          headers: {
            Authorization: token,
          },
        }
      );
      const data = await response.json();
      if (response.status === 200) {
        setVehicles(data.vehicleRecords);
        toast.success("Vehicles Found");
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAllVehicles();
  }, []);

  const filteredItems = vehicles.filter((vehicle) =>
    `${vehicle.model} ${vehicle.color} ${vehicle.year} ${vehicle.registrationNumber}`
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  return (
    <motion.div
    initial="initial"
    animate="in"
    exit="out"
    variants={pageVariants}
    transition={pageTransition}>
      <Toaster position="bottom-center" reverseOrder={false} />
      <div className="p-4">
        <div className="flex flex-row gap-2 w-auto h-auto">
          <input
            className="flex-grow h-10 rounded-lg border px-3"
            type="text"
            placeholder="Search vehicles..."
            onChange={(e) => setSearch(e.target.value)}
          />
          <Link to="/vehicle_detail">
            <button className="h-10 px-4 rounded-lg bg-blue-500 text-white hover:bg-blue-600 transition-colors">
              Add Vehicle Details
            </button>
          </Link>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredItems.map((item) => (
            <div
              key={item._id}
              className="bg-white shadow-md rounded-xl p-4 border hover:shadow-lg transition-shadow duration-300"
            >
              <h3 className="text-lg font-semibold text-gray-800">
                Model: {item.model}
              </h3>
              <p className="text-gray-600">Color: {item.color}</p>
              <p className="text-gray-600">Year: {item.year}</p>
              <p className="text-gray-600">
                Registration No: {item.registrationNumber}
              </p>
              <p className="text-gray-600">Total KMs: {item.totalKms}</p>
              <p className="text-gray-600">Mileage: {item.mileage}</p>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

export default Vehicledashboard;
