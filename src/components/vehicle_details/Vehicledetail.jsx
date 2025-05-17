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

const schema = yup.object().shape({
  vehicleModel: yup.string().max(30).required("Vehicle model is required"),
  vehicleColor: yup.string().max(30).required("Vehicle color is required"),
  vehiclePurchaseYear: yup
    .date()
    .typeError("Select a valid year")
    .required("Purchase year is required"),
  vehicleType: yup.string().required("Vehicle type is required"),
  fuelType: yup.string().required("Fuel type is required"),
  regNumber: yup.string().required("Registration number is required"),
  usageType: yup.string().required("Usage type is required"),
  fitnessExpiry: yup.date().nullable(),
  permitExpiry: yup
    .date()
    .nullable()
    .when("usageType", {
      is: "Commercial",
      then: (schema) => schema.required("Permit expiry is required for Commercial usage"),
      otherwise: (schema) => schema.nullable(),
    }),
  insuranceExpiry: yup.date().nullable(),
  pollutionExpiry: yup.date().nullable(),
  lastServiceDate: yup.date().nullable(),
  totalKilometers: yup
    .number()
    .typeError("Total Kilometers must be a number")
    .min(0, "Total Kilometers must be 0 or more")
    .required()
    .transform((value, originalValue) =>
      originalValue === "" ? null : value
    ),
  mileage: yup
    .number()
    .typeError("Enter a valid number")
    .min(0, "Mileage must be 0 or more").nullable()
    .transform((value, originalValue) =>
      originalValue === "" ? null : value
    ),
  description: yup.string().max(100, "Maximum 100 characters allowed"),
});

