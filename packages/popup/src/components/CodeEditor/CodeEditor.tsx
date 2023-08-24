import { useEffect, useState } from "react";

import { Box, useMediaQuery } from "@mui/material";
import AceEditor from "react-ace";

import { useAppContext } from "../../contexts/app";

import "ace-builds/src-noconflict/mode-css";
import "ace-builds/src-noconflict/mode-handlebars";

type CodeEditorProps = {
  language: "css" | "handlebars";
  value: string;
  handleChange: (value: string) => void;
  handleSave: () => void;
};

export default function CodeEditor({
  language,
  value,
  handleChange,
}: CodeEditorProps) {
  const [theme, setTheme] = useState<string>();
  const { popout } = useAppContext();
  const prefersDarkMode = useMediaQuery("(prefers-color-scheme: dark)");

  useEffect(() => {
    async function setStyle() {
      if (prefersDarkMode) {
        await import("ace-builds/src-noconflict/theme-solarized_dark");
        setTheme("solarized_dark");
      } else {
        await import("ace-builds/src-noconflict/theme-solarized_light");
        setTheme("solarized_light");
      }
    }

    setStyle();
  }, []);

  return (
    <Box
      sx={{
        border: "1px solid",
        borderColor: "primary.main",
        borderRadius: 1,
        flex: "1 1 auto",
        maxWidth: popout ? "auto" : 600, // matches `body` width in `index.scss`
        mb: 1,
        overflow: "auto",
        width: "100%",
      }}
    >
      <AceEditor
        mode={language}
        theme={theme}
        value={value}
        width="100%"
        height="100%"
        onChange={handleChange}
      />
    </Box>
  );
}
