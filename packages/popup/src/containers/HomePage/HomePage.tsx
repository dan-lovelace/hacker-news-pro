import { ChangeEvent, FormEvent, MouseEvent, useEffect, useState } from "react";

import {
  fetchThemeData,
  parseThemeExport,
  premadeThemes,
  storageGetByKey,
  storageSetByKeys,
} from "@hnp/core";
import { TTheme } from "@hnp/types";
import AddIcon from "@mui/icons-material/Add";
import FileUploadIcon from "@mui/icons-material/FileUpload";
import PowerSettingsNewIcon from "@mui/icons-material/PowerSettingsNew";
import {
  Alert,
  AlertTitle,
  Box,
  Button,
  Divider,
  IconButton,
  Link,
  List,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { kebabCase } from "lodash";

import ThemeItem from "./ThemeItem";
import { useAppContext } from "../../contexts/app";
import { useToastContext } from "../../contexts/toast";
import { PAGE_CONTENT_WIDTH } from "../../lib/vars";

export default function HomePage() {
  const [creating, setCreating] = useState<boolean>(false);
  const [creatingName, setCreatingName] = useState<string>("");
  const [currentTheme, setCurrentTheme] = useState<TTheme>();
  const [customThemes, setCustomThemes] = useState<TTheme[]>([]);
  const [initialized, setInitialized] = useState<boolean>(false);
  const { notify } = useToastContext();
  const {
    options: { themesEnabled },
    handleOptionChange,
  } = useAppContext();

  useEffect(() => {
    async function init() {
      const { currentTheme, customThemes } = await fetchThemeData();

      if (currentTheme) {
        setCurrentTheme(currentTheme);
      }

      if (customThemes) {
        setCustomThemes(customThemes);
      }

      setInitialized(true);
    }

    init();
  }, []);

  const handleClone = async (id: string) => {
    const { customThemes: storedCustomThemes } = await fetchThemeData();
    const themeData =
      storedCustomThemes?.find((theme) => theme.id === id) ||
      premadeThemes.find((theme) => theme.id === id);

    if (!themeData) {
      return notify("Error cloning theme");
    }

    const { label: originalLabel } = themeData;
    const COPY_SUFFIX = "Copy";
    let newLabel = `${originalLabel}${
      themeData.type === "premade" || !originalLabel.endsWith(COPY_SUFFIX)
        ? ` ${COPY_SUFFIX}`
        : ""
    }`;
    let newId = kebabCase(newLabel);
    let copyCount = 0;

    while (storedCustomThemes?.some((theme) => theme.id === newId)) {
      newLabel = `${
        originalLabel.endsWith(COPY_SUFFIX)
          ? originalLabel
          : `${originalLabel} ${COPY_SUFFIX}`
      } ${copyCount > 0 ? ` (${copyCount})` : ""}`;
      newId = kebabCase(newLabel);
      copyCount++;
    }

    const newTheme: TTheme = {
      ...themeData,
      id: newId,
      label: newLabel,
      type: "custom",
    };
    const newCustomThemes = [newTheme, ...(storedCustomThemes || [])];

    setCustomThemes(newCustomThemes);
    storageSetByKeys({
      CUSTOM_THEMES: newCustomThemes,
    });
  };

  const handleCreate = async (
    event: MouseEvent<HTMLButtonElement> | FormEvent<HTMLFormElement>,
  ) => {
    event.preventDefault();
    const trimmed = creatingName.trim();

    if (!trimmed) {
      notify("Name is required", { severity: "warning" });
      return;
    }

    const id = kebabCase(trimmed);
    const newTheme: TTheme = {
      id,
      inputs: {
        components: [],
        style: {
          options: {
            darkMode: false,
          },
          stylesheets: [
            {
              id: "index",
              template: "",
              type: "css",
            },
          ],
        },
        views: {},
      },
      label: trimmed,
      options: {
        disableHNStyle: true,
      },
      type: "custom",
      version: "1.0.0",
    };

    let existingThemes: TTheme[] = [];
    const themes = await storageGetByKey("CUSTOM_THEMES");

    if (themes) {
      existingThemes = themes;
    }

    if (existingThemes.some((t: TTheme) => t.id === id)) {
      notify(`A theme with the name '${trimmed}' already exists`, {
        severity: "warning",
      });
      return;
    }

    const newThemes = [newTheme, ...existingThemes];

    storageSetByKeys({
      CUSTOM_THEMES: newThemes,
      SELECTED_THEME_ID: newTheme.id,
    });
    setCurrentTheme(newTheme);
    setCustomThemes(newThemes);
    handleEndCreate();
  };

  const handleCreateClick = () => {
    setCreating(true);
  };

  const handleCreatingNameChange = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setCreatingName(event.target.value);
  };

  const handleEndCreate = () => {
    setCreating(false);
    setCreatingName("");
  };

  const handleImport = (event: ChangeEvent<HTMLInputElement>) => {
    const {
      target: { files },
    } = event;
    if (!files || files.length !== 1) {
      return;
    }

    const [file] = files;
    const fileReader = new FileReader();

    fileReader.onloadend = async () => {
      const { result } = fileReader;

      try {
        const themeExport = parseThemeExport(JSON.parse(String(result)));
        const { customThemes } = await fetchThemeData();

        if (customThemes?.some((t) => t.id.trim() === themeExport.id.trim())) {
          throw new Error(
            `A theme with the name '${themeExport.label}' already exists`,
          );
        }

        const newCustomThemes = [themeExport, ...(customThemes || [])];

        setCreating(false);
        setCustomThemes(newCustomThemes);
        storageSetByKeys({
          CUSTOM_THEMES: newCustomThemes,
        });
      } catch (err) {
        notify(String(err) || "Error importing theme");
      }
    };

    fileReader.readAsText(file);
    event.target.value = ""; // clear value to allow uploading same file more than once
  };

  const handleThemesEnabledClick = async () => {
    handleOptionChange("themesEnabled", !themesEnabled);
  };

  return (
    <>
      {initialized && (
        <Stack className="home-page">
          <Stack direction="row" spacing={1} sx={{ alignItems: "center" }}>
            <IconButton
              aria-label={`themes ${themesEnabled ? "enabled" : "disabled"}`}
              title={`Turn themes ${themesEnabled ? "off" : "on"}`}
              onClick={handleThemesEnabledClick}
              sx={{ color: themesEnabled ? "success.main" : "error.main" }}
            >
              <PowerSettingsNewIcon />
            </IconButton>
            <Typography variant="h6">Themes</Typography>
          </Stack>
          <Box sx={{ width: PAGE_CONTENT_WIDTH }}>
            <Typography variant="caption">Custom</Typography>
            <List>
              {customThemes.length > 0 ? (
                customThemes.map((theme) => (
                  <ThemeItem
                    key={theme.id}
                    editable
                    customThemes={customThemes}
                    selected={currentTheme?.id === theme.id}
                    themeData={theme}
                    handleClone={handleClone}
                    setCurrentTheme={setCurrentTheme}
                    setCustomThemes={setCustomThemes}
                  />
                ))
              ) : (
                <Alert severity="info" variant="outlined">
                  <AlertTitle>No custom themes</AlertTitle>
                  Ready to dive into theming? If this is your first time, we
                  recommend cloning a premade theme to get started. You may also
                  start from scratch or import someone else's. Refer to the{" "}
                  <Link
                    href="https://github.com/dan-lovelace/hacker-news-pro#template-reference"
                    target="_blank"
                  >
                    theme reference documentation
                  </Link>{" "}
                  for help.
                </Alert>
              )}
            </List>
            <Box>
              {creating ? (
                <form onSubmit={handleCreate}>
                  <Stack
                    direction="row"
                    spacing={1}
                    sx={{ alignItems: "center", width: "100%" }}
                  >
                    <TextField
                      autoFocus
                      label="Name"
                      size="small"
                      value={creatingName}
                      onChange={handleCreatingNameChange}
                      required
                      sx={{ flex: "1 1 auto" }}
                    />
                    <Button
                      type="submit"
                      variant="contained"
                      onClick={handleCreate}
                    >
                      Create
                    </Button>
                    <Button onClick={handleEndCreate}>Cancel</Button>
                  </Stack>
                </form>
              ) : (
                <Stack direction="row" spacing={1}>
                  <Button
                    startIcon={<AddIcon />}
                    variant="contained"
                    onClick={handleCreateClick}
                  >
                    New theme
                  </Button>
                  <Button
                    component="label"
                    startIcon={<FileUploadIcon />}
                    variant="outlined"
                  >
                    Import
                    <input
                      accept=".json"
                      type="file"
                      hidden
                      onChange={handleImport}
                    />
                  </Button>
                </Stack>
              )}
            </Box>
            <Divider sx={{ mb: 1, mt: creating ? 1 : "11px" }} />
            <Typography variant="caption">Premade</Typography>
            <List>
              {premadeThemes.map((theme) => (
                <ThemeItem
                  key={theme.id}
                  selected={currentTheme?.id === theme.id}
                  themeData={theme}
                  handleClone={handleClone}
                  setCurrentTheme={setCurrentTheme}
                />
              ))}
            </List>
          </Box>
        </Stack>
      )}
    </>
  );
}
