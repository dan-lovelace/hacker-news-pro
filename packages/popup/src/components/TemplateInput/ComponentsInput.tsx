import { ChangeEvent, MouseEvent, useEffect, useRef, useState } from "react";

import {
  storageGetByKey,
  storageRemoveByKeys,
  storageSetByKeys,
} from "@hnp/core";
import { TComponent } from "@hnp/types";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import InfoIcon from "@mui/icons-material/Info";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import {
  Alert,
  AlertTitle,
  Box,
  Button,
  Divider,
  IconButton,
  InputAdornment,
  InputLabel,
  List,
  ListItemButton,
  ListItemIcon,
  Menu,
  MenuItem,
  Modal,
  Stack,
  TextField,
  Tooltip,
  Typography,
  useTheme,
} from "@mui/material";
import { snakeCase } from "lodash";

import { getSaveShortcut, saveListener } from ".";
import { useToastContext } from "../../contexts/toast";
import CodeEditor from "../CodeEditor";

export function ComponentsInput() {
  const [componentsValue, setComponentsValue] = useState<TComponent[]>([]);
  const [editComponent, setEditComponent] = useState<TComponent>();
  const [isCreating, setIsCreating] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [initialized, setInitialized] = useState(false);
  const [menuAnchorEl, setMenuAnchorEl] = useState<null | HTMLElement>(null);
  const [modifyValue, setModifyValue] = useState<Partial<TComponent>>();
  const [selectedComponent, setSelectedComponent] = useState<TComponent>();
  const { transitions } = useTheme();
  const { notify } = useToastContext();

  const canSave = () => modifyValue?.name?.trim() && modifyValue?.label?.trim();
  const menuOpen = Boolean(menuAnchorEl);
  const modifyText = isCreating ? "Create" : "Edit";
  const saveShortcut = getSaveShortcut();

  // state references to use when handling save by keyboard shortcut
  const componentsValueRef = useRef<TComponent[]>();
  componentsValueRef.current = componentsValue;
  const selectedComponentRef = useRef<TComponent>();
  selectedComponentRef.current = selectedComponent;

  useEffect(() => {
    async function init() {
      const currentComponents = (await storageGetByKey("COMPONENTS")) || [];
      const currentSelected = await storageGetByKey("SELECTED_COMPONENT");

      if (!currentComponents) {
        return notify("Error loading components");
      }

      setComponentsValue(currentComponents);
      setSelectedComponent(currentSelected);
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

  const getComponentByName = (name: string) => {
    const componentIdx =
      componentsValue.findIndex((c) => c.name === name) ?? -1;

    if (componentIdx < 0) return undefined;

    return componentsValue[componentIdx];
  };

  const getMenuAnchorElName = () => {
    return menuAnchorEl?.getAttribute("name") ?? "";
  };

  const handleComponentClick = (name: string) => () => {
    const component = getComponentByName(name);

    if (!component) {
      return notify("Error selecting component");
    }

    setSelectedComponent(component);
    storageSetByKeys({
      SELECTED_COMPONENT: component,
    });
  };

  const handleDeleteClick = () => {
    const name = getMenuAnchorElName();
    const componentIdx =
      componentsValue.findIndex((c) => c.name === name) ?? -1;

    if (componentIdx < 0) {
      return notify("Error deleting component");
    }

    const newComponentsValue = [...componentsValue];
    newComponentsValue.splice(componentIdx, 1);

    if (selectedComponent?.name === name) {
      setSelectedComponent(undefined);
      storageRemoveByKeys("SELECTED_COMPONENT");
    }

    setMenuAnchorEl(null);
    setComponentsValue(newComponentsValue);
    storageSetByKeys({
      COMPONENTS: newComponentsValue,
    });
  };

  const handleEditClick = () => {
    const name = getMenuAnchorElName();
    const component = getComponentByName(name);

    if (!component) {
      return notify("Error editing component");
    }

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
    let newValue = value;

    if (name === "name") {
      if (!newValue.endsWith("_")) {
        newValue = snakeCase(newValue);
      }
    }

    setModifyValue({
      ...modifyValue,
      [name]: newValue,
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

  const handleModifySave = () => {
    if (!canSave()) {
      return notify("Error creating component");
    }

    const label = modifyValue?.label?.trim() ?? "";
    const name = snakeCase(modifyValue?.name?.trim()) ?? "";

    const newComponentsValue: TComponent[] = [...componentsValue];
    if (isEditing) {
      if (
        componentsValue.some(
          (c) => c.name !== editComponent?.name && c.name === name,
        )
      ) {
        return notify(`A component with the name ${name} already exists`);
      }

      const componentIdx = newComponentsValue.findIndex(
        (c) => c.name === editComponent?.name,
      );

      if (!editComponent || componentIdx < 0) {
        return notify("Error editing component");
      }

      const updatedFields = {
        label,
        name,
      };

      newComponentsValue[componentIdx] = {
        ...newComponentsValue[componentIdx],
        ...updatedFields,
      };

      if (selectedComponent?.name === editComponent.name) {
        // updating the selected component
        const newSelectedComponent: TComponent = {
          ...editComponent,
          ...updatedFields,
        };

        setSelectedComponent(newSelectedComponent);
        storageSetByKeys({
          SELECTED_COMPONENT: newSelectedComponent,
        });
      }
    } else {
      if (componentsValue.some((c) => c.name === name)) {
        return notify(`A component with the name ${name} already exists`);
      }

      const newPartial: TComponent = {
        label,
        name,
        template: "",
      };
      newComponentsValue.push(newPartial);

      /**
       * @note Careful not to throw away unsaved changes. Only update selected
       * if this new one is the only one that exists.
       */
      if (newComponentsValue.length === 1) {
        setSelectedComponent(newPartial);
        storageSetByKeys({
          SELECTED_COMPONENT: newPartial,
        });
      }
    }

    setComponentsValue(newComponentsValue);
    storageSetByKeys({
      COMPONENTS: newComponentsValue,
    });
    handleModalClose();
  };

  const handleNewClick = () => {
    const label = "New Component";

    setModifyValue({
      label,
      name: snakeCase(label),
      template: "",
    });
    setIsCreating(true);
  };

  const handleTemplateChange = (newValue: string) => {
    if (!selectedComponent) return;

    const newSelectedComponent: TComponent = {
      ...selectedComponent,
      template: newValue,
    };

    setSelectedComponent(newSelectedComponent);
  };

  const handleTemplateSave = async () => {
    const { current: currentSelectedComponent } = selectedComponentRef;

    if (!currentSelectedComponent) return;

    const newComponentsValue = [...(componentsValueRef.current || [])];
    const componentIdx =
      newComponentsValue?.findIndex(
        (c) => c.name === currentSelectedComponent.name,
      ) ?? -1;

    if (componentIdx < 0) {
      return notify("Error saving template");
    }

    newComponentsValue[componentIdx] = currentSelectedComponent;

    setComponentsValue(newComponentsValue);
    storageSetByKeys({
      COMPONENTS: newComponentsValue,
    });
  };

  if (!initialized) return <></>;

  if (!componentsValue.length && !isCreating) {
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
      <Stack direction="row" spacing={1}>
        <Box>
          <List sx={{ width: 250 }}>
            {componentsValue.map(({ label, name, template }) => {
              const selected = selectedComponent?.name === name;
              const modified =
                selected && template !== selectedComponent.template;

              return (
                <Stack
                  key={name}
                  direction="row"
                  spacing={1}
                  sx={{ alignItems: "center" }}
                >
                  <ListItemButton
                    selected={selected}
                    onClick={handleComponentClick(name)}
                    sx={{
                      flex: "1 1 auto",
                      position: "relative",
                      whiteSpace: "nowrap",
                    }}
                  >
                    <Stack
                      title={`Label: ${label}\nName: ${name}`}
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
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                        }}
                      >
                        {name}
                      </Typography>
                      <Box
                        sx={{
                          bgcolor: "info.main",
                          borderRadius: "100%",
                          height: 8,
                          opacity: modified ? 1 : 0,
                          position: "absolute",
                          right: "0.5rem",
                          top: "50%",
                          transform: "translateY(-50%)",
                          transition: `all ${transitions.duration.shortest}ms ${transitions.easing.easeInOut}`,
                          width: 8,
                        }}
                      />
                    </Stack>
                  </ListItemButton>
                  <IconButton
                    id="component-menu-button"
                    aria-controls={menuOpen ? "component-menu" : undefined}
                    aria-label="component options menu"
                    aria-haspopup="true"
                    aria-expanded={menuOpen ? "true" : undefined}
                    name={name}
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
          <Box sx={{ flex: "1 1 auto" }}>
            <InputLabel shrink>
              <strong>Usage:</strong> {`{{> ${selectedComponent.name}}}`}
            </InputLabel>
            <CodeEditor
              id="css"
              language="css"
              value={selectedComponent.template}
              handleChange={handleTemplateChange}
              handleSave={handleTemplateSave}
            />
            <Button
              variant="contained"
              fullWidth
              disabled={Boolean(!componentsValue)}
              onClick={handleTemplateSave}
            >
              Save ({saveShortcut})
            </Button>
          </Box>
        )}
      </Stack>
      <Modal open={isCreating || isEditing} onClose={handleModalClose}>
        <Box
          sx={{
            bgcolor: "background.paper",
            border: "1px solid",
            borderColor: "primary.main",
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
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <Tooltip title="Must follow snake case convention">
                      <InfoIcon />
                    </Tooltip>
                  </InputAdornment>
                ),
              }}
              fullWidth
              label="Name"
              name="name"
              size="small"
              required
              value={modifyValue?.name ?? ""}
              onChange={handleModifyChange}
              onKeyDown={handleModalInputKeyDown}
            />
            <Button
              disabled={!canSave()}
              fullWidth
              type="submit"
              variant="contained"
              onClick={handleModifySave}
            >
              {modifyText}
            </Button>
          </Stack>
        </Box>
      </Modal>
    </>
  );
}
