import React from "react";
import { useState, useRef } from "react";
import { toast, Toaster } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { ClipLoader } from "react-spinners";
import { motion, AnimatePresence } from "framer-motion";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

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
    <motion.div
      initial="initial"
      animate="in"
      exit="out"
      variants={pageVariants}
      transition={pageTransition}
      className="h-screen w-screen bg-white dark:bg-gray-900 text-black dark:text-white overflow-auto"
    >
      <Toaster position="bottom-center" reverseOrder={false} />
        <div className="px-4 mt-20 pb-16"> 
          <form onSubmit={registerDriver} className="max-w-2xl mx-auto">

            <h1 className="text-4xl text-center font-bold font-sans p-5">
              Vehicle Registration
            </h1>

            <label className="block text-xl font-bold mb-1">
                Enter Vehicle Model :
            </label>
            <input required
              ref={inputrefs[0]}
              onKeyDown={(e) => handleKeyNext(e, 0)}
              value={model}
              onChange={(e) => setModel(e.target.value)}
              type="text"
              placeholder="Vehicle model"
              className="flex-grow rounded-lg border px-3 mb-6 placeholder:text-gray-400 dark:placeholder:text-gray-600
              border-black placeholder-black focus:outline-none focus:ring-2 focus:ring-gray-900
              dark:border-white dark:bg-gray-950 dark:text-white dark:placeholder-white dark:focus:ring-white"
            />


            <label className="block mb-1 text-xl font-bold">
                Enter Vehicle Color :
            </label>
            <input required
              ref={inputrefs[1]}
              onKeyDown={(e) => handleKeyNext(e, 1)}
              value={color}
              onChange={(e) => setColor(e.target.value)}
              type="text"
              placeholder="Vehicle color"
              className="flex-grow rounded-lg border px-3 mb-6 placeholder:text-gray-400 dark:placeholder:text-gray-600
              border-black placeholder-black focus:outline-none focus:ring-2 focus:ring-gray-900
              dark:border-white dark:bg-gray-950 dark:text-white dark:placeholder-white dark:focus:ring-white"
            />


            <label className="block mb-1 text-xl font-bold">
                Enter Purchasing Date :
            </label>
            <input required
              id="purchase"
              ref={inputrefs[2]}
              onKeyDown={(e) => handleKeyNext(e, 2)}
              value={year}
              onChange={(e) => setYear(e.target.value)}
              type="date"
              placeholder="Purchasing date"
              className="flex-grow rounded-lg border px-3 mb-6 placeholder:text-gray-400 dark:placeholder:text-gray-600
              border-black placeholder-black focus:outline-none focus:ring-2 focus:ring-gray-900
              dark:border-white dark:bg-gray-950 dark:text-white dark:placeholder-white dark:focus:ring-white"
            />

            <label className="block mb-1 text-xl font-bold">
                Select Vehicle Type :
            </label>
            <select required
              ref={inputrefs[3]}
              onKeyDown={(e) => handleKeyNext(e, 3)}
              id="dropdown"
              value={type}
              onChange={(e) => setType(e.target.value)}
              placeholder="Select Vehicle Type"
              className="h-12 px-3 rounded-lg border mb-6 placeholder:text-gray-400 dark:placeholder:text-gray-600
              border-black placeholder-black focus:outline-none focus:ring-2 focus:ring-gray-900
              dark:border-white dark:bg-gray-950 dark:text-white dark:placeholder-white dark:focus:ring-white"
            >
              <option value="">Select Vehicle Type</option>
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


            <label className="block mb-1 text-xl font-bold">
                Select Fuel Type :
            </label>
            <select required
              ref={inputrefs[4]}
              onKeyDown={(e) => handleKeyNext(e, 4)}
              id="dropdown"
              value={fuelType}
              onChange={(e) => setFuelType(e.target.value)}
              className="h-12 px-3 rounded-lg border mb-6
              border-black placeholder-black focus:outline-none focus:ring-2 focus:ring-gray-900
              dark:border-white dark:bg-gray-950 dark:text-white dark:placeholder-white dark:focus:ring-white"
            >
              <option value="">Select Fuel Type</option>
              <option value="Petrol">Petrol</option>
              <option value="Diesel">Diesel</option>
              <option value="Petrol/CNG">Petrol/CNG</option>
              <option value="EV">EV</option>
            </select>


            <label className="block mb-1 text-xl font-bold">
                Enter registration number :
            </label>
            <input required
              ref={inputrefs[5]}
              onKeyDown={(e) => handleKeyNext(e, 5)}
              value={regNo}
              onChange={(e) => setRegNo(e.target.value)}
              type="text"
              placeholder="Registration number"
              className="flex-grow rounded-lg border px-3 mb-6 placeholder:text-gray-400 dark:placeholder:text-gray-600
              border-black placeholder-black focus:outline-none focus:ring-2 focus:ring-gray-900
              dark:border-white dark:bg-gray-950 dark:text-white dark:placeholder-white dark:focus:ring-white"
            />


            <div className="col-span-2 mb-6">
              <label className="block mb-1 text-xl font-bold">
                Usage Type :
              </label>
              <div className="flex flex-row gap-20 pl-2">
                <label className="flex items-center gap-3 cursor-pointer text-xl font-semibold">
                <input
                  type="radio"
                  value={true}
                  name="category"
                  checked={category === true}
                  onChange={(e) => setCategory(true)}
                  className="w-5 h-5 mt-4 accent-black dark:accent-white"
                />
                Commercial
              </label>

              <label
                className="flex items-center gap-3 cursor-pointer text-xl font-semibold"
                htmlFor="non-commercial"
              >
                <input
                  className="w-5 h-5 mt-4 accent-black dark:accent-white"
                  type="radio"
                  value={false}
                  name="category"
                  checked={category === false}
                  onChange={(e) => setCategory(false)}
                />
                Non-Commercial
              </label>
              </div>
            </div>


            <label className="block mb-1 text-xl font-bold">
                Enter Fitness Expiry :
            </label>
            <input
              id="fitness-expiry"
              ref={inputrefs[6]}
              onKeyDown={(e) => handleKeyNext(e, 6)}
              value={fitness}
              onChange={(e) => setFitness(e.target.value)}
              type="text"
              placeholder="Fitness expiry"
              className="flex-grow rounded-lg border px-3 mb-6 placeholder:text-gray-400 dark:placeholder:text-gray-600
              border-black placeholder-black focus:outline-none focus:ring-2 focus:ring-gray-900
              dark:border-white dark:bg-gray-950 dark:text-white dark:placeholder-white dark:focus:ring-white"
            />


            <label className="block mb-1 text-xl font-bold">
              Enter Permit Expiry :
            </label>
            <input
              id="permit-expiry"
              ref={inputrefs[7]}
              onKeyDown={(e) => handleKeyNext(e, 7)}
              value={permit}
              onChange={(e) => setPermit(e.target.value)}
              type="text"
              placeholder="Permit expiry"
              className="flex-grow rounded-lg border px-3 mb-6 placeholder:text-gray-400 dark:placeholder:text-gray-600
              border-black placeholder-black focus:outline-none focus:ring-2 focus:ring-gray-900
              dark:border-white dark:bg-gray-950 dark:text-white dark:placeholder-white dark:focus:ring-white"
            />


            <label className="block mb-1 text-xl font-bold">
              Enter Insurance Expiry :
            </label>
            <input
              id="insurance-expiry"
              ref={inputrefs[8]}
              onKeyDown={(e) => handleKeyNext(e, 8)}
              value={insurance}
              onChange={(e) => setInsurance(e.target.value)}
              type="text"
              placeholder="Insurance expiry"
              className="flex-grow rounded-lg border px-3 mb-6 placeholder:text-gray-400 dark:placeholder:text-gray-600
              border-black placeholder-black focus:outline-none focus:ring-2 focus:ring-gray-900
              dark:border-white dark:bg-gray-950 dark:text-white dark:placeholder-white dark:focus:ring-white"
            />


            <label className="block mb-1 text-xl font-bold">
              Enter Pollution Expiry :
            </label>
            <input
              id="pollution-expiry"
              ref={inputrefs[9]}
              onKeyDown={(e) => handleKeyNext(e, 9)}
              value={pollution}
              onChange={(e) => setPollution(e.target.value)}
              type="text"
              placeholder="Pollution expiry"
              className="flex-grow rounded-lg border px-3 mb-6 placeholder:text-gray-400 dark:placeholder:text-gray-600
              border-black placeholder-black focus:outline-none focus:ring-2 focus:ring-gray-900
              dark:border-white dark:bg-gray-950 dark:text-white dark:placeholder-white dark:focus:ring-white"
            />


            <label className="block mb-1 text-xl font-bold">
              Enter Last Service Date :
            </label>
            <input
              id="last-service-date"
              ref={inputrefs[10]}
              onKeyDown={(e) => handleKeyNext(e, 10)}
              value={lastService}
              onChange={(e) => setLastService(e.target.value)}
              type="text"
              placeholder="Last service date"
              className="flex-grow rounded-lg border px-3 mb-6 placeholder:text-gray-400 dark:placeholder:text-gray-600
              border-black placeholder-black focus:outline-none focus:ring-2 focus:ring-gray-900
              dark:border-white dark:bg-gray-950 dark:text-white dark:placeholder-white dark:focus:ring-white"
            />

            <label className="block mb-1 text-xl font-bold">
              Enter total kilometers :
            </label>
            <input
              ref={inputrefs[11]}
              onKeyDown={(e) => handleKeyNext(e, 11)}
              value={km}
              onChange={(e) => setKm(e.target.value)}
              type="text"
              placeholder="Total Kilometers"
              className="flex-grow rounded-lg border px-3 mb-6 placeholder:text-gray-400 dark:placeholder:text-gray-600
              border-black placeholder-black focus:outline-none focus:ring-2 focus:ring-gray-900
              dark:border-white dark:bg-gray-950 dark:text-white dark:placeholder-white dark:focus:ring-white"
            />

            <label className="block mb-1 text-xl font-bold">
              Enter Mileage :
            </label>
            <input
              ref={inputrefs[12]}
              onKeyDown={(e) => handleKeyNext(e, 12)}
              value={mileage}
              onChange={(e) => setMileage(e.target.value)}
              type="text"
              placeholder="Mileage"
              className="flex-grow rounded-lg border px-3 mb-6 placeholder:text-gray-400 dark:placeholder:text-gray-600
              border-black placeholder-black focus:outline-none focus:ring-2 focus:ring-gray-900
              dark:border-white dark:bg-gray-950 dark:text-white dark:placeholder-white dark:focus:ring-white"
            />


            <div className="col-span-2 mb-10">
              <label className="block mb-1 text-xl font-bold">
                Description :
              </label>
              <textarea
                typeof="text"
                ref={inputrefs[13]}
                onKeyDown={(e) => handleKeyNext(e, 13)}
                id="description"
                rows="4"
                className="w-full rounded-lg border p-3 mb-6 placeholder:text-gray-400 dark:placeholder:text-gray-600
              border-black placeholder-black focus:outline-none focus:ring-2 focus:ring-gray-900
              dark:border-white dark:bg-gray-950 dark:text-white dark:placeholder-white dark:focus:ring-white"
                placeholder="Enter additional vehicle information..."
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
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
              <button type="submit" className="w-full h-14 text-2xl
              rounded-full font-semibold transition-colors duration-300
              bg-black text-white hover:bg-gray-700 
              dark:bg-white dark:text-black dark:hover:bg-gray-700 dark:hover:text-white">
                Submit
              </button>
            )}
            
          </form>
        </div>
    </motion.div>
  );
};

export default Vehicledetail;
