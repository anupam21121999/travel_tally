import { AiOutlinePlus } from 'react-icons/ai';
import { useState, useEffect } from "react";
import { toast, Toaster } from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import { GoPencil } from "react-icons/go";
import { MdDeleteOutline } from "react-icons/md";
import { motion, AnimatePresence } from "framer-motion";

const pageVariants = {
  initial: { x: "100vw", opacity: 0 },
  in: { x: 0, opacity: 1 },
  out: { x: "-100vw", opacity: 0 },
};

const pageTransition = {
  type: "tween",
  ease: "easeInOut",
  duration: 0.3,
};

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
      <motion.div
      initial="initial"
      animate="in"
      exit="out"
      variants={pageVariants}
      transition={pageTransition}
    >
      <div className="w-screen min-h-screen bg-white text-black dark:bg-gray-950 dark:text-white">
        <Toaster position="bottom-center" reverseOrder={false} />
      <div className="flex justify-center items-start pt-32">
        <div className="px-4 w-full max-w-6xl">
          <div className="flex flex-row gap-2 w-auto h-auto">
            <input
              className="flex-grow h-10 rounded-lg border px-3
              border-black placeholder-black focus:outline-none focus:ring-2 focus:ring-gray-900
              dark:border-white dark:bg-gray-950 dark:text-white dark:placeholder-white dark:focus:ring-white"
              type="text"
              placeholder="Search vehicles..."
              onChange={(e) => setSearch(e.target.value)}
            />
            <Link to="/vehicle_detail">
              <button className="flex items-center gap-2 px-4 py-2  rounded-lg font-semibold transition-colors duration-300
              bg-black text-white hover:bg-gray-700 
              dark:bg-white dark:text-black dark:hover:bg-gray-700 dark:hover:text-white">
                <AiOutlinePlus className='text-lg'/>
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
                    className="bg-white shadow-xl rounded-xl p-4 border-2 border-transparent hover:shadow-xl transition-all duration-300
                    dark:bg-gray-800 dark:border-white dark:hover:border-2"
                  >
                    <h3 className="text-lg font-semibold text-gray-800 dark:text-white">
                      Model: {item.model}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300">Color: {item.color}</p>
                    <p className="text-gray-600 dark:text-gray-300">Year: {item.year}</p>
                    <p className="text-gray-600 dark:text-gray-300">
                      Registration No: {item.registrationNumber}
                    </p>
                    <p className="text-gray-600 dark:text-gray-300">Total KMs: {item.totalKms}</p>
                    <p className="text-gray-600 dark:text-gray-300">Mileage: {item.mileage}</p>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-center text-lg">
                No Vehicles Found.
              </p>
            )}
          </div>
        </div>
      </div>

      <AnimatePresence>
        {showModal && selectedVehicle && (
          <div className="fixed inset-0 z-50 flex justify-center items-start pt-24 bg-black bg-opacity-70 overflow-y-auto">
            <motion.div
              initial={{ opacity: 0, scale: 0.1 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.1 }}
              transition={{ duration: 0.3 }}
              className="bg-white rounded-2xl p-6 w-full max-w-md relative dark:bg-gray-950 dark:text-white border-2 border-transparent dark:border-gray-300"
            >
              {/* Close & Delete Buttons */}
              <div className="absolute top-3 right-3 flex gap-4">
                <GoPencil
                  onClick={() => visibleElement()}
                  title="Update Vehicle"
                  className="size-6 mt-1 cursor-pointer hover:text-green-800 text-xl font-bold"
                />
                <MdDeleteOutline
                  onClick={() => setShowPopup(true)}
                  title="Delete Vehicle"
                  className="size-6 mt-1 text-red-500 cursor-pointer hover:text-red-700 transition-all duration-300 text-xl font-bold"
                />
                {showPopup && (
                  <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
                    <div className="bg-white dark:bg-gray-900 p-6 rounded-2xl shadow-lg text-center max-w-xs border border-transparent dark:border-gray-300">
                      <h2 className="text-lg text-gray-900 dark:text-white font-semibold mb-4">
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
                          className="bg-green-500 text-white px-3 py-2 rounded-xl hover:bg-green-600"
                        >
                          Yes
                        </button>
                        <button
                          onClick={() => setShowPopup(false)}
                          className="bg-red-500 text-white px-3 py-2 rounded-xl hover:bg-red-800"
                        >
                          No
                        </button>
                      </motion.div>
                    </div>
                  </div>
                )}
                <button
                  onClick={() => close()}
                  className="text-white dark:text-black w-9 bg-gray-900 dark:bg-gray-100 rounded-full hover:bg-gray-400 dark:hover:bg-gray-600 dark:hover:text-white text-sm font-bold p-2 transition-all duration-250"
                  title="Close"
                >
                  ✕
                </button>
              </div>
              {toggleButton ? (
                <div className="max-w-md mx-auto bg-white dark:bg-gray-950 p-6 rounded-2xl shadow-lg">
                  <div className="mb-6 text-left text-xl font-bold">
                    <label>Model:</label>
                    <input
                      className="w-full text-2xl text-center rounded-lg border
                      border-black placeholder-black focus:outline-none focus:ring-2 focus:ring-gray-950
                      dark:border-white dark:bg-gray-900 dark:text-white dark:placeholder-white dark:focus:ring-white"
                      value={model}
                      onChange={(e) => setModel(e.target.value)}
                      placeholder="Enter Model"
                    />
                    <p className="text-base text-gray-600 dark:text-gray-200 font-semibold">
                      Registration No: {selectedVehicle.registrationNumber}
                    </p>
                  </div>

                  <div className="space-y-4">
                    <div className="flex flex-col">
                      <label className="text-gray-600 dark:text-gray-200 font-semibold mb-1">
                        Color
                      </label>
                      <input
                        className="border
                      border-black placeholder-black focus:outline-none focus:ring-2 focus:ring-gray-950
                      dark:border-white dark:bg-gray-900 dark:text-white dark:placeholder-white dark:focus:ring-white"
                        value={color}
                        onChange={(e) => setColor(e.target.value)}
                      />
                    </div>

                    <div className="flex flex-col">
                      <label className="text-gray-600 dark:text-gray-200 font-semibold mb-1">
                        Year
                      </label>
                      <input
                        className="border
                      border-black placeholder-black focus:outline-none focus:ring-2 focus:ring-gray-950
                      dark:border-white dark:bg-gray-900 dark:text-white dark:placeholder-white dark:focus:ring-white"
                        value={year}
                        onChange={(e) => setYear(e.target.value)}
                      />
                    </div>

                    <div className="flex flex-col">
                      <label className="text-gray-600 dark:text-gray-200 font-semibold mb-1">
                        Total KMs
                      </label>
                      <input
                        className="border
                      border-black placeholder-black focus:outline-none focus:ring-2 focus:ring-gray-950
                      dark:border-white dark:bg-gray-900 dark:text-white dark:placeholder-white dark:focus:ring-white"
                        value={km}
                        onChange={(e) => setKm(e.target.value)}
                      />
                    </div>
                    <div className="flex flex-col">
                      <label className="text-gray-600 dark:text-gray-200 font-semibold mb-1">
                        Mileage
                      </label>
                      <input
                        className="border
                      border-black placeholder-black focus:outline-none focus:ring-2 focus:ring-gray-950
                      dark:border-white dark:bg-gray-900 dark:text-white dark:placeholder-white dark:focus:ring-white"
                        value={mileage}
                        onChange={(e) => setMileage(e.target.value)}
                      />
                    </div>
                  </div>

                  <div className="mt-6 text-right">
                    <button
                      onClick={() => setShowPopup1(true)}
                      className="bg-gray-950 dark:bg-white
                       text-white dark:text-black 
                       px-3 py-2 font-semibold rounded-xl
                       hover:bg-gray-400 dark:hover:bg-gray-800 dark:hover:text-white transition-all duration-300"
                    >
                      Update
                    </button>
                    {showPopup1 && (
                      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
                        <div className="bg-white dark:bg-gray-900 p-6 rounded-2xl shadow-lg text-center max-w-xs border border-transparent dark:border-gray-300">
                          <h2 className="text-lg text-gray-950 dark:text-white font-semibold mb-4">
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
                              className="bg-green-500 text-white px-3 py-2 rounded-xl hover:bg-green-600"
                            >
                              Yes
                            </button>
                            <button
                              onClick={() => setShowPopup1(false)}
                              className="bg-red-500 text-white px-3 py-2 rounded-xl hover:bg-red-800"
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
                  <div className="pt-3 mb-4 text-center">
                    <h2 className="text-2xl font-bold text-gray-950 dark:text-white mb-1">
                      {selectedVehicle.model}
                    </h2>
                    <p className="text-sm text-gray-800 dark:text-gray-200 text-semibold">
                      Registration No: {selectedVehicle.registrationNumber}
                    </p>
                  </div>

                  <div className="space-y-2 text-gray-700 dark:text-gray-200 font-semibold">
                    <p >
                      <span>Color:</span>{" "}
                      {selectedVehicle.color}
                    </p>
                    <p >
                      <span>Year:</span>{" "}
                      {selectedVehicle.year}
                    </p>
                    <p >
                      <span>Total KMs:</span>{" "}
                      {selectedVehicle.totalKms}
                    </p>
                    <p >
                      <span>Mileage:</span>{" "}
                      {selectedVehicle.mileage}
                    </p>
                  </div>
                </div>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>
      </div>
    </motion.div>
  );
};

export default Vehicledashboard;
