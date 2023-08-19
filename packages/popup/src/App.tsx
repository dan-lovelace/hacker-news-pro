import { useEffect } from "react";

import { storageGetByKey } from "@hnp/core";
import { Outlet, useNavigate } from "react-router-dom";

import PageLayout from "./containers/PageLayout/PageLayout";
import { AppProvider } from "./contexts/app";
import { ROUTES } from "./lib/routes";

export default function App() {
  const navigate = useNavigate();

  useEffect(() => {
    async function init() {
      const currentTheme = await storageGetByKey("CURRENT_THEME");

      if (currentTheme && currentTheme.type === "custom") {
        // default to editor page when the current theme is custom
        navigate(ROUTES.EDITOR.path);
      } else {
        navigate(ROUTES.THEME.path);
      }
    }

    init();
  }, []);

  return (
    <AppProvider>
      <PageLayout>
        <Outlet />
      </PageLayout>
    </AppProvider>
  );
}
