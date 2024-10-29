import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";

import App from "./App.tsx";
import Landing from "./pages/Landing.tsx";
import ErrorPage from "./pages/ErrorPage.tsx";
import DataTypes from "./pages/DataTypes.tsx";
import CSSSelectors from "./pages/CSSSelectors.tsx";
import DOMTraversal from "./pages/DOMTraversal.tsx";
import DOMTree from "./pages/DOMTree.tsx";
import { StrictMode } from "react";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <Landing />,
      },
      {
        path: "/datatypes",
        element: <DataTypes />,
      },
      {
        path: "/cssselectors",
        element: <CSSSelectors />,
      },
      {
        path: "/domtraversal",
        element: <DOMTraversal />,
      },
      {
        path: "/domtree",
        element: <DOMTree />,
      },
    ],
  },
]);

const rootElement = document.getElementById("root");
if (rootElement) {
  ReactDOM.createRoot(rootElement).render(
    <StrictMode>
      <RouterProvider router={router} />
    </StrictMode>
  );
}
