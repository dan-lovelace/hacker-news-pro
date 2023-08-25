import { forwardRef, useEffect, useState } from "react";

import { storageGetByKey, storageSetByKeys } from "@hnp/core";
import { TView, viewRouteMap } from "@hnp/types";
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
import ViewInput from "./ViewInput";

const viewOptions: { label: string; routes: string[]; value: TView }[] = [
  {
    label: "List",
    routes: Object.keys(viewRouteMap).filter(
      (key) => viewRouteMap[key] === "list",
    ),
    value: "list",
  },
  {
    label: "Item",
    routes: Object.keys(viewRouteMap).filter(
      (key) => viewRouteMap[key] === "item",
    ),
    value: "item",
  },
  {
    label: "User",
    routes: Object.keys(viewRouteMap).filter(
      (key) => viewRouteMap[key] === "user",
    ),
    value: "user",
  },
  {
    label: "Submit",
    routes: Object.keys(viewRouteMap).filter(
      (key) => viewRouteMap[key] === "submit",
    ),
    value: "submit",
  },
  {
    label: "Jobs",
    routes: Object.keys(viewRouteMap).filter(
      (key) => viewRouteMap[key] === "jobs",
    ),
    value: "jobs",
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

export function TemplateInput() {
  const [initialized, setInitialized] = useState<boolean>(false);
  const [modified, setModified] = useState<TView>();
  const [viewValue, setViewValue] = useState<TView>("list");

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
              {viewOptions.map(({ label, routes, value }) => (
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
            </List>
          </Box>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              flex: "1 1 auto",
            }}
          >
            <ViewInput view={viewValue} setModified={setModified} />
          </Box>
        </Stack>
      )}
    </>
  );
}
