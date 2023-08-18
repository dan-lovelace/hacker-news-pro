import { useEffect, useRef, useState } from "react";

import { storageGetByKey, storageSetByKeys } from "@hnp/core";
import { TTheme } from "@hnp/types";
import { Box, Button } from "@mui/material";

import { getSaveShortcut, saveListener } from ".";
import { useToastContext } from "../../contexts/toast";
import CodeEditor from "../CodeEditor";

export function StyleInput() {
  const [styleValue, setStyleValue] = useState<string>("");
  const [initialized, setInitialized] = useState<boolean>(false);
  const { notify } = useToastContext();

  // configure a ref for styleValue so the latest value can be accessed within
  // save listener
  const valueRef = useRef<string>();
  valueRef.current = styleValue;

  useEffect(() => {
    async function init() {
      const currentTheme = await storageGetByKey("CURRENT_THEME");
      const customThemes = await storageGetByKey("CUSTOM_THEMES");
      const customTheme: TTheme | undefined = customThemes?.find(
        (t: TTheme) => t.id === currentTheme?.id,
      );

      if (!customTheme) {
        return notify("Error loading custom theme template");
      }

      setStyleValue(customTheme.inputs.style);

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

  const handleChange = (newValue: string) => {
    setStyleValue(newValue);
  };

  const handleSave = async () => {
    const storedCurrentTheme = await storageGetByKey("CURRENT_THEME");
    const customThemes = await storageGetByKey("CUSTOM_THEMES");
    const existingIdx = customThemes?.findIndex(
      (t: TTheme) => t.id === storedCurrentTheme?.id,
    );

    if (customThemes && existingIdx && existingIdx > -1) {
      customThemes[existingIdx].inputs.style = valueRef.current ?? "";
    }

    storageSetByKeys({ CUSTOM_THEMES: customThemes });
  };

  return (
    <>
      {initialized && (
        <Box>
          <CodeEditor
            id="css"
            language="css"
            value={styleValue}
            handleChange={handleChange}
            handleSave={handleSave}
          />
          <Button
            variant="contained"
            fullWidth
            disabled={Boolean(!styleValue)}
            onClick={handleSave}
          >
            Save ({getSaveShortcut()})
          </Button>
        </Box>
      )}
    </>
  );
}
