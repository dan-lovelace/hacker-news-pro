import { useEffect, useRef, useState } from "react";

import { storageGetByKey, storageSetByKeys } from "@hnp/core";
import { TTheme, TView, TViewInputValue } from "@hnp/types";
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
      const currentTheme = await storageGetByKey("CURRENT_THEME");
      const customThemes = await storageGetByKey("CUSTOM_THEMES");
      const customTheme: TTheme | undefined = customThemes?.find(
        (t: TTheme) => t.id === currentTheme?.id,
      );

      if (!customTheme) {
        return notify("Error loading custom theme template");
      }

      setTemplateValues(customTheme.inputs[view]);
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
    const currentTheme = await storageGetByKey("CURRENT_THEME");
    const customThemes = await storageGetByKey("CUSTOM_THEMES");
    const existingIdx =
      customThemes?.findIndex((t: TTheme) => t.id === currentTheme?.id) ?? -1;

    if (customThemes && existingIdx > -1) {
      customThemes[existingIdx].inputs[view] = {
        ...customThemes[existingIdx].inputs[view],
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
