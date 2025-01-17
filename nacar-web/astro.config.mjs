// @ts-nocheck
import { defineConfig } from 'astro/config';
import dotenv from 'dotenv';
import tailwind from '@astrojs/tailwind';
import vercel from '@astrojs/vercel/serverless';
import react from '@astrojs/react';

// Cargar las variables de entorno desde el archivo sendgrid.env
dotenv.config({ path: './sendgrid.env' });

export default defineConfig({
  output: 'server',
  integrations: [tailwind(), react()],
  adapter: vercel(),
});
