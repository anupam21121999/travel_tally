import React from "react";
import { useParams } from "react-router-dom";
import { useState } from "react";
import "./driverdetails2.css";

const Driverdetails2 = () => {
  const { id } = useParams();
  const [image1, setImage1] = useState(null);
  const [image2, setImage2] = useState(null);
  const [image1File, setImage1File] = useState(null);
  const [image2File, setImage2File] = useState(null);

  const handleImage1Change = (e) => {
    setImage1File(e.target.files[0]);
    setImage1(URL.createObjectURL(e.target.files[0]));
  };

  const handleImage2Change = (e) => {
    setImage2File(e.target.files[0]);
    setImage2(URL.createObjectURL(e.target.files[0]));
  };

  const token = localStorage.getItem("token");
  const handleSubmit = async (e) => {
    try {
      console.log(`Hitting Submit with ${image1} & ${image2}`);
      e.preventDefault();
      if (image1File !== null) {
        const formData1 = new FormData();
        // const fileName1 = image1.split("/")[-1];
        formData1.append("file", image1File);
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
      } else {
        console.log("License not selected");
      }
      if (image2File !== null) {
        const formData2 = new FormData();
        const fileName2 = image1.split("/")[-1];
        formData2.append("file", image2File, fileName2);
        const response2 = await fetch(
          `${process.env.REACT_APP_DOMAIN}/api/driver/uploadfile/Aadhar/${id}`,
          {
            method: "POST",
            headers: {
              Authorization: token,
            },
            body: formData2,
            redirect: "follow",
          }
        );
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div className="form-container">
        <h2>Upload Images</h2>
        <form onSubmit={handleSubmit} className="image-form">
          <div className="form-group">
            <label>Upload Image 1:</label>
            <input type="file" accept="image/*" onChange={handleImage1Change} />
            {image1 && <img src={image1} alt="Preview 1" className="preview" />}
          </div>

          <div className="form-group">
            <label>Upload Image 2:</label>
            <input type="file" accept="image/*" onChange={handleImage2Change} />
            {image2 && <img src={image2} alt="Preview 2" className="preview" />}
          </div>

          <button type="submit" className="submit-btn">
            Submit
          </button>
        </form>
      </div>
    </>
  );
};

export default Driverdetails2;
