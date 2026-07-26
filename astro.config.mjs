// @ts-check
import sitemap from '@astrojs/sitemap';
import { defineConfig } from 'astro/config';
import {
  LAST_SIGNIFICANT_UPDATE,
  SITE_URL,
} from './src/config/siteMetadata.mjs';

export default defineConfig({
  site: SITE_URL,
  integrations: [
    sitemap({
      filter: (page) => new URL(page).pathname === '/',
      serialize: (item) => ({
        url: item.url,
        lastmod: LAST_SIGNIFICANT_UPDATE,
      }),
    }),
  ],
});
