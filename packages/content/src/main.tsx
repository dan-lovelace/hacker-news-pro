import {
  HNP_BOOTSTRAP_ELEMENT_ID,
  HNP_HTML_ELEMENT_CLASS_NAME,
  HNP_ROOT_ELEMENT_ID,
  HNP_STYLE_ELEMENT_ID,
  browser,
  getCurrentTheme,
  waitForElement,
} from "@hnp/core";
import ReactDOM from "react-dom/client";

import App from "./App";
import { getConfig } from "./lib/config";
import { initializeWebComponents } from "./web-components";

import "./style/main.scss";

const bootstrapSrc = browser.runtime.getURL("css/vendor/bootstrap.min.css");

if (process.env.NODE_ENV === "development") {
  const ws = new WebSocket(`ws://localhost:9012`);

  ws.addEventListener("message", (event) => {
    if (event.data === "file-change") {
      browser.runtime.sendMessage("reload");
    }
  });
}

(async function () {
  const config = getConfig();
  const { documentElement } = document;
  const currentTheme = await getCurrentTheme(config);

  if (currentTheme && currentTheme.inputs.views[config.view]?.template) {
    documentElement.classList.add(HNP_HTML_ELEMENT_CLASS_NAME);
  }

  await waitForElement("head"); // wait resolves race condition
  const bootstrapStyle = document.createElement("link");
  bootstrapStyle.id = HNP_BOOTSTRAP_ELEMENT_ID;
  bootstrapStyle.rel = "stylesheet";
  bootstrapStyle.type = "text/css";
  bootstrapStyle.href = bootstrapSrc;
  document.head.appendChild(bootstrapStyle);

  const hnpStyle = document.createElement("style");
  hnpStyle.id = HNP_STYLE_ELEMENT_ID;
  document.head.appendChild(hnpStyle);

  await waitForElement("body");
  const root = document.createElement("div");
  root.id = HNP_ROOT_ELEMENT_ID;
  document.body.appendChild(root);

  await initializeWebComponents();

  ReactDOM.createRoot(root).render(<App />);
})();
