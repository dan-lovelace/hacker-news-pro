import { useEffect, useState } from "react";

import { browser, STORAGE_KEYS } from "@hnp/core";
import { TView } from "@hnp/types";
import {
  Box,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
} from "@mui/material";

import Comments from "./Comments";
import Subreddit from "./Subreddit";

const { SELECTED_VIEW } = STORAGE_KEYS;

export function TemplateInput() {
  const [initialized, setInitialized] = useState<boolean>(false);
  const [viewValue, setViewValue] = useState<TView>("list");

  useEffect(() => {
    async function init() {
      const view: Record<string, TView> =
        await browser.storage.local.get(SELECTED_VIEW);
      if (Object.prototype.hasOwnProperty.call(view, SELECTED_VIEW)) {
        setViewValue(view[SELECTED_VIEW]);
      }

      setInitialized(true);
    }

    init();
  }, []);

  const handleViewChange = async (event: SelectChangeEvent) => {
    const value = event.target.value as TView;

    setViewValue(value);
    browser.storage.local.set({ [SELECTED_VIEW]: value });
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
              <MenuItem value="subreddit">Subreddit</MenuItem>
              <MenuItem value="comments">Comments</MenuItem>
            </Select>
          </FormControl>
          {viewValue === "item" && <Comments />}
          {viewValue === "list" && <Subreddit />}
        </Box>
      )}
    </>
  );
}
