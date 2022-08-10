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
  favicon: 'images/favicon.ico',
  organizationName: 'spicetify',
  projectName: 'spicetify-docs',
  presets: [
    [
      'classic',
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          sidebarPath: require.resolve('./sidebars.js'),
          // Please change this to your repo.
          editUrl: 'https://github.com/spicetify/spicetify-docs/edit/main',
        },
        blog: {
          showReadingTime: true,
          // Please change this to your repo.
          editUrl: 'https://github.com/spicetify/spicetify-docs/edit/main',
        },
        theme: {
          customCss: require.resolve('./src/css/custom.css'),
        },
      }),
    ],
  ],
  plugins: ['docusaurus-plugin-matomo'],

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      metadata: [{ name: 'keywords', content: 'spicetify, spotify, customization, documentation, blog' }],
      image: 'images/spicetify-full.png',
      colorMode: {
        defaultMode: 'light',
        respectPrefersColorScheme: true,
      },
      docs: {
        sidebar: {
          autoCollapseCategories: true,
          hideable: false,
        },
      },
      navbar: {
        title: 'Spicetify',
        logo: {
          alt: 'Spicetify Logo',
          src: 'images/spicetify.png',
        },
        items: [
          {
            type: 'doc',
            docId: 'getting-started',
            position: 'left',
            label: 'Docs',
          },
          { to: '/blog', label: 'Blog', position: 'left' },
          {
            href: 'https://github.com/spicetify/spicetify-cli',
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
                to: '/docs/getting-started',
              },
              {
                label: 'Advanced Usage',
                to: '/docs/advanced-usage',
              },
              {
                label: 'Development',
                to: '/docs/development',
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
                href: 'https://github.com/spicetify/spicetify-themes',
              },
              {
                label: 'Documentation',
                href: 'https://github.com/spicetify/spicetify-docs',
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
                html: `
                  <a href="https://opencollective.com/spicetify" target="_blank">
                    <img src="https://opencollective.com/spicetify/tiers/supporter.svg?avatarHeight=36" alt="Open Collective" />
                  </a>
                `,
              },
              {
                html: `
                  <a href="https://vercel.com/?utm_source=spicetify&utm_campaign=oss" target="_blank" rel="noreferrer noopener" aria-label="Powered by Vercel">
                    <img src="/images/powered-by-vercel.svg" alt="Powered by Vercel" width="150" />
                  </a>
                `,
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
        apiKey: 'd538fac3f86b5167706ae2e5c3cce353',
        indexName: 'spicetify',
      },
      matomo: {
        matomoUrl: 'https://spicetify.matomo.cloud/',
        siteId: '1',
        phpLoader: 'matomo.php',
        jsLoader: 'matomo.js',
      },
    }),
};

module.exports = config;
