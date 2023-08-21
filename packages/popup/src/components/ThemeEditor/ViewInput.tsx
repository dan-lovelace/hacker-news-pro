import { useEffect, useRef, useState } from "react";

import { fetchThemeData, storageSetByKeys } from "@hnp/core";
import { TView, TViewInputValue } from "@hnp/types";
import { Button } from "@mui/material";

import { getSaveShortcut, saveListener } from ".";
import { useToastContext } from "../../contexts/toast";
import CodeEditor from "../CodeEditor";

type ViewInputProps = {
  view: TView;
};

export default function ViewInput({ view }: ViewInputProps) {
  const [templateValues, setTemplateValues] = useState<TViewInputValue>({
    template: "",
  });
  const [initialized, setInitialized] = useState<boolean>(false);
  const { notify } = useToastContext();
  const saveShortcut = getSaveShortcut();

  // state references to use when handling save by keyboard shortcut
  const templateValuesRef = useRef<TViewInputValue>();
  templateValuesRef.current = templateValues;

  useEffect(() => {
    async function init() {
      const { currentTheme } = await fetchThemeData();

      if (!currentTheme) {
        return notify("Error loading custom theme template");
      }

      setTemplateValues(currentTheme.inputs[view]);
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

  const handleSave = async () => {
    const { currentThemeIndex, customThemes } = await fetchThemeData();

    if (customThemes && currentThemeIndex > -1) {
      customThemes[currentThemeIndex].inputs[view] = {
        ...customThemes[currentThemeIndex].inputs[view],
        ...templateValuesRef.current,
      };
    }

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
          <Button
            variant="contained"
            fullWidth
            disabled={Boolean(!templateValues.template)}
            onClick={handleSave}
          >
            Save ({saveShortcut})
          </Button>
        </>
      )}
    </>
  );
}
