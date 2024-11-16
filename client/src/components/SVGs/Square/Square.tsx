import React from "react";
interface SquareProps {
  color: string;
}
const Square: React.FC<SquareProps> = ({ color }) => {
  return <rect width='80' height='80' x='10' y='10' fill={color} />;
};

export default Square;
