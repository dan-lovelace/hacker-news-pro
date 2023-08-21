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
import {
  Alert,
  AlertTitle,
  Box,
  Button,
  Divider,
  List,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { kebabCase } from "lodash";

import ThemeItem from "./ThemeItem";
import BackButton from "../../components/BackButton/BackButton";
import { useToastContext } from "../../contexts/toast";

export default function ThemePage() {
  const [creating, setCreating] = useState<boolean>(false);
  const [currentTheme, setCurrentTheme] = useState<TTheme>();
  const [initialized, setInitialized] = useState<boolean>(false);
  const [customThemes, setCustomThemes] = useState<TTheme[]>([]);
  const [creatingName, setCreatingName] = useState<string>("");
  const { notify } = useToastContext();

  useEffect(() => {
    async function init() {
      const { currentTheme, customThemes } = await fetchThemeData();

      if (customThemes) {
        setCustomThemes(customThemes);
      }

      if (currentTheme) {
        setCurrentTheme(currentTheme);
      }

      setInitialized(true);
    }

    init();
  }, []);

  const handleCreate = async (
    event: MouseEvent<HTMLButtonElement> | FormEvent<HTMLFormElement>,
  ) => {
    event.preventDefault();
    const trimmed = creatingName.trim();

    if (!trimmed) {
      notify("Name is required");
      return;
    }

    const id = kebabCase(trimmed);
    const newTheme: TTheme = {
      id,
      inputs: {
        style: "",
        components: [],
        item: {
          template: "",
        },
        jobs: {
          template: "",
        },
        list: {
          template: "",
        },
        other: {
          template: "",
        },
        submit: {
          template: "",
        },
        user: {
          template: "",
        },
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
      notify("A theme with this name already exists");
      return;
    }

    const newThemes = [...existingThemes, newTheme];

    storageSetByKeys({
      CUSTOM_THEMES: newThemes,
    });
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

  const handleImport = ({
    target: { files },
  }: ChangeEvent<HTMLInputElement>) => {
    if (!files || files.length !== 1) {
      return notify("You must upload a file");
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
            `A theme with the name '${themeExport.id}' already exists`,
          );
        }

        const newCustomThemes = [...(customThemes || []), themeExport];

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
  };

  return (
    <>
      {initialized && (
        <Stack className="theme-page">
          <Stack direction="row" spacing={1}>
            <BackButton />
            <Box>
              <Typography variant="h6" sx={{ marginTop: 0.5 }}>
                Themes
              </Typography>
            </Box>
          </Stack>
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
                  setCurrentTheme={setCurrentTheme}
                  setCustomThemes={setCustomThemes}
                />
              ))
            ) : (
              <Alert severity="info">
                <AlertTitle>No custom themes</AlertTitle>
                You haven't created any themes yet. Click the button below to
                get started.
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
                  <Button
                    component="label"
                    startIcon={<FileUploadIcon />}
                    variant="outlined"
                  >
                    Import
                    <input
                      accept=".hnp"
                      type="file"
                      hidden
                      onChange={handleImport}
                    />
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
                setCurrentTheme={setCurrentTheme}
              />
            ))}
          </List>
        </Stack>
      )}
    </>
  );
}
