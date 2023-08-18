import { useEffect } from "react";

import { getStoredTheme } from "@hnp/core";
import { BrowserRouter, Route, Routes, useNavigate } from "react-router-dom";

import PageLayout from "./containers/PageLayout/PageLayout";
import { AppProvider } from "./contexts/app";
import { ROUTES } from "./lib/routes";

function AppContent() {
  const navigate = useNavigate();

  useEffect(() => {
    async function init() {
      const currentTheme = await getStoredTheme();

      if (currentTheme && currentTheme.type === "custom") {
        // current theme exists, show editor
        navigate(ROUTES.EDITOR.path);
      } else {
        navigate(ROUTES.THEME.path);
      }
    }

    init();
  }, []);

  return (
    <PageLayout>
      <Routes>
        <Route path={ROUTES.HOME.path} element={ROUTES.HOME.element} />
        <Route path={ROUTES.EDITOR.path} element={ROUTES.EDITOR.element} />
        <Route path={ROUTES.THEME.path} element={ROUTES.THEME.element} />
      </Routes>
    </PageLayout>
  );
}

function App() {
  return (
    <AppProvider>
      <BrowserRouter basename="popup.html">
        <AppContent />
      </BrowserRouter>
    </AppProvider>
  );
}

export default App;
