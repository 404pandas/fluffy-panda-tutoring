import React from "react";
interface CrossProps {
  color: string;
}

const Cross: React.FC<CrossProps> = ({ color }) => {
  return (
    <>
      <rect width='40' height='100' x='30' fill={color} />
      <rect width='100' height='40' y='30' fill={color} />
    </>
  );
};

export default Cross;
