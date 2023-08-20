import { Components, Theme } from "@mui/material";

export const themeComponents: Components<Omit<Theme, "components">> = {
  MuiButton: {
    styleOverrides: {
      root: {
        textTransform: "none",
      },
    },
  },
  MuiButtonBase: {
    defaultProps: { disableRipple: true },
  },
  MuiInputBase: {
    defaultProps: { autoComplete: "off" },
  },
  MuiTab: {
    styleOverrides: {
      root: {
        textTransform: "none",
      },
    },
  },
};
