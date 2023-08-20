import { ChangeEvent, FormEvent, MouseEvent, useEffect, useState } from "react";

import { premadeThemes, storageGetByKey, storageSetByKeys } from "@hnp/core";
import { TCurrentTheme, TTheme } from "@hnp/types";
import AddIcon from "@mui/icons-material/Add";
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
  const [currentTheme, setCurrentTheme] = useState<TCurrentTheme>();
  const [initialized, setInitialized] = useState<boolean>(false);
  const [customThemes, setCustomThemes] = useState<TTheme[]>([]);
  const [creatingName, setCreatingName] = useState<string>("");
  const { notify } = useToastContext();

  useEffect(() => {
    async function init() {
      const customThemes = await storageGetByKey("CUSTOM_THEMES");
      if (customThemes) {
        setCustomThemes(customThemes);
      }

      const currentTheme = await storageGetByKey("CURRENT_THEME");
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
      label: trimmed,
      inputs: {
        style: "",
        item: {
          partials: [
            {
              label: "Comments partial",
              name: "comments",
              template: "",
            },
          ],
          template: "",
        },
        jobs: {
          partials: [],
          template: "",
        },
        list: {
          partials: [],
          template: "",
        },
        other: {
          partials: [],
          template: "",
        },
        submit: {
          partials: [],
          template: "",
        },
        user: {
          partials: [],
          template: "",
        },
      },
      type: "custom",
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
                    autoComplete="off"
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
              <Button
                startIcon={<AddIcon />}
                variant="contained"
                onClick={handleCreateClick}
              >
                New theme
              </Button>
            )}
          </Box>
          <Divider sx={{ my: 1 }} />
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
