import * as React from "react";
import SvgIcon from "@mui/material/SvgIcon";
import Box from "@mui/material/Box";

type IconPaths = {
  default: JSX.Element;
};

const icons: Record<string, IconPaths> = {
  Zelle: {
    default: (
      <>
        <path d='M0 0h24v24H0z' fill='none' />
        <path
          d='M12 2l2 4h4l-3 2.1L16 12l-4-1.5L8 12l1-3.9L5 6h4z'
          fill='currentColor'
        />
      </>
    ),
  },
  Stripe: {
    default: (
      <>
        <path d='M0 0h24v24H0z' fill='none' />
        <path
          d='M4 3h16a1 1 0 011 1v16a1 1 0 01-1 1H4a1 1 0 01-1-1V4a1 1 0 011-1zm0 2v14h16V5H4zm2 3h4v4H6V8zm6 0h4v4h-4V8z'
          fill='currentColor'
        />
      </>
    ),
  },
  Venmo: {
    default: (
      <>
        <path d='M0 0h24v24H0z' fill='none' />
        <path
          d='M12 2C6.48 2 2 6.48 2 12c0 5.52 4.48 10 10 10s10-4.48 10-10S17.52 2 12 2zm4.88 14.29l-1.42 1.42c-.39.39-1.02.39-1.41 0l-1.42-1.42a.996.996 0 010-1.41l1.42-1.42c.39-.39 1.02-.39 1.41 0l1.42 1.42c.39.39.39 1.02 0 1.41zM10.12 9.71l1.42-1.42c.39-.39 1.02-.39 1.41 0l1.42 1.42c.39.39.39 1.02 0 1.41l-1.42 1.42c-.39.39-1.02.39-1.41 0l-1.42-1.42c-.39-.39-.39-1.02 0-1.41z'
          fill='currentColor'
        />
      </>
    ),
  },
  CashApp: {
    default: (
      <>
        <path d='M0 0h24v24H0z' fill='none' />
        <path
          d='M7 2c-2.21 0-4 1.79-4 4v12c0 2.21 1.79 4 4 4h10c2.21 0 4-1.79 4-4V6c0-2.21-1.79-4-4-4H7zm2 3h6c.55 0 1 .45 1 1v3c0 .55-.45 1-1 1H9c-.55 0-1-.45-1-1V6c0-.55.45-1 1-1zm6 12H9c-.55 0-1-.45-1-1v-3c0-.55.45-1 1-1h6c.55 0 1 .45 1 1v3c0 .55-.45 1-1 1z'
          fill='currentColor'
        />
      </>
    ),
  },
};

const PayLogo: React.FC = () => {
  return (
    <Box style={{ display: "flex", gap: "16px", justifyContent: "center" }}>
      {Object.entries(icons).map(([name, { default: paths }]) => (
        <SvgIcon key={name} component='svg'>
          {paths}
        </SvgIcon>
      ))}
    </Box>
  );
};

export default PayLogo;
