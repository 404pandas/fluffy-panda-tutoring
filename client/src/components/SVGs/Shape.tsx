import React from "react";
import Arrow from "./Arrow/Arrow";
import Circle from "./Circle/Circle";
import Crescent from "./Crescent/Crescent";
import Cross from "./Cross/Cross";
import Diamond from "./Diamond/Diamond";
import Heart from "./Heart/Heart";
import Hexagon from "./Hexagon/Hexagon";
import Octagon from "./Octagon/Octagon";
import Pentagon from "./Pentagon/Pentagon";
import Square from "./Square/Square";
import Star from "./Star/Star";
import Triangle from "./Triangle/Triangle";

const ShapeSVG: React.FC<{
  shape: string;
  color: string;
  sx?: React.CSSProperties;
}> = ({ shape, color, sx }) => {
  const style: React.CSSProperties = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    zIndex: 1,
    ...sx, // Merge any additional styles passed through `sx`
  };

  return (
    <svg
      width='100%'
      height='100%'
      viewBox='0 0 100 100' // Ensures the content scales properly
      preserveAspectRatio='xMidYMid meet' // Ensures the content scales proportionally
      style={style}
    >
      {(() => {
        switch (shape) {
          case "arrow":
            return <Arrow color={color} />;
          case "circle":
            return <Circle color={color} />;
          case "crescent":
            return <Crescent color={color} />;
          case "cross":
            return <Cross color={color} />;
          case "diamond":
            return <Diamond color={color} />;
          case "heart":
            return <Heart color={color} />;
          case "hexagon":
            return <Hexagon color={color} />;
          case "octagon":
            return <Octagon color={color} />;
          case "pentagon":
            return <Pentagon color={color} />;
          case "square":
            return <Square color={color} />;
          case "star":
            return <Star color={color} />;
          case "triangle":
            return <Triangle color={color} />;
          default:
            return null;
        }
      })()}
    </svg>
  );
};

export default ShapeSVG;
