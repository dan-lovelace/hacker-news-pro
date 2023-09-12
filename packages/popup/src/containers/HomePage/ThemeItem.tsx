import { useState } from "react";

import { applyTheme, fetchThemeData, storageSetByKeys } from "@hnp/core";
import { TTheme } from "@hnp/types";
import ClearIcon from "@mui/icons-material/Clear";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import FileDownloadIcon from "@mui/icons-material/FileDownload";
import WarningAmberIcon from "@mui/icons-material/WarningAmber";
import {
  Box,
  Button,
  ClickAwayListener,
  IconButton,
  MenuItem,
  Stack,
  Typography,
} from "@mui/material";
import { isEqual, omit } from "lodash";
import { useNavigate } from "react-router-dom";

import { Modal } from "../../components/Modal";
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
  const [confirmingApply, setConfirmingApply] = useState(false);
  const [confirmingDelete, setConfirmingDelete] = useState(false);
  const { notify } = useToastContext();
  const navigate = useNavigate();

  const applySelectedTheme = (navigateAfter = false) => {
    applyTheme(themeData);
    setCurrentTheme(themeData);

    if (navigateAfter) {
      navigate(ROUTES.EDITOR.path);
    }
  };

  const handleCancelConfirmDelete = () => {
    setConfirmingDelete(false);
  };

  const handleConfirmApplyClick = () => {
    handleModalClose();
    applySelectedTheme();
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
    handleThemeChange(true);
  };

  const handleExportClick = () => {
    const href = `data:text/json;charset=utf-8,${encodeURIComponent(
      JSON.stringify(themeData),
    )}`;
    const anchor = document.createElement("a");

    anchor.setAttribute("href", href);
    anchor.setAttribute("download", `hnp-theme_${themeData.id}.json`);
    document.body.appendChild(anchor);
    anchor.click();
    anchor.remove();
  };

  const handleModalClose = () => {
    setConfirmingApply(false);
  };

  const handleThemeChange = async (navigateAfter = false) => {
    const { currentTheme, selectedThemeInputs } = await fetchThemeData();

    /**
     * Warn the user if unsaved changes are about to be lost.
     * @remarks
     * Omit certain input properties that are applied immediately such as the
     * style's `darkMode` option.
     */
    const inputsToOmit = ["style.options"];

    if (
      currentTheme?.type !== "premade" &&
      !isEqual(
        omit(currentTheme?.inputs, inputsToOmit),
        omit(selectedThemeInputs, inputsToOmit),
      )
    ) {
      return setConfirmingApply(true);
    }

    applySelectedTheme(navigateAfter);
  };

  return (
    <>
      <Stack direction="row" spacing={1} sx={{ alignItems: "center" }}>
        <MenuItem
          selected={selected}
          onClick={() => handleThemeChange()}
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
      <Modal open={confirmingApply} onClose={handleModalClose}>
        <Box
          sx={{
            bgcolor: "background.paper",
            border: "1px solid",
            borderColor: "primary.main",
            borderRadius: 1,
            left: "50%",
            padding: 2,
            position: "absolute",
            top: "50%",
            transform: "translate(-50%, -50%)",
            width: 300,
          }}
        >
          <Typography
            variant="h6"
            sx={{ display: "flex", alignItems: "center", mb: 2 }}
          >
            <WarningAmberIcon color="warning" sx={{ mr: 1 }} />
            Caution
          </Typography>
          <Typography variant="subtitle2" sx={{ mb: 1 }}>
            Your selected theme has unsaved changes that will be lost when
            changing themes. Are you sure you want to proceed?
          </Typography>
          <Stack direction="row" spacing={1} sx={{ justifyContent: "end" }}>
            <Button variant="text" onClick={handleModalClose}>
              Cancel
            </Button>
            <Button variant="contained" onClick={handleConfirmApplyClick}>
              Proceed
            </Button>
          </Stack>
        </Box>
      </Modal>
    </>
  );
}
