import { storageGetByKey, storageSetByKeys } from "@hnp/core";
import { TConfig, TCurrentTheme, TTheme } from "@hnp/types";

import defaultTheme from "./default";

const helpTheme: TTheme = {
  id: "help",
  label: "Help",
  type: "premade",
  inputs: {
    style: "",
    item: {
      partials: [],
      template: `<div>Error: No template found for view 'item'. Use the editor to create one.</div>`,
    },
    list: {
      partials: [],
      template: `<div>Error: No template found for view 'list'. Use the editor to create one.</div>`,
    },
    jobs: {
      template: "",
      partials: [],
    },
    other: {
      template: "",
      partials: [],
    },
    submit: {
      template: "",
      partials: [],
    },
    user: {
      template: "",
      partials: [],
    },
  },
};

export const premadeThemes = [defaultTheme];

export function applyTheme(theme: TTheme) {
  const newTheme: TCurrentTheme = {
    id: theme.id,
    label: theme.label,
    type: theme.type,
  };

  return storageSetByKeys({ CURRENT_THEME: newTheme });
}

export async function getCurrentTheme(config: TConfig) {
  const currentTheme = await getStoredTheme();

  if (!currentTheme) {
    return undefined;
  }

  let returnTheme = helpTheme;

  switch (currentTheme.type) {
    case "custom": {
      // load from storage
      const customThemes = await storageGetByKey("CUSTOM_THEMES");

      if (customThemes && customThemes.length) {
        const customTheme = customThemes.find((t) => t.id === currentTheme.id);

        if (customTheme && customTheme.inputs[config.view].template) {
          returnTheme = customTheme;
        }
      }
      break;
    }

    case "premade": {
      // load from premade themes
      const premadeTheme = premadeThemes.find((t) => t.id === currentTheme.id);

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

export function getStoredTheme() {
  return storageGetByKey("CURRENT_THEME");
}

export function setStoredTheme(theme: TCurrentTheme) {
  return storageSetByKeys({ CURRENT_THEME: theme });
}
