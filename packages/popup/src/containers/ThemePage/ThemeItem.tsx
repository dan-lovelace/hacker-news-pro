import { useState } from "react";

import { applyTheme, fetchThemeData, storageSetByKeys } from "@hnp/core";
import { TTheme } from "@hnp/types";
import ClearIcon from "@mui/icons-material/Clear";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import {
  ClickAwayListener,
  IconButton,
  MenuItem,
  Stack,
  Typography,
} from "@mui/material";
import { useNavigate } from "react-router-dom";

import { useToastContext } from "../../contexts/toast";
import { ROUTES } from "../../lib/routes";

type ThemeItemProps = {
  customThemes?: TTheme[];
  editable?: boolean;
  selected: boolean;
  themeData: TTheme;
  setCurrentTheme: (newValue: TTheme) => void;
  setCustomThemes?: (newValue: TTheme[]) => void;
};

export default function ThemeItem({
  editable = false,
  selected,
  themeData,
  setCurrentTheme,
  setCustomThemes,
}: ThemeItemProps) {
  const [confirmingDelete, setConfirmingDelete] = useState<boolean>(false);
  const { notify } = useToastContext();
  const navigate = useNavigate();

  const handleCancelConfirmDelete = () => {
    setConfirmingDelete(false);
  };

  const handleConfirmDeleteClick = async () => {
    const { currentTheme, customThemes } = await fetchThemeData();
    const itemIdx = customThemes?.findIndex((t) => t.id === themeData.id) ?? -1;

    if (!customThemes || itemIdx < 0) {
      return notify("Error deleting theme");
    }

    customThemes.splice(itemIdx, 1);

    storageSetByKeys({
      CUSTOM_THEMES: customThemes,
      // unset current theme if it was deleted
      SELECTED_THEME_ID:
        currentTheme?.id === themeData.id ? null : currentTheme?.id,
    });

    setCustomThemes?.(customThemes);
    handleCancelConfirmDelete();
  };

  const handleDeleteClick = () => {
    setConfirmingDelete(true);
  };

  const handleEditClick = () => {
    applyTheme(themeData);
    navigate(ROUTES.EDITOR.path);
  };

  const handleThemeClick = () => {
    applyTheme(themeData);
    setCurrentTheme(themeData);
  };

  return (
    <Stack direction="row" spacing={1} sx={{ alignItems: "center" }}>
      <MenuItem
        selected={selected}
        onClick={handleThemeClick}
        sx={{ flex: "1 1 auto", overflow: "hidden" }}
      >
        <Typography
          variant="body1"
          sx={{
            overflow: "hidden",
            textOverflow: "ellipsis",
            width: "100%",
          }}
        >
          {themeData.label}
        </Typography>
      </MenuItem>
      {editable && (
        <Stack direction="row" spacing={1}>
          <IconButton
            aria-label="edit theme"
            title="Edit"
            onClick={handleEditClick}
          >
            <EditIcon />
          </IconButton>
          {confirmingDelete ? (
            <ClickAwayListener onClickAway={handleCancelConfirmDelete}>
              <IconButton
                aria-label="confirm delete theme"
                color="error"
                title="Confirm delete"
                onClick={handleConfirmDeleteClick}
              >
                <DeleteIcon />
              </IconButton>
            </ClickAwayListener>
          ) : (
            <IconButton
              aria-label="delete theme"
              title="Delete"
              onClick={handleDeleteClick}
            >
              <ClearIcon />
            </IconButton>
          )}
        </Stack>
      )}
    </Stack>
  );
}
