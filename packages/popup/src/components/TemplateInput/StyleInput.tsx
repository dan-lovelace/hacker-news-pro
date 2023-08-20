import { useEffect, useRef, useState } from "react";

import { storageGetByKey, storageSetByKeys } from "@hnp/core";
import { TTheme } from "@hnp/types";
import { Button } from "@mui/material";

import { getSaveShortcut, saveListener } from ".";
import { useToastContext } from "../../contexts/toast";
import CodeEditor from "../CodeEditor";

export function StyleInput() {
  const [styleValue, setStyleValue] = useState("");
  const [initialized, setInitialized] = useState(false);
  const { notify } = useToastContext();
  const saveShortcut = getSaveShortcut();

  // state references to use when handling save by keyboard shortcut
  const valueRef = useRef<string>();
  valueRef.current = styleValue;

  useEffect(() => {
    async function init() {
      const currentTheme = await storageGetByKey("CURRENT_THEME");
      const customThemes = await storageGetByKey("CUSTOM_THEMES");
      const customTheme = customThemes?.find(
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
    const existingIdx =
      customThemes?.findIndex((t: TTheme) => t.id === storedCurrentTheme?.id) ??
      -1;

    if (customThemes && existingIdx > -1) {
      customThemes[existingIdx].inputs.style = valueRef.current ?? "";
    }

    storageSetByKeys({ CUSTOM_THEMES: customThemes });
  };

  return (
    <>
      {initialized && (
        <>
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
            Save ({saveShortcut})
          </Button>
        </>
      )}
    </>
  );
}
