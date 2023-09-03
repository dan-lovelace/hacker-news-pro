import { useState } from "react";

import { applyTheme, fetchThemeData, storageSetByKeys } from "@hnp/core";
import { TTheme } from "@hnp/types";
import ClearIcon from "@mui/icons-material/Clear";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import FileDownloadIcon from "@mui/icons-material/FileDownload";
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
  handleClone: (id: string) => void;
  setCurrentTheme: (newValue: TTheme) => void;
  setCustomThemes?: (newValue: TTheme[]) => void;
};

export default function ThemeItem({
  editable = false,
  selected,
  themeData,
  handleClone,
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

    if (currentTheme?.id === themeData.id) {
      // apply an empty theme if the current one was deleted
      applyTheme();
    }

    storageSetByKeys({
      CUSTOM_THEMES: customThemes,
    });

    setCustomThemes?.(customThemes);
    handleCancelConfirmDelete();
  };

  const handleCloneClick = async () => {
    handleClone(themeData.id);
  };

  const handleDeleteClick = () => {
    setConfirmingDelete(true);
  };

  const handleEditClick = () => {
    applyTheme(themeData);
    navigate(ROUTES.EDITOR.path);
  };

  const handleExportClick = () => {
    const href = `data:text/json;charset=utf-8,${encodeURIComponent(
      JSON.stringify(themeData),
    )}`;
    const anchor = document.createElement("a");

    anchor.setAttribute("href", href);
    anchor.setAttribute("download", `${themeData.id}.hnp`);
    document.body.appendChild(anchor);
    anchor.click();
    anchor.remove();
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
      <Stack direction="row" spacing={1}>
        {editable ? (
          <>
            <IconButton
              aria-label="edit theme"
              title="Edit"
              onClick={handleEditClick}
            >
              <EditIcon />
            </IconButton>
            <IconButton
              aria-label="export theme"
              title="Export"
              onClick={handleExportClick}
            >
              <FileDownloadIcon />
            </IconButton>
            <IconButton
              aria-label="clone theme"
              title="Clone"
              onClick={handleCloneClick}
            >
              <ContentCopyIcon />
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
          </>
        ) : (
          <>
            <IconButton
              aria-label="clone theme"
              title="Clone"
              onClick={handleCloneClick}
              sx={{ marginRight: "3rem !important" }}
            >
              <ContentCopyIcon />
            </IconButton>
          </>
        )}
      </Stack>
    </Stack>
  );
}
