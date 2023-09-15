/* eslint-disable @typescript-eslint/no-var-requires */
// @ts-check
// Note: type annotations allow type checking and IDEs autocompletion

const darkCodeTheme = require("prism-react-renderer/themes/dracula");
const lightCodeTheme = require("prism-react-renderer/themes/github");

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: "Hacker News Pro",
  tagline:
    "A browser extension for creating personalized Hacker News experiences",
  favicon: "img/logo_16.png",

  // Set the production url of your site here
  url: "https://hackernewspro.com/",
  // Set the /<baseUrl>/ pathname under which your site is served
  // For GitHub pages deployment, it is often '/<projectName>/'
  baseUrl: "/",

  // GitHub pages deployment config.
  // If you aren't using GitHub pages, you don't need these.
  organizationName: "dan-lovelace", // Usually your GitHub org/user name.
  projectName: "hacker-news-pro", // Usually your repo name.

  onBrokenLinks: "throw",
  onBrokenMarkdownLinks: "warn",

  // Even if you don't use internalization, you can use this field to set useful
  // metadata like html lang. For example, if your site is Chinese, you may want
  // to replace "en" with "zh-Hans".
  i18n: {
    defaultLocale: "en",
    locales: ["en"],
  },

  presets: [
    [
      "classic",
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          sidebarPath: require.resolve("./sidebars.js"),
        },
        blog: false,
        theme: {
          customCss: require.resolve("./src/css/custom.css"),
        },
      }),
    ],
  ],

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      image: "img/social_card.jpg",
      colorMode: {
        defaultMode: "dark",
      },
      navbar: {
        title: "Hacker News Pro",
        logo: {
          alt: "Hacker News Pro Logo",
          src: "img/logo_128.png",
        },
        items: [
          {
            type: "doc",
            position: "left",
            docId: "README",
            label: "Readme",
          },
          {
            type: "docSidebar",
            sidebarId: "main",
            position: "left",
            label: "Reference",
          },
          {
            position: "right",
            label: "GitHub",
            href: "https://github.com/dan-lovelace/hacker-news-pro",
          },
        ],
      },
      footer: {
        style: "dark",
        links: [
          {
            title: "Community",
            items: [
              {
                label: "Discord",
                href: "https://discord.gg/4RaYMCJQWV",
              },
            ],
          },
        ],
        copyright: `Copyright © ${new Date().getFullYear()} Logic Now LLC`,
      },
      prism: {
        theme: lightCodeTheme,
        darkTheme: darkCodeTheme,
      },
    }),
};

module.exports = config;
