import React from "react";
import "./login.css";
import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { ClipLoader } from "react-spinners";
import { toast, Toaster } from "react-hot-toast";

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [loading, setLoading] = useState(false);
  const inputRefs = [useRef(null), useRef(null), useRef(null)];

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

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
        setTimeout(() => {
          toast.success("Login Successful");
          navigate("/dashboard");
        }, 1000);
      } else {
        toast.error("Login Failed");
      }
    } catch (error) {
      toast.error("Login Error:", error);
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
        // If it's the last input, submit the form
        document.querySelector("form").requestSubmit();
      }
    }
  };

  return (
    <>
      <Toaster position="top-center" reverseOrder={false} />
      <div className="login">
        <div className="container">
          <form onSubmit={handleSubmit}>
            <div className="card">
              <h1>Travel Tally</h1>
              <label>
                <b>Email</b>
              </label>
              <input
                ref={inputRefs[0]}
                onKeyDown={(e) => handleKeyDown(e, 0)}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                type="email"
                placeholder="Enter Email"
              />
              <label>
                <b>Password</b>
              </label>
              <input
                ref={inputRefs[1]}
                onKeyDown={(e) => handleKeyDown(e, 1)}
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
                  className="login-button"
                  ref={inputRefs[2]}
                  type="submit"
                >
                  Login
                </button>
              )}
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
