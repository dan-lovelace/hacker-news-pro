import { RouteObject, createBrowserRouter } from "react-router-dom";

import App from "../App";
import EditorPage from "../containers/EditorPage";
import HomePage from "../containers/HomePage";
import OptionsPage from "../containers/OptionsPage/OptionsPage";
import SupportPage from "../containers/SupportPage/SupportPage";

type Route = RouteObject & {
  path: string;
};

export const basename = "/popup.html";
export const initialRedirectState = "initial-redirect";

export const ROUTES: { [key: string]: Route } = Object.freeze({
  EDITOR: {
    path: "/editor",
  },
  HOME: {
    path: "/",
  },
  OPTIONS: {
    path: "/options",
  },
  SUPPORT: {
    path: "/support",
  },
});

export const router = createBrowserRouter(
  [
    {
      path: ROUTES.HOME.path,
      element: <App />,
      children: [
        {
          path: ROUTES.EDITOR.path,
          element: <EditorPage />,
        },
        {
          path: ROUTES.HOME.path,
          element: <HomePage />,
        },
        {
          path: ROUTES.OPTIONS.path,
          element: <OptionsPage />,
        },
        {
          path: ROUTES.SUPPORT.path,
          element: <SupportPage />,
        },
      ],
    },
  ],
  {
    basename,
  },
);
