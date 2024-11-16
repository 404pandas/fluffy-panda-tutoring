import React from "react";
interface ArrowProps {
  color: string;
}
const Arrow: React.FC<ArrowProps> = ({ color }) => {
  return <polygon points='10,50 70,50 50,30 50,70' fill={color} />;
};

export default Arrow;
