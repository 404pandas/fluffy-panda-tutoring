import React from "react";
interface StarProps {
  color: string;
}
const Star: React.FC<StarProps> = ({ color }) => {
  return (
    <polygon
      points='50,10 61,35 98,35 68,57 79,91 50,70 21,91 32,57 2,35 39,35'
      fill={color}
    />
  );
};

export default Star;
