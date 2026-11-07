# Web de Nácar Asociación

Código de [nacarasociacion.com](https://nacarasociacion.com/), la web de Nácar Asociación (Buendía, Castilla-La Mancha): campamentos urbanos, cumpleaños y actividades para familias, AMPAs, ayuntamientos y urbanizaciones.

Si trabajas con Claude Code, las instrucciones detalladas están en el `CLAUDE.md` de la raíz del repositorio y se cargan solas.

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
| `src/assets/` | Imágenes. |
| `public/` | Favicons, `robots.txt`, `sitemap.xml` (si añades una página, inclúyela aquí) y la fuente Wreath-Bol. |

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

## Editar contenido

- Los textos de las páginas están escritos directamente en cada archivo `.astro` de `src/pages/`. El título y la descripción para buscadores van en `<Layout title="..." description="...">`.
- Las fichas del equipo, los eventos, los escudos de los ayuntamientos y las galerías de veranos son archivos `.md` en `src/content/<colección>/`. Para añadir uno, copia otro de la misma carpeta; para quitarlo, bórralo. Las imágenes se referencian con ruta relativa a `src/assets/`.

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

## Imágenes

- Para sustituir una imagen sin tocar código, guarda la nueva con el mismo nombre y extensión que la anterior en `src/assets/`.
- Para una imagen nueva, cópiala a `src/assets/` y cambia el `import` de la página o la ruta del `.md` que la usa.
- Los fondos de sección y las fotos de las galerías se sirven sin optimizar: expórtalos a tamaño web (fondos de 1.920 px de ancho como máximo, fotos de galería de unos 1.600 px, por debajo de 400 KB).

## Despliegue

La web está alojada en Vercel y el proyecto está conectado a este repositorio: cada push a `master` compila y publica solo en uno o dos minutos. Un push a otra rama genera una vista previa con su propia URL. Antes de subir, ejecuta `npm run build` y comprueba que termina sin errores: un build roto no se publica y solo se ve en el panel de Vercel. La variable `SENDGRID_API_KEY` debe estar definida en las variables de entorno del proyecto en Vercel.
