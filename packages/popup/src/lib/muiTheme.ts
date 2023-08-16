import { Components, Theme } from "@mui/material";

export const themeComponents: Components<Omit<Theme, "components">> = {
  MuiButton: {
    defaultProps: { disableRipple: true },
    styleOverrides: {
      root: {
        textTransform: "none",
      },
    },
  },
  MuiMenuItem: {
    defaultProps: { disableRipple: true },
  },
  MuiTab: {
    defaultProps: { disableRipple: true },
    styleOverrides: {
      root: {
        textTransform: "none",
      },
    },
  },
};
