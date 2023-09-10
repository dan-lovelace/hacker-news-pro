import { forwardRef, useEffect, useRef, useState } from "react";

import { fetchThemeData, storageGetByKey, storageSetByKeys } from "@hnp/core";
import {
  TSelectedThemeInputs,
  TTheme,
  TView,
  TViewInputValue,
} from "@hnp/types";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import SaveIcon from "@mui/icons-material/Save";
import {
  Box,
  Button,
  List,
  ListItemButton,
  ListItemButtonProps,
  Stack,
  Typography,
} from "@mui/material";

import { LEFT_COLUMN_WIDTH, getSaveShortcut, saveListener } from ".";
import ModifiedIndicator from "./ModifiedIndicator";
import { useToastContext } from "../../contexts/toast";
import CodeEditor from "../CodeEditor";

const viewOptions: Array<{
  label: string;
  options: Array<{
    hidden?: boolean;
    label: string;
    routes: string[];
    value: TView;
  }>;
}> = [
  {
    label: "Lists",
    options: [
      {
        label: "Story",
        routes: [],
        value: "storyList",
      },
      {
        label: "Comment",
        routes: [],
        value: "commentList",
      },
      {
        label: "Job",
        routes: [],
        value: "jobList",
      },
    ],
  },
  {
    label: "Items",
    options: [
      {
        label: "Story",
        routes: [],
        value: "storyItem",
      },
      {
        label: "Comment",
        routes: [],
        value: "commentItem",
      },
      {
        label: "Job",
        routes: [],
        value: "jobItem",
      },
      {
        label: "Poll",
        routes: [],
        value: "pollItem",
      },
    ],
  },
  {
    label: "Other",
    options: [
      {
        label: "Reply",
        routes: [],
        value: "reply",
      },
      {
        label: "Submit",
        routes: [],
        value: "submit",
      },
      {
        hidden: true,
        label: "User",
        routes: [],
        value: "user",
      },
    ],
  },
];

const ViewItem = forwardRef<
  HTMLDivElement,
  ListItemButtonProps & {
    modified: boolean;
    routes: string[];
  }
>(({ modified, routes, ...props }, ref) => {
  const routesString = routes.join(", ");

  return (
    <Box sx={{ position: "relative", whiteSpace: "nowrap" }}>
      <ListItemButton ref={ref} {...props}>
        <Stack
          title={`Route${routes.length > 1 ? "s" : ""}: ${routesString}`}
          sx={{ overflow: "hidden" }}
        >
          <Box>{props.children}</Box>
          <Typography
            variant="subtitle2"
            sx={{
              color: "text.secondary",
              fontSize: "0.75rem",
              overflow: "hidden",
              textOverflow: "ellipsis",
            }}
          >
            {routesString}
          </Typography>
        </Stack>
      </ListItemButton>
      <ModifiedIndicator modified={modified} sx={{ right: "1rem" }} />
    </Box>
  );
});

