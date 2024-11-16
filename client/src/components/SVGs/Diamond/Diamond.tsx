import React from "react";
interface DiamondProps {
  color: string;
}
const Diamond: React.FC<DiamondProps> = ({ color }) => {
  return <polygon points='50,10 90,50 50,90 10,50' fill={color} />;
};

export default Diamond;
