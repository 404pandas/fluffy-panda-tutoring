// src/components/Footer.tsx
import React from "react";
import "./footer.css";

const Footer: React.FC = () => {
  return (
    <footer>
      <p>
        &copy; {new Date().getFullYear()} Fluffy Panda Tutoring. All rights
        reserved.
      </p>
    </footer>
  );
};

export default Footer;
