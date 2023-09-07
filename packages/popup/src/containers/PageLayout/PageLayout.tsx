import { ReactNode, useEffect, useMemo, useState } from "react";

import { getAssetURL } from "@hnp/core";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";
import {
  Alert,
  AlertTitle,
  Box,
  createTheme,
  CssBaseline,
  IconButton,
  Stack,
  ThemeProvider,
  useMediaQuery,
} from "@mui/material";

import NavMenu from "../../components/NavMenu/NavMenu";
import { useAppContext } from "../../contexts/app";
import { themeComponents } from "../../lib/muiTheme";
import { basename } from "../../lib/routes";

export default function PageLayout({ children }: { children: ReactNode }) {
  const [popoutError, setPopoutError] = useState<boolean>(false);
  const { popout, setPopout } = useAppContext();
  const prefersDarkMode = useMediaQuery("(prefers-color-scheme: dark)");
  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode: prefersDarkMode ? "dark" : "light",
          ...(prefersDarkMode
            ? {
                primary: {
                  main: "#A8DADC",
                },
              }
            : {
                primary: {
                  main: "#457B9D",
                },
              }),
        },
        components: themeComponents,
      }),
    [prefersDarkMode],
  );

  useEffect(() => {
    function init() {
      setPopout(
        new URLSearchParams(window.location.search).get("expanded") === "true",
      );
    }

    init();
  }, []);

  const handlePopout = () => {
    const open = window.open(
      `${basename}?expanded=true`,
      "popup",
      "popup=true,width=800,height=700",
    );

    if (!open) return setPopoutError(true);

    window.close();
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Stack className="page-layout">
        {popoutError && (
          <Alert
            severity="error"
            onClose={() => setPopoutError(false)}
            sx={{ mb: 1 }}
          >
            <AlertTitle>Pop out error</AlertTitle>
            Please disable popup blockers for this page.
          </Alert>
        )}
        <Box sx={{ position: "relative" }}>
          <Stack
            direction="row"
            spacing={1}
            sx={{ position: "absolute", right: 0, zIndex: "mobileStepper" }}
          >
            <a href="https://news.ycombinator.com" target="_blank">
              <IconButton
                aria-label="open hacker news"
                title="Open Hacker News"
                sx={{ height: 40, width: 40 }}
              >
                <img
                  src={getAssetURL("/img/content/images/hnLogo.svg")}
                  style={{
                    height: 20,
                    width: 20,
                    borderRadius: 2,
                  }}
                />
              </IconButton>
            </a>
            {!popout && (
              <Box>
                <IconButton
                  aria-label="pop out"
                  title="Pop out"
                  onClick={handlePopout}
                >
                  <OpenInNewIcon />
                </IconButton>
              </Box>
            )}
            <NavMenu />
          </Stack>
        </Box>
      </Stack>
      {children}
    </ThemeProvider>
  );
}
