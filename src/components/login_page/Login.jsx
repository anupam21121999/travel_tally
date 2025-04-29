import React from "react";
import "./login.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(
        `${process.env.REACT_APP_DOMAIN}/api/auth/login`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email: email, password: password }),
        }
      );

      const data = await response.json();

      if (response.status === 200) {
        localStorage.setItem("token", data.token);
        const corpName = localStorage.getItem("corpName");
        if (corpName == null) {
          const response2 = await fetch(
            `${process.env.REACT_APP_DOMAIN}/api/info/me`,
            {
              method: "GET",
              headers: {
                "Content-Type": "application/json",
                Authorization: data.token,
              },
            }
          );
          const data2 = await response2.json();
          localStorage.setItem("corpName", data2.corpName);
        }
        navigate("/dashboard");
      } else {
        console.log("Login Failed");
      }
    } catch (error) {
      console.log("Login Error:", error);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleSubmit();
    }
  };

  return (
    <>
      <div className="login">
        <div className="container">
          <form onSubmit={handleSubmit}>
            <div className="card">
              <h1>Travel Tally</h1>
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
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                type="password"
                placeholder="Enter Password"
              />
              <div className="links">
                <Link to="/forgot_password" className="nav-item">
                  Forgot Password?
                </Link>
              </div>
              <button className="login-button" onKeyDown={handleKeyDown}>
                Login
              </button>
              <button type="button" className="reset-button">
                Reset Password
              </button>
              <div className="links" style={{ marginTop: "15px" }}>
                <a href=" ">New User?</a>
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default Login;
