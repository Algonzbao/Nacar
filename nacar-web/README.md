# Web de Nácar Asociación

Código de [nacarasociacion.com](https://nacarasociacion.com/), la web de Nácar Asociación (Buendía, Castilla-La Mancha): campamentos urbanos, cumpleaños y actividades para familias, AMPAs, ayuntamientos y urbanizaciones.

## Stack

- [Astro 5](https://docs.astro.build/) en modo servidor (`output: 'server'`), desplegado como función serverless con el adaptador `@astrojs/vercel`.
- React 19 solo para tres componentes interactivos (`Stories.jsx`, `EventsGallery.jsx`, `ModalGallery.jsx`).
- Tailwind CSS 3 con la paleta y las fuentes definidas en `tailwind.config.mjs` (Karla para texto, Wreath-Bol para títulos).
- Font Awesome Free para los iconos.
- SendGrid (`@sendgrid/mail`) para enviar el formulario de contacto por email.

## Estructura

| Ruta | Contenido |
| --- | --- |
| `src/pages/` | Una página por ruta: `index`, `conocenos`, `eventos`, `cumpleanos`, `campamento`, `urbanizaciones` y `contacto`. |
| `src/layouts/Layout.astro` | Plantilla HTML base (head, fuentes, view transitions). Acepta `title` y `description`. |
| `src/components/` | `Nav`, `Footer` y `Slider` (Astro) y los tres componentes React. |
| `src/content/` | Colecciones de contenido en Markdown (solo frontmatter): `team`, `events`, `shields` y `galleries`. Esquemas en `src/content.config.ts`. |
| `src/assets/` | Imágenes. Astro las optimiza al servirlas. |
| `public/` | Favicons, `robots.txt` y la fuente Wreath-Bol. |

## Editar contenido

Las fichas del equipo, los eventos, los escudos de los ayuntamientos y las galerías de veranos son archivos `.md` en `src/content/<colección>/`. Para añadir uno, crea un archivo nuevo copiando otro de la misma carpeta; para quitarlo, bórralo. Las imágenes se referencian con ruta relativa a `src/assets/`.

Ejemplo de galería (`src/content/galleries/verano2024.md`):

```md
---
year: 2024
name: Verano 2024
cover: ../../assets/verano24.png
images:
    - ../../assets/storiesveranos/portada.jpg
    - ../../assets/storiesveranos/paseo.jpg
---
```

Los textos de las páginas están escritos directamente en cada archivo `.astro` de `src/pages/`.

## Desarrollo en local

Requiere Node 20 o superior.

```sh
npm install
npm run dev       # http://localhost:4321
npm run build     # compila a dist/ y .vercel/output/
```

El formulario de contacto necesita la variable de entorno `SENDGRID_API_KEY`. En local, créala en un archivo `.env.development` (está en `.gitignore`):

```
SENDGRID_API_KEY=tu_clave
```

Sin ella la web funciona, pero el envío del formulario falla. El remitente `nacarasociacion@gmail.com` tiene que estar verificado en la cuenta de SendGrid.

## Despliegue

La web está alojada en Vercel. La variable `SENDGRID_API_KEY` debe estar definida en las variables de entorno del proyecto en Vercel. Con el proyecto conectado al repositorio, cada push a `master` genera un despliegue.
