declare module "@mui/system" {
  interface BreakpointOverrides {
    // Your custom breakpoints
    laptop: true;
    tablet: true;
    mobile: true;
    desktop: true;
    // Remove default breakpoints
    xs: false;
    sm: false;
    md: false;
    lg: false;
    xl: false;
  }
}
import { Theme } from "@mui/material/styles";

declare module "@mui/material/styles" {
  interface Theme {
    applyStyles: (styles: object) => object;
  }
  interface ThemeOptions {
    applyStyles?: (styles: object) => object;
  }
}

const theme = createTheme({
  applyStyles: (styles) => ({ ...styles }),
});
