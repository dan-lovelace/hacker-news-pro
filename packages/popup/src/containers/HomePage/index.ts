import { TThemeInputs, TView } from "@hnp/types";

/**
 * Compares saved and unsaved theme inputs to determine if changes exist. We
 * need to consider inputs that may not have a template or may not exist at
 * all due to the user not having made any changes yet.
 * @param currentThemeInputs The selected theme's saved inputs
 * @param selectedThemeInputs The user's input changes to the selected theme
 * @returns Whether differences exist
 */
export async function getThemeInputsChanged(
  currentThemeInputs?: TThemeInputs,
  selectedThemeInputs?: Partial<TThemeInputs>,
) {
  for (const input in selectedThemeInputs) {
    switch (input) {
      case "components": {
        const components = selectedThemeInputs[input];

        if (!components) break;

        for (const component of components) {
          const { template } = component;
          const savedComponent = currentThemeInputs?.components.find(
            (c) => c.id === component.id,
          );

          if (template !== (savedComponent?.template ?? "")) {
            return true;
          }
        }

        break;
      }

      case "style": {
        const style = selectedThemeInputs[input];

        if (!style) break;

        for (const stylesheet of style.stylesheets) {
          const { template } = stylesheet;
          const savedStylesheet = currentThemeInputs?.style.stylesheets.find(
            (s) => s.id === stylesheet.id,
          );

          if (template !== (savedStylesheet?.template ?? "")) {
            return true;
          }
        }

        break;
      }

      case "views": {
        const views = selectedThemeInputs[input];

        if (!views) break;

        const changed = !(Object.keys(views) as TView[]).every(
          (v) =>
            (views[v]?.template ?? "") ===
            (currentThemeInputs?.views[v]?.template ?? ""),
        );

        if (changed) return true;

        break;
      }
    }
  }

  return false;
}

export { default } from "./HomePage";
