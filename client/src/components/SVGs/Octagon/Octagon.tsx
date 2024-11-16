import React from "react";
interface OctagonProps {
  color: string;
}
const Octagon: React.FC<OctagonProps> = ({ color }) => {
  return (
    <polygon
      points='30,10 70,10 90,30 90,70 70,90 30,90 10,70 10,30'
      fill={color}
    />
  );
};

export default Octagon;
