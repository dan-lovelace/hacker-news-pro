import { useEffect, useRef, useState } from "react";

import { Box, Button, InputLabel } from "@mui/material";
import { browser, STORAGE_KEYS } from "@hnp/core";
import { TTheme, TView, TViewInputValue } from "@hnp/types";

import { getSaveShortcut, saveListener } from ".";
import { useToastContext } from "../../contexts/toast";
import CodeEditor from "../CodeEditor";

const { CURRENT_THEME, CUSTOM_THEMES } = STORAGE_KEYS;

type ViewInputProps = {
  initialState: TViewInputValue;
  view: TView;
};

export default function ViewInput({ initialState, view }: ViewInputProps) {
  const [templateValues, setTemplateValues] =
    useState<TViewInputValue>(initialState);
  const [initialized, setInitialized] = useState<boolean>(false);
  const { notify } = useToastContext();
  const canSave =
    templateValues.template ||
    !templateValues.partials ||
    templateValues.partials.some((partial) => partial.template);

  // configure a ref for templateValues so the latest value can be accessed
  // within save listener
  const templateValuesRef = useRef<TViewInputValue>();
  templateValuesRef.current = templateValues;

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

        setTemplateValues(customTheme.inputs[view]);
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

  const handleTemplateChange = (newValue: string) => {
    const newValues = { ...templateValues };
    newValues.template = newValue;

    setTemplateValues(newValues);
  };

  const handlePartialChange = (idx: number) => (newValue: string) => {
    const newValues = { ...templateValues };

    if (!newValues.partials) return;

    newValues.partials[idx].template = newValue;

    setTemplateValues(newValues);
  };

  const handleSave = async () => {
    const storedCurrentTheme = await browser.storage.local.get(CURRENT_THEME);
    const storedCustomThemes = await browser.storage.local.get(CUSTOM_THEMES);
    const existing: TTheme[] = storedCustomThemes[CUSTOM_THEMES];
    const existingIdx = existing.findIndex(
      (t: TTheme) => t.id === storedCurrentTheme[CURRENT_THEME].id
    );

    existing[existingIdx].inputs[view] = {
      ...existing[existingIdx].inputs[view],
      ...templateValuesRef.current,
    };

    const newValue = {
      [CUSTOM_THEMES]: existing,
    };

    browser.storage.local.set(newValue);
  };

  return (
    <>
      {initialized && (
        <Box>
          <InputLabel shrink>Layout</InputLabel>
          <CodeEditor
            id="template"
            language="handlebars"
            value={templateValues.template}
            handleChange={handleTemplateChange}
            handleSave={handleSave}
          />
          {templateValues.partials?.map(({ label, name, template }, idx) => (
            <Box key={name}>
              <InputLabel shrink>{label}</InputLabel>
              <CodeEditor
                id={name}
                language="handlebars"
                value={template}
                handleChange={handlePartialChange(idx)}
                handleSave={handleSave}
              />
            </Box>
          ))}
          <Button
            variant="contained"
            fullWidth
            disabled={Boolean(!canSave)}
            onClick={handleSave}
          >
            Save ({getSaveShortcut()})
          </Button>
        </Box>
      )}
    </>
  );
}
