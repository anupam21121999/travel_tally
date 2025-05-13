import React, { useState, useEffect } from "react";
import { toast, Toaster } from "react-hot-toast";
import { Link } from "react-router-dom";
import { GoPencil } from "react-icons/go";
import { MdDeleteOutline } from "react-icons/md";

const Client = () => {
  const token = localStorage.getItem("token");
  const [clientName, setClientName] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [pincode, setPincode] = useState("");
  const [gstin, setGstin] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [clients, setClients] = useState([]);
  const [search, setSearch] = useState("");
  const [showpopup, setShowpopup] = useState(false);
  const [selectedClient, setSelectedClient] = useState(null);
  const [showPopupUpdate, setShowPopupUpdate] = useState(false);
  const [showPopupDelete, setShowPopupDelete] = useState(false);
  const [toggle, setToggle] = useState(false);

  const deleteClient = async (id) => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_DOMAIN}/api/client/delete/${id}`,
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
        getAllClients();
        closeModel();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const updateClient = async (id) => {
    try {
      const body_data = {
        clientName: clientName,
        address: address,
        city: city,
        state: state,
        pincode: pincode,
      };
      if (gstin) body_data.gstin = gstin;
      if (phone) body_data.phone = phone;
      if (email) body_data.email = email;
      const response = await fetch(
        `${process.env.REACT_APP_DOMAIN}/api/client/update/${id}`,
        {
          method: "PUT",
          headers: {
            Authorization: token,
            "Content-Type": "application/json",
          },
          body: JSON.stringify(body_data),
        }
      );
      const data = await response.json();
      if (response.status === 200) {
        toast.success("Updated Successfully");
        getAllClients();
        setToggle(false);
        closeModel();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
    }
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

  const showModal = (client) => {
    setSelectedClient(client);
    setClientName(client.clientName);
    setAddress(client.address);
    setCity(client.city);
    setState(client.state);
    setPincode(client.pincode);
    setGstin(client.gstin);
    setPhone(client.phone);
    setEmail(client.email);
    setShowpopup(true);
  };

  const closeModel = () => {
    setShowpopup(false);
    setToggle(false);
  };

  const visibleElement = () => {
    setToggle((prev) => !prev);
  };

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
                onClick={() => showModal(item)}
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
      {showpopup && selectedClient && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-30 z-50">
          <div className="w-full max-w-md mx-4 space-y-2 animate-fade-in transition duration-500 ease-in-out bg-white p-6 rounded-xl shadow-lg">
            <div className="relative flex justify-end items-center gap-4 p-2 rounded-md">
              <GoPencil
                onClick={() => visibleElement()}
                className="size-6 cursor-pointer hover:text-black text-xl font-bold"
              />
              <MdDeleteOutline
                onClick={() => setShowPopupDelete(true)}
                className="size-6 cursor-pointer hover:text-black text-xl font-bold"
              />
              {showPopupDelete && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
                  <div className="bg-white rounded-xl shadow-xl p-6 w-full max-w-sm mx-4 text-center space-y-6 animate-fade-in">
                    <h2 className="text-xl font-semibold text-gray-800">
                      Are you sure?
                    </h2>
                    <div className="flex justify-center gap-4">
                      <button
                        onClick={() => {
                          deleteClient(selectedClient._id);
                          setShowPopupDelete(false);
                        }}
                        className="bg-green-500 text-white px-5 py-2 rounded-md hover:bg-green-600 transition duration-200"
                      >
                        Yes
                      </button>
                      <button
                        onClick={() => setShowPopupDelete(false)}
                        className="bg-red-500 text-white px-5 py-2 rounded-md hover:bg-red-600 transition duration-200"
                      >
                        No
                      </button>
                    </div>
                  </div>
                </div>
              )}
              <button
                onClick={closeModel}
                className="text-white hover:text-black text-sm font-medium rounded-lg"
              >
                ✕
              </button>
            </div>
            {toggle ? (
              <div className="max-w-xl mx-auto bg-white shadow-lg rounded-xl p-6 space-y-4">
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">
                    Enter Client Name
                  </label>
                  <input
                    value={clientName}
                    onChange={(e) => setClientName(e.target.value)}
                    type="text"
                    placeholder="Enter Client Name"
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                  />
                </div>

                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">
                    Enter Address
                  </label>
                  <input
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    type="text"
                    placeholder="Enter Address"
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                  />
                </div>

                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">
                    Enter City
                  </label>
                  <input
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    type="text"
                    placeholder="Enter City"
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                  />
                </div>

                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">
                    Enter Pincode
                  </label>
                  <input
                    value={pincode}
                    onChange={(e) => setPincode(e.target.value)}
                    type="text"
                    placeholder="Enter Pincode"
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                  />
                </div>

                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">
                    Enter GSTIN
                  </label>
                  <input
                    value={gstin}
                    onChange={(e) => setGstin(e.target.value)}
                    type="text"
                    placeholder="Enter GSTIN No."
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                  />
                </div>

                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">
                    Enter Phone
                  </label>
                  <input
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    type="text"
                    placeholder="Enter Phone"
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                  />
                </div>

                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">
                    Enter Email
                  </label>
                  <input
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    type="text"
                    placeholder="Enter Email"
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                  />
                </div>

                <div className="flex justify-end">
                  <button
                    onClick={() => setShowPopupUpdate(true)}
                    className="px-6 py-2 bg-blue-600 text-white font-semibold rounded-xl hover:bg-blue-700 transition duration-200"
                  >
                    Update
                  </button>
                  {showPopupUpdate && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
                      <div className="bg-white rounded-xl shadow-xl p-6 w-full max-w-sm mx-4 text-center space-y-6 animate-fade-in">
                        <h2 className="text-xl font-semibold text-gray-800">
                          Are you sure?
                        </h2>
                        <div className="flex justify-center gap-4">
                          <button
                            onClick={() => {
                              updateClient(selectedClient._id);
                              setShowPopupUpdate(false);
                            }}
                            className="bg-green-500 text-white px-5 py-2 rounded-md hover:bg-green-600 transition duration-200"
                          >
                            Yes
                          </button>
                          <button
                            onClick={() => setShowPopupUpdate(false)}
                            className="bg-red-500 text-white px-5 py-2 rounded-md hover:bg-red-600 transition duration-200"
                          >
                            No
                          </button>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            ) : (
              <div>
                <h3 className="text-lg font-semibold">
                  Client Name:{" "}
                  <span className="font-normal">
                    {selectedClient.clientName}
                  </span>
                </h3>
                <h3 className="text-lg font-semibold">
                  Address:{" "}
                  <span className="font-normal">{selectedClient.address}</span>
                </h3>
                <h3 className="text-lg font-semibold">
                  City:{" "}
                  <span className="font-normal">{selectedClient.city}</span>
                </h3>
                <h3 className="text-lg font-semibold">
                  GSTIN:{" "}
                  <span className="font-normal">{selectedClient.gstin}</span>
                </h3>
                <h3 className="text-lg font-semibold">
                  Phone:{" "}
                  <span className="font-normal">{selectedClient.phone}</span>
                </h3>
                <h3 className="text-lg font-semibold">
                  Email:{" "}
                  <span className="font-normal">{selectedClient.email}</span>
                </h3>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default Client;
