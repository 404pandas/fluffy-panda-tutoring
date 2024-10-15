// src/components/Header.tsx
import React from "react";
import "./header.css";

const Header: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <header>
      <h1>Fluffy Panda Tutoring</h1>
      {children}
    </header>
  );
};

export default Header;
