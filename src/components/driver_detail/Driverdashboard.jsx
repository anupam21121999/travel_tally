import React, { useState, useEffect } from "react";
import { GoPencil } from "react-icons/go";
import { Link, useNavigate } from "react-router-dom";
import { IoAddOutline } from "react-icons/io5";
import { MdDeleteOutline } from "react-icons/md";
import { toast, Toaster } from "react-hot-toast";

const Driverdashboard = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const [drivers, setDrivers] = useState([]);
  const [selectedDriver, setSelectedDriver] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [search, setSearch] = useState("");

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
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setSelectedDriver(null);
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

  return (
    <>
      <Toaster position="top-center" reverseOrder={false} />
      <div className="mt-6 px-4 flex flex-col items-center">
        <div className="w-full max-w-4xl flex justify-between items-center gap-4">
          <input
            type="text"
            placeholder="Search drivers..."
            className="flex-1 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            onChange={(e) => setSearch(e.target.value)}
          />
          <Link
            to="/driver_details1"
            className="flex items-center gap-2 px-4 py-2 border mb-4 bg-blue-200 border-gray-400 rounded-md hover:bg-gray-100"
          >
            <label className="cursor-pointer">Add Driver</label>
            <IoAddOutline className="size-5" />
          </Link>
        </div>
      </div>
      <div className="container mx-auto px-4 py-6">
        {filteredDrivers.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredDrivers.map((driver) => (
              <div
                key={driver._id}
                onClick={() => openModal(driver)}
                className="bg-white shadow-lg rounded-lg p-6 flex flex-col items-start cursor-pointer hover:shadow-xl transition"
              >
                <h3 className="text-xl font-semibold text-gray-700 mb-4">
                  {driver.firstName} {driver.lastName}
                </h3>
                <div className="space-y-2 text-sm text-gray-600 flex-1">
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
          <p className="text-center text-lg text-gray-500">No drivers found.</p>
        )}

        {/* Modal */}
        {showModal && selectedDriver && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white rounded-lg p-6 max-w-lg w-full max-h-[80vh] overflow-y-auto relative">
              <div className="relative flex justify-end items-center gap-4 p-2 rounded-md">
                <GoPencil className="size-6 cursor-pointer hover:text-black text-xl font-bold" />
                <MdDeleteOutline
                  onClick={() => deleteDrivers(selectedDriver._id)}
                  className="size-6 cursor-pointer hover:text-black text-xl font-bold"
                />
                <button
                  onClick={closeModal}
                  className="text-white hover:text-black text-xl font-bold"
                >
                  ✕
                </button>
              </div>
              <h2 className="text-xl font-bold mb-4">
                {selectedDriver.firstName} {selectedDriver.lastName}'s Documents
              </h2>
              <div className="space-y-4">
                <div>
                  <p className="font-medium">Aadhar Front:</p>
                  <img
                    src={selectedDriver.aadhar[0]}
                    alt="Aadhar Front"
                    className="w-full h-auto rounded"
                  />
                </div>
                <div>
                  <p className="font-medium">Aadhar Back:</p>
                  <img
                    src={selectedDriver.aadhar[1]}
                    alt="Aadhar Back"
                    className="w-full h-auto rounded"
                  />
                </div>
                <div>
                  <p className="font-medium">License Front:</p>
                  <img
                    src={selectedDriver.license[0]}
                    alt="License Front"
                    className="w-full h-auto rounded"
                  />
                </div>
                <div>
                  <p className="font-medium">License Back:</p>
                  <img
                    src={selectedDriver.license[1]}
                    alt="License Back"
                    className="w-full h-auto rounded"
                  />
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default Driverdashboard;
