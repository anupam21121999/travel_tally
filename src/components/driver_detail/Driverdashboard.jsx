import React from "react";
import { useState, useEffect } from "react";

const Driverdashboard = () => {
  const token = localStorage.getItem("token");
  const [drivers, setDrivers] = useState([]);

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

  return (
    <div className="container mx-auto px-4 py-6">
      {drivers.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {drivers.map((driver) => {
            return (
              <div
                key={driver._id}
                className="bg-white shadow-lg rounded-lg p-6 flex flex-col items-start"
              >
                <h3 className="text-xl font-semibold text-gray-700 mb-4">
                  {driver.firstName} {driver.lastName}
                </h3>
                <div className="space-y-2 text-sm text-gray-600 flex-1">
                  <p className="break-words">
                    <strong>Phone:</strong> {driver.phone}
                  </p>
                  <div>
                    <img
                      src={driver.aadhar[0]}
                      alt="Aadhar"
                      className="w-full h-10 object-cover rounded-md"
                    />
                  </div>
                  <div>
                    <img
                      src={driver.aadhar[1]}
                      alt="Aadhar"
                      className="w-full h-10 object-cover rounded-md"
                    />
                  </div>
                  <div>
                    <img
                      src={driver.license[0]}
                      alt="License"
                      className="w-full h-10 object-cover rounded-md"
                    />
                  </div>
                  <div>
                    <img
                      src={driver.license[1]}
                      alt="License"
                      className="w-full h-10 object-cover rounded-md"
                    />
                  </div>
                  <p className="break-words">
                    <strong>Address:</strong> {driver.address}
                  </p>
                  <p>
                    <strong>Joining Date:</strong>{" "}
                    {new Date(driver.joiningDate).toLocaleDateString()}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <p className="text-center text-lg text-gray-500">No drivers found.</p>
      )}
    </div>
  );
};

export default Driverdashboard;
