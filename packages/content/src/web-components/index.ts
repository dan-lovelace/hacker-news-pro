import initInteraction from "./Interaction";

export async function initializeWebComponents() {
  await import("./polyfill/webcomponents-bundle.js");

  initInteraction();
}
