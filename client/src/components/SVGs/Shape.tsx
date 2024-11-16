import React from "react";
import Arrow from "./Arrow/Arrow";
import Circle from "./Circle/Circle";
import Cresecent from "./Cresecent/Cresecent";
import Cross from "./Cross/Cross";
import Diamond from "./Diamond/Diamond";
import Heart from "./Heart/Heart";
import Hexagon from "./Hexagon/Hexagon";
import Octagon from "./Octagon/Octagon";
import Pentagon from "./Pentagon/Pentagon";
import Square from "./Square/Square";
import Star from "./Star/Star";
import Triangle from "./Triangle/Triangle";

const ShapeSVG: React.FC<{ shape: string }> = ({ shape }) => {
  switch (shape) {
    case "arrow":
      return (
        <svg width='100' height='100'>
          <Arrow />
        </svg>
      );
    case "circle":
      return (
        <svg width='100' height='100'>
          <Circle />
        </svg>
      );
    case "crescent":
      return (
        <svg width='100' height='100'>
          <Cresecent />
        </svg>
      );
    case "cross":
      return (
        <svg width='100' height='100'>
          <Cross />
        </svg>
      );
    case "diamond":
      return (
        <svg width='100' height='100'>
          <Diamond />
        </svg>
      );
    case "heart":
      return (
        <svg width='100' height='100'>
          <Heart />
        </svg>
      );
    case "hexagon":
      return (
        <svg width='100' height='100'>
          <Hexagon />
        </svg>
      );
    case "octagon":
      return (
        <svg width='100' height='100'>
          <Octagon />
        </svg>
      );
    case "pentagon":
      return (
        <svg width='100' height='100'>
          <Pentagon />
        </svg>
      );
    case "square":
      return (
        <svg width='100' height='100'>
          <Square />
        </svg>
      );
    case "star":
      return (
        <svg width='100' height='100'>
          <Star />
        </svg>
      );
    case "triangle":
      return (
        <svg width='100' height='100'>
          <Triangle />
        </svg>
      );

    default:
      return null;
  }
};

export default ShapeSVG;
