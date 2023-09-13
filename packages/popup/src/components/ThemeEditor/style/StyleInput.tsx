import { useEffect, useMemo, useRef, useState } from "react";

import {
  fetchStylesheetsData,
  fetchThemeData,
  storageSetByKeys,
} from "@hnp/core";
import {
  TSelectedThemeInputs,
  TStyleInput,
  TStylesheet,
  TThemeInputs,
} from "@hnp/types";
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
  stylesheets: [
    {
      id: "index",
      template: "",
      type: "css",
    },
  ],
};

const saveShortcut = getSaveShortcut();

function getIsModified(
  stylesheetId?: string,
  savedInputs?: TThemeInputs,
  unsavedInputs?: TSelectedThemeInputs,
) {
  const savedTemplate =
    savedInputs?.style.stylesheets.find((s) => s.id === stylesheetId)
      ?.template ?? "";
  const unsavedTemplate =
    unsavedInputs?.style?.stylesheets.find((s) => s.id === stylesheetId)
      ?.template ?? "";

  return savedTemplate !== unsavedTemplate;
}

export default function StyleInput() {
  const [initialized, setInitialized] = useState(false);
  const [selectedStylesheet, setSelectedStylesheet] = useState<TStylesheet>();
  const [savedThemeInputs, setSavedThemeInputs] = useState<TThemeInputs>();
  const [unsavedThemeInputs, setUnsavedThemeInputs] =
    useState<TSelectedThemeInputs>();
  const { notify } = useToastContext();
  const canDiscard = useMemo(
    () =>
      getIsModified(
        selectedStylesheet?.id,
        savedThemeInputs,
        unsavedThemeInputs,
      ),
    [savedThemeInputs, selectedStylesheet, unsavedThemeInputs],
  );

  const codeEditorValue =
    unsavedThemeInputs?.style?.stylesheets.find(
      (c) => c.id === selectedStylesheet?.id,
    )?.template ??
    savedThemeInputs?.style?.stylesheets.find(
      (c) => c.id === selectedStylesheet?.id,
    )?.template ??
    "";

  // state references to use when handling save by keyboard shortcut
  const inputValueRef = useRef<TStyleInput>();
  inputValueRef.current = unsavedThemeInputs?.style;
  const savedThemeInputsRef = useRef<TThemeInputs>();
  savedThemeInputsRef.current = savedThemeInputs;
  const selectedStylesheetRef = useRef<TStylesheet>();
  selectedStylesheetRef.current = selectedStylesheet;

  useEffect(() => {
    async function init() {
      const { selectedStylesheet: storedSelectedStylesheet } =
        await fetchStylesheetsData();
      const { currentTheme, selectedThemeInputs: storedSelectedThemeInputs } =
        await fetchThemeData();

      if (!currentTheme) {
        return notify("Error loading current theme");
      }

      setSavedThemeInputs(currentTheme?.inputs);
      setUnsavedThemeInputs(storedSelectedThemeInputs);
      setSelectedStylesheet(storedSelectedStylesheet);
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

    if (!savedThemeInputs) {
      return notify("Error updating options");
    }

    const { customThemes, selectedCustomThemeIndex } = await fetchThemeData();

    const newSavedThemeInputs = { ...savedThemeInputs };
    newSavedThemeInputs.style.options.darkMode = newDarkMode;

    if (customThemes && selectedCustomThemeIndex > -1) {
      customThemes[selectedCustomThemeIndex].inputs = newSavedThemeInputs;
    }

    setSavedThemeInputs(newSavedThemeInputs);

    const newUnsavedThemeInputs: TSelectedThemeInputs = {
      ...unsavedThemeInputs,
      style: {
        ...defaultStyleInput,
        ...unsavedThemeInputs?.style,
        options: {
          ...unsavedThemeInputs?.style?.options,
          darkMode: newDarkMode,
        },
      },
    };

    setUnsavedThemeInputs(newUnsavedThemeInputs);
    storageSetByKeys({
      CUSTOM_THEMES: customThemes,
      SELECTED_THEME_INPUTS: newUnsavedThemeInputs,
    });
  };

  const handleDiscardChanges = () => {
    const newStylesheets = [...(unsavedThemeInputs?.style?.stylesheets || [])];
    const stylesheetIdx = newStylesheets.findIndex(
      (c) => c.id === selectedStylesheet?.id,
    );

    if (stylesheetIdx < 0) return notify("Error locating stylsheet");

    const originalStylesheet = savedThemeInputs?.style.stylesheets.find(
      (c) => c.id === selectedStylesheet?.id,
    );

    if (!originalStylesheet) return notify("Error locating original stylsheet");

    newStylesheets[stylesheetIdx].template = originalStylesheet.template;

    const newSelectedThemeInputs: TSelectedThemeInputs = {
      ...unsavedThemeInputs,
      style: {
        ...defaultStyleInput,
        ...unsavedThemeInputs?.style,
        stylesheets: newStylesheets,
      },
    };

    setUnsavedThemeInputs(newSelectedThemeInputs);
    storageSetByKeys({
      SELECTED_THEME_INPUTS: newSelectedThemeInputs,
    });
  };

  const handleSave = async () => {
    const saveIdx =
      savedThemeInputsRef.current?.style.stylesheets.findIndex(
        (c) => c.id === selectedStylesheetRef.current?.id,
      ) ?? -1;

    if (
      !savedThemeInputsRef.current ||
      !selectedStylesheetRef.current ||
      saveIdx < 0
    ) {
      return notify("Error saving template");
    }

    const newStylesheets = [
      ...(savedThemeInputsRef.current.style.stylesheets || []),
    ];
    newStylesheets[saveIdx] = selectedStylesheetRef.current;
    const { currentTheme, customThemes, selectedCustomThemeIndex } =
      await fetchThemeData();

    if (!currentTheme || !customThemes || !inputValueRef.current) {
      return notify(
        "Error saving. Missing one of: currentTheme, customThemes or inputValueRef.",
      );
    } else if (selectedCustomThemeIndex < 0) {
      return notify("Error locating custom theme");
    }

    if (customThemes && selectedCustomThemeIndex > -1) {
      customThemes[selectedCustomThemeIndex].inputs.style.stylesheets =
        newStylesheets;
    }

    setSavedThemeInputs({
      ...savedThemeInputsRef.current,
      style: {
        ...currentTheme.inputs.style,
        stylesheets: newStylesheets,
      },
    });
    storageSetByKeys({
      CUSTOM_THEMES: customThemes,
    });
  };

  const handleTemplateChange = (newValue: string) => {
    const selectedStylesheetIdx =
      unsavedThemeInputs?.style?.stylesheets.findIndex(
        (s) => s.id === selectedStylesheet?.id,
      ) ?? -1;

    if (!selectedStylesheet || selectedStylesheetIdx < 0) {
      return notify("Error updating stylesheet");
    }

    const newStylesheets = [...(unsavedThemeInputs?.style?.stylesheets || [])];
    newStylesheets[selectedStylesheetIdx].template = newValue;
    const newUnsavedThemeInputs: TSelectedThemeInputs = {
      ...unsavedThemeInputs,
      style: {
        ...defaultStyleInput,
        ...unsavedThemeInputs?.style,
        stylesheets: newStylesheets,
      },
    };

    setSelectedStylesheet({
      ...selectedStylesheet,
      template: newValue,
    });
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
          <Box>
            <List dense sx={{ width: LEFT_COLUMN_WIDTH }}>
              <Stack spacing={1}>
                <Stack>
                  <Typography variant="caption">Stylesheets</Typography>
                  {savedThemeInputs?.style.stylesheets.map(({ id, type }) => {
                    const isSelected = selectedStylesheet?.id === id;
                    const modified = getIsModified(
                      id,
                      savedThemeInputs,
                      unsavedThemeInputs,
                    );

                    return (
                      <Box
                        key={id}
                        sx={{ position: "relative", whiteSpace: "nowrap" }}
                      >
                        <ListItemButton selected={isSelected}>
                          index.{type}
                        </ListItemButton>
                        <ModifiedIndicator
                          modified={modified}
                          sx={{ right: "1rem" }}
                        />
                      </Box>
                    );
                  })}
                </Stack>
                <Stack>
                  <Typography variant="caption">Options</Typography>
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
                </Stack>
              </Stack>
            </List>
          </Box>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              flex: "1 1 auto",
            }}
          >
            <CodeEditor
              language="css"
              value={codeEditorValue}
              handleChange={handleTemplateChange}
              handleSave={handleSave}
            />
            <Stack direction="row" spacing={1} sx={{ justifyContent: "end" }}>
              <Button
                color="warning"
                disabled={!canDiscard}
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
