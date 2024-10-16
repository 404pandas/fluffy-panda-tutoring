// src/App.tsx
import React from "react";
import Nav from "./components/Nav/Nav";
import Footer from "./components/Footer/Footer";
import { Outlet } from "react-router-dom";
import { useLocation } from "react-router-dom";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import "./App.css";

const App: React.FC = () => {
  const currentPage = useLocation().pathname;

  return (
    <div>
      <CssBaseline />

      <Nav currentPage={currentPage} />
      <Box
        component='section'
        sx={{ p: 2, border: "1px dashed grey" }}
        id='page-content'
      >
        <main>
          <Outlet />
        </main>
      </Box>
      <Footer />
    </div>
  );
};

export default App;
