import { useEffect } from "react";

import { storageGetByKey, storageSetByKeys } from "@hnp/core";
import { Outlet, useLocation, useNavigate } from "react-router-dom";

import PageLayout from "./containers/PageLayout/PageLayout";
import { AppProvider } from "./contexts/app";
import { ROUTES, initialRedirectState } from "./lib/routes";

export default function App() {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    async function init() {
      const currentPage = await storageGetByKey("CURRENT_PAGE");

      navigate(currentPage ?? ROUTES.HOME.path, {
        state: initialRedirectState,
      });
    }

    init();
  }, []);

  useEffect(() => {
    // keep track of current page, ignore default index load
    if (location.key !== "default") {
      storageSetByKeys({
        CURRENT_PAGE: location.pathname,
      });
    }
  }, [location.pathname]);

  return (
    <AppProvider>
      <PageLayout>
        <Outlet />
      </PageLayout>
    </AppProvider>
  );
}
