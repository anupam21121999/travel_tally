import React from "react";
import "./driverDetails.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ClipLoader } from "react-spinners";
import { toast, Toaster } from "react-hot-toast";

const Driverdetails1 = () => {
  const navigate = useNavigate();
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
        toast.error("Login Failed");
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") submitHandle();
  };

  return (
    <>
      <Toaster position="top-center" reverseOrder={false} />
      <div className="form-container">
        <h2 className="text-center">Driver Details</h2>
        <form onSubmit={submitHandle}>
          <input
            value={fname}
            onChange={(e) => setfname(e.target.value)}
            type="text"
            placeholder="First Name"
          />
          <input
            value={lname}
            onChange={(e) => setlname(e.target.value)}
            type="text"
            placeholder="Last Name"
          />
          <input
            value={phone}
            onChange={(e) => setphone(e.target.value)}
            type="text"
            placeholder="Phone"
          />
          <input
            value={address}
            onChange={(e) => setaddress(e.target.value)}
            type="text"
            placeholder="Address"
          />
          <input
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
            <button onKeyDown={handleKeyDown} type="submit">
              Submit
            </button>
          )}
        </form>
      </div>
    </>
  );
};

export default Driverdetails1;
