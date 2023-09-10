import { useEffect, useRef, useState } from "react";

import { fetchThemeData, storageGetByKey, storageSetByKeys } from "@hnp/core";
import {
  TSelectedThemeInputs,
  TThemeInputs,
  TView,
  TViewInput,
} from "@hnp/types";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import SaveIcon from "@mui/icons-material/Save";
import { Box, Button, List, Stack, Typography } from "@mui/material";

import { ViewItem, viewOptions } from ".";
import { LEFT_COLUMN_WIDTH, getSaveShortcut, saveListener } from "..";
import { useToastContext } from "../../../contexts/toast";
import CodeEditor from "../../CodeEditor";

export default function ViewsInput() {
  const [currentThemeInputs, setCurrentThemeInputs] = useState<TThemeInputs>();
  const [initialized, setInitialized] = useState<boolean>(false);
  const [selectedThemeInputs, setSelectedThemeInputs] =
    useState<TSelectedThemeInputs>();
  const [viewValue, setViewValue] = useState<TView>("storyList");
  const { notify } = useToastContext();
  const saveShortcut = getSaveShortcut();

  // state references to use when handling save by keyboard shortcut
  const inputValueRef = useRef<TViewInput>();
  inputValueRef.current =
    selectedThemeInputs?.views?.[viewValue] ??
    currentThemeInputs?.views?.[viewValue];
  const viewRef = useRef<TView>();
  viewRef.current = viewValue;

  useEffect(() => {
    async function init() {
      const { currentTheme, selectedThemeInputs: storedSelectedThemeInputs } =
        await fetchThemeData();
      const view = await storageGetByKey("SELECTED_VIEW");

      if (view) {
        setViewValue(view);
      }

      setCurrentThemeInputs(currentTheme?.inputs);
      setSelectedThemeInputs(storedSelectedThemeInputs);
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

  const handleDiscardChanges = async () => {
    const newSelectedThemeInputs: TSelectedThemeInputs = {
      ...selectedThemeInputs,
      views: {
        ...selectedThemeInputs?.views,
        [viewValue]: currentThemeInputs?.views?.[viewValue],
      },
    };

    setSelectedThemeInputs(newSelectedThemeInputs);
    storageSetByKeys({
      SELECTED_THEME_INPUTS: newSelectedThemeInputs,
    });
  };

  const handleSave = async () => {
    const { currentTheme, customThemes, selectedCustomThemeIndex } =
      await fetchThemeData();

    if (!currentTheme || !customThemes || !viewRef.current) {
      return notify(
        "Error saving. Missing one of: currentTheme, customThemes or viewRef.",
      );
    } else if (selectedCustomThemeIndex < 0) {
      return notify("Error locating custom theme");
    }

    currentTheme.inputs = {
      ...currentTheme.inputs,
      views: {
        ...currentTheme.inputs.views,
        [viewRef.current]: inputValueRef.current,
      },
    };
    customThemes[selectedCustomThemeIndex] = currentTheme;

    setCurrentThemeInputs(currentTheme?.inputs);
    storageSetByKeys({ CUSTOM_THEMES: customThemes });
  };

  const handleTemplateChange = async (newValue: string) => {
    const { selectedThemeInputs: storedSelectedThemeInputs } =
      await fetchThemeData();
    const newValues: TSelectedThemeInputs = {
      ...storedSelectedThemeInputs,
      views: {
        ...storedSelectedThemeInputs?.views,
        [viewValue]: {
          template: newValue,
        },
      },
    };

    setSelectedThemeInputs(newValues);
    storageSetByKeys({
      SELECTED_THEME_INPUTS: newValues,
    });
  };

  const handleViewChange = (view: TView) => () => {
    setViewValue(view);
    storageSetByKeys({ SELECTED_VIEW: view });
  };

  return (
    <>
      {initialized && (
        <Stack
          className="template-input"
          direction="row"
          spacing={1}
          sx={{ height: "100%" }}
        >
          <Box>
            <List dense sx={{ width: LEFT_COLUMN_WIDTH }}>
              {viewOptions.map(({ label, options }) => (
                <Stack key={label}>
                  <Typography variant="caption">{label}</Typography>
                  {options.map(
                    ({ hidden, label, routes, value }) =>
                      !hidden && (
                        <ViewItem
                          key={value}
                          modified={
                            selectedThemeInputs?.views?.[value] !== undefined &&
                            currentThemeInputs?.views?.[value]?.template !==
                              selectedThemeInputs?.views?.[value]?.template
                          }
                          routes={routes}
                          selected={viewValue === value}
                          onClick={handleViewChange(value)}
                        >
                          {label}
                        </ViewItem>
                      ),
                  )}
                </Stack>
              ))}
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
              language="handlebars"
              value={inputValueRef.current?.template ?? ""}
              handleChange={handleTemplateChange}
              handleSave={handleSave}
            />
            <Stack direction="row" spacing={1} sx={{ justifyContent: "end" }}>
              <Button
                color="warning"
                disabled={
                  currentThemeInputs?.views?.[viewValue]?.template ===
                  selectedThemeInputs?.views?.[viewValue]?.template
                }
                startIcon={<DeleteForeverIcon />}
                variant="outlined"
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
