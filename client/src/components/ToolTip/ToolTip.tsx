// components/TooltipComponent/TooltipComponent.tsx
import React from "react";
import Tooltip from "@mui/material/Tooltip";
import Box from "@mui/material/Box";

interface TooltipComponentProps {
  title: string;
  children: React.ReactNode;
  sx?: React.CSSProperties; // Optional styling for the child wrapper
}

const TooltipComponent: React.FC<TooltipComponentProps> = ({
  title,
  children,
  sx,
}) => {
  return (
    <Tooltip title={title} arrow>
      <Box sx={{ cursor: "pointer", ...sx }}>{children}</Box>
    </Tooltip>
  );
};

export default TooltipComponent;
