import React from "react";
import { useState } from "react";
import jsPDF from "jspdf";
import "./imgtopdf.css";

const ImgToPdf = () => {
  const [imageData, setImageData] = useState(null);

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file && file.type.startsWith("image/")) {
      const reader = new FileReader();
      reader.onload = () => setImageData(reader.result);
      reader.readAsDataURL(file);
    }
  };

  const handleDownloadPDF = () => {
    if (!imageData) return;

    const pdf = new jsPDF({
      orientation: "portrait",
      unit: "px",
      format: [595, 842], // A4 size
    });

    const img = new Image();
    img.onload = () => {
      const width = 595;
      const ratio = img.height / img.width;
      const height = width * ratio;

      pdf.addImage(imageData, "PNG", 0, 0, width, height);
      pdf.save("image.pdf");
    };
    img.src = imageData;
  };

  return (
    <>
      <div className="pdf-container">
        <h2>🖼️ Image to PDF Converter</h2>
        <input
          type="file"
          accept="image/*"
          onChange={handleImageUpload}
          className="file-input"
        />

        {imageData && (
          <div className="preview-section">
            <img src={imageData} alt="Preview" className="image-preview" />
            <button onClick={handleDownloadPDF} className="download-btn">
              Download as PDF
            </button>
          </div>
        )}
      </div>
    </>
  );
};

export default ImgToPdf;
