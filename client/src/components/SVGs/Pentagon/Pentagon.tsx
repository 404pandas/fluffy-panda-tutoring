import React from "react";
interface PentagonProps {
  color: string;
}
const Pentagon: React.FC<PentagonProps> = ({ color }) => {
  return <polygon points='50,10 90,30 70,90 30,90 10,30' fill={color} />;
};

export default Pentagon;
