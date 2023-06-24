import React, { useState } from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import compressImage from "./convertImg";

const root = ReactDOM.createRoot(document.getElementById("root"));

const App = () => {
  const [quality, setQuality] = useState(0.7);

  const handleImage = (event) => {
    compressImage(event.target.files[0], Number(quality))
      .then((res) => {
        console.log("value is : ", res);
        const downloadLink = document.createElement("a");
        downloadLink.href = URL.createObjectURL(res);
        downloadLink.download = "compressed_image.webp";
        // Trigger the download
        downloadLink.click();

        // Clean up the URL object
        URL.revokeObjectURL(downloadLink.href);
      })
      .catch(() => {
        alert("something went wrong");
      });
  };

  return (
    <div className="main">
      <div className="quality">
        <p>Enter Quality between (0 - 1)</p>
        <input
          type="number"
          value={quality}
          onChange={(event) => {
            setQuality(event.target.value);
          }}
        />
      </div>
      <div className="img_btn">
        <p>Convert Image</p>
        <input type="file" accept="image/*" onChange={handleImage} />
      </div>
    </div>
  );
};

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
