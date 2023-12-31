import { useEffect, useMemo, useRef, useState } from "react";

import { fetchThemeData, storageGetByKey, storageSetByKeys } from "@hnp/core";
import {
  TSelectedThemeInputs,
  TThemeInputs,
  TView,
  TViewInput,
} from "@hnp/types";
import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline";
import SaveIcon from "@mui/icons-material/Save";
import { Box, Button, List, Stack, Typography } from "@mui/material";

import { ViewItem, viewOptions } from ".";
import { LEFT_COLUMN_WIDTH, getSaveShortcut, saveListener } from "..";
import { useToastContext } from "../../../contexts/toast";
import CodeEditor from "../../CodeEditor";

const saveShortcut = getSaveShortcut();

function getIsModified(
  selectedView: TView,
  savedInputs?: TThemeInputs,
  unsavedInputs?: TSelectedThemeInputs,
) {
  return (
    (savedInputs?.views?.[selectedView]?.template ?? "") !==
    (unsavedInputs?.views?.[selectedView]?.template ?? "")
  );
}

export default function ViewsInput() {
  const [initialized, setInitialized] = useState<boolean>(false);
  const [savedThemeInputs, setSavedThemeInputs] = useState<TThemeInputs>();
  const [selectedView, setSelectedView] = useState<TView>("storyList");
  const [unsavedThemeInputs, setUnsavedThemeInputs] =
    useState<TSelectedThemeInputs>();
  const { notify } = useToastContext();
  const canDiscard = useMemo(
    () => getIsModified(selectedView, savedThemeInputs, unsavedThemeInputs),
    [savedThemeInputs, selectedView, unsavedThemeInputs],
  );

  // state references to use when handling save by keyboard shortcut
  const inputValueRef = useRef<TViewInput>();
  inputValueRef.current =
    unsavedThemeInputs?.views?.[selectedView] ??
    savedThemeInputs?.views?.[selectedView];
  const viewRef = useRef<TView>();
  viewRef.current = selectedView;

  useEffect(() => {
    async function init() {
      const { currentTheme, selectedThemeInputs } = await fetchThemeData();
      const view = await storageGetByKey("SELECTED_VIEW");

      if (view) {
        setSelectedView(view);
      }

      setSavedThemeInputs(currentTheme?.inputs);
      setUnsavedThemeInputs(selectedThemeInputs);
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
      ...unsavedThemeInputs,
      views: {
        ...unsavedThemeInputs?.views,
        [selectedView]: savedThemeInputs?.views?.[selectedView],
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

    setSavedThemeInputs(currentTheme?.inputs);
    storageSetByKeys({ CUSTOM_THEMES: customThemes });
  };

  const handleTemplateChange = async (newValue: string) => {
    const newUnsavedThemeInputs: TSelectedThemeInputs = {
      ...unsavedThemeInputs,
      views: {
        ...unsavedThemeInputs?.views,
        [selectedView]: {
          template: newValue,
        },
      },
    };

    setUnsavedThemeInputs(newUnsavedThemeInputs);
    storageSetByKeys({
      SELECTED_THEME_INPUTS: newUnsavedThemeInputs,
    });
  };

  const handleViewChange = (view: TView) => () => {
    setSelectedView(view);
    storageSetByKeys({ SELECTED_VIEW: view });
  };

  return (
    <>
      {initialized && (
        <Stack
          className="views-input"
          direction="row"
          spacing={1}
          sx={{ height: "100%" }}
        >
          <Box>
            <List dense sx={{ width: LEFT_COLUMN_WIDTH }}>
              <Stack spacing={1}>
                {viewOptions.map(({ label, options }) => (
                  <Stack key={label}>
                    <Typography variant="caption">{label}</Typography>
                    {options.map(({ hidden, label, value }) => {
                      if (hidden) return false;

                      const isModified = getIsModified(
                        value,
                        savedThemeInputs,
                        unsavedThemeInputs,
                      );

                      return (
                        <ViewItem
                          key={value}
                          modified={isModified}
                          selected={selectedView === value}
                          onClick={handleViewChange(value)}
                        >
                          {label}
                        </ViewItem>
                      );
                    })}
                  </Stack>
                ))}
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
              language="handlebars"
              value={inputValueRef.current?.template ?? ""}
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
