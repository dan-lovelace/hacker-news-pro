import { ChangeEvent, KeyboardEvent, useEffect, useState } from "react";

import { fetchThemeData, storageGetByKey, storageSetByKeys } from "@hnp/core";
import { TTheme } from "@hnp/types";
import { Box, Stack, Tab, Tabs, TextField, useTheme } from "@mui/material";
import { kebabCase } from "lodash";

import BackButton from "../../components/BackButton/BackButton";
import {
  ComponentsInput,
  StyleInput,
  TemplateInput,
} from "../../components/ThemeEditor";
import { useToastContext } from "../../contexts/toast";

export default function EditorPage() {
  const [activeTab, setActiveTab] = useState<number>(0);
  const [label, setLabel] = useState("");
  const [currentTheme, setCurrentTheme] = useState<TTheme>();
  const [initialized, setInitialized] = useState<boolean>(false);
  const theme = useTheme();
  const { notify } = useToastContext();

  useEffect(() => {
    async function init() {
      const tab = await storageGetByKey("SELECTED_TAB");
      if (tab) {
        setActiveTab(tab);
      }

      const { currentTheme: storedCurrentTheme } = await fetchThemeData();
      if (storedCurrentTheme) {
        setLabel(storedCurrentTheme.label);
        setCurrentTheme(storedCurrentTheme);
      }

      setInitialized(true);
    }

    init();
  }, []);

  const handleBlur = () => {
    handleLabelUpdate();
  };

  const handleChange = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setLabel(event.target.value);
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    if (event.key === "Enter") {
      handleLabelUpdate();
    }
  };

  const handleLabelUpdate = async () => {
    (document.activeElement as HTMLElement).blur();

    const trimmed = label.trim();

    if (!currentTheme || currentTheme.label === trimmed) return;

    if (!trimmed) {
      notify("Name is required");
      setLabel(currentTheme.label);
      return;
    }

    const id = kebabCase(trimmed);
    const newCurrentTheme: TTheme = {
      ...currentTheme,
      id,
      label: trimmed,
    };
    const existingThemes = await storageGetByKey("CUSTOM_THEMES");
    const customThemeIdx =
      existingThemes?.findIndex((t: TTheme) => t.id === currentTheme.id) ?? -1;

    if (!existingThemes || customThemeIdx < 0) {
      notify("Error finding custom theme");
      return;
    }

    if (existingThemes.some((t: TTheme) => t.id === id)) {
      notify("A theme with this name already exists");
      setLabel(currentTheme.label);
      return;
    }

    existingThemes[customThemeIdx] = {
      ...existingThemes[customThemeIdx],
      ...newCurrentTheme,
    };

    storageSetByKeys({
      CUSTOM_THEMES: existingThemes,
      SELECTED_THEME_ID: newCurrentTheme.id,
    });
    setCurrentTheme(newCurrentTheme);
  };

  const handleTabChange = (_: React.SyntheticEvent, newIndex: number) => {
    setActiveTab(newIndex);
    storageSetByKeys({ SELECTED_TAB: newIndex });
  };

  return (
    <>
      {initialized && (
        <Stack className="editor-page" sx={{ height: "100%" }}>
          <Box sx={{ flex: "1 1 auto" }}>
            <Stack direction="row" spacing={1}>
              <BackButton />
              <TextField
                size="small"
                value={label}
                variant="standard"
                onBlur={handleBlur}
                onChange={handleChange}
                onKeyDown={handleKeyDown}
                inputProps={{
                  sx: {
                    fontSize: theme.typography.h6.fontSize,
                    marginTop: 0.5,
                  },
                }}
                sx={{
                  width: "100%",
                  paddingRight: "6rem",
                  "& .MuiInput-root": {
                    "&:before": {
                      display: "none",
                    },
                  },
                }}
              />
            </Stack>
            <Tabs value={activeTab} onChange={handleTabChange} sx={{ mb: 1 }}>
              <Tab label="Views" />
              <Tab label="Components" />
              <Tab label="Style" />
            </Tabs>
          </Box>
          <Box
            sx={{ display: "flex", flexDirection: "column", height: "100%" }}
          >
            {activeTab === 0 && <TemplateInput />}
            {activeTab === 1 && <ComponentsInput />}
            {activeTab === 2 && <StyleInput />}
          </Box>
        </Stack>
      )}
    </>
  );
}
