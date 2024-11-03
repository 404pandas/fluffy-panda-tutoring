// src/pages/DOMTraversal.tsx
import React from "react";
import "../assets/css/domtraversal.css";
import GameBoard from "../components/GameBoard/GameBoard";

const DOMTraversal: React.FC = () => {
  return (
    <div>
      <h1>DOM Traversal</h1>
      <p>Explore how to traverse the DOM using JavaScript!</p>
      <GameBoard />
    </div>
  );
};

export default DOMTraversal;
