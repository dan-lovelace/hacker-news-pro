import { forwardRef, useEffect, useState } from "react";

import { storageGetByKey, storageSetByKeys } from "@hnp/core";
import { TView } from "@hnp/types";
import {
  Box,
  FormControl,
  InputLabel,
  MenuItem,
  MenuItemProps,
  Select,
  SelectChangeEvent,
} from "@mui/material";

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
  {
    label: "Other",
    value: "other",
  },
];

const ViewItem = forwardRef<
  HTMLLIElement,
  MenuItemProps & {
    modified: boolean;
  }
>(({ modified, ...props }, ref) => (
  <Box sx={{ position: "relative" }}>
    <MenuItem ref={ref} {...props} />
    <ModifiedIndicator modified={modified} sx={{ right: "2rem" }} />
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

  const handleViewChange = async (event: SelectChangeEvent) => {
    const value = event.target.value as TView;

    setModified(undefined);
    setViewValue(value);
    storageSetByKeys({ SELECTED_VIEW: value });
  };

  return (
    <>
      {initialized && (
        <Box>
          <FormControl variant="standard" sx={{ minWidth: 250 }}>
            <InputLabel>View</InputLabel>
            <Select
              value={viewValue}
              onChange={handleViewChange}
              label="Template"
              MenuProps={{
                disableScrollLock: true,
              }}
              sx={{ mb: 1 }}
            >
              {viewOptions.map(({ label, value }) => (
                <ViewItem
                  key={value}
                  value={value}
                  modified={modified === value}
                >
                  {label}
                </ViewItem>
              ))}
            </Select>
            <ModifiedIndicator
              modified={modified === viewValue}
              sx={{ right: "2rem", bottom: "1rem", top: "auto" }}
            />
          </FormControl>
          <ViewInput view={viewValue} setModified={setModified} />
        </Box>
      )}
    </>
  );
}
