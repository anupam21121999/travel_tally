import React from "react";
import "./corporationInfo.css";
import { useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const CorporationInfo = () => {
  const mobile = useSelector((state) => state.user.mobile);
  const token = useSelector((state) => state.user.token);
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [pinCode, setPinCode] = useState("");
  const [alternateNo, setAlternateNo] = useState("");
  const [gst, setGst] = useState("");

  const submitCorpData = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(
        `${process.env.REACT_APP_DOMAIN}/api/corp/register`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: token,
          },
          body: JSON.stringify({
            corpName: name,
            address: address,
            city: city,
            state: state,
            pincode: pinCode,
            gstin: gst,
            altPhone: alternateNo,
          }),
        }
      );

      if (response.status === 201) {
        navigate("/dashboard");
      } else {
        console.log("Error in Corporation Registration");
      }
    } catch (error) {
      console.log("Error", error);
    }
  };

  return (
    <>
      <div className="corporation">
        <div className="container">
          <form onSubmit={submitCorpData}>
            <div className="card">
              <h1>Travel Tally</h1>
              <label>
                <b>Travel's Name</b>
              </label>
              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                type="text"
                placeholder="Travel's Name"
              />
              <label>
                <b>Address</b>
              </label>
              <input
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                type="text"
                placeholder="Enter Address"
              />
              <label>
                <b>City</b>
              </label>
              <input
                value={city}
                onChange={(e) => setCity(e.target.value)}
                type="text"
                placeholder="Enter City"
              />
              <label>
                <b>State</b>
              </label>
              <input
                value={state}
                onChange={(e) => setState(e.target.value)}
                type="text"
                placeholder="Enter State"
              />
              <label>
                <b>Pincode</b>
              </label>
              <input
                value={pinCode}
                onChange={(e) => setPinCode(e.target.value)}
                type="text"
                placeholder="Enter Pincode"
              />
              <label>
                <b>Phone No.</b>
              </label>
              <input
                value={mobile}
                readOnly
                type="text"
                placeholder="Enter Phone no."
              />
              <label>
                <b>Alternate Phone No.</b>
              </label>
              <input
                value={alternateNo}
                onChange={(e) => setAlternateNo(e.target.value)}
                type="text"
                placeholder="Enter alternate Phone no."
              />
              <label>
                <b>GSTIN No.</b>
              </label>
              <input
                value={gst}
                onChange={(e) => setGst(e.target.value)}
                type="text"
                placeholder="Enter GSTIN no."
              />
              <button className="submit-button">Submit</button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default CorporationInfo;
