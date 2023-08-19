import { useEffect } from "react";

import { Box, useMediaQuery } from "@mui/material";
import hljs from "highlight.js/lib/core";
import css from "highlight.js/lib/languages/css";
import handlebars from "highlight.js/lib/languages/handlebars";
import xml from "highlight.js/lib/languages/xml";
import Editor from "react-simple-code-editor";

import { useAppContext } from "../../contexts/app";

hljs.registerLanguage("css", css);
hljs.registerLanguage("handlebars", handlebars);
hljs.registerLanguage("xml", xml);

type CodeEditorProps = {
  id: string;
  language: string;
  value: string;
  handleChange: (value: string) => void;
  handleSave: () => void;
};

export default function CodeEditor({
  id,
  language,
  value,
  handleChange,
}: CodeEditorProps) {
  const { popout } = useAppContext();
  const prefersDarkMode = useMediaQuery("(prefers-color-scheme: dark)");

  useEffect(() => {
    async function setStyle() {
      if (prefersDarkMode) {
        await import("highlight.js/styles/a11y-dark.css");
      } else {
        await import("highlight.js/styles/a11y-light.css");
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
        mb: 1,
        width: "100%",
        height: "100%",
        overflow: "auto",
        maxWidth: popout ? "auto" : "500px",
      }}
    >
      <Editor
        id={id}
        className="code-editor"
        value={value}
        onValueChange={handleChange}
        highlight={(code) => hljs.highlight(code, { language }).value}
        padding={10}
        preClassName="code-editor-pre"
        style={{
          float: "left",
          minHeight: "100%",
          minWidth: "100%",
        }}
      />
    </Box>
  );
}
