import { useEffect, useState } from "react";

import { storageGetByKey, storageSetByKeys } from "@hnp/core";
import { TView } from "@hnp/types";
import {
  Box,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
} from "@mui/material";

import ViewInput from "./ViewInput";

export function TemplateInput() {
  const [initialized, setInitialized] = useState<boolean>(false);
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
              <MenuItem value="list">List</MenuItem>
              <MenuItem value="item">Item</MenuItem>
            </Select>
          </FormControl>
          <ViewInput view={viewValue} />
        </Box>
      )}
    </>
  );
}
