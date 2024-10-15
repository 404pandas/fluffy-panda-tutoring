// src/components/Nav.tsx
import React from "react";
import "./nav.css";

interface NavProps {
  currentPage: string;
}

const Nav: React.FC<NavProps> = ({ currentPage }) => {
  return (
    <nav>
      <ul>
        <li className={currentPage === "/" ? "active" : ""}>
          <a href='/'>Home</a>
        </li>
        <li className={currentPage === "/datatypes" ? "active" : ""}>
          <a href='/datatypes'>Data Types</a>
        </li>
        <li className={currentPage === "/cssselectors" ? "active" : ""}>
          <a href='/cssselectors'>CSS Selectors</a>
        </li>
        <li className={currentPage === "/domtraversal" ? "active" : ""}>
          <a href='/domtraversal'>DOM Traversal</a>
        </li>
        <li className={currentPage === "/domtree" ? "active" : ""}>
          <a href='/domtree'>DOM Tree</a>
        </li>
      </ul>
    </nav>
  );
};

export default Nav;
