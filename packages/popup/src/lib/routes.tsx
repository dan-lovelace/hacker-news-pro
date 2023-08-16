import { RouteObject } from "react-router-dom";

import EditorPage from "../containers/EditorPage";
import ThemePage from "../containers/ThemePage";

type Route = RouteObject & {
  path: string;
};

export const ROUTES: { [key: string]: Route } = {
  HOME: {
    path: "/",
    element: false,
  },
  EDITOR: {
    path: "/editor",
    element: <EditorPage />,
  },
  THEME: {
    path: "/theme",
    element: <ThemePage />,
  },
};
