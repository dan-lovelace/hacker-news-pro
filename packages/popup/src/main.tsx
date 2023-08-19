import React from "react";

import ReactDOM from "react-dom/client";
import { RouterProvider } from "react-router-dom";

import "./index.scss";
import { router } from "./lib/routes";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
);
