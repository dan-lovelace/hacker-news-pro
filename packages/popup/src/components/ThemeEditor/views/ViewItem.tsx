import { forwardRef } from "react";

import {
  Box,
  ListItemButton,
  ListItemButtonProps,
  Stack,
  Typography,
} from "@mui/material";

import ModifiedIndicator from "../ModifiedIndicator";

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

export default ViewItem;
