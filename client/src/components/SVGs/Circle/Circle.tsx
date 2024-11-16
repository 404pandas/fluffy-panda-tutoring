import React from "react";
interface CircleProps {
  color: string;
}

const Circle: React.FC<CircleProps> = ({ color }) => {
  return <circle cx='50' cy='50' r='40' fill={color} />;
};
export default Circle;