export default function ViewsInput() {
  const [initialized, setInitialized] = useState<boolean>(false);
  const [currentThemeInputs, setCurrentThemeInputs] =
    useState<TTheme["inputs"]>();
  const [selectedThemeInputs, setSelectedThemeInputs] =
    useState<TSelectedThemeInputs>();
  const [viewValue, setViewValue] = useState<TView>("storyList");
  const { notify } = useToastContext();
  const saveShortcut = getSaveShortcut();

  // state references to use when handling save by keyboard shortcut
  const inputValueRef = useRef<TViewInputValue>();
  inputValueRef.current =
    selectedThemeInputs?.views?.[viewValue] ??
    currentThemeInputs?.views?.[viewValue];
  const viewRef = useRef<TView>();
  viewRef.current = viewValue;

  useEffect(() => {
    async function init() {
      const { currentTheme, selectedThemeInputs: storedSelectedThemeInputs } =
        await fetchThemeData();
      const view = await storageGetByKey("SELECTED_VIEW");

      if (view) {
        setViewValue(view);
      }

      setInitialized(true);
      setCurrentThemeInputs(currentTheme?.inputs);
      setSelectedThemeInputs(storedSelectedThemeInputs);
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

  const handleDiscardChanges = async () => {
    const newSelectedThemeInputs: TSelectedThemeInputs = {
      ...selectedThemeInputs,
      views: {
        ...selectedThemeInputs?.views,
        [viewValue]: currentThemeInputs?.views?.[viewValue],
      },
    };

    setSelectedThemeInputs(newSelectedThemeInputs);
    storageSetByKeys({
      SELECTED_THEME_INPUTS: newSelectedThemeInputs,
    });
  };

  const handleSave = async () => {
    const { currentTheme, customThemes, selectedCustomThemeIndex } =
      await fetchThemeData();

    if (!currentTheme || !customThemes || !viewRef.current) {
      return notify(
        "Error saving. Missing one of: currentTheme, customThemes or viewRef.",
      );
    } else if (selectedCustomThemeIndex < 0) {
      return notify("Error locating custom theme");
    }

    currentTheme.inputs = {
      ...currentTheme.inputs,
      views: {
        ...currentTheme.inputs.views,
        [viewRef.current]: inputValueRef.current,
      },
    };
    customThemes[selectedCustomThemeIndex] = currentTheme;

    setCurrentThemeInputs(currentTheme?.inputs);
    storageSetByKeys({ CUSTOM_THEMES: customThemes });
  };

  const handleTemplateChange = async (newValue: string) => {
    const { selectedThemeInputs: storedSelectedThemeInputs } =
      await fetchThemeData();
    const newValues: TSelectedThemeInputs = {
      ...storedSelectedThemeInputs,
      views: {
        ...storedSelectedThemeInputs?.views,
        [viewValue]: {
          template: newValue,
        },
      },
    };

    setSelectedThemeInputs(newValues);
    storageSetByKeys({
      SELECTED_THEME_INPUTS: newValues,
    });
  };

  const handleViewChange = (view: TView) => () => {
    setViewValue(view);
    storageSetByKeys({ SELECTED_VIEW: view });
  };

  return (
    <>
      {initialized && (
        <Stack
          className="template-input"
          direction="row"
          spacing={1}
          sx={{ height: "100%" }}
        >
          <Box>
            <List dense sx={{ width: LEFT_COLUMN_WIDTH }}>
              {viewOptions.map(({ label, options }) => (
                <Stack key={label}>
                  <Typography variant="caption">{label}</Typography>
                  {options.map(
                    ({ hidden, label, routes, value }) =>
                      !hidden && (
                        <ViewItem
                          key={value}
                          modified={
                            selectedThemeInputs?.views?.[value] !== undefined &&
                            currentThemeInputs?.views?.[value]?.template !==
                              selectedThemeInputs?.views?.[value]?.template
                          }
                          routes={routes}
                          selected={viewValue === value}
                          onClick={handleViewChange(value)}
                        >
                          {label}
                        </ViewItem>
                      ),
                  )}
                </Stack>
              ))}
            </List>
          </Box>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              flex: "1 1 auto",
            }}
          >
            <CodeEditor
              language="handlebars"
              value={inputValueRef.current?.template ?? ""}
              handleChange={handleTemplateChange}
              handleSave={handleSave}
            />
            <Stack direction="row" spacing={1} sx={{ justifyContent: "end" }}>
              <Button
                color="warning"
                disabled={
                  currentThemeInputs?.views?.[viewValue]?.template ===
                  selectedThemeInputs?.views?.[viewValue]?.template
                }
                startIcon={<DeleteForeverIcon />}
                variant="outlined"
                onClick={handleDiscardChanges}
              >
                Discard changes
              </Button>
              <Button
                startIcon={<SaveIcon />}
                variant="contained"
                onClick={handleSave}
              >
                Save ({saveShortcut})
              </Button>
            </Stack>
          </Box>
        </Stack>
      )}
    </>
  );
}
