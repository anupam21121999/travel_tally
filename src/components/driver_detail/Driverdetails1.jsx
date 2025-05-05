import React from "react";
import "./driverDetails.css";
import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { ClipLoader } from "react-spinners";
import { toast, Toaster } from "react-hot-toast";

const Driverdetails1 = () => {
  const navigate = useNavigate();
  const inputRefs = [
    useRef(null),
    useRef(null),
    useRef(null),
    useRef(null),
    useRef(null),
    useRef(null),
  ];
  const [fname, setfname] = useState("");
  const [lname, setlname] = useState("");
  const [phone, setphone] = useState("");
  const [address, setaddress] = useState("");
  const [joinDate, setjoinDate] = useState("");
  const [loading, setLoading] = useState(false);

  const submitHandle = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const token = localStorage.getItem("token");
      e.preventDefault();
      const response = await fetch(
        `${process.env.REACT_APP_DOMAIN}/api/driver/register`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            authorization: token,
          },
          body: JSON.stringify({
            firstName: fname,
            lastName: lname,
            phone: phone,
            address: address,
            joiningDate: joinDate,
          }),
        }
      );
      const data = await response.json();
      console.log(data);
      const userId = data.driver_id;

      if (response.status === 201) {
        navigate(`/driver_details2/${userId}`);
      } else {
        toast.error(response.message);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === "Enter") {
      e.preventDefault();
      const next = inputRefs[index + 1];
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
      <div className="form-container">
        <h2 className="text-center">Driver Details</h2>
        <form onSubmit={submitHandle}>
          <input
            ref={inputRefs[0]}
            onKeyDown={(e) => handleKeyDown(e, 0)}
            value={fname}
            onChange={(e) => setfname(e.target.value)}
            type="text"
            placeholder="First Name"
          />
          <input
            ref={inputRefs[1]}
            onKeyDown={(e) => handleKeyDown(e, 1)}
            value={lname}
            onChange={(e) => setlname(e.target.value)}
            type="text"
            placeholder="Last Name"
          />
          <input
            ref={inputRefs[2]}
            onKeyDown={(e) => handleKeyDown(e, 2)}
            value={phone}
            onChange={(e) => setphone(e.target.value)}
            type="text"
            placeholder="Phone"
          />
          <input
            ref={inputRefs[3]}
            onKeyDown={(e) => handleKeyDown(e, 3)}
            value={address}
            onChange={(e) => setaddress(e.target.value)}
            type="text"
            placeholder="Address"
          />
          <input
            ref={inputRefs[4]}
            onKeyDown={(e) => handleKeyDown(e, 4)}
            value={joinDate}
            onChange={(e) => setjoinDate(e.target.value)}
            type="text"
            placeholder="Joining Date"
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
            <button
              ref={inputRefs[5]}
              onKeyDown={(e) => handleKeyDown(e, 5)}
              type="submit"
            >
              Submit
            </button>
          )}
        </form>
      </div>
    </>
  );
};

export default Driverdetails1;
