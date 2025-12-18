import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://chemath.com', // 替换为你自己的域名
  vite: {
    plugins: [tailwindcss()]
  },
  integrations: [sitemap()]
});

