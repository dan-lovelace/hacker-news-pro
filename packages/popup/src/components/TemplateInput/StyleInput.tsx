import { useEffect, useRef, useState } from "react";

import { Box, Button } from "@mui/material";
import { browser, STORAGE_KEYS } from "@hnp/core";
import { TTheme } from "@hnp/types";

import { getSaveShortcut, saveListener } from ".";
import { useToastContext } from "../../contexts/toast";
import CodeEditor from "../CodeEditor";

const { CURRENT_THEME, CUSTOM_THEMES } = STORAGE_KEYS;

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
      const storedCurrentTheme = await browser.storage.local.get(CURRENT_THEME);
      const storedCustomThemes = await browser.storage.local.get(CUSTOM_THEMES);

      if (
        Object.prototype.hasOwnProperty.call(
          storedCurrentTheme,
          CURRENT_THEME
        ) &&
        Object.prototype.hasOwnProperty.call(storedCustomThemes, CUSTOM_THEMES)
      ) {
        const customTheme: TTheme = storedCustomThemes[CUSTOM_THEMES].find(
          (t: TTheme) => t.id === storedCurrentTheme[CURRENT_THEME].id
        );

        if (!customTheme) {
          return notify("Error loading custom theme template");
        }

        setStyleValue(customTheme.inputs.style);
      }

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
    const storedCurrentTheme = await browser.storage.local.get(CURRENT_THEME);
    const storedCustomThemes = await browser.storage.local.get(CUSTOM_THEMES);
    const existing: TTheme[] = storedCustomThemes[CUSTOM_THEMES];
    const existingIdx = existing.findIndex(
      (t: TTheme) => t.id === storedCurrentTheme[CURRENT_THEME].id
    );

    existing[existingIdx].inputs.style = valueRef.current ?? "";

    const newValue = {
      [CUSTOM_THEMES]: existing,
    };

    browser.storage.local.set(newValue);
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
