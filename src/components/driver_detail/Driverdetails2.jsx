import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useState } from "react";
import "./driverdetails2.css";
import { ClipLoader } from "react-spinners";
import { toast, Toaster } from "react-hot-toast";

const Driverdetails2 = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [image1, setImage1] = useState(null);
  const [image2, setImage2] = useState(null);
  const [image3, setImage3] = useState(null);
  const [image4, setImage4] = useState(null);
  const [image1File, setImage1File] = useState(null);
  const [image2File, setImage2File] = useState(null);
  const [image3File, setImage3File] = useState(null);
  const [image4File, setImage4File] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleImage1Change = (e) => {
    setImage1File(e.target.files[0]);
    setImage1(URL.createObjectURL(e.target.files[0]));
  };

  const handleImage2Change = (e) => {
    setImage2File(e.target.files[0]);
    setImage2(URL.createObjectURL(e.target.files[0]));
  };

  const handleImage3Change = (e) => {
    setImage3File(e.target.files[0]);
    setImage3(URL.createObjectURL(e.target.files[0]));
  };

  const handleImage4Change = (e) => {
    setImage4File(e.target.files[0]);
    setImage4(URL.createObjectURL(e.target.files[0]));
  };

  const token = localStorage.getItem("token");
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      e.preventDefault();
      let flag = false;
      if (image1File !== null && image2File !== null) {
        const formData1 = new FormData();
        const fileName1 = image1.split("/").pop();
        const fileName2 = image2.split("/").pop();
        formData1.append("front", image1File, fileName1);
        formData1.append("back", image2File, fileName2);
        const response1 = await fetch(
          `${process.env.REACT_APP_DOMAIN}/api/driver/uploadfile/Licence/${id}`,
          {
            method: "POST",
            headers: {
              Authorization: token,
            },
            body: formData1,
            redirect: "follow",
          }
        );
        if (response1.status === 200) {
          flag = true;
        } else {
          flag = false;
        }
      } else {
        toast.error("License not selected");
      }
      if (flag === true && image3File !== null && image4File !== null) {
        const formData3 = new FormData();
        const fileName3 = image3.split("/").pop();
        const fileName4 = image4.split("/").pop();
        formData3.append("front", image3File, fileName3);
        formData3.append("back", image4File, fileName4);
        const response3 = await fetch(
          `${process.env.REACT_APP_DOMAIN}/api/driver/uploadfile/Aadhar/${id}`,
          {
            method: "POST",
            headers: {
              Authorization: token,
            },
            body: formData3,
            redirect: "follow",
          }
        );
        if (response3.status === 200) {
          flag = true;
        } else {
          flag = false;
        }
      } else {
        toast.error("Aadhar not selected");
      }
      if (flag === true) {
        navigate("/driver_dashboard");
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const keyBtn = (e) => {
    if (e.key === "Enter") handleSubmit();
  };

  return (
    <>
      <Toaster position="top-center" reverseOrder={false} />
      <div className="form-container">
        <h2 className="text-center font-bold">Upload Documents</h2>
        <form onSubmit={handleSubmit} className="image-form">
          {/* <form className="image-form"> */}
          <div className="form-group">
            <label>Upload License Front:</label>
            <input
              className="w-60"
              type="file"
              accept="image/*"
              onChange={handleImage1Change}
            />
            {image1 && (
              <img src={image1} alt="License Front" className="preview" />
            )}
          </div>

          <div className="form-group">
            <label>Upload License Back:</label>
            <input
              className="w-60"
              type="file"
              accept="image/*"
              onChange={handleImage2Change}
            />
            {image2 && (
              <img src={image2} alt="License Back" className="preview" />
            )}
          </div>

          <div className="form-group">
            <label>Upload Aadhar Front:</label>
            <input
              className="w-60"
              type="file"
              accept="image/*"
              onChange={handleImage3Change}
            />
            {image3 && (
              <img src={image3} alt="Aadhar Front" className="preview" />
            )}
          </div>

          <div className="form-group">
            <label>Upload Aadhar Back:</label>
            <input
              className="w-60"
              type="file"
              accept="image/*"
              onChange={handleImage4Change}
            />
            {image4 && (
              <img src={image4} alt="Aadhar Back" className="preview" />
            )}
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
            <div className="w-auto text-center justify-items-center align-middle">
              <button
                onKeyDown={keyBtn}
                type="submit"
                className="submit-btn bg-blue-500 hover:bg-blue-700"
              >
                Submit
              </button>
            </div>
          )}
        </form>
      </div>
    </>
  );
};

export default Driverdetails2;
