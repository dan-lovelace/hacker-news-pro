import {
  browser,
  HNP_CONTENT_ELEMENT_ID,
  HNP_SANDBOX_ELEMENT_ID,
} from "@hnp/core";

import { handleSandboxLoad } from "./lib/sandbox";
import "./lib/windowListeners";

const sandboxUrl = browser.runtime.getURL("sandbox.html");

export default function App() {
  return (
    <>
      <div id={HNP_CONTENT_ELEMENT_ID}></div>
      <iframe
        id={HNP_SANDBOX_ELEMENT_ID}
        src={sandboxUrl}
        onLoad={handleSandboxLoad}
      />
    </>
  );
}
