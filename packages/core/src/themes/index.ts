import { storageGetByKey, storageSetByKeys } from "@hnp/core";
import { TConfig, TTheme } from "@hnp/types";

import defaultTheme from "./default";

const helpTheme: TTheme = {
  id: "help",
  label: "Help",
  type: "premade",
  inputs: {
    style: "",
    components: [],
    item: {
      template: `<div>Error: No template found for view 'item'. Use the editor to create one.</div>`,
    },
    list: {
      template: `<div>Error: No template found for view 'list'. Use the editor to create one.</div>`,
    },
    jobs: {
      template: "",
    },
    other: {
      template: "",
    },
    submit: {
      template: "",
    },
    user: {
      template: "",
    },
  },
};

export const premadeThemes = [defaultTheme];

export function applyTheme(theme: TTheme) {
  return storageSetByKeys({ SELECTED_THEME_ID: theme.id });
}

export async function fetchComponentsData() {
  const { currentTheme } = await fetchThemeData();
  const storedSelectedComponent = await storageGetByKey(
    "SELECTED_COMPONENT_ID",
  );
  const currentIdx =
    currentTheme?.inputs.components.findIndex(
      (c) => c.id === storedSelectedComponent,
    ) ?? -1;

  return {
    currentComponent:
      currentIdx > -1 ? currentTheme?.inputs.components[currentIdx] : undefined,
    currentComponentIndex: currentIdx,
    currentThemeComponents: currentTheme?.inputs.components,
  };
}

/**
 * Fetches various theme data from storage. Useful for converting the selected
 * theme into a TTheme object, getting its location within the list of custom
 * themes and getting all custom themes.
 */
export async function fetchThemeData() {
  const storedSelectedTheme = await storageGetByKey("SELECTED_THEME_ID");
  const storedCustomThemes = await storageGetByKey("CUSTOM_THEMES");
  const currentIdx =
    storedCustomThemes?.findIndex((t) => t.id === storedSelectedTheme) ?? -1;

  let currentTheme;
  if (currentIdx > -1) {
    // selected theme found in custom themes
    currentTheme = storedCustomThemes?.[currentIdx];
  } else {
    // selected theme must be premade, look it up
    currentTheme = premadeThemes.find((t) => t.id === storedSelectedTheme);
  }

  return {
    currentTheme,
    currentThemeIndex: currentIdx,
    customThemes: storedCustomThemes,
  };
}

export async function getCurrentTheme(config: TConfig) {
  const { currentTheme, customThemes } = await fetchThemeData();

  if (!currentTheme) {
    return undefined;
  }

  let returnTheme = helpTheme;

  switch (currentTheme.type) {
    case "custom": {
      if (customThemes && customThemes.length) {
        const customTheme = customThemes.find((t) => t.id === currentTheme?.id);

        if (customTheme && customTheme.inputs[config.view].template) {
          returnTheme = customTheme;
        }
      }
      break;
    }

    case "premade": {
      const premadeTheme = premadeThemes.find((t) => t.id === currentTheme?.id);

      if (premadeTheme && premadeTheme.inputs[config.view].template) {
        returnTheme = premadeTheme;
      }
      break;
    }

    default:
      throw new Error("Unknown current theme type");
  }

  return returnTheme;
}
