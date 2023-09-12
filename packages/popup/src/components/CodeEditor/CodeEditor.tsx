import { useMemo } from "react";

import { Box, useMediaQuery } from "@mui/material";
import AceEditor from "react-ace";

import { useAppContext } from "../../contexts/app";
import { PAGE_MIN_WIDTH } from "../../lib/vars";

import "ace-builds/src-noconflict/mode-css";
import "ace-builds/src-noconflict/mode-handlebars";
import "ace-builds/src-noconflict/theme-solarized_dark";
import "ace-builds/src-noconflict/theme-solarized_light";

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
  const { popout } = useAppContext();
  const prefersDarkMode = useMediaQuery("(prefers-color-scheme: dark)");
  const theme = useMemo(
    () => (prefersDarkMode ? "solarized_dark" : "solarized_light"),
    [prefersDarkMode],
  );

  return (
    <Box
      sx={{
        border: "1px solid",
        borderColor: "primary.main",
        borderRadius: 1,
        flex: "1 1 auto",
        maxWidth: popout ? "auto" : PAGE_MIN_WIDTH,
        mb: 1,
        overflow: "auto",
        width: "100%",
      }}
    >
      <AceEditor
        focus
        mode={language}
        theme={theme}
        value={value}
        width="100%"
        height="100%"
        setOptions={{ fixedWidthGutter: true, useWorker: false }}
        tabSize={2}
        onChange={handleChange}
      />
    </Box>
  );
}
