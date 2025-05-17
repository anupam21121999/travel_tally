import React, { useState, useEffect } from "react";
import { toast, Toaster } from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setSelectedClient } from "../../redux/slice/clientDetailSlice";

const Client = () => {
  const token = localStorage.getItem("token");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [clients, setClients] = useState([]);
  const [search, setSearch] = useState("");

  const handleClick = (specificClient) => {
    dispatch(setSelectedClient(specificClient));
    navigate("/rate_dashboard");
  };

  const getAllClients = async () => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_DOMAIN}/api/client/getAll`,
        {
          method: "GET",
          headers: {
            Authorization: token,
          },
        }
      );
      const data = await response.json();
      if (response.status === 200) {
        setClients(data.clientRecords);
        console.log(data);
        toast.success("Clients Found");
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAllClients();
  }, []);

  const filteredItems = clients.filter((items) =>
    `${items.clientName} ${items.phone} ${items.city} ${items.state}`
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  return (
    <>
      <Toaster position="top-right" reverseOrder={false} />
      <div className="p-6 min-h-screen mt-52">
        <div className="flex flex-row items-center gap-4 mb-6">
          <input
            onChange={(e) => setSearch(e.target.value)}
            type="text"
            placeholder="Search..."
            className="border border-gray-300 rounded-lg px-4 py-2 w-full max-w-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <Link to="/client_register">
            <button className="mb-4 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition">
              Add Clients
            </button>
          </Link>
        </div>
        {filteredItems.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredItems.map((item) => (
              <div
                onClick={() => handleClick(item)}
                key={item._id}
                className="bg-white shadow-lg rounded-2xl p-6 border border-gray-100"
              >
                <h5 className="text-xl font-semibold mb-2 text-gray-800">
                  {item.clientName}
                </h5>
                <p className="text-gray-600">
                  <strong>Address:</strong> {item.address}
                </p>
                <p className="text-gray-600">
                  <strong>City:</strong> {item.city}
                </p>
                <p className="text-gray-600">
                  <strong>State:</strong> {item.state}
                </p>
                <p className="text-gray-600">
                  <strong>Pincode:</strong> {item.pincode}
                </p>
                <p className="text-gray-600">
                  <strong>GSTIN:</strong> {item.gstin}
                </p>
                <p className="text-gray-600">
                  <strong>Phone:</strong> {item.phone}
                </p>
                <p className="text-gray-600">
                  <strong>Email:</strong> {item.email}
                </p>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-center text-lg text-gray-500">No Clients Found.</p>
        )}
      </div>
    </>
  );
};

export default Client;
