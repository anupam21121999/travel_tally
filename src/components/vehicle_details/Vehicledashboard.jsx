import React from "react";
import { useState, useEffect } from "react";
import { toast, Toaster } from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import { GoPencil } from "react-icons/go";
import { MdDeleteOutline } from "react-icons/md";
import { motion, AnimatePresence } from "framer-motion";

const Vehicledashboard = () => {
  const token = localStorage.getItem("token");
  const navigate = useNavigate();
  const [vehicles, setVehicles] = useState([]);
  const [search, setSearch] = useState("");
  const [selectedVehicle, setSelectedVehicle] = useState("");
  const [model, setModel] = useState("");
  const [color, setColor] = useState("");
  const [year, setYear] = useState("");
  const [km, setKm] = useState("");
  const [mileage, setMileage] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [showPopup1, setShowPopup1] = useState(false);
  const [toggleButton, setToggleButton] = useState(false);

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

  const open = (vehicle) => {
    setSelectedVehicle(vehicle);
    setModel(vehicle.model);
    setColor(vehicle.color);
    setYear(vehicle.year);
    setKm(vehicle.totalKms);
    setMileage(vehicle.mileage);
    setShowModal(true);
  };

  const close = () => {
    setSelectedVehicle(null);
    setShowPopup(false);
    setToggleButton(false);
  };

  const filteredItems = vehicles.filter((vehicle) =>
    `${vehicle.model} ${vehicle.color} ${vehicle.year} ${vehicle.registrationNumber}`
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  const deleteVehicle = async (id) => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_DOMAIN}/api/vehicle/delete/${id}`,
        {
          method: "DELETE",
          headers: {
            Authorization: token,
          },
        }
      );
      const data = await response.json();
      if (response.status === 200) {
        toast.success("Deleted Successfully");
        setVehicles((prevVehicle) =>
          prevVehicle.filter((vehicle) => vehicle._id !== id)
        );
        setTimeout(() => {
          navigate("/vehicle_dashboard");
        }, 1000);
        window.location.reload();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const updateVehicle = async (id) => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_DOMAIN}/api/vehicle/update/${id}`,
        {
          method: "PUT",
          headers: {
            Authorization: token,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            model: model,
            color: color,
            year: year,
            totalKms: parseInt(km),
            mileage: parseInt(mileage),
          }),
        }
      );
      const data = await response.json();
      if (response.status === 200) {
        toast.success("Updated Successfully");
        getAllVehicles();
        setShowPopup1(false);
        close();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const visibleElement = () => {
    setToggleButton((prev) => !prev);
  };

  return (
    <>
      <Toaster position="top-center" reverseOrder={false} />
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
        <div className="container mx-auto px-4 py-6">
          {filteredItems.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredItems.map((item) => (
                <div
                  key={item._id}
                  onClick={() => open(item)}
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
          ) : (
            <p className="text-center text-lg text-gray-500">
              No Vehicles Found.
            </p>
          )}
        </div>
      </div>

      <AnimatePresence>
        {showModal && selectedVehicle && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.3 }}
              className="bg-white rounded-2xl shadow-xl p-6 w-full max-w-md relative"
            >
              {/* Close & Delete Buttons */}
              <div className="absolute top-3 right-3 flex gap-2">
                <GoPencil
                  onClick={() => visibleElement()}
                  title="Update Vehicle"
                  className="size-6 mt-1 cursor-pointer hover:text-green-800 text-xl font-bold"
                />
                <MdDeleteOutline
                  onClick={() => setShowPopup(true)}
                  title="Delete Vehicle"
                  className="size-6 mt-1 text-red-500 cursor-pointer hover:text-red-700 transition"
                />
                {showPopup && (
                  <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
                    <div className="bg-white p-6 rounded-lg shadow-lg text-center max-w-xs">
                      <h2 className="text-lg font-semibold mb-4">
                        Are you sure?
                      </h2>

                      <motion.div
                        className="flex justify-center gap-4"
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.3, ease: "easeOut" }}
                      >
                        <button
                          onClick={() => {
                            deleteVehicle(selectedVehicle._id);
                            setShowPopup(false);
                          }}
                          className="bg-green-500 text-white px-3 py-2 rounded-md hover:bg-green-600"
                        >
                          Yes
                        </button>
                        <button
                          onClick={() => setShowPopup(false)}
                          className="bg-red-500 text-white px-3 py-2 rounded-md hover:bg-red-800"
                        >
                          No
                        </button>
                      </motion.div>
                    </div>
                  </div>
                )}
                <button
                  onClick={() => close()}
                  className="text-white hover:text-black text-sm font-bold focus:outline-none"
                  title="Close"
                >
                  ✕
                </button>
              </div>
              {toggleButton ? (
                <div className="max-w-md mx-auto bg-white p-6 rounded-2xl shadow-lg">
                  <div className="mb-6 text-center">
                    <input
                      className="w-full text-2xl font-bold text-gray-800 border-b-2 border-gray-300 focus:outline-none focus:border-blue-500 mb-2 text-center"
                      value={model}
                      onChange={(e) => setModel(e.target.value)}
                      placeholder="Enter Model"
                    />
                    <p className="text-sm text-gray-600 font-semibold">
                      Registration No: {selectedVehicle.registrationNumber}
                    </p>
                  </div>

                  <div className="space-y-4">
                    <div className="flex flex-col">
                      <label className="text-gray-700 font-semibold mb-1">
                        Color
                      </label>
                      <input
                        className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                        value={color}
                        onChange={(e) => setColor(e.target.value)}
                      />
                    </div>

                    <div className="flex flex-col">
                      <label className="text-gray-700 font-semibold mb-1">
                        Year
                      </label>
                      <input
                        className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                        value={year}
                        onChange={(e) => setYear(e.target.value)}
                      />
                    </div>

                    <div className="flex flex-col">
                      <label className="text-gray-700 font-semibold mb-1">
                        Total KMs
                      </label>
                      <input
                        className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                        value={km}
                        onChange={(e) => setKm(e.target.value)}
                      />
                    </div>

                    <div className="flex flex-col">
                      <label className="text-gray-700 font-semibold mb-1">
                        Mileage
                      </label>
                      <input
                        className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                        value={mileage}
                        onChange={(e) => setMileage(e.target.value)}
                      />
                    </div>
                  </div>

                  <div className="mt-6 text-right">
                    <button
                      onClick={() => setShowPopup1(true)}
                      className="bg-blue-600 text-white px-3 py-2 rounded-lg hover:bg-blue-700 transition"
                    >
                      Update
                    </button>
                    {showPopup1 && (
                      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
                        <div className="bg-white p-6 rounded-lg shadow-lg text-center max-w-xs">
                          <h2 className="text-lg font-semibold mb-4">
                            Are you sure?
                          </h2>

                          <motion.div
                            className="flex justify-center gap-4"
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.3, ease: "easeOut" }}
                          >
                            <button
                              onClick={() => {
                                updateVehicle(selectedVehicle._id);
                                setShowPopup1(false);
                              }}
                              className="bg-green-500 text-white px-3 py-2 rounded-md hover:bg-green-600"
                            >
                              Yes
                            </button>
                            <button
                              onClick={() => setShowPopup1(false)}
                              className="bg-red-500 text-white px-3 py-2 rounded-md hover:bg-red-800"
                            >
                              No
                            </button>
                          </motion.div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              ) : (
                <div>
                  <div className="mb-4 text-center">
                    <h2 className="text-2xl font-bold text-gray-800 mb-1">
                      {selectedVehicle.model}
                    </h2>
                    <p className="text-sm text-gray-800 text-semibold">
                      Registration No: {selectedVehicle.registrationNumber}
                    </p>
                  </div>

                  <div className="space-y-2">
                    <p className="text-gray-700">
                      <span className="font-semibold">Color:</span>{" "}
                      {selectedVehicle.color}
                    </p>
                    <p className="text-gray-700">
                      <span className="font-semibold">Year:</span>{" "}
                      {selectedVehicle.year}
                    </p>
                    <p className="text-gray-700">
                      <span className="font-semibold">Total KMs:</span>{" "}
                      {selectedVehicle.totalKms}
                    </p>
                    <p className="text-gray-700">
                      <span className="font-semibold">Mileage:</span>{" "}
                      {selectedVehicle.mileage}
                    </p>
                  </div>
                </div>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Vehicledashboard;
