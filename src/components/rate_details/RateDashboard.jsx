import React from "react";
import { useSelector } from "react-redux";
import { GoPencil } from "react-icons/go";
import { MdDeleteOutline } from "react-icons/md";
import { useState } from "react";
import { toast, Toaster } from "react-hot-toast";

const RateDashboard = () => {
  const token = localStorage.getItem("token");
  const [clientName, setClientName] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [pincode, setPincode] = useState("");
  const [gstin, setGstin] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [showFields, setShowFields] = useState(false);

  const client = useSelector((state) => state.client.selectedClient);
  console.log(client);

  if (!client) {
    return <p>No user selected. Go back and select one.</p>;
  }

  // const deleteClient = async (id) => {
  //   try {
  //     const response = await fetch(
  //       `${process.env.REACT_APP_DOMAIN}/api/client/delete/${id}`,
  //       {
  //         method: "DELETE",
  //         headers: {
  //           Authorization: token,
  //         },
  //       }
  //     );
  //     const data = await response.json();
  //     if (response.status === 200) {
  //       toast.success("Deleted Successfully");
  //     } else {
  //       toast.error(data.message);
  //     }
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  const updateClient = async (id) => {
    try {
      const body_data = {
        clientName: clientName,
        address: address,
        city: city,
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
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const toggleElements = (prev) => {
    setShowFields((prev) => !prev);
  };

  return (
    <>
      <Toaster position="top-right" reverseOrder={false} />
      <div className="flex w-screen h-screen bg-white p-6">
        {/* Left side (Client Info) */}
        <div className="w-1/4 text-black flex flex-col justify-start items-start space-y-2 pr-6 mt-28">
          <div className="flex flex-row justify-between items-center w-auto px-2 py-2">
            <h1 className="text-lg font-bold border-b pb-1">Client Details</h1>
            <div className="flex space-x-2 text-xl">
              <GoPencil
                onClick={() => toggleElements()}
                className="text-green-500 size-6"
              />
              <MdDeleteOutline className="text-red-500 size-6" />
            </div>
          </div>
          {showFields ? (
            <div className="max-w-md mx-auto p-6 bg-white rounded-md shadow-md">
              <p className="mb-4">
                <strong className="block text-gray-700 font-semibold mb-1">
                  Name:
                </strong>
                <input
                  value={clientName}
                  onChange={(e) => setClientName(e.target.value)}
                  type="text"
                  placeholder="Enter Client Name"
                  className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </p>
              <p className="mb-4">
                <strong className="block text-gray-700 font-semibold mb-1">
                  Address:
                </strong>
                <input
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  type="text"
                  placeholder="Enter Client Address"
                  className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </p>
              <p className="mb-4">
                <strong className="block text-gray-700 font-semibold mb-1">
                  City:
                </strong>
                <input
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  type="text"
                  placeholder="Enter City"
                  className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </p>
              <p className="mb-4">
                <strong className="block text-gray-700 font-semibold mb-1">
                  Pincode:
                </strong>
                <input
                  value={pincode}
                  onChange={(e) => setPincode(e.target.value)}
                  type="text"
                  placeholder="Enter Pincode"
                  className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </p>
              <p className="mb-4">
                <strong className="block text-gray-700 font-semibold mb-1">
                  GSTIN:
                </strong>
                <input
                  value={gstin}
                  onChange={(e) => setGstin(e.target.value)}
                  type="text"
                  placeholder="Enter Client GSTIN"
                  className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </p>
              <p className="mb-4">
                <strong className="block text-gray-700 font-semibold mb-1">
                  Phone:
                </strong>
                <input
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  type="text"
                  placeholder="Enter Client Phone No."
                  className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </p>
              <p className="mb-6">
                <strong className="block text-gray-700 font-semibold mb-1">
                  Email:
                </strong>
                <input
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  type="text"
                  placeholder="Enter Client Email"
                  className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </p>
              <button className="w-full bg-blue-600 text-white font-semibold py-2 rounded-md hover:bg-blue-700 transition">
                Update
              </button>
            </div>
          ) : (
            <div>
              <p>
                <strong>Name:</strong> {client.clientName}
              </p>
              <p>
                <strong>Address:</strong> {client.address}
              </p>
              <p>
                <strong>City:</strong> {client.city}
              </p>
              <p>
                <strong>Pincode:</strong> {client.pincode}
              </p>
              <p>
                <strong>GSTIN:</strong> {client.gstin}
              </p>
              <p>
                <strong>Phone:</strong> {client.phone}
              </p>
              <p>
                <strong>Email:</strong> {client.email}
              </p>
            </div>
          )}
        </div>

        {/* Vertical Line */}
        <div className="w-px bg-gray-300 mx-4"></div>

        {/* Right side */}
        <div className="flex-1 flex flex-col items-center justify-start space-y-4 pt-6 mt-28">
          <label className="text-lg font-semibold">Add Rate</label>
          <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition">
            +
          </button>
        </div>
      </div>
    </>
  );
};

export default RateDashboard;
