import { useState } from "react";

import { applyTheme, storageGetByKey, storageSetByKeys } from "@hnp/core";
import { TCurrentTheme, TTheme } from "@hnp/types";
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
  setCurrentTheme: (newValue: TCurrentTheme) => void;
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
    const currentTheme = await storageGetByKey("CURRENT_THEME");
    const customThemes = await storageGetByKey("CUSTOM_THEMES");
    const themeIdx =
      customThemes?.findIndex((t: TTheme) => t.id === themeData.id) ?? -1;

    if (!customThemes || themeIdx < 0) {
      notify("Error deleting theme");
      return;
    }

    customThemes.splice(themeIdx, 1);

    storageSetByKeys({
      CUSTOM_THEMES: customThemes,
      // unset current theme if it was deleted
      CURRENT_THEME:
        currentTheme?.id === themeData.id ? undefined : currentTheme,
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
          <IconButton aria-label="edit" title="Edit" onClick={handleEditClick}>
            <EditIcon />
          </IconButton>
          {confirmingDelete ? (
            <ClickAwayListener onClickAway={handleCancelConfirmDelete}>
              <IconButton
                aria-label="confirm delete"
                color="error"
                title="Confirm delete"
                onClick={handleConfirmDeleteClick}
              >
                <DeleteIcon />
              </IconButton>
            </ClickAwayListener>
          ) : (
            <IconButton
              aria-label="delete"
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
