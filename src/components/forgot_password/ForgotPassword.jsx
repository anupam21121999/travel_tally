import React from "react";
import "./forgotpassword.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setInputEmail } from "../../redux/slice/emailSlice";

const ForgotPassword = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const response = await fetch(
      `${process.env.REACT_APP_DOMAIN}/api/auth/forgetPassword`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email: email }),
      }
    );

    const data = await response.json();

    if (response.status === 200) {
      dispatch(setInputEmail(email));
      console.log(dispatch(setInputEmail(email)));
      navigate("/change_password");
    } else {
      setError(data.message);
      console.log("Error", error);
    }
  };

  const keySubmit = (e) => {
    if (e.key === "Enter") {
      handleSubmit();
    }
  };

  const backState = () => {
    navigate(-1);
  };

  return (
    <>
      <div className="forgot-pass">
        <div className="container">
          <form>
            <div className="card">
              <h1>Forgot Password</h1>
              <label>
                <b>Email</b>
              </label>
              <input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                type="email"
                placeholder="Enter Email"
              />
              <button
                onClick={handleSubmit}
                onKeyDown={keySubmit}
                type="button"
                className="submit"
              >
                Submit
              </button>
            </div>
          </form>
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
        </div>
      </div>
    </>
  );
};

export default ForgotPassword;
