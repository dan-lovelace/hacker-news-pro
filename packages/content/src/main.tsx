import {
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

import "./main.scss";

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

  if (currentTheme) {
    documentElement.classList.add(HNP_HTML_ELEMENT_CLASS_NAME);
  }

  await waitForElement("head"); // wait resolves race condition
  const style = document.createElement("style");
  style.id = HNP_STYLE_ELEMENT_ID;
  document.head.appendChild(style);

  await waitForElement("body");
  const root = document.createElement("div");
  root.id = HNP_ROOT_ELEMENT_ID;
  document.body.appendChild(root);

  await initializeWebComponents();

  ReactDOM.createRoot(root).render(<App config={config} />);
})();
