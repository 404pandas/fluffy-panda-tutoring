import React from "react";
import "./animal.css";

const Animal: React.FC = () => {
  return (
    <div
      style={{
        width: "20px",
        height: "20px",
        backgroundColor: "blue",
        borderRadius: "50%",
      }}
    />
  );
};

export default Animal;
