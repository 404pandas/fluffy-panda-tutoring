import React from "react";
interface HexagonProps {
  color: string;
}
const Hexagon: React.FC<HexagonProps> = ({ color }) => {
  return <polygon points='50,10 90,30 90,70 50,90 10,70 10,30' fill={color} />;
};

export default Hexagon;
