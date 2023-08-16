import { browser, STORAGE_KEYS } from "@hnp/core";
import { TConfig, TCurrentTheme, TTheme } from "@hnp/types";

import defaultTheme from "./default";
import hackerNewsTheme from "./hackerNews";
import makoTheme from "./mako";
import rusticTheme from "./rustic";

const { CURRENT_THEME, CUSTOM_THEMES } = STORAGE_KEYS;

const helpTheme: TTheme = {
  id: "help",
  label: "Help",
  type: "premade",
  inputs: {
    comments: {
      partials: [],
      template: `<div>Error: No template found for view 'comments'. Use the editor to create one.</div>`,
    },
    style: "",
    subreddit: {
      partials: [],
      template: `<div>Error: No template found for view 'subreddit'. Use the editor to create one.</div>`,
    },
  },
};

export const premadeThemes = [
  defaultTheme,
  hackerNewsTheme,
  makoTheme,
  rusticTheme,
];

export function applyTheme(theme: TTheme) {
  const newTheme: TCurrentTheme = {
    id: theme.id,
    label: theme.label,
    type: theme.type,
  };

  browser.storage.local.set({
    [CURRENT_THEME]: newTheme,
  });
}

export async function getCurrentTheme(config: TConfig) {
  const storedCurrentTheme = await browser.storage.local.get(CURRENT_THEME);
  const currentTheme: TTheme = storedCurrentTheme[CURRENT_THEME];

  if (!currentTheme) {
    return null;
  }

  let returnTheme = helpTheme;

  switch (currentTheme.type) {
    case "custom": {
      // load from storage
      const storedCustomThemes = await browser.storage.local.get(CUSTOM_THEMES);
      const customThemes: TTheme[] = storedCustomThemes[CUSTOM_THEMES];

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
