import { Navigate, RouteObject, createBrowserRouter } from "react-router-dom";

import App from "../App";
import EditorPage from "../containers/EditorPage";
import HomePage from "../containers/HomePage";
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
          path: ROUTES.SUPPORT.path,
          element: <SupportPage />,
        },
      ],
    },
    {
      path: "*",
      element: <Navigate to={ROUTES.HOME.path} replace />,
    },
  ],
  {
    basename,
  },
);
