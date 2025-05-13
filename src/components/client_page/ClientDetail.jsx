import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast, Toaster } from "react-hot-toast";
import { ClipLoader } from "react-spinners";

const ClientDetail = () => {
  const token = localStorage.getItem("token");
  const navigate = useNavigate();
  const [clientName, setClientName] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [pincode, setPincode] = useState("");
  const [gstin, setGstin] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const registerClients = async (e) => {
    e.preventDefault();
    setLoading(true);
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
        `${process.env.REACT_APP_DOMAIN}/api/client/register`,
        {
          method: "POST",
          headers: {
            Authorization: token,
            "Content-Type": "application/json",
          },
          body: JSON.stringify(body_data),
        }
      );
      const data = await response.json();
      if (response.status === 201) {
        console.log(data);
        toast.success("Registered Successfully");
        setTimeout(() => {
          navigate("/clients");
        }, 1000);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Toaster position="top-right" reverseOrder={false} />
      <div className="min-h-screen flex items-center justify-center p-4">
        <div className="bg-white shadow-2xl rounded-2xl p-8 w-full max-w-xl">
          <h1 className="text-2xl font-bold text-center mb-6 text-gray-800">
            Client Details
          </h1>
          <form onSubmit={registerClients} className="space-y-4">
            <input
              value={clientName}
              onChange={(e) => setClientName(e.target.value)}
              type="text"
              placeholder="Enter Client Name"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <input
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              type="text"
              placeholder="Enter Address"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <input
              value={city}
              onChange={(e) => setCity(e.target.value)}
              type="text"
              placeholder="Enter City"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <input
              value={state}
              onChange={(e) => setState(e.target.value)}
              type="text"
              placeholder="Enter State"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <input
              value={pincode}
              onChange={(e) => setPincode(e.target.value)}
              type="text"
              placeholder="Enter Pincode"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <input
              value={gstin}
              onChange={(e) => setGstin(e.target.value)}
              type="text"
              placeholder="Enter GSTIN No."
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <input
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              type="text"
              placeholder="Enter Phone No."
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              type="text"
              placeholder="Enter Email"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {loading ? (
              <div
                style={{
                  position: "fixed",
                  top: 0,
                  left: 0,
                  right: 0,
                  bottom: 0,
                  backgroundColor: "rgba(255, 255, 255, 0.7)",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  zIndex: 9999,
                }}
              >
                <ClipLoader color="#36d7b7" size={60} />
              </div>
            ) : (
              <button type="submit">Submit</button>
            )}
          </form>
        </div>
      </div>
    </>
  );
};

export default ClientDetail;
