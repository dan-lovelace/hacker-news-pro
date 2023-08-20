function detectMac(): boolean {
  return Boolean(navigator.platform.match("Mac"));
}

export function getSaveShortcut() {
  return detectMac() ? "⌘ + S" : "Ctrl + S";
}

export function saveListener(event: KeyboardEvent, handleSave: () => void) {
  const triggerDown = detectMac() ? event.metaKey : event.ctrlKey;

  if (event.key.toLowerCase() === "s" && triggerDown) {
    event.preventDefault();
    handleSave();
  }
}

export * from "./ComponentsInput";
export * from "./StyleInput";
export * from "./TemplateInput";
