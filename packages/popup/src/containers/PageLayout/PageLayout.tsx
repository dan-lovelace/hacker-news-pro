import { ReactNode, useEffect, useMemo, useState } from "react";

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
import { useNavigate } from "react-router-dom";

import OptionsMenu from "../../components/OptionsMenu";
import { useAppContext } from "../../contexts/app";
import { themeComponents } from "../../lib/muiTheme";
import { basename, ROUTES } from "../../lib/routes";

export default function PageLayout({ children }: { children: ReactNode }) {
  const [popoutError, setPopoutError] = useState<boolean>(false);
  const { popout, setPopout } = useAppContext();
  const prefersDarkMode = useMediaQuery("(prefers-color-scheme: dark)");
  const navigate = useNavigate();
  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode: prefersDarkMode ? "dark" : "light",
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
    navigate(ROUTES.HOME.path);
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
            <OptionsMenu />
          </Stack>
        </Box>
      </Stack>
      {children}
    </ThemeProvider>
  );
}
