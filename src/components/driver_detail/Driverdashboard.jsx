import React, { useState, useEffect } from "react";
import { GoPencil } from "react-icons/go";
import { AiOutlinePlus } from 'react-icons/ai';
import { MdDeleteOutline } from "react-icons/md";
import { Link, useNavigate } from "react-router-dom";
import { toast, Toaster } from "react-hot-toast";
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

const Driverdashboard = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const [drivers, setDrivers] = useState([]);
  const [selectedDriver, setSelectedDriver] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [search, setSearch] = useState("");
  const [toggleButton, setToggleButton] = useState(false);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [joiningDate, setJoiningDate] = useState("");
  const [showConfirmPopup, setShowConfirmPopup] = useState(false);
  const [showConfirmPopup1, setShowConfirmPopup1] = useState(false);

  const getDriverDetails = async () => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_DOMAIN}/api/driver/get`,
        {
          method: "GET",
          headers: {
            Authorization: token,
          },
        }
      );
      const data = await response.json();
      if (response.status === 200) {
        setDrivers(data.driver);
        console.log(data.driver);
      } else {
        console.log("Error fetching data");
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getDriverDetails();
  }, []);

  const openModal = (driver) => {
    setSelectedDriver(driver);
    setFirstName(driver.firstName);
    setLastName(driver.lastName);
    setAddress(driver.address);
    setPhone(driver.phone);
    setJoiningDate(driver.joiningDate);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setSelectedDriver(null);
    setToggleButton(false);
  };

  const filteredDrivers = drivers.filter((driver) =>
    `${driver.firstName} ${driver.lastName} ${driver.phone}`
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  const deleteDrivers = async (id) => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_DOMAIN}/api/driver/delete/${id}`,
        {
          method: "DELETE",
          headers: {
            Authorization: token,
          },
        }
      );
      if (response.status === 200) {
        toast.success("Deleted Successfully");
        setDrivers((prevDriver) =>
          prevDriver.filter((driver) => driver._id !== id)
        );
        setTimeout(() => {
          navigate("/driver_dashboard");
        }, 1000);
        window.location.reload();
      } else {
        toast.error("Unable to delete");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const updateDriver = async (id) => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_DOMAIN}/api/driver/update/${id}`,
        {
          method: "PUT",
          headers: {
            Authorization: token,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            firstName: firstName,
            lastName: lastName,
            address: address,
            phone: phone,
            joiningDate: joiningDate,
          }),
        }
      );
      const data = await response.json();
      if (response.status === 200) {
        console.log("Updated Successfully");
        getDriverDetails();
        setToggleButton(false);
        closeModal();
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
      <div className="flex justify-center items-start pt-36">
        <div className="px-4 w-full max-w-6xl">
          {/* Top Search & Add Driver Section */}
          <div className="flex flex-row gap-2 w-auto h-auto">
            <input
              type="text"
              placeholder="Search drivers..."
              className="flex-grow h-10 rounded-lg border px-3
              border-black placeholder-black focus:outline-none focus:ring-2 focus:ring-gray-900
              dark:border-white dark:bg-gray-950 dark:text-white dark:placeholder-white dark:focus:ring-white"
              onChange={(e) => setSearch(e.target.value)}
            />
            <Link to="/driver_details1">
              <button className="flex items-center gap-2 px-4 py-2  rounded-lg font-semibold transition-colors duration-300
              bg-black text-white hover:bg-gray-700 
              dark:bg-white dark:text-black dark:hover:bg-gray-700 dark:hover:text-white">
                <AiOutlinePlus className="text-lg" />
                Add Driver Details
              </button>
            </Link>
          </div>

          {/* Driver Cards Section */}
          <div className="container mx-auto px-4 py-6">
            {filteredDrivers.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredDrivers.map((driver) => (
                  <div
                    key={driver._id}
                    onClick={() => openModal(driver)}
                    className="bg-white shadow-xl rounded-xl p-4 border-2 border-transparent hover:shadow-xl transition-all duration-300
                    dark:bg-gray-800 dark:border-white dark:hover:border-2"
                  >
                    <h3 className="text-lg font-semibold text-gray-800 dark:text-white">
                      {driver.firstName} {driver.lastName}
                    </h3>
                    <div className="text-gray-600 dark:text-gray-300">
                      <p className="break-words">
                        <strong>Phone:</strong> {driver.phone}
                      </p>
                      <p className="break-words">
                        <strong>Address:</strong> {driver.address}
                      </p>
                      <p>
                        <strong>Joining Date:</strong>{" "}
                        {new Date(driver.joiningDate).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-center text-lg text-gray-500">
                No drivers found.
              </p>
            )}
          </div>
        </div>
      </div>

      {/* Modal */}
      <AnimatePresence>
        {showModal && selectedDriver && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white rounded-xl p-6 max-w-lg w-full max-h-[80vh] overflow-y-auto relative">
              <div className="relative flex justify-end items-center gap-4 p-2 rounded-md">
                <GoPencil
                  onClick={() => visibleElement()}
                  className="size-6 cursor-pointer hover:text-black text-xl font-bold"
                />
                <MdDeleteOutline
                  onClick={() => setShowConfirmPopup1(true)}
                  className="size-6 cursor-pointer hover:text-black text-xl font-bold"
                />
                <AnimatePresence>
                  {showConfirmPopup1 && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
                    >
                      <motion.div
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0.8, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="bg-white p-6 rounded-lg shadow-lg text-center max-w-xs"
                      >
                        <h2 className="text-lg font-semibold mb-4">
                          Are you sure?
                        </h2>
                        <div className="flex justify-center gap-4">
                          <button
                            onClick={() => {
                              deleteDrivers(selectedDriver._id);
                              setShowConfirmPopup1(false);
                            }}
                            className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
                          >
                            Yes
                          </button>
                          <button
                            onClick={() => setShowConfirmPopup1(false)}
                            className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                          >
                            No
                          </button>
                        </div>
                      </motion.div>
                    </motion.div>
                  )}
                  <button
                    onClick={closeModal}
                    className="text-white hover:text-black text-sm font-medium"
                  >
                    ✕
                  </button>
                </AnimatePresence>
              </div>
              <h1 className="font-semibold mb-2">
                {selectedDriver.firstName} {selectedDriver.lastName} Documents
              </h1>
              {toggleButton ? (
                <div className="m-2 space-y-4 animate-fade-in transition duration-500 ease-in-out">
                  <label className="block font-semibold">First Name:</label>
                  <input
                    type="text"
                    className="border p-2 w-full rounded shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    placeholder="First Name"
                  />

                  <label className="block font-semibold">Last Name:</label>
                  <input
                    type="text"
                    className="border p-2 w-full rounded shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    placeholder="Last Name"
                  />

                  <label className="block font-semibold">Address:</label>
                  <input
                    type="text"
                    className="border p-2 w-full rounded shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    placeholder="Address"
                  />

                  <label className="block font-semibold">Phone:</label>
                  <input
                    type="text"
                    className="border p-2 w-full rounded shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="Phone"
                  />

                  <label className="block font-semibold">Joining Date:</label>
                  <input
                    type="date"
                    className="border p-2 w-full rounded shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
                    value={joiningDate?.substring(0, 10)}
                    onChange={(e) => setJoiningDate(e.target.value)}
                    placeholder="Joining Date"
                  />
                </div>
              ) : (
                <div className="m-2 space-y-2 animate-fade-in transition duration-500 ease-in-out bg-gray-50 p-4 rounded shadow">
                  <h3 className="text-lg font-semibold">
                    First Name:{" "}
                    <span className="font-normal">
                      {selectedDriver.firstName}
                    </span>
                  </h3>
                  <h3 className="text-lg font-semibold">
                    Last Name:{" "}
                    <span className="font-normal">
                      {selectedDriver.lastName}
                    </span>
                  </h3>
                  <h3 className="text-lg font-semibold">
                    Address:{" "}
                    <span className="font-normal">
                      {selectedDriver.address}
                    </span>
                  </h3>
                  <h3 className="text-lg font-semibold">
                    Phone:{" "}
                    <span className="font-normal">{selectedDriver.phone}</span>
                  </h3>
                  <h3 className="text-lg font-semibold">
                    Joining Date:{" "}
                    <span className="font-normal">
                      {new Date(
                        selectedDriver.joiningDate
                      ).toLocaleDateString()}
                    </span>
                  </h3>
                </div>
              )}

              <div className="flex flex-row gap-10 w-auto">
                {selectedDriver.aadhar[0] == null ? (
                  <div></div>
                ) : (
                  <div>
                    <p className="font-medium">Aadhar Front:</p>
                    <img
                      src={selectedDriver.aadhar[0]}
                      alt="Aadhar Front"
                      className="w-52 h-52 rounded"
                    />
                  </div>
                )}
                {selectedDriver.aadhar[1] == null ? (
                  <div></div>
                ) : (
                  <div>
                    <p className="font-medium">Aadhar Back:</p>
                    <img
                      src={selectedDriver.aadhar[1]}
                      alt="Aadhar Back"
                      className="w-52 h-52 rounded"
                    />
                  </div>
                )}
              </div>
              <div className="flex flex-row gap-10 w-auto">
                {selectedDriver.license[0] == null ? (
                  <div></div>
                ) : (
                  <div>
                    <p className="font-medium">License Front:</p>
                    <img
                      src={selectedDriver.license[0]}
                      alt="License Front"
                      className="w-52 h-52 rounded"
                    />
                  </div>
                )}
                {selectedDriver.license[1] == null ? (
                  <div></div>
                ) : (
                  <div>
                    <p className="font-medium">License Back:</p>
                    <img
                      src={selectedDriver.license[1]}
                      alt="License Back"
                      className="w-52 h-52 rounded-md"
                    />
                  </div>
                )}
              </div>
              {toggleButton ? (
                <button
                  onClick={() => setShowConfirmPopup(true)}
                  className="mt-2 justify-center bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                >
                  Update
                </button>
              ) : (
                <div></div>
              )}
              <AnimatePresence>
                {showConfirmPopup && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
                  >
                    <motion.div
                      initial={{ scale: 0.8, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      exit={{ scale: 0.8, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="bg-white p-6 rounded-lg shadow-lg text-center max-w-xs"
                    >
                      <h2 className="text-lg font-semibold mb-4">
                        Are you sure?
                      </h2>
                      <div className="flex justify-center gap-4">
                        <button
                          onClick={() => {
                            updateDriver(selectedDriver._id);
                            setShowConfirmPopup(false);
                          }}
                          className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
                        >
                          Yes
                        </button>
                        <button
                          onClick={() => setShowConfirmPopup(false)}
                          className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                        >
                          No
                        </button>
                      </div>
                    </motion.div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        )}
      </AnimatePresence>
      </div>
    </motion.div>
  );
};

export default Driverdashboard;
