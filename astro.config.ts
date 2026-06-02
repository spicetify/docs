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
  },
});
