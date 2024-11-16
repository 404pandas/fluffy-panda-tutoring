import React from "react";
interface CrescentProps {
  color: string;
}
const Crescent: React.FC<CrescentProps> = ({ color }) => {
  return (
    <>
      <circle cx='50' cy='50' r='40' fill={color} />
      <circle cx='70' cy='50' r='30' fill={color} />
    </>
  );
};

export default Crescent;
