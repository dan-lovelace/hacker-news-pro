import { useEffect, useRef, useState } from "react";

import { fetchThemeData, storageSetByKeys } from "@hnp/core";
import { TStyle } from "@hnp/types";
import { Button, FormControlLabel, Switch } from "@mui/material";

import { getSaveShortcut, saveListener } from ".";
import { useToastContext } from "../../contexts/toast";
import CodeEditor from "../CodeEditor";

const defaultStyle: TStyle = {
  options: { darkMode: false },
  template: "",
};

export default function StyleInput() {
  const [styleValue, setStyleValue] = useState<TStyle>(defaultStyle);
  const [initialized, setInitialized] = useState(false);
  const { notify } = useToastContext();
  const saveShortcut = getSaveShortcut();

  // state references to use when handling save by keyboard shortcut
  const valueRef = useRef<TStyle>(defaultStyle);
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

  const handleDarkModeChange = async (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const newDarkMode = event.target.checked;
    const { customThemes, selectedCustomThemeIndex } = await fetchThemeData();
    const newStyleValue = { ...styleValue };

    newStyleValue.options.darkMode = newDarkMode;

    if (customThemes && selectedCustomThemeIndex > -1) {
      customThemes[selectedCustomThemeIndex].inputs.style = newStyleValue;
    }

    setStyleValue(newStyleValue);
    storageSetByKeys({ CUSTOM_THEMES: customThemes });
  };

  const handleSave = async () => {
    const { customThemes, selectedCustomThemeIndex } = await fetchThemeData();

    if (customThemes && selectedCustomThemeIndex > -1) {
      customThemes[selectedCustomThemeIndex].inputs.style = valueRef.current;
    }

    storageSetByKeys({ CUSTOM_THEMES: customThemes });
  };

  const handleTemplateChange = (newValue: string) => {
    setStyleValue({
      ...styleValue,
      template: newValue,
    });
  };

  return (
    <>
      {initialized && (
        <>
          <FormControlLabel
            control={
              <Switch
                checked={styleValue.options.darkMode}
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
            value={styleValue.template}
            handleChange={handleTemplateChange}
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
