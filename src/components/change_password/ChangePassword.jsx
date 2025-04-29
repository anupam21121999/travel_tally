import React from "react";
import "./changepassword.css";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useSelector } from "react-redux";

const ChangePassword = () => {
  const email = useSelector((state) => state.email.value);

  const navigate = useNavigate();
  const [otp, setOtp] = useState("");
  const [password, setPassword] = useState("");
  const [cnfPassword, setCnfPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const response = await fetch(
      `${process.env.REACT_APP_DOMAIN}/api/auth/forgetPasswordVerify`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email,
          code: otp,
          newPassword: password,
        }),
      }
    );

    if (response.status === 200) {
      navigate("/");
    } else {
      console.log("Error");
    }

    if (password !== cnfPassword) {
      setError("Password mismatch");
    } else {
      setError("");
      console.log("Resetting password successful");
    }
  };

  const backState = () => {
    navigate(-1);
  };

  return (
    <>
      <div className="change-password">
        <div className="container">
          <form>
            <div className="card">
              <h1>Reset Password</h1>
              <label>
                <b>Enter OTP</b>
              </label>
              <input
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                type="otp"
                placeholder="Enter OTP"
              />
              <label>
                <b>Password</b>
              </label>
              <input
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                type="password"
                placeholder="Enter Password"
              />
              <label>
                <b>Confirm Password</b>
              </label>
              <input
                value={cnfPassword}
                onChange={(e) => setCnfPassword(e.target.value)}
                type="password"
                placeholder="Confirm Password"
              />
              {error !== "" && (
                <div className="error-msg">
                  <div className="error-content">
                    <h2>{error}</h2>
                    <button
                      onClick={backState}
                      style={{
                        backgroundColor: "blue",
                        borderRadius: "12px",
                        color: "white",
                        padding: "10px",
                        width: "30%",
                        fontWeight: "bold",
                        borderColor: "white",
                      }}
                    >
                      Close
                    </button>
                  </div>
                </div>
              )}
              <button
                onClick={handleSubmit}
                type="button"
                className="reset-button"
              >
                Reset Password
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default ChangePassword;
