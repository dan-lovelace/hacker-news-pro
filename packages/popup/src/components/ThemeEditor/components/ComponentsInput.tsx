import { ChangeEvent, MouseEvent, useEffect, useRef, useState } from "react";

import {
  fetchComponentsData,
  fetchThemeData,
  storageRemoveByKeys,
  storageSetByKeys,
} from "@hnp/core";
import {
  TComponentInput,
  TSelectedThemeInputs,
  TThemeInputs,
} from "@hnp/types";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline";
import SaveIcon from "@mui/icons-material/Save";
import {
  Alert,
  AlertTitle,
  Box,
  Button,
  Divider,
  IconButton,
  List,
  ListItemButton,
  ListItemIcon,
  Menu,
  MenuItem,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { snakeCase } from "lodash";

import { LEFT_COLUMN_WIDTH, getSaveShortcut, saveListener } from "..";
import { useToastContext } from "../../../contexts/toast";
import CodeEditor from "../../CodeEditor";
import { Modal } from "../../Modal";
import ModifiedIndicator from "../ModifiedIndicator";

const saveShortcut = getSaveShortcut();

export default function ComponentsInput() {
  const [editComponent, setEditComponent] = useState<TComponentInput>();
  const [initialized, setInitialized] = useState(false);
  const [isCreating, setIsCreating] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [menuAnchorEl, setMenuAnchorEl] = useState<null | HTMLElement>(null);
  const [modifyValue, setModifyValue] = useState<Partial<TComponentInput>>();
  const [savedThemeInputs, setSavedThemeInputs] = useState<TThemeInputs>();
  const [selectedComponent, setSelectedComponent] = useState<TComponentInput>();
  const [unsavedThemeInputs, setUnsavedThemeInputs] =
    useState<TSelectedThemeInputs>();
  const { notify } = useToastContext();

  const canSave = () => modifyValue?.id?.trim() && modifyValue?.label?.trim();
  const codeEditorValue =
    unsavedThemeInputs?.components?.find((c) => c.id === selectedComponent?.id)
      ?.template ??
    savedThemeInputs?.components?.find((c) => c.id === selectedComponent?.id)
      ?.template ??
    "";
  const menuOpen = Boolean(menuAnchorEl);
  const modifyText = isCreating ? "Create" : "Edit";

  // state references to use when handling save by keyboard shortcut
  const savedThemeInputsRef = useRef<TThemeInputs>();
  savedThemeInputsRef.current = savedThemeInputs;
  const selectedComponentRef = useRef<TComponentInput>();
  selectedComponentRef.current = selectedComponent;

  useEffect(() => {
    async function init() {
      const { selectedComponent: storedSelectedComponent } =
        await fetchComponentsData();
      const { currentTheme, selectedThemeInputs } = await fetchThemeData();

      if (!currentTheme) {
        return notify("Error loading current theme");
      }

      setSavedThemeInputs(currentTheme?.inputs);
      setUnsavedThemeInputs(selectedThemeInputs);
      setSelectedComponent(storedSelectedComponent);
      setInitialized(true);
    }

    init();

    // configure save hotkey
    const keyDownListener = (event: KeyboardEvent) => {
      saveListener(event, handleTemplateSave);
    };

    document.addEventListener("keydown", keyDownListener);

    return () => {
      document.removeEventListener("keydown", keyDownListener);
    };
  }, []);

  const getComponentById = (id: string) => {
    const unsavedThemeInputsIdx =
      unsavedThemeInputs?.components?.findIndex((c) => c.id === id) ?? -1;

    if (unsavedThemeInputsIdx > -1) {
      return unsavedThemeInputs?.components?.[unsavedThemeInputsIdx];
    }

    const savedThemeInputsIdx =
      savedThemeInputs?.components?.findIndex((c) => c.id === id) ?? -1;

    if (savedThemeInputsIdx > -1) {
      return savedThemeInputs?.components?.[savedThemeInputsIdx];
    }

    return undefined;
  };

  const getMenuAnchorElName = () => {
    return menuAnchorEl?.getAttribute("name") ?? "";
  };

  const handleComponentClick = (id: string) => () => {
    const newComponent = getComponentById(id);

    if (!newComponent) {
      return notify("Error selecting component");
    }

    setSelectedComponent(newComponent);
    storageSetByKeys({
      SELECTED_COMPONENT_ID: newComponent.id,
    });
  };

  const handleDeleteClick = async () => {
    const id = getMenuAnchorElName();
    const componentIdx =
      savedThemeInputs?.components?.findIndex((c) => c.id === id) ?? -1;

    if (!savedThemeInputs || componentIdx < 0) {
      return notify("Error deleting component");
    }

    const newComponentsValue = [...savedThemeInputs.components];
    newComponentsValue.splice(componentIdx, 1);

    if (selectedComponent?.id === id) {
      setSelectedComponent(undefined);
      storageRemoveByKeys("SELECTED_COMPONENT_ID");
    }

    const { customThemes, selectedCustomThemeIndex } = await fetchThemeData();
    if (customThemes && selectedCustomThemeIndex > -1) {
      customThemes[selectedCustomThemeIndex].inputs.components =
        newComponentsValue;
    }

    const newThemeInputs: TThemeInputs = {
      ...savedThemeInputs,
      components: newComponentsValue,
    };

    setMenuAnchorEl(null);
    setSavedThemeInputs(newThemeInputs);
    setUnsavedThemeInputs(newThemeInputs);
    storageSetByKeys({
      CUSTOM_THEMES: customThemes,
      SELECTED_THEME_INPUTS: newThemeInputs,
    });
  };

  const handleDiscardChanges = async () => {
    const newComponents = [...(unsavedThemeInputs?.components || [])];
    const componentIdx = newComponents.findIndex(
      (c) => c.id === selectedComponent?.id,
    );

    if (componentIdx < 0) return notify("Error locating component");

    const originalComponent = savedThemeInputs?.components.find(
      (c) => c.id === selectedComponent?.id,
    );

    if (!originalComponent) return notify("Error locating original component");

    newComponents[componentIdx].template = originalComponent.template;

    const newSelectedThemeInputs: TSelectedThemeInputs = {
      ...unsavedThemeInputs,
      components: newComponents,
    };

    setUnsavedThemeInputs(newSelectedThemeInputs);
    storageSetByKeys({
      SELECTED_THEME_INPUTS: newSelectedThemeInputs,
    });
  };

  const handleEditClick = () => {
    const id = getMenuAnchorElName();
    const component = getComponentById(id);

    if (!component) return notify("Error editing component");

    setMenuAnchorEl(null);
    setModifyValue(component);
    setEditComponent(component);
    setIsEditing(true);
  };

  const handleMenuClose = () => {
    setMenuAnchorEl(null);
  };

  const handleMenuOpen = (event: MouseEvent<HTMLButtonElement>) => {
    setMenuAnchorEl(event.currentTarget);
  };

  const handleModalClose = () => {
    setIsCreating(false);
    setIsEditing(false);
  };

  const handleModifyChange = ({
    target: { name, value },
  }: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setModifyValue({
      ...modifyValue,
      [name]: value,
      id: snakeCase(value),
    });
  };

  const handleModalInputKeyDown = (
    event: React.KeyboardEvent<HTMLDivElement>,
  ) => {
    if (event.key === "Enter") {
      event.preventDefault();
      handleModifySave();
    }
  };

  const handleModifySave = async () => {
    if (!canSave() || !savedThemeInputs) {
      return notify("Error saving component");
    }

    const label = modifyValue?.label?.trim() ?? "";
    const id = snakeCase(label) ?? "";
    const newComponentsValue = [...(unsavedThemeInputs?.components || [])];

    if (isEditing) {
      // user is editing an existing component
      if (
        newComponentsValue.some(
          (c) => c.id !== editComponent?.id && c.id === id,
        )
      ) {
        return notify(`A component with the name '${id}' already exists`, {
          severity: "warning",
        });
      }

      const componentIdx = newComponentsValue.findIndex(
        (c) => c.id === editComponent?.id,
      );

      if (!editComponent || componentIdx < 0) {
        return notify("Error editing component");
      }

      const updatedFields: Partial<TComponentInput> = {
        label,
        id,
      };

      newComponentsValue[componentIdx] = {
        ...newComponentsValue[componentIdx],
        ...updatedFields,
      };

      if (selectedComponent?.id === editComponent.id) {
        // user is updating the selected component
        const newSelectedComponent: TComponentInput = {
          ...editComponent,
          ...updatedFields,
        };
        setSelectedComponent(newSelectedComponent);
        storageSetByKeys({
          SELECTED_COMPONENT_ID: newSelectedComponent.id,
        });
      }
    } else {
      // user is creating a new component
      if (newComponentsValue?.some((c) => c.id === id)) {
        return notify(`A component with the name '${id}' already exists`, {
          severity: "warning",
        });
      }

      const newComponent: TComponentInput = {
        label,
        id: id,
        template: "",
      };

      newComponentsValue.push(newComponent);

      // only select the new component if no others exist
      if (newComponentsValue.length === 1) {
        setSelectedComponent(newComponent);
        storageSetByKeys({
          SELECTED_COMPONENT_ID: newComponent.id,
        });
      }
    }

    const sortedComponents = newComponentsValue.sort((a, b) =>
      a.label.localeCompare(b.label),
    );
    const { customThemes, selectedCustomThemeIndex } = await fetchThemeData();

    if (customThemes && selectedCustomThemeIndex > -1) {
      customThemes[selectedCustomThemeIndex].inputs.components =
        sortedComponents;
    }

    const newUnsavedThemeInputs = {
      ...unsavedThemeInputs,
      components: sortedComponents,
    };

    setSavedThemeInputs({
      ...savedThemeInputs,
      components: sortedComponents,
    });
    setUnsavedThemeInputs(newUnsavedThemeInputs);
    storageSetByKeys({
      CUSTOM_THEMES: customThemes,
      SELECTED_THEME_INPUTS: newUnsavedThemeInputs,
    });
    handleModalClose();
  };

  const handleNewClick = () => {
    const label = "New Component";

    setModifyValue({
      label,
      id: snakeCase(label),
      template: "",
    });
    setIsCreating(true);
  };

  const handleTemplateChange = async (newValue: string) => {
    const unsavedComponentIndex =
      unsavedThemeInputs?.components?.findIndex(
        (c) => c.id === selectedComponent?.id,
      ) ?? -1;

    if (!selectedComponent || unsavedComponentIndex < 0) {
      return notify("Error modifying component template");
    }

    const newComponents = [...(unsavedThemeInputs?.components || [])];
    newComponents[unsavedComponentIndex].template = newValue;
    const newUnsavedThemeInputs: TSelectedThemeInputs = {
      ...unsavedThemeInputs,
      components: newComponents,
    };

    setSelectedComponent({
      ...selectedComponent,
      template: newValue,
    });
    setUnsavedThemeInputs(newUnsavedThemeInputs);
    storageSetByKeys({
      SELECTED_THEME_INPUTS: newUnsavedThemeInputs,
    });
  };

  const handleTemplateSave = async () => {
    const saveIdx =
      savedThemeInputsRef.current?.components.findIndex(
        (c) => c.id === selectedComponentRef.current?.id,
      ) ?? -1;

    if (
      !savedThemeInputsRef.current ||
      !selectedComponentRef.current ||
      saveIdx < 0
    ) {
      return notify("Error saving template");
    }

    const newComponents = [...(savedThemeInputsRef.current.components || [])];
    newComponents[saveIdx] = selectedComponentRef.current;
    const { customThemes, selectedCustomThemeIndex } = await fetchThemeData();

    if (customThemes && selectedCustomThemeIndex > -1) {
      customThemes[selectedCustomThemeIndex].inputs.components = newComponents;
    }

    setSavedThemeInputs({
      ...savedThemeInputsRef.current,
      components: newComponents,
    });
    storageSetByKeys({
      CUSTOM_THEMES: customThemes,
    });
  };

  if (!initialized) return <></>;

  if (!savedThemeInputs?.components?.length && !isCreating) {
    return (
      <Alert severity="info">
        <AlertTitle>No components</AlertTitle>
        <Box sx={{ mb: 1 }}>
          Components are templates that can be reused across multiple views.
          Create a new one to get started.
        </Box>
        <Button variant="outlined" onClick={handleNewClick}>
          Create new
        </Button>
      </Alert>
    );
  }

  return (
    <>
      <Stack
        className="components-input"
        direction="row"
        spacing={1}
        sx={{ height: "100%" }}
      >
        <Box>
          <List dense sx={{ width: LEFT_COLUMN_WIDTH }}>
            {savedThemeInputs?.components.map(({ label, id, template }) => {
              const isSelected = selectedComponent?.id === id;
              const selectedThemeInput = unsavedThemeInputs?.components?.find(
                (c) => c.id === id,
              );
              const modified =
                selectedThemeInput !== undefined &&
                template !== selectedThemeInput.template;

              return (
                <Stack
                  key={id}
                  direction="row"
                  spacing={1}
                  sx={{ alignItems: "center" }}
                >
                  <ListItemButton
                    selected={isSelected}
                    onClick={handleComponentClick(id)}
                    sx={{
                      flex: "1 1 auto",
                      position: "relative",
                      whiteSpace: "nowrap",
                    }}
                  >
                    <Stack
                      title={`Label: ${label}\nName: ${id}`}
                      sx={{ overflow: "hidden" }}
                    >
                      <Box
                        sx={{
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                        }}
                      >
                        {label}
                      </Box>
                      <Typography
                        variant="subtitle2"
                        sx={{
                          color: "text.secondary",
                          fontSize: "0.75rem",
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                        }}
                      >
                        {id}
                      </Typography>
                      <ModifiedIndicator modified={modified} />
                    </Stack>
                  </ListItemButton>
                  <IconButton
                    id="component-menu-button"
                    aria-controls={menuOpen ? "component-menu" : undefined}
                    aria-label="component options menu"
                    aria-haspopup="true"
                    aria-expanded={menuOpen ? "true" : undefined}
                    name={id}
                    onClick={handleMenuOpen}
                  >
                    <MoreVertIcon />
                  </IconButton>
                </Stack>
              );
            })}
          </List>
          <Menu
            id="component-menu"
            anchorEl={menuAnchorEl}
            aria-labelledby="component-menu-button"
            disableScrollLock
            MenuListProps={{
              sx: {
                minWidth: 150,
              },
            }}
            open={menuOpen}
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "right",
            }}
            transformOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
            onClose={handleMenuClose}
          >
            <MenuItem dense onClick={handleEditClick}>
              <ListItemIcon>
                <EditIcon />
              </ListItemIcon>
              Edit
            </MenuItem>
            <Divider />
            <MenuItem dense onClick={handleDeleteClick}>
              <ListItemIcon>
                <DeleteIcon />
              </ListItemIcon>
              Delete
            </MenuItem>
          </Menu>
          <IconButton aria-label="add new component" onClick={handleNewClick}>
            <AddIcon />
          </IconButton>
        </Box>
        {selectedComponent && (
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              flex: "1 1 auto",
            }}
          >
            <Typography variant="caption">
              <strong>Basic usage:</strong>{" "}
              <code>{`{{> ${selectedComponent.id}}}`}</code>
            </Typography>
            <CodeEditor
              language="handlebars"
              value={codeEditorValue}
              handleChange={handleTemplateChange}
              handleSave={handleTemplateSave}
            />
            <Stack direction="row" spacing={1} sx={{ justifyContent: "end" }}>
              <Button
                color="warning"
                disabled={
                  savedThemeInputs?.components?.find(
                    (c) => c.id === selectedComponent.id,
                  )?.template ===
                  unsavedThemeInputs?.components?.find(
                    (c) => c.id === selectedComponent.id,
                  )?.template
                }
                startIcon={<RemoveCircleOutlineIcon />}
                variant="text"
                onClick={handleDiscardChanges}
              >
                Discard changes
              </Button>
              <Button
                startIcon={<SaveIcon />}
                variant="contained"
                onClick={handleTemplateSave}
              >
                Save ({saveShortcut})
              </Button>
            </Stack>
          </Box>
        )}
      </Stack>
      <Modal open={isCreating || isEditing} onClose={handleModalClose}>
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
          <Typography variant="h6" sx={{ mb: 2 }}>
            {modifyText} component
          </Typography>
          <Stack spacing={2}>
            <TextField
              fullWidth
              label="Label"
              name="label"
              size="small"
              required
              value={modifyValue?.label ?? ""}
              onChange={handleModifyChange}
              onKeyDown={handleModalInputKeyDown}
            />
            <TextField
              disabled
              fullWidth
              label="Name"
              name="id"
              size="small"
              value={modifyValue?.id ?? ""}
            />
            <Stack direction="row" spacing={2}>
              <Button
                disabled={!canSave()}
                fullWidth
                type="submit"
                variant="contained"
                onClick={handleModifySave}
              >
                {isCreating ? "Create" : "Save"}
              </Button>
              <Button fullWidth variant="outlined" onClick={handleModalClose}>
                Cancel
              </Button>
            </Stack>
          </Stack>
        </Box>
      </Modal>
    </>
  );
}
