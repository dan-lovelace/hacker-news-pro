export const LEFT_COLUMN_WIDTH = 225;

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

export { ComponentsInput } from "./components";
export { StyleInput } from "./style";
export { ViewsInput } from "./views";
