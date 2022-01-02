// @ts-check
// Note: type annotations allow type checking and IDEs autocompletion

const lightCodeTheme = require('prism-react-renderer/themes/github');
const darkCodeTheme = require('prism-react-renderer/themes/dracula');

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: 'Spicetify',
  tagline: 'Powerful CLI tool to take control of the Spotify client.',
  url: 'https://spicetify.app',
  baseUrl: '/',
  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',
  favicon: 'img/favicon.ico',
  organizationName: 'afonsojramos',
  projectName: 'spicetify-docs',

  presets: [
    [
      'classic',
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          sidebarPath: require.resolve('./sidebars.js'),
          // Please change this to your repo.
          editUrl: 'https://github.com/afonsojramos/spicetify-docs/edit/main',
        },
        blog: {
          showReadingTime: true,
          // Please change this to your repo.
          editUrl: 'https://github.com/afonsojramos/spicetify-docs/edit/main',
        },
        theme: {
          customCss: require.resolve('./src/css/custom.css'),
        },
      }),
    ],
  ],

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      metadata: [{ name: 'keywords', content: 'spicetify, spotify, customization, documentation, blog' }],
      image: 'img/spicetify-full.png',
      navbar: {
        title: 'Spicetify',
        logo: {
          alt: 'Spicetify Logo',
          src: 'img/spicetify.png',
        },
        items: [
          {
            type: 'doc',
            docId: 'getting-started/installation',
            position: 'left',
            label: 'Docs',
          },
          { to: '/blog', label: 'Blog', position: 'left' },
          {
            href: 'https://github.com/khanhas/spicetify-cli',
            label: 'GitHub',
            position: 'right',
          },
        ],
      },
      footer: {
        style: 'dark',
        links: [
          {
            title: 'Docs',
            items: [
              {
                label: 'Getting Started',
                to: '/docs/getting-started/installation',
              },
              {
                label: 'Development',
                to: '/docs/development/compiling',
              },
              {
                label: 'FAQ',
                to: '/docs/faq',
              },
            ],
          },
          {
            title: 'Community',
            items: [
              {
                label: 'Community Themes',
                href: 'https://github.com/morpheusthewhite/spicetify-themes/tree/master',
              },
              {
                label: 'GitHub Discussions',
                href: 'https://github.com/khanhas/spicetify-cli/discussions',
              },
              {
                label: 'Discord',
                href: 'https://discord.gg/VnevqPp2Rr',
              },
              {
                label: 'Reddit',
                href: 'https://www.reddit.com/r/spicetify',
              },
            ],
          },
          {
            title: 'More',
            items: [
              {
                label: 'Blog',
                to: '/blog',
              },
              {
                label: 'GitHub',
                href: 'https://github.com/khanhas/spicetify-cli',
              },
            ],
          },
        ],
        copyright: `Copyright © ${new Date().getFullYear()} Spicetify. Built with 🎶 and 🦖.`,
      },
      prism: {
        theme: lightCodeTheme,
        darkTheme: darkCodeTheme,
      },
      algolia: {
        appId: '8V2X4EIOO7',
        apiKey: '141f58693466be94be91fe6da510e5d9',
        indexName: 'spicetify',
      },
    }),
};

module.exports = config;
