import {
  storageGetByKey,
  storageRemoveByKeys,
  storageSetByKeys,
} from "@hnp/core";
import { TConfig, TStorage, TStorageKeyMap, TTheme } from "@hnp/types";
import { z } from "zod";

import defaultTheme from "./default";
import magellanTheme from "./magellan";
import technicaTheme from "./technica";
import vanillaTheme from "./vanilla";

const helpTheme: TTheme = {
  id: "help",
  inputs: {
    style: {
      options: {
        darkMode: false,
      },
      template: "",
    },
    components: [],
    views: {},
  },
  label: "Help",
  options: {
    disableHNStyle: true,
  },
  type: "premade",
  version: "1.0.0",
};

export const premadeThemes = [
  defaultTheme,
  magellanTheme,
  technicaTheme,
  vanillaTheme,
];

export async function applyTheme(theme?: TTheme) {
  if (!theme) {
    return storageRemoveByKeys([
      "SELECTED_COMPONENT_ID",
      "SELECTED_THEME_ID",
      "SELECTED_VIEW",
    ]);
  }

  const firstComponentId = theme.inputs.components.length
    ? theme.inputs.components[0].id
    : undefined;
  const keysToRemove: Array<keyof TStorageKeyMap> = ["SELECTED_VIEW"];

  if (!firstComponentId) {
    keysToRemove.push("SELECTED_COMPONENT_ID");
  }

  await storageRemoveByKeys(keysToRemove);

  const keysToSet: TStorage = {
    SELECTED_THEME_ID: theme.id,
  };

  if (firstComponentId) {
    keysToSet.SELECTED_COMPONENT_ID = firstComponentId;
  }

  return storageSetByKeys(keysToSet);
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
  let returnTheme = helpTheme;

  if (!currentTheme) {
    return returnTheme;
  }

  switch (currentTheme.type) {
    case "custom": {
      if (customThemes && customThemes.length) {
        const customTheme = customThemes.find((t) => t.id === currentTheme?.id);

        if (customTheme && customTheme.inputs.views[config.view]?.template) {
          returnTheme = customTheme;
        }
      }
      break;
    }

    case "premade": {
      const premadeTheme = premadeThemes.find((t) => t.id === currentTheme?.id);

      if (premadeTheme && premadeTheme.inputs.views[config.view]?.template) {
        returnTheme = premadeTheme;
      }
      break;
    }

    default:
      throw new Error("Unknown current theme type");
  }

  return returnTheme;
}

export function parseThemeExport(json: any) {
  const parser: z.ZodType<TTheme> = z.lazy(() =>
    z.object({
      id: z.string(),
      inputs: z.object({
        views: z.object({
          commentItem: z.object({ template: z.string().optional() }).optional(),
          commentList: z.object({ template: z.string().optional() }).optional(),
          jobItem: z.object({ template: z.string().optional() }).optional(),
          jobList: z.object({ template: z.string().optional() }).optional(),
          pollItem: z.object({ template: z.string().optional() }).optional(),
          reply: z.object({ template: z.string().optional() }).optional(),
          storyItem: z.object({ template: z.string().optional() }).optional(),
          storyList: z.object({ template: z.string().optional() }).optional(),
          submit: z.object({ template: z.string().optional() }).optional(),
          user: z.object({ template: z.string().optional() }).optional(),
        }),
        components: z.array(
          z.object({
            id: z.string(),
            label: z.string(),
            template: z.string(),
          }),
        ),
        style: z.object({
          options: z.object({
            darkMode: z.boolean(),
          }),
          template: z.string(),
        }),
      }),
      label: z.string(),
      options: z.object({
        disableHNStyle: z.boolean(),
      }),
      type: z.union([z.literal("custom"), z.literal("premade")]),
      version: z.literal("1.0.0"),
    }),
  );

  try {
    return parser.parse(json);
  } catch (err) {
    if (err instanceof z.ZodError) {
      throw new Error("Invalid theme format");
    }

    throw new Error("Something went terribly wrong");
  }
}
