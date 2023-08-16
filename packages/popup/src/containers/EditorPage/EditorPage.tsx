import { ChangeEvent, KeyboardEvent, useEffect, useState } from "react";

import { Box, Stack, Tab, Tabs, TextField, useTheme } from "@mui/material";
import { browser, STORAGE_KEYS } from "@hnp/core";
import { TCurrentTheme, TTheme } from "@hnp/types";
import { kebabCase } from "lodash";

import { StyleInput, TemplateInput } from "../../components/TemplateInput";
import { useToastContext } from "../../contexts/toast";

const { CURRENT_THEME, CUSTOM_THEMES, SELECTED_TAB } = STORAGE_KEYS;

export default function EditorPage() {
  const [activeTab, setActiveTab] = useState<number>(0);
  const [label, setLabel] = useState("");
  const [currentTheme, setCurrentTheme] = useState<TCurrentTheme>();
  const [initialized, setInitialized] = useState<boolean>(false);
  const theme = useTheme();
  const { notify } = useToastContext();

  useEffect(() => {
    async function init() {
      const tab = await browser.storage.local.get(SELECTED_TAB);
      if (tab[SELECTED_TAB]) {
        setActiveTab(tab[SELECTED_TAB]);
      }

      const storedCurrentTheme = await browser.storage.local.get(CURRENT_THEME);
      const currentTheme: TCurrentTheme = storedCurrentTheme[CURRENT_THEME];
      if (currentTheme) {
        setLabel(currentTheme.label);
        setCurrentTheme(currentTheme);
      }

      setInitialized(true);
    }

    init();
  }, []);

  const handleBlur = () => {
    handleLabelUpdate();
  };

  const handleChange = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
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
    const newCurrentTheme: TCurrentTheme = {
      ...currentTheme,
      id,
      label: trimmed,
    };
    const storedCustomThemes = await browser.storage.local.get(CUSTOM_THEMES);
    const existingThemes: TTheme[] = storedCustomThemes[CUSTOM_THEMES];
    const customThemeIdx = existingThemes.findIndex(
      (t: TTheme) => t.id === currentTheme.id
    );

    if (customThemeIdx < 0) {
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

    browser.storage.local.set({
      [CUSTOM_THEMES]: existingThemes,
      [CURRENT_THEME]: newCurrentTheme,
    });
    setCurrentTheme(newCurrentTheme);
  };

  const handleTabChange = (_: React.SyntheticEvent, newIndex: number) => {
    setActiveTab(newIndex);

    browser.storage.local.set({ [SELECTED_TAB]: newIndex });
  };

  return (
    <>
      {initialized && (
        <Stack className="editor-page">
          <Box sx={{ flex: "1 1 auto" }}>
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
            <Tabs value={activeTab} onChange={handleTabChange} sx={{ mb: 1 }}>
              <Tab label="HTML" />
              <Tab label="CSS" />
            </Tabs>
          </Box>
          <Box>{activeTab === 0 ? <TemplateInput /> : <StyleInput />}</Box>
        </Stack>
      )}
    </>
  );
}
