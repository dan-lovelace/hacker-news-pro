import { useEffect, useRef, useState } from "react";

import { fetchThemeData, storageSetByKeys } from "@hnp/core";
import { TSelectedThemeInputs, TStyleInput, TThemeInputs } from "@hnp/types";
import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline";
import SaveIcon from "@mui/icons-material/Save";
import {
  Box,
  Button,
  FormControlLabel,
  List,
  ListItemButton,
  Stack,
  Switch,
  Typography,
} from "@mui/material";

import { LEFT_COLUMN_WIDTH, getSaveShortcut, saveListener } from "..";
import { useToastContext } from "../../../contexts/toast";
import CodeEditor from "../../CodeEditor";
import ModifiedIndicator from "../ModifiedIndicator";

const defaultStyleInput: TStyleInput = {
  options: { darkMode: false },
  template: "",
};

export default function StyleInput() {
  const [initialized, setInitialized] = useState(false);
  const [savedThemeInputs, setSavedThemeInputs] = useState<TThemeInputs>();
  const [unsavedThemeInputs, setUnsavedThemeInputs] =
    useState<TSelectedThemeInputs>();
  const { notify } = useToastContext();

  const saveShortcut = getSaveShortcut();

  // state references to use when handling save by keyboard shortcut
  const inputValueRef = useRef<TStyleInput>();
  inputValueRef.current = unsavedThemeInputs?.style;

  useEffect(() => {
    async function init() {
      const { currentTheme, selectedThemeInputs: storedSelectedThemeInputs } =
        await fetchThemeData();

      if (!currentTheme) {
        return notify("Error loading custom theme template");
      }

      setSavedThemeInputs(currentTheme?.inputs);
      setUnsavedThemeInputs(storedSelectedThemeInputs);
      setInitialized(true);
    }

    init();

    // configure save hotkey
    const keyDownListener = (event: KeyboardEvent) => {
      saveListener(event, handleSave);
    };

    document.addEventListener("keydown", keyDownListener);

    return () => {
      document.removeEventListener("keydown", keyDownListener);
    };
  }, []);

  const handleDarkModeChange = async (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const newDarkMode = event.target.checked;
    const { customThemes, selectedCustomThemeIndex } = await fetchThemeData();
    const newStyleValue: TStyleInput = {
      ...defaultStyleInput,
      ...unsavedThemeInputs?.style,
    };

    newStyleValue.options.darkMode = newDarkMode;

    if (customThemes && selectedCustomThemeIndex > -1) {
      customThemes[selectedCustomThemeIndex].inputs.style = newStyleValue;
    }

    setSavedThemeInputs(customThemes?.[selectedCustomThemeIndex].inputs);
    setUnsavedThemeInputs(customThemes?.[selectedCustomThemeIndex].inputs);
    storageSetByKeys({ CUSTOM_THEMES: customThemes });
  };

  const handleDiscardChanges = () => {
    const newSelectedThemeInputs: TSelectedThemeInputs = {
      ...unsavedThemeInputs,
      style: {
        ...defaultStyleInput,
        ...unsavedThemeInputs?.style,
        template: savedThemeInputs?.style?.template ?? "",
      },
    };

    setUnsavedThemeInputs(newSelectedThemeInputs);
    storageSetByKeys({
      SELECTED_THEME_INPUTS: newSelectedThemeInputs,
    });
  };

  const handleSave = async () => {
    const { currentTheme, customThemes, selectedCustomThemeIndex } =
      await fetchThemeData();

    if (!currentTheme || !customThemes || !inputValueRef.current) {
      return notify(
        "Error saving. Missing one of: currentTheme, customThemes or inputValueRef.",
      );
    } else if (selectedCustomThemeIndex < 0) {
      return notify("Error locating custom theme");
    }

    currentTheme.inputs = {
      ...currentTheme.inputs,
      style: {
        ...currentTheme.inputs.style,
        template: inputValueRef.current?.template,
      },
    };
    customThemes[selectedCustomThemeIndex] = currentTheme;

    setSavedThemeInputs(currentTheme?.inputs);
    storageSetByKeys({ CUSTOM_THEMES: customThemes });
  };

  const handleTemplateChange = (newValue: string) => {
    const newUnsavedThemeInputs: TSelectedThemeInputs = {
      ...unsavedThemeInputs,
      style: {
        ...defaultStyleInput,
        ...unsavedThemeInputs?.style,
        template: newValue,
      },
    };

    setUnsavedThemeInputs(newUnsavedThemeInputs);
    storageSetByKeys({
      SELECTED_THEME_INPUTS: newUnsavedThemeInputs,
    });
  };

  return (
    <>
      {initialized && (
        <Stack
          className="style-input"
          direction="row"
          spacing={1}
          sx={{ height: "100%" }}
        >
          <List dense sx={{ width: LEFT_COLUMN_WIDTH }}>
            <Stack>
              <Typography variant="caption">Stylesheets</Typography>
              <Box sx={{ position: "relative", whiteSpace: "nowrap" }}>
                <ListItemButton sx={{ cursor: "default" }}>
                  index.css
                </ListItemButton>
                <ModifiedIndicator
                  modified={
                    unsavedThemeInputs?.style !== undefined &&
                    savedThemeInputs?.style.template !==
                      unsavedThemeInputs.style.template
                  }
                  sx={{ right: "1rem" }}
                />
              </Box>
            </Stack>
          </List>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              flex: "1 1 auto",
            }}
          >
            <FormControlLabel
              control={
                <Switch
                  checked={!!savedThemeInputs?.style?.options.darkMode}
                  onChange={handleDarkModeChange}
                />
              }
              label="Dark mode"
              sx={{
                alignSelf: "start",
              }}
            />
            <CodeEditor
              language="css"
              value={unsavedThemeInputs?.style?.template ?? ""}
              handleChange={handleTemplateChange}
              handleSave={handleSave}
            />
            <Stack direction="row" spacing={1} sx={{ justifyContent: "end" }}>
              <Button
                color="warning"
                disabled={
                  !unsavedThemeInputs?.style ||
                  savedThemeInputs?.style.template ===
                    unsavedThemeInputs?.style.template
                }
                startIcon={<RemoveCircleOutlineIcon />}
                variant="text"
                onClick={handleDiscardChanges}
              >
                Discard changes
              </Button>
              <Button
                startIcon={<SaveIcon />}
                variant="contained"
                onClick={handleSave}
              >
                Save ({saveShortcut})
              </Button>
            </Stack>
          </Box>
        </Stack>
      )}
    </>
  );
}
