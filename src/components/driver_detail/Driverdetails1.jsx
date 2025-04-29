import React from "react";
import "./driverDetails.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Driverdetails1 = () => {
  const navigate = useNavigate();
  const [fname, setfname] = useState("");
  const [lname, setlname] = useState("");
  const [phone, setphone] = useState("");
  const [address, setaddress] = useState("");
  const [joinDate, setjoinDate] = useState("");

  const submitHandle = async (e) => {
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
        console.log("Login Failed");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
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
          <button type="submit">Submit</button>
        </form>
      </div>
    </>
  );
};

export default Driverdetails1;
