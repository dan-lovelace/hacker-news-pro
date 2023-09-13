import { forwardRef } from "react";

import { Box, ListItemButton, ListItemButtonProps } from "@mui/material";

import ModifiedIndicator from "../ModifiedIndicator";

const ViewItem = forwardRef<
  HTMLDivElement,
  ListItemButtonProps & {
    modified: boolean;
  }
>(({ modified, ...props }, ref) => {
  return (
    <Box sx={{ position: "relative", whiteSpace: "nowrap" }}>
      <ListItemButton ref={ref} {...props}>
        {props.children}
      </ListItemButton>
      <ModifiedIndicator modified={modified} sx={{ right: "1rem" }} />
    </Box>
  );
});

export default ViewItem;
