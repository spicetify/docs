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
  sidebar: [
    'getting-started',
    {
      type: 'category',
      label: 'Advanced Usage',
      link: {
        type: 'generated-index',
        description: 'A guide about advanced usage of Spicetify and venturing outside of the Spicetify Marketplace.',
        slug: '/advanced-usage',
      },
      items: [
        'advanced-usage/installation',
        'advanced-usage/uninstallation',
        'advanced-usage/command-line-interface',
        'advanced-usage/themes',
        'advanced-usage/extensions',
        'advanced-usage/custom-apps',
      ],
    },
    {
      type: 'category',
      label: 'Development',
      link: {
        type: 'generated-index',
        description: "Let's learn about how to contribute to the Spicetify community!",
        slug: '/development',
      },
      items: [
        'development/compiling',
        'development/themes',
        'development/custom-apps',
        'development/js-modules',
        'development/spotify-cli-flags',
        {
          type: 'category',
          label: 'Spicetify Creator',
          link: {
            type: 'generated-index',
            description: 'The easy way to create extensions and custom apps!',
            slug: '/development/spicetify-creator',
          },
          items: [
            'development/spicetify-creator/the-basics',
            'development/spicetify-creator/create-extensions',
            'development/spicetify-creator/create-custom-apps',
            'development/spicetify-creator/building-and-testing',
          ],
        },
        {
          type: 'category',
          label: "API Wrapper",
          link: {
            type: "doc",
            id: "development/api-wrapper/index",
          },
          items: [
            "development/api-wrapper/modules",
            {
              type: "category",
              label: "Methods",
              link: {
                type: "generated-index",
                description: "A list of all methods in the API Wrapper.",
                slug: "/development/api-wrapper/methods",
              },
              items: [
                "development/api-wrapper/methods/platform",
                "development/api-wrapper/methods/cosmos-async",
                "development/api-wrapper/methods/player",
                "development/api-wrapper/methods/keyboard",
              ]
            },
            {
              type: "category",
              label: "Classes",
              link: {
                type: "generated-index",
                description: "A list of all classes in the API Wrapper.",
                slug: "/development/api-wrapper/classes",
              },
              items: [
                "development/api-wrapper/classes/context-menu",
                "development/api-wrapper/classes/menu",
              ],
            },
            {
              type: "category",
              label: "Functions",
              link: {
                type: "generated-index",
                description: "A list of all functions in the API Wrapper.",
                slug: "/development/api-wrapper/functions",
              },
              items: [
                "development/api-wrapper/functions/color-extractor",
                "development/api-wrapper/functions/get-audio-data",
              ],
            },
            {
              type: "category",
              label: "Properties",
              link: {
                type: "generated-index",
                description: "A list of all properties in the API Wrapper.",
                slug: "/development/api-wrapper/properties",
              },
              items: [
                "development/api-wrapper/properties/config",
                "development/api-wrapper/properties/svgicons",
                "development/api-wrapper/properties/queue",
              ],
            },
            {
              type: "category",
              label: "Types",
              link: {
                type: "generated-index",
                description: "A list of all type definitions in the API Wrapper.",
                slug: "/development/api-wrapper/types",
              },
              items: [
                {
                  type: "category",
                  label: "CosmosAsync",
                  link: {
                    type: "generated-index",
                    description: "A list of all type definitions in the CosmosAsync method.",
                    slug: "/development/api-wrapper/types/cosmos-async",
                  },
                  items: [
                    "development/api-wrapper/types/cosmos-async/body",
                    "development/api-wrapper/types/cosmos-async/headers",
                    "development/api-wrapper/types/cosmos-async/method",
                    "development/api-wrapper/types/cosmos-async/error",
                    "development/api-wrapper/types/cosmos-async/response",
                  ],
                },
                {
                  type: "category",
                  label: "ContextMenu",
                  link: {
                    type: "generated-index",
                    description: "A list of all type definitions in the ContextMenu class.",
                    slug: "/development/api-wrapper/types/context-menu",
                  },
                  items: [
                    "development/api-wrapper/types/context-menu/onclickcallback",
                    "development/api-wrapper/types/context-menu/shouldaddcallback",
                  ]
                },
                {
                  type: "category",
                  label: "Keyboard",
                  link: {
                    type: "generated-index",
                    description: "A list of all type definitions in the Keyboard method.",
                    slug: "/development/api-wrapper/types/keyboard",
                  },
                  items: [
                    "development/api-wrapper/types/keyboard/validkey",
                    "development/api-wrapper/types/keyboard/keysdefine",
                  ],
                },
                "development/api-wrapper/types/config",
                "development/api-wrapper/types/metadata",
                "development/api-wrapper/types/context-track",
                "development/api-wrapper/types/context-option",
                "development/api-wrapper/types/player-state",
                "development/api-wrapper/types/provided-track",
                "development/api-wrapper/types/svgicon",
                "development/api-wrapper/types/queue",
              ],
            }
          ],
        },
      ],
    },
    'faq',
  ],
};

module.exports = sidebars;
