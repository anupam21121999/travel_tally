import React from "react";
import { useState } from "react";
import "./signup.css";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setPhone, setToken } from "../../redux/slice/userSlice";
import { ClipLoader } from "react-spinners";
import { toast, Toaster } from "react-hot-toast";

const Signup = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [fname, setFname] = useState("");
  const [lname, setLname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [cnfPassword, setCnfPassword] = useState("");
  const [mobile, setMobile] = useState("");
  const [showOtp, setShowOtp] = useState(false);
  const [otpValue, setOtpValue] = useState("");
  const [passwordErrorState, setPasswordErrorState] = useState("");
  const [loading, setLoading] = useState(false);

  const closeOtpPopup = () => {
    setShowOtp(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setShowOtp(true);
    setLoading(true);

    try {
      let newMobile =
        mobile.length === 10
          ? `+91${mobile}`
          : mobile.length === 13
          ? mobile
          : null;
      if (newMobile == null) {
        console.log("Please enter a valid mobile number");
      }
      const response = await fetch(
        `${process.env.REACT_APP_DOMAIN}/api/auth/register`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            firstName: fname,
            lastName: lname,
            email: email,
            password: password,
            phone: newMobile,
          }),
        }
      );
      const data = await response.json();

      if (response.status === 201) {
        localStorage.setItem("token", data.token);
        dispatch(setToken(data.token));
      } else {
        toast.error("Register Failed");
      }
    } catch (error) {
      console.log("Error", error);
    } finally {
      setLoading(false);
    }

    if (password === cnfPassword) {
      console.log("Password Matched");
    } else {
      setPasswordErrorState("Password Mismatch");
    }
  };

  const handleVerify = async (e) => {
    e.preventDefault();
    try {
      let newMobile =
        mobile.length === 10
          ? `+91${mobile}`
          : mobile.length === 13
          ? mobile
          : null;
      if (newMobile == null) {
        console.log("Please enter a valid mobile number");
      }

      const res = await fetch(
        `${process.env.REACT_APP_DOMAIN}/api/auth/verify`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            phone: newMobile,
            code: otpValue,
          }),
        }
      );
      if (res.status === 200) {
        dispatch(setPhone(mobile));
        navigate("/corporation_info");
      } else {
        setShowOtp(false);
      }
    } catch (error) {
      console.log("Error", error);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleSubmit();
    }
  };

  return (
    <>
      <Toaster position="top-center" reverseOrder={false} />
      <div className="logon">
        <div className="container">
          <form onSubmit={handleSubmit}>
            <div className="card">
              <h1>Travel Tally</h1>
              <label>
                <b>First Name</b>
              </label>
              <input
                value={fname}
                onChange={(e) => setFname(e.target.value)}
                type="text"
                placeholder="First Name"
              />
              <label>
                <b>Last Name</b>
              </label>
              <input
                value={lname}
                onChange={(e) => setLname(e.target.value)}
                type="text"
                placeholder="Last Name"
              />
              <label>
                <b>Email</b>
              </label>
              <input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                type="email"
                placeholder="Enter Email"
              />
              <label>
                <b>Password</b>
              </label>
              <input
                onChange={(e) => {
                  const value = e.target.value;
                  setPassword(value);
                  if (cnfPassword && cnfPassword !== value) {
                    setPasswordErrorState("Password Mismatch");
                  } else {
                    setPasswordErrorState("");
                  }
                }}
                type="password"
                placeholder="Enter Password"
              />
              <label>
                <b>Confirm Password</b>
              </label>
              <input
                onChange={(e) => {
                  const value = e.target.value;
                  setCnfPassword(value);
                  if (password && value !== password) {
                    setPasswordErrorState("Password Mismatch");
                  } else {
                    setPasswordErrorState("");
                  }
                }}
                type="password"
                placeholder="Confirm Password"
              />
              {passwordErrorState && (
                <p
                  style={{ color: "red", fontSize: "0.9em", marginTop: "5px" }}
                >
                  {passwordErrorState}
                </p>
              )}
              <label>
                <b>Mobile No.</b>
              </label>
              <input
                value={mobile}
                onChange={(e) => setMobile(e.target.value)}
                type="number"
                placeholder="Mobile No."
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
                <button className="logon-button" onKeyDown={handleKeyDown}>
                  Signup
                </button>
              )}
            </div>
          </form>

          {showOtp && (
            <div className="otp-popup">
              <div className="otp-content">
                <h2>Enter OTP</h2>
                <input
                  value={otpValue}
                  onChange={(e) => setOtpValue(e.target.value)}
                  type="text"
                  placeholder="Enter OTP"
                  minLength="6"
                  maxLength="6"
                />
                <button className="verify-btn" onClick={handleVerify}>
                  Verify
                </button>
                <button className="close-btn" onClick={closeOtpPopup}>
                  Close
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Signup;
