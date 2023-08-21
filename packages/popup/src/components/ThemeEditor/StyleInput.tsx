import { useEffect, useRef, useState } from "react";

import { fetchThemeData, storageSetByKeys } from "@hnp/core";
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
      const { currentTheme } = await fetchThemeData();

      if (!currentTheme) {
        return notify("Error loading custom theme template");
      }

      setStyleValue(currentTheme.inputs.style);
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
    const { currentThemeIndex, customThemes } = await fetchThemeData();

    if (customThemes && currentThemeIndex > -1) {
      customThemes[currentThemeIndex].inputs.style = valueRef.current ?? "";
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
