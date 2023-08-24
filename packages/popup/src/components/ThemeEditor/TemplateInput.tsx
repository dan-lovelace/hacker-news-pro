import { forwardRef, useEffect, useState } from "react";

import { storageGetByKey, storageSetByKeys } from "@hnp/core";
import { TView } from "@hnp/types";
import {
  Box,
  List,
  ListItemButton,
  ListItemButtonProps,
  Stack,
} from "@mui/material";

import { LEFT_COLUMN_WIDTH } from ".";
import ModifiedIndicator from "./ModifiedIndicator";
import ViewInput from "./ViewInput";

const viewOptions: { label: string; value: TView }[] = [
  {
    label: "List",
    value: "list",
  },
  {
    label: "Item",
    value: "item",
  },
  {
    label: "User",
    value: "user",
  },
  {
    label: "Submit",
    value: "submit",
  },
  {
    label: "Jobs",
    value: "jobs",
  },
];

const ViewItem = forwardRef<
  HTMLDivElement,
  ListItemButtonProps & {
    modified: boolean;
  }
>(({ modified, ...props }, ref) => (
  <Box sx={{ position: "relative" }}>
    <ListItemButton ref={ref} {...props} />
    <ModifiedIndicator modified={modified} sx={{ right: "1rem" }} />
  </Box>
));

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
              {viewOptions.map(({ label, value }) => (
                <ViewItem
                  key={value}
                  modified={modified === value}
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
