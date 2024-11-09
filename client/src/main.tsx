import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { StrictMode } from "react";
import { Provider } from "react-redux";
import React from "react";

import App from "./App";
import Landing from "./pages/Landing";
import ErrorPage from "./pages/ErrorPage";
import DataTypes from "./pages/DataTypes";
import Login from "./pages/Login";
import CSSSelectors from "./pages/CSSSelectors";
import DOMTraversal from "./pages/DOMTraversal";
import DOMTree from "./pages/DOMTree";
import Signup from "./pages/Signup";
import store from "./store";
import "./index.css";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      { index: true, element: <Landing /> },
      { path: "/datatypes", element: <DataTypes /> },
      { path: "/cssselectors", element: <CSSSelectors /> },
      { path: "/domtraversal", element: <DOMTraversal /> },
      { path: "/domtree", element: <DOMTree /> },
      { path: "/login", element: <Login /> },
      { path: "/signup", element: <Signup /> },
    ],
  },
]);

const rootElement = document.getElementById("root");
if (rootElement) {
  ReactDOM.createRoot(rootElement).render(
    <StrictMode>
      <Provider store={store}>
        <RouterProvider router={router} />
      </Provider>
    </StrictMode>
  );
}
