import { forwardRef, useEffect, useState } from "react";

import { storageGetByKey, storageSetByKeys } from "@hnp/core";
import { TView } from "@hnp/types";
import {
  Box,
  List,
  ListItemButton,
  ListItemButtonProps,
  Stack,
  Typography,
} from "@mui/material";

import { LEFT_COLUMN_WIDTH } from ".";
import ModifiedIndicator from "./ModifiedIndicator";
import TemplateInput from "./TemplateInput";

const viewOptions: Array<{
  label: string;
  options: Array<{ label: string; routes: string[]; value: TView }>;
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
      {
        label: "Poll Option",
        routes: [],
        value: "pollOptItem",
      },
    ],
  },
  {
    label: "Other",
    options: [
      {
        label: "Submit",
        routes: [],
        value: "submit",
      },
      {
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

export default function ViewInput() {
  const [initialized, setInitialized] = useState<boolean>(false);
  const [modified, setModified] = useState<TView>();
  const [viewValue, setViewValue] = useState<TView>("storyList");

  useEffect(() => {
    async function init() {
      const view = await storageGetByKey("SELECTED_VIEW");

      if (view) {
        setViewValue(view);
      }

      setInitialized(true);
    }

    init();
  }, []);

  const handleViewChange = (view: TView) => () => {
    setModified(undefined);
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
            <List sx={{ width: LEFT_COLUMN_WIDTH }}>
              {viewOptions.map(({ label, options }) => (
                <Stack key={label}>
                  <Typography variant="caption">{label}</Typography>
                  {options.map(({ label, routes, value }) => (
                    <ViewItem
                      key={value}
                      modified={modified === value}
                      routes={routes}
                      selected={viewValue === value}
                      onClick={handleViewChange(value)}
                    >
                      {label}
                    </ViewItem>
                  ))}
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
            <TemplateInput view={viewValue} setModified={setModified} />
          </Box>
        </Stack>
      )}
    </>
  );
}
