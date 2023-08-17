import {
  HNP_HTML_ELEMENT_CLASS_NAME,
  HNP_ROOT_ELEMENT_ID,
  HNP_STYLE_ELEMENT_ID,
  getCurrentTheme,
} from "@hnp/core";
import ReactDOM from "react-dom/client";

import App from "./App";
import { getConfig } from "./lib/config";
import "./main.scss";

async function main() {
  const config = getConfig();

  // return if current page is unsupported
  if (!config.view) return;

  const { documentElement } = document;
  const currentTheme = await getCurrentTheme(config);

  if (currentTheme) {
    documentElement.classList.add(HNP_HTML_ELEMENT_CLASS_NAME);
  }

  // create style element
  const style = document.createElement("style");
  style.id = HNP_STYLE_ELEMENT_ID;
  documentElement.appendChild(style);

  // create root element
  const root = document.createElement("div");
  root.id = HNP_ROOT_ELEMENT_ID;
  documentElement.appendChild(root);

  ReactDOM.createRoot(root).render(<App config={config} />);
}

main();
