import { RouteObject, createBrowserRouter } from "react-router-dom";

import App from "../App";
import EditorPage from "../containers/EditorPage";
import HomePage from "../containers/HomePage";

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
      ],
    },
  ],
  {
    basename,
  },
);
