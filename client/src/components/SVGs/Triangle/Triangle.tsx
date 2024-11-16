import React from "react";
interface TriangleProps {
  color: string;
}
const Triangle: React.FC<TriangleProps> = ({ color }) => {
  return <polygon points='50,10 90,90 10,90' fill={color} />;
};

export default Triangle;
