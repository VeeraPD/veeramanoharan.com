// @ts-check
import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import tailwindcss from '@tailwindcss/vite';
import { writeFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import { site, siteUrl } from './src/config/site.ts';

/** Writes dist/CNAME from the one domain value in src/config/site.ts. */
const cname = {
  name: 'write-cname',
  hooks: {
    /** @param {{ dir: URL }} options */
    'astro:build:done': async ({ dir }) => {
      await writeFile(fileURLToPath(new URL('CNAME', dir)), `${site.domain}\n`);
      await writeFile(fileURLToPath(new URL('.nojekyll', dir)), '');
    },
  },
};

export default defineConfig({
  site: siteUrl,
  output: 'static',
  integrations: [mdx(), cname],
  vite: { plugins: [tailwindcss()] },
});
