import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import react from '@astrojs/react';
import vercel from '@astrojs/vercel';

// La clave de SendGrid se lee de la variable de entorno SENDGRID_API_KEY
// (.env.development en local, variables del proyecto en Vercel).
//
// El sitemap es un archivo estático en public/sitemap.xml: el adaptador de Vercel
// copia los estáticos antes de que @astrojs/sitemap genere el suyo, y no llegaba a producción.
// Si añades una página, añádela también a public/sitemap.xml.
export default defineConfig({
  site: 'https://nacarasociacion.com',
  output: 'server',
  integrations: [tailwind(), react()],
  adapter: vercel(),
});
