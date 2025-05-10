import React from "react";
import { useState, useRef } from "react";
import { toast, Toaster } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { ClipLoader } from "react-spinners";

const Vehicledetail = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const [model, setModel] = useState("");
  const [color, setColor] = useState("");
  const [year, setYear] = useState("");
  const [regNo, setRegNo] = useState("");
  const [km, setKm] = useState("");
  const [mileage, setMileage] = useState("");
  const [loading, setLoading] = useState(false);
  const [category, setCategory] = useState("");
  const [type, setType] = useState("");
  const [fuelType, setFuelType] = useState("");
  const [fitness, setFitness] = useState("");
  const [permit, setPermit] = useState("");
  const [insurance, setInsurance] = useState("");
  const [pollution, setPollution] = useState("");
  const [lastService, setLastService] = useState("");
  const [description, setDescription] = useState("");

  const inputrefs = [
    useRef(null), // model
    useRef(null), // color
    useRef(null), // purchase
    useRef(null), // regNo
    useRef(null), // km
    useRef(null), // mileage
    useRef(null), // fitnessExpiry
    useRef(null), // permitExpiry
    useRef(null), // insuranceExpiry
    useRef(null), // pollutionExpiry
    useRef(null), // lastServiceDate
    useRef(null), //
    useRef(null),
    useRef(null),
  ];

  const registerDriver = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const body_data = {
        model: model,
        color: color,
        year: year,
        registrationNumber: regNo,
        totalKms: parseInt(km),
        isCommercial: category,
        type: type,
        fuelType: fuelType,
      };
      if (permit) body_data.permitExpiry = permit;
      if (fitness) body_data.fitnessExpiry = fitness;
      if (description) body_data.note = description;
      if (insurance) body_data.insuranceExpiry = insurance;
      if (pollution) body_data.pollutionExpiry = pollution;
      if (lastService) body_data.lastServiceDate = lastService;
      if (mileage) body_data.mileage = parseInt(mileage);
      const response = await fetch(
        `${process.env.REACT_APP_DOMAIN}/api/vehicle/register`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: token,
          },
          body: JSON.stringify(body_data),
        }
      );
      const data = await response.json();
      if (response.status === 201) {
        console.log(data);
        console.log("Vehicle registered successfully");
        toast.success("Vehicle Registration Successful");
        setTimeout(() => {
          navigate("/vehicle_dashboard");
        }, 1000);
      } else {
        console.log("Vehicle registration failed");
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyNext = (e, index) => {
    if (e.key === "Enter") {
      e.preventDefault();
      const next = inputrefs[index + 1];
      if (next && next.current) {
        next.current.focus();
      } else {
        document.querySelector("form").requestSubmit();
      }
    }
  };

  return (
    <>
      <Toaster position="top-center" reverseOrder={false} />
      <div className="flex justify-center items-start min-h-screen py-10 px-6 mt-4">
        <div className="w-full max-w-3xl p-8 bg-white rounded-xl shadow-2xl border border-gray-200 overflow-y-auto max-h-[90vh] mt-10">
          <h1 className="text-xl font-bold mb-4 m-2 p-2 subpixel-antialiased font-sans items-center justify-center align-middle">
            Vehicle Registration
          </h1>
          <form onSubmit={registerDriver}>
            <input
              ref={inputrefs[0]}
              onKeyDown={(e) => handleKeyNext(e, 0)}
              value={model}
              onChange={(e) => setModel(e.target.value)}
              type="text"
              placeholder="Enter vehicle model"
            />
            <input
              ref={inputrefs[1]}
              onKeyDown={(e) => handleKeyNext(e, 1)}
              value={color}
              onChange={(e) => setColor(e.target.value)}
              type="text"
              placeholder="Enter color"
            />
            <label
              htmlFor="purchase"
              className="block mb-1 text-sm font-medium text-gray-700"
            >
              Enter Purchasing Date
            </label>
            <input
              id="purchase"
              ref={inputrefs[2]}
              onKeyDown={(e) => handleKeyNext(e, 2)}
              value={year}
              onChange={(e) => setYear(e.target.value)}
              type="text"
              className="border px-2 py-1 rounded"
            />
            <select
              ref={inputrefs[3]}
              onKeyDown={(e) => handleKeyNext(e, 3)}
              id="dropdown"
              value={type}
              onChange={(e) => setType(e.target.value)}
              className="mb-2 w-full h-10 px-3 rounded-lg border border-gray-300 bg-white text-gray-800"
            >
              <option value="">Vehicle Type</option>
              <option value="Hatchback">Hatchback</option>
              <option value="SUV">SUV</option>
              <option value="Sedan">Sedan</option>
              <option value="Compact-SUV">Compact-SUV</option>
              <option value="MPV">MPV</option>
              <option value="EV">EV</option>
              <option value="Traveller">Traveller</option>
              <option value="Bus">Bus</option>
              <option value="Pickup">Pick-up</option>
              <option value="Mini-Bus">Mini-Bus</option>
            </select>

            <select
              ref={inputrefs[4]}
              onKeyDown={(e) => handleKeyNext(e, 4)}
              id="dropdown"
              value={fuelType}
              onChange={(e) => setFuelType(e.target.value)}
              className="mb-2 w-full h-10 px-3 rounded-lg border border-gray-300 bg-white text-gray-800"
            >
              <option value="">Fuel Type</option>
              <option value="Petrol">Petrol</option>
              <option value="Diesel">Diesel</option>
              <option value="Petrol/CNG">Petrol/CNG</option>
              <option value="EV">EV</option>
            </select>
            <input
              ref={inputrefs[5]}
              onKeyDown={(e) => handleKeyNext(e, 5)}
              value={regNo}
              onChange={(e) => setRegNo(e.target.value)}
              type="text"
              placeholder="Enter registration number"
            />

            <label
              htmlFor="fitness-expiry"
              className="block mb-1 text-sm font-medium text-gray-700"
            >
              Enter Fitness Expiry
            </label>
            <input
              id="fitness-expiry"
              ref={inputrefs[6]}
              onKeyDown={(e) => handleKeyNext(e, 6)}
              value={fitness}
              onChange={(e) => setFitness(e.target.value)}
              type="text"
              className="border px-2 py-1 rounded"
            />
            <label
              htmlFor="permit-expiry"
              className="block mb-1 text-sm font-medium text-gray-700"
            >
              Enter Permit Expiry
            </label>
            <input
              id="permit-expiry"
              ref={inputrefs[7]}
              onKeyDown={(e) => handleKeyNext(e, 7)}
              value={permit}
              onChange={(e) => setPermit(e.target.value)}
              type="text"
              className="border px-2 py-1 rounded"
            />
            <label
              htmlFor="insurance-expiry"
              className="block mb-1 text-sm font-medium text-gray-700"
            >
              Enter Insurance Expiry
            </label>
            <input
              id="insurance-expiry"
              ref={inputrefs[8]}
              onKeyDown={(e) => handleKeyNext(e, 8)}
              value={insurance}
              onChange={(e) => setInsurance(e.target.value)}
              type="text"
              className="border px-2 py-1 rounded"
            />
            <label
              htmlFor="pollution-expiry"
              className="block mb-1 text-sm font-medium text-gray-700"
            >
              Enter Pollution Expiry
            </label>
            <input
              id="pollution-expiry"
              ref={inputrefs[9]}
              onKeyDown={(e) => handleKeyNext(e, 9)}
              value={pollution}
              onChange={(e) => setPollution(e.target.value)}
              type="text"
              className="border px-2 py-1 rounded"
            />
            <label
              htmlFor="last-service-date"
              className="block mb-1 text-sm font-medium text-gray-700"
            >
              Enter Last Service Date
            </label>
            <input
              id="last-service-date"
              ref={inputrefs[10]}
              onKeyDown={(e) => handleKeyNext(e, 10)}
              value={lastService}
              onChange={(e) => setLastService(e.target.value)}
              type="text"
              className="border px-2 py-1 rounded"
            />
            <input
              ref={inputrefs[11]}
              onKeyDown={(e) => handleKeyNext(e, 11)}
              value={km}
              onChange={(e) => setKm(e.target.value)}
              type="text"
              placeholder="Enter total K.M."
            />
            <input
              ref={inputrefs[12]}
              onKeyDown={(e) => handleKeyNext(e, 12)}
              value={mileage}
              onChange={(e) => setMileage(e.target.value)}
              type="text"
              placeholder="Enter Mileage"
            />
            <div className="col-span-2">
              <label
                htmlFor="description"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Description
              </label>
              <textarea
                typeof="text"
                ref={inputrefs[13]}
                onKeyDown={(e) => handleKeyNext(e, 13)}
                id="description"
                rows="4"
                className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter additional vehicle information..."
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>
            <div className="flex flex-row gap-10">
              <label
                className="flex items-center gap-2 cursor-pointer"
                htmlFor="commercial"
              >
                <input
                  className="mt-3"
                  type="radio"
                  value={true}
                  name="category"
                  checked={category === true}
                  onChange={(e) => setCategory(true)}
                />
                Commercial
              </label>

              <label
                className="flex items-center ml-4 gap-2 cursor-pointer"
                htmlFor="non-commercial"
              >
                <input
                  className="mt-3"
                  type="radio"
                  value={false}
                  name="category"
                  checked={category === false}
                  onChange={(e) => setCategory(false)}
                />
                Non-Commercial
              </label>
            </div>
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

export default Vehicledetail;
