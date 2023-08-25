import { useState } from "react";

import {
  browser,
  HNP_CONTENT_ELEMENT_ID,
  HNP_SANDBOX_ELEMENT_ID,
} from "@hnp/core";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import { CONTENT_ROUTES } from "./lib/routes";
import { handleSandboxLoad } from "./lib/sandbox";
import "./lib/windowListeners";

const router = createBrowserRouter(CONTENT_ROUTES);
const sandboxUrl = browser.runtime.getURL("sandbox.html");

export default function App() {
  const [initialized, setInitialized] = useState(false);

  return (
    <>
      {initialized && <RouterProvider router={router} />}
      <div id={HNP_CONTENT_ELEMENT_ID}></div>
      <iframe
        id={HNP_SANDBOX_ELEMENT_ID}
        src={sandboxUrl}
        onLoad={handleSandboxLoad({
          initialize: () => setInitialized(true),
        })}
      />
    </>
  );
}
