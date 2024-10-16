import React, { useEffect, useState } from "react";
import logo1 from "../../assets/images/fpt-logo-1.jpg";
import logo2 from "../../assets/images/fpt-logo-2.jpg";
import logo3 from "../../assets/images/fpt-logo-3.jpg";
import logo4 from "../../assets/images/fpt-logo-4.jpg";
import logo5 from "../../assets/images/fpt-logo-5.jpg";

import "./animlogo.css";

const logos = [logo2, logo3, logo4, logo5]; // Logos for the winking animation

const AnimLogo: React.FC = () => {
  const [currentLogo, setCurrentLogo] = useState(logo1); // Start with the normal logo
  const [index, setIndex] = useState(0); // Index for winking logos

  useEffect(() => {
    const interval = setInterval(() => {
      // Cycle through the logos
      if (index < logos.length) {
        setCurrentLogo(logos[index]);
        setIndex(index + 1);
      } else {
        setCurrentLogo(logo1); // Reset to normal logo
        setIndex(0); // Reset index
      }
    }, 1000); // Change logo every 1 second

    return () => clearInterval(interval); // Cleanup interval on unmount
  }, [index]);

  return (
    <div className='logo-img'>
      <img className='logo' src={currentLogo} alt='Animated Logo' />
    </div>
  );
};

export default AnimLogo;
