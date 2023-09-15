// @ts-check

/** @type {import('@docusaurus/plugin-content-docs').SidebarsConfig} */
const sidebars = {
  main: [
    {
      type: "doc",
      label: "Context",
      id: "modules/Context",
    },
    {
      type: "category",
      label: "Views",
      collapsible: false,
      items: [
        {
          type: "doc",
          label: "Lists",
          id: "modules/Lists",
        },
        {
          type: "doc",
          label: "Items",
          id: "modules/Items",
        },
        {
          type: "doc",
          label: "Other",
          id: "modules/Other",
        },
      ],
    },
    {
      type: "doc",
      label: "Shared",
      id: "modules/Shared",
    },
    {
      type: "doc",
      label: "Handlebars Helpers",
      id: "modules/HandlebarsHelpers",
    },
    {
      type: "category",
      label: "Web Components",
      collapsible: false,
      items: [
        {
          type: "doc",
          label: "Overview",
          id: "modules/WebComponents",
        },
        {
          type: "doc",
          label: "Interaction",
          id: "classes/WebComponents.Interaction",
        },
      ],
    },
  ],
};

module.exports = sidebars;
