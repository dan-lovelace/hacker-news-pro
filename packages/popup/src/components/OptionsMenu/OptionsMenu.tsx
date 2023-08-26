import { MouseEvent, useState } from "react";

import BrushIcon from "@mui/icons-material/Brush";
import MenuIcon from "@mui/icons-material/Menu";
import SupportIcon from "@mui/icons-material/Support";
import {
  Box,
  Divider,
  IconButton,
  ListItemIcon,
  Menu,
  MenuItem,
} from "@mui/material";
import { Link } from "react-router-dom";

import { ROUTES } from "../../lib/routes";

export default function OptionsMenu() {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleItemClick = () => {
    handleClose();
  };

  const handleOpen = (event: MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <Box>
      <IconButton
        id="options-menu-button"
        aria-controls={open ? "options-menu" : undefined}
        aria-label="options menu"
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        onClick={handleOpen}
      >
        <MenuIcon />
      </IconButton>
      <Menu
        id="options-menu-button"
        anchorEl={anchorEl}
        aria-labelledby="options-menu"
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "right",
        }}
        disableScrollLock
        MenuListProps={{
          sx: {
            minWidth: 150,
          },
        }}
        open={open}
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        onClose={handleClose}
      >
        <Link to={ROUTES.HOME.path}>
          <MenuItem dense onClick={handleItemClick}>
            <ListItemIcon>
              <BrushIcon />
            </ListItemIcon>
            Themes
          </MenuItem>
        </Link>
        <Divider sx={{ my: 1 }} />
        <Link to={ROUTES.SUPPORT.path}>
          <MenuItem dense onClick={handleItemClick}>
            <ListItemIcon>
              <SupportIcon />
            </ListItemIcon>
            Support
          </MenuItem>
        </Link>
      </Menu>
    </Box>
  );
}
