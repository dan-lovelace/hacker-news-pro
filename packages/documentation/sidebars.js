/**
 * Creating a sidebar enables you to:
 - create an ordered group of docs
 - render a sidebar for each doc of that group
 - provide next/previous navigation

 The sidebars can be generated from the filesystem, or explicitly defined here.

 Create as many sidebars as you want.
 */

// @ts-check

/** @type {import('@docusaurus/plugin-content-docs').SidebarsConfig} */
const sidebars = {
  // By default, Docusaurus generates a sidebar from the docs folder structure
  // main: [{type: 'autogenerated', dirName: '.'}],
  main: [
    {
      type: "doc",
      label: "Home",
      id: "README",
    },
    {
      type: "category",
      label: "Base",
      collapsible: false,
      items: [
        {
          type: "doc",
          label: "Context",
          id: "modules/context"
        },
        {
          type: "doc",
          label: "Shared",
          id: "modules/shared"
        },
      ],
    },
    {
      type: "category",
      label: "Views",
      collapsible: false,
      items: [
        "modules/lists",
        "modules/items",
        "modules/other",
      ],
    },
    {
      type: "category",
      label: "Modules",
      collapsible: false,
      items: [
        "modules/scraper",
        "classes/scraper.CommentItem",
      ]
    },
    {
      type: "category",
      label: "Web Components",
      collapsible: false,
      items: [
        {
          type: "doc",
          label: "Overview",
          id: "modules/web_components",
        },
        {
          type: "doc",
          label: "Interaction",
          id: "classes/web_components.Interaction",
        }
      ]
    }
  ]

  // But you can create a sidebar manually
  /*
  tutorialSidebar: [
    'intro',
    'hello',
    {
      type: 'category',
      label: 'Tutorial',
      items: ['tutorial-basics/create-a-document'],
    },
  ],
   */
};

module.exports = sidebars;
