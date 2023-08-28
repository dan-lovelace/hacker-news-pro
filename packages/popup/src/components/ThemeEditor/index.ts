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

export { default as ComponentsInput } from "./ComponentsInput";
export { default as StyleInput } from "./StyleInput";
export { default as ViewInput } from "./ViewInput";
