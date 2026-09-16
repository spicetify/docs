import mdx from '@astrojs/mdx';
import react from '@astrojs/react';
import sitemap from '@astrojs/sitemap';
import { defineConfig } from 'astro/config';
import expressiveCode from 'astro-expressive-code';
import pagefind from 'astro-pagefind';
import remarkDirective from 'remark-directive';
import { remarkAdmonitions } from './src/plugins/remark-admonitions.mjs';
import { remarkReadingTime } from './src/plugins/remark-reading-time.mjs';

export default defineConfig({
  site: 'https://spicetify.app',
  trailingSlash: 'never',
  build: {
    format: 'file',
  },
  markdown: {
    remarkPlugins: [remarkDirective, remarkAdmonitions, remarkReadingTime],
  },
  integrations: [
    expressiveCode({
      themes: ['github-light', 'dracula'],
      useDarkModeMediaQuery: false,
      themeCssSelector: (theme) =>
        `[data-theme='${theme.type === 'dark' ? 'dark' : 'light'}']`,
    }),
    mdx(),
    react(),
    sitemap(),
    pagefind(),
  ],
  redirects: {
    '/docs/blog/authors': '/blog',
    // Preserve the URL equity of the pre-2026 Docusaurus information
    // architecture. These pages moved rather than disappeared.
    '/docs/advanced-usage': '/docs/legacy/customization',
    '/docs/advanced-usage/installation': '/docs/legacy/getting-started',
    '/docs/advanced-usage/uninstallation': '/docs/legacy/uninstallation',
    '/docs/advanced-usage/command-line-interface': '/docs/legacy/cli',
    '/docs/advanced-usage/themes': '/docs/legacy/customization/themes',
    '/docs/advanced-usage/extensions': '/docs/legacy/customization/extensions',
    '/docs/advanced-usage/custom-apps':
      '/docs/legacy/customization/custom-apps',
    '/docs/customization/marketplace.md':
      '/docs/legacy/customization/marketplace',
    // v3 took over the main tree; every v2 page kept its content under
    // /docs/legacy, so the old URLs point at the page they promised rather
    // than at a v3 equivalent that says something different.
    '/docs/customization': '/docs/legacy/customization',
    '/docs/customization/marketplace': '/docs/legacy/customization/marketplace',
    '/docs/customization/themes': '/docs/legacy/customization/themes',
    '/docs/customization/extensions': '/docs/legacy/customization/extensions',
    '/docs/customization/custom-apps': '/docs/legacy/customization/custom-apps',
    '/docs/customization/config-file': '/docs/legacy/customization/config-file',
    '/docs/development/themes': '/docs/legacy/development/themes',
    '/docs/development/extensions': '/docs/legacy/development/extensions',
    '/docs/development/custom-apps': '/docs/legacy/development/custom-apps',
    '/docs/development/js-modules': '/docs/legacy/development/js-modules',
    '/docs/development/spicetify-creator/the-basics':
      '/docs/legacy/spicetify-creator/the-basics',
    '/docs/development/spicetify-creator/create-extensions':
      '/docs/legacy/spicetify-creator/create-extensions',
    '/docs/development/spicetify-creator/create-custom-apps':
      '/docs/legacy/spicetify-creator/create-custom-apps',
    '/docs/development/spicetify-creator/building-and-testing':
      '/docs/legacy/spicetify-creator/building-and-testing',
  },
});
