import React from "react";
interface HeartProps {
  color: string;
}
const Heart: React.FC<HeartProps> = ({ color }) => {
  return (
    <path
      d='M50 80s25-15 40-30c10-10 10-25 0-35-10-10-25-10-35 0-10-10-25-10-35 0-10 10-10 25 0 35 15 15 40 30 40 30z'
      fill={color}
    />
  );
};

export default Heart;