const Vehicledetail = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    control,
    watch,
    setFocus,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const fieldOrder = [
    "vehicleModel",
    "vehicleColor",
    "vehiclePurchaseYear",
    "vehicleType",
    "fuelType",
    "regNumber",
    "usageType",
    "fitnessExpiry",
    "permitExpiry", // only if commercial
    "insuranceExpiry",
    "pollutionExpiry",
    "lastServiceDate",
    "totalKilometers",
    "mileage",
    "description",
  ];

  const onSubmit = async (data) => {
    // console.log(data.vehiclePurchaseYear.getFullYear())
    setLoading(true);
    try {
      const body_data = {
        model: data.vehicleModel,
        color: data.vehicleColor,
        year: `${data.vehiclePurchaseYear.getFullYear()}`,
        registrationNumber: data.regNumber,
        isCommercial: data.usageType==="Commercial",
        type: data.vehicleType,
        fuelType: data.fuelType,
        totalKms : data.totalKilometers
      };
      if(data.permitExpiry) body_data.permitExpiry  = data.permitExpiry.toISOString().split("T")[0];
      if(data.fitnessExpiry) body_data.fitnessExpiry = data.fitnessExpiry.toISOString().split("T")[0];
      if(data.insuranceExpiry) body_data.insuranceExpiry = data.insuranceExpiry.toISOString().split("T")[0];
      if(data.pollutionExpiry) body_data.pollutionExpiry = data.pollutionExpiry.toISOString().split("T")[0];
      if(data.lastServiceDate) body_data.lastServiceDate = data.lastServiceDate.toISOString().split("T")[0];
      if(data.mileage) body_data.mileage = data.mileage;
      if(data.description) body_data.note = data.description;
      
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
      const resData = await response.json();
      if (response.status === 201) {
        console.log(resData);
        console.log("Vehicle registered successfully");
        toast.success("Vehicle Registration Successful");
        setTimeout(() => {
          navigate("/vehicle_dashboard");
        }, 1000);
      } else {
        console.log("Vehicle registration failed");
        toast.error(resData.message);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e, currentField) => {
    if (e.key === "Enter") {
    e.preventDefault();
    const currentIndex = fieldOrder.indexOf(currentField);
    const nextField = fieldOrder[currentIndex + 1];

    if (nextField) {
      setFocus(nextField);
    } else {
      document.getElementById("vehicle-form")?.requestSubmit(); // Submit at end
    }
  }
    // if (e.key === "Enter") {
    //   e.preventDefault();
    //   const next = inputRefs.current[index + 1];
    //   // if (next) next.focus();
    //   if (next && typeof next.focus === "function") {
    //     next.focus();
    //   } else {
    //     // If no more fields, submit the form
    //     document.getElementById("vehicle-form")?.requestSubmit(); // modern way to trigger form submit
    //   }
    // }
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
        <form id="vehicle-form" onSubmit={handleSubmit(onSubmit)} className="max-w-2xl mx-auto">
          <h1 className="text-4xl text-center font-bold font-sans p-5">
            Vehicle Registration
          </h1>

          <label className="block text-xl font-bold mb-1">
            Enter Vehicle Model :
          </label>
          <input {...register("vehicleModel")}
            placeholder="Vehicle model"
            onKeyDown={(e) => handleKeyDown(e, "vehicleModel")}
            className="flex-grow rounded-lg border px-3 mb-1 placeholder:text-gray-400 dark:placeholder:text-gray-600
              border-black placeholder-black focus:outline-none focus:ring-2 focus:ring-gray-900
              dark:border-white dark:bg-gray-950 dark:text-white dark:placeholder-white dark:focus:ring-white"
          />
          <p className="text-red-500 text-sm mb-6">{errors.vehicleModel?.message}</p>


          <label className="block mb-1 text-xl font-bold">
            Enter Vehicle Color :
          </label>
          <input {...register("vehicleColor")}
            placeholder="Vehicle color"
            onKeyDown={(e) => handleKeyDown(e, "vehicleColor")}
            className="flex-grow rounded-lg border px-3 mb-1 placeholder:text-gray-400 dark:placeholder:text-gray-600
              border-black placeholder-black focus:outline-none focus:ring-2 focus:ring-gray-900
              dark:border-white dark:bg-gray-950 dark:text-white dark:placeholder-white dark:focus:ring-white"
          />
          <p className="text-red-500 text-sm mb-6">{errors.vehicleColor?.message}</p>


          <label className="block mb-1 text-xl font-bold">
            Enter Purchasing Date :
          </label>
          <Controller
            control={control}
            name="vehiclePurchaseYear"
            render={({ field }) => (
              <DatePicker
                selected={field.value}
                onChange={field.onChange}
                showYearPicker
                dateFormat="yyyy"
                maxDate={new Date(new Date().getFullYear(), 11, 31)}
                onKeyDown={(e) => handleKeyDown(e, "vehiclePurchaseYear")}
                placeholderText="Select year"
                className="w-full rounded-lg border px-3 mb-1 placeholder:text-gray-400 dark:placeholder:text-gray-600
              border-black placeholder-black focus:outline-none focus:ring-2 focus:ring-gray-900
              dark:border-white dark:bg-gray-950 dark:text-white dark:placeholder-white dark:focus:ring-white"
              />
            )}
          />
          <p className="text-red-500 text-sm mb-6">{errors.vehiclePurchaseYear?.message}</p>

          <label className="block mb-1 text-xl font-bold">
            Select Vehicle Type :
          </label>
          <select {...register("vehicleType")}
            onKeyDown={(e) => handleKeyDown(e, "vehicleType")}
            className="h-12 px-3 rounded-lg border mb-1 placeholder:text-gray-400 dark:placeholder:text-gray-600
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
          <p className="text-red-500 text-sm mb-6">{errors.vehicleType?.message}</p>


          <label className="block mb-1 text-xl font-bold">
            Select Fuel Type :
          </label>
          <select {...register("fuelType")}
            onKeyDown={(e) => handleKeyDown(e, "fuelType")}
            className="h-12 px-3 rounded-lg border mb-1
              border-black placeholder-black focus:outline-none focus:ring-2 focus:ring-gray-900
              dark:border-white dark:bg-gray-950 dark:text-white dark:placeholder-white dark:focus:ring-white"
          >
            <option value="">Select Fuel Type</option>
            <option value="Petrol">Petrol</option>
            <option value="Diesel">Diesel</option>
            <option value="Petrol/CNG">Petrol/CNG</option>
            <option value="EV">EV</option>
          </select>
          <p className="text-red-500 text-sm mb-6">{errors.fuelType?.message}</p>


          <label className="block mb-1 text-xl font-bold">
            Enter Registration Number :
          </label>
          <input {...register("regNumber")}
            onKeyDown={(e) => handleKeyDown(e, "regNumber")}
            placeholder="Registration number"
            className="flex-grow rounded-lg border px-3 mb-1 placeholder:text-gray-400 dark:placeholder:text-gray-600
              border-black placeholder-black focus:outline-none focus:ring-2 focus:ring-gray-900
              dark:border-white dark:bg-gray-950 dark:text-white dark:placeholder-white dark:focus:ring-white"
          />
          <p className="text-red-500 text-sm mb-6">{errors.regNumber?.message}</p>


          <div className="col-span-2 mb-1">
            <label className="block mb-1 text-xl font-bold">
              Usage Type :
            </label>
            <div className="flex flex-row gap-20 pl-2">
              <label className="flex items-center gap-3 cursor-pointer text-xl font-semibold">
                <input
                  type="radio"
                  value="Commercial"
                  onKeyDown={(e) => handleKeyDown(e, "usageType")}
                  {...register("usageType")}
                  className="w-5 h-5 mt-4 accent-black dark:accent-white"
                />
                Commercial
              </label>

              <label className="flex items-center gap-3 cursor-pointer text-xl font-semibold">
                <input
                  className="w-5 h-5 mt-4 accent-black dark:accent-white"
                  type="radio"
                  value="Non-Commercial"
                  onKeyDown={(e) => handleKeyDown(e, "usageType")}
                  {...register("usageType")}
                />
                Non-Commercial
              </label>
            </div>
          </div>
          <p className="text-red-500 text-sm mb-6">{errors.usageType?.message}</p>


          <label className="block mb-1 text-xl font-bold">
            Enter Fitness Expiry :
          </label>
          <Controller
            control={control}
            name="fitnessExpiry"
            render={({ field }) => (
              <DatePicker
                selected={field.value}
                onChange={field.onChange}
                dateFormat="yyyy-MM-dd"
                onKeyDown={(e) => handleKeyDown(e, "fitnessExpiry")}
                placeholderText="Select date"
                className="w-full rounded-lg border px-3 mb-1 placeholder:text-gray-400 dark:placeholder:text-gray-600
              border-black placeholder-black focus:outline-none focus:ring-2 focus:ring-gray-900
              dark:border-white dark:bg-gray-950 dark:text-white dark:placeholder-white dark:focus:ring-white"
              />
            )}
          />
          <p className="text-red-500 text-sm mb-6">{errors.fitnessExpiry?.message}</p>

          {watch("usageType") === "Commercial" && (
            <div className="flex flex-col w-full">
              <label className="block mb-1 text-xl font-bold">Enter Permit Expiry :</label>
              <Controller
                control={control}
                name="permitExpiry"
                render={({ field }) => (
                  <DatePicker
                    selected={field.value}
                    onChange={field.onChange}
                onKeyDown={(e) => handleKeyDown(e, "permitExpiry")}
                    dateFormat="yyyy-MM-dd"
                    placeholderText="Select date"
                    className="w-full rounded-lg border px-3 mb-1 placeholder:text-gray-400 dark:placeholder:text-gray-600
              border-black placeholder-black focus:outline-none focus:ring-2 focus:ring-gray-900
              dark:border-white dark:bg-gray-950 dark:text-white dark:placeholder-white dark:focus:ring-white"
                  />
                )}
              />
              <p className="text-red-500 text-sm mb-6">{errors.permitExpiry?.message}</p>
            </div>
          )}


          <label className="block mb-1 text-xl font-bold">
            Enter Insurance Expiry :
          </label>
          <Controller
            control={control}
            name="insuranceExpiry"
            render={({ field }) => (
              <DatePicker
                selected={field.value}
                onChange={field.onChange}
                onKeyDown={(e) => handleKeyDown(e, "insuranceExpiry")}
                dateFormat="yyyy-MM-dd"
                placeholderText="Select date"
                className="w-full rounded-lg border px-3 mb-1 placeholder:text-gray-400 dark:placeholder:text-gray-600
              border-black placeholder-black focus:outline-none focus:ring-2 focus:ring-gray-900
              dark:border-white dark:bg-gray-950 dark:text-white dark:placeholder-white dark:focus:ring-white"
              />
            )}
          />
          <p className="text-red-500 text-sm mb-6">{errors.insuranceExpiry?.message}</p>


          <label className="block mb-1 text-xl font-bold">
            Enter Pollution Expiry :
          </label>
          <Controller
            control={control}
            name="pollutionExpiry"
            render={({ field }) => (
              <DatePicker
                selected={field.value}
                onChange={field.onChange}
                onKeyDown={(e) => handleKeyDown(e, "pollutionExpiry")}
                dateFormat="yyyy-MM-dd"
                placeholderText="Select date"
                className="w-full rounded-lg border px-3 mb-1 placeholder:text-gray-400 dark:placeholder:text-gray-600
              border-black placeholder-black focus:outline-none focus:ring-2 focus:ring-gray-900
              dark:border-white dark:bg-gray-950 dark:text-white dark:placeholder-white dark:focus:ring-white"
              />
            )}
          />
          <p className="text-red-500 text-sm mb-6">{errors.pollutionExpiry?.message}</p>


          <label className="block mb-1 text-xl font-bold">
            Enter Last Service Date :
          </label>
          <Controller
            control={control}
            name="lastServiceDate"
            render={({ field }) => (
              <DatePicker
                selected={field.value}
                onChange={field.onChange}
                onKeyDown={(e) => handleKeyDown(e, "lastServiceDate")}
                dateFormat="yyyy-MM-dd"
                placeholderText="Select date"
                className="w-full rounded-lg border px-3 mb-1 placeholder:text-gray-400 dark:placeholder:text-gray-600
              border-black placeholder-black focus:outline-none focus:ring-2 focus:ring-gray-900
              dark:border-white dark:bg-gray-950 dark:text-white dark:placeholder-white dark:focus:ring-white"
              />
            )}
          />
          <p className="text-red-500 text-sm mb-6">{errors.lastServiceDate?.message}</p>


          <label className="block mb-1 text-xl font-bold">
            Enter Total Kilometers :
          </label>
          <input
            {...register("totalKilometers")}
            type="number"
            onKeyDown={(e) => handleKeyDown(e, "totalKilometers")}
            placeholder="Total Kilometers"
            className="flex-grow rounded-lg border px-3 mb-1 placeholder:text-gray-400 dark:placeholder:text-gray-600
              border-black placeholder-black focus:outline-none focus:ring-2 focus:ring-gray-900
              dark:border-white dark:bg-gray-950 dark:text-white dark:placeholder-white dark:focus:ring-white"
          />
          <p className="text-red-500 text-sm mb-6">{errors.totalKilometers?.message}</p>

          <label className="block mb-1 text-xl font-bold">
            Enter Mileage :
          </label>
          <input
            {...register("mileage")}
            type="number"
            placeholder="Mileage"
            onKeyDown={(e) => handleKeyDown(e, "mileage")}
            className="flex-grow rounded-lg border px-3 mb-1 placeholder:text-gray-400 dark:placeholder:text-gray-600
              border-black placeholder-black focus:outline-none focus:ring-2 focus:ring-gray-900
              dark:border-white dark:bg-gray-950 dark:text-white dark:placeholder-white dark:focus:ring-white"
          />
          <p className="text-red-500 text-sm mb-6">{errors.mileage?.message}</p>


          <div className="col-span-2 mb-10">
            <label className="block mb-1 text-xl font-bold">
              Description :
            </label>
            <textarea
              {...register("description")}
              rows="4"
              onKeyDown={(e) => handleKeyDown(e, "description")}
              className="w-full rounded-lg border p-3 mb-0 placeholder:text-gray-400 dark:placeholder:text-gray-600
              border-black placeholder-black focus:outline-none focus:ring-2 focus:ring-gray-900
              dark:border-white dark:bg-gray-950 dark:text-white dark:placeholder-white dark:focus:ring-white"
              placeholder="Enter additional vehicle information..."
            />
            <p className="text-red-500 text-sm mb-6">{errors.description?.message}</p>
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
              focus:outline-none focus:ring-2 focus:ring-gray-800 dark:focus:ring-white
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
