import {
  browser,
  getAssetURL,
  getCurrentTheme,
  HNP_BOOTSTRAP_CSS_ELEMENT_ID,
  HNP_BOOTSTRAP_JS_ELEMENT_ID,
  HNP_HTML_ELEMENT_CLASS_NAME,
  HNP_ROOT_ELEMENT_ID,
  HNP_STYLE_ELEMENT_ID,
  HNP_WEB_COMPONENTS_JS_ELEMENT_ID,
  storageGetByKey,
  storageSetByKeys,
  waitForElement,
} from "@hnp/core";
import ReactDOM from "react-dom/client";

import App from "./App";
import { getConfig } from "./lib/config";

import "./style/main.scss";

// connect to hot reload server in development mode
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

  // without blocking, expire scroll positions to avoid storage leak
  storageGetByKey("SCROLL_POSITIONS").then((scrollPositions) => {
    for (const position in scrollPositions) {
      const { expires } = scrollPositions[position];

      if (new Date().getTime() > expires) {
        delete scrollPositions[position];
      }
    }

    storageSetByKeys({ SCROLL_POSITIONS: scrollPositions });
  });

  const fontFace = new FontFace(
    "Material Icons",
    `url(${getAssetURL("fonts/material-icons.woff2")})`,
    {
      display: "block", // prevents flashing of unstyled text (aka FOUT)
      style: "normal",
      weight: "400",
    },
  );
  document.fonts.add(fontFace);

  await waitForElement("head"); // wait resolves race condition
  const webcomponentsJs = document.createElement("script");
  webcomponentsJs.id = HNP_WEB_COMPONENTS_JS_ELEMENT_ID;
  webcomponentsJs.src = getAssetURL("js/webcomponents.js");
  document.head.appendChild(webcomponentsJs);

  const bootstrapJs = document.createElement("script");
  bootstrapJs.id = HNP_BOOTSTRAP_JS_ELEMENT_ID;
  bootstrapJs.src = getAssetURL("js/bootstrap.bundle.min.js");
  document.head.appendChild(bootstrapJs);

  const bootstrapStyle = document.createElement("link");
  bootstrapStyle.id = HNP_BOOTSTRAP_CSS_ELEMENT_ID;
  bootstrapStyle.rel = "stylesheet";
  bootstrapStyle.type = "text/css";
  bootstrapStyle.href = getAssetURL("css/bootstrap.min.css");
  document.head.appendChild(bootstrapStyle);

  const hnpStyle = document.createElement("style");
  hnpStyle.id = HNP_STYLE_ELEMENT_ID;
  document.head.appendChild(hnpStyle);

  await waitForElement("body");
  const root = document.createElement("div");
  root.id = HNP_ROOT_ELEMENT_ID;
  document.body.appendChild(root);

  ReactDOM.createRoot(root).render(<App />);
})();
