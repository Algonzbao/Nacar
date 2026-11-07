import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import react from '@astrojs/react';
import sitemap from '@astrojs/sitemap';
import vercel from '@astrojs/vercel';

// La clave de SendGrid se lee de la variable de entorno SENDGRID_API_KEY
// (.env.development en local, variables del proyecto en Vercel).
export default defineConfig({
  site: 'https://nacarasociacion.com',
  output: 'server',
  integrations: [tailwind(), react(), sitemap()],
  adapter: vercel(),
});
