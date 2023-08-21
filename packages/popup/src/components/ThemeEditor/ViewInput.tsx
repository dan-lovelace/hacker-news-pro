import { useEffect, useRef, useState } from "react";

import { fetchThemeData, storageSetByKeys } from "@hnp/core";
import { TView, TViewInputValue } from "@hnp/types";
import { Button } from "@mui/material";

import { getSaveShortcut, saveListener } from ".";
import { useToastContext } from "../../contexts/toast";
import CodeEditor from "../CodeEditor";

type ViewInputProps = {
  view: TView;
  setModified: React.Dispatch<React.SetStateAction<TView | undefined>>;
};

export default function ViewInput({ view, setModified }: ViewInputProps) {
  const [initialized, setInitialized] = useState<boolean>(false);
  const [storedValue, setStoredValue] = useState<TViewInputValue>();
  const [templateValues, setTemplateValues] = useState<TViewInputValue>({
    template: "",
  });
  const { notify } = useToastContext();
  const saveShortcut = getSaveShortcut();

  // state references to use when handling save by keyboard shortcut
  const templateValuesRef = useRef<TViewInputValue>();
  templateValuesRef.current = templateValues;
  const viewRef = useRef<TView>();
  viewRef.current = view;

  useEffect(() => {
    async function init() {
      const { currentTheme } = await fetchThemeData();

      if (!currentTheme) {
        return notify("Error loading custom theme template");
      }

      const currentValue = currentTheme.inputs[view];

      setStoredValue(currentValue);
      setTemplateValues(currentValue);
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

  useEffect(() => {
    async function handleViewChange() {
      const { currentTheme } = await fetchThemeData();

      if (!currentTheme) {
        return notify("Error loading custom theme template");
      }

      const newValue = currentTheme.inputs[view];

      setStoredValue(newValue);
      setTemplateValues(newValue);
    }

    handleViewChange();
  }, [view]);

  const handleTemplateChange = (newValue: string) => {
    const newValues = { ...templateValues };
    newValues.template = newValue;

    if (storedValue?.template !== newValue) {
      setModified(view);
    } else {
      setModified(undefined);
    }

    setTemplateValues(newValues);
  };

  const handleSave = async () => {
    const { currentThemeIndex, customThemes } = await fetchThemeData();

    if (customThemes && currentThemeIndex > -1 && viewRef.current) {
      customThemes[currentThemeIndex].inputs[viewRef.current] = {
        ...customThemes[currentThemeIndex].inputs[viewRef.current],
        ...templateValuesRef.current,
      };
    }

    setModified(undefined);
    setStoredValue(templateValuesRef.current);
    storageSetByKeys({ CUSTOM_THEMES: customThemes });
  };

  return (
    <>
      {initialized && (
        <>
          <CodeEditor
            id="template"
            language="handlebars"
            value={templateValues.template}
            handleChange={handleTemplateChange}
            handleSave={handleSave}
          />
          <Button variant="contained" fullWidth onClick={handleSave}>
            Save ({saveShortcut})
          </Button>
        </>
      )}
    </>
  );
}