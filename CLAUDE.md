# Instrucciones para Claude: web de Nácar Asociación

Este repositorio contiene la web pública de Nácar Asociación, https://nacarasociacion.com/. El proyecto Astro está en la carpeta `nacar-web/`; todos los comandos se ejecutan desde ahí. Producción se publica sola con cada push a `master`, así que cada cambio que subas llega a la web real en menos de dos minutos. Trabaja con ese cuidado.

## Qué es y cómo está montado

- Astro 5 en modo servidor (`output: 'server'`): las páginas se renderizan en cada petición, no es un sitio estático.
- Alojado en Vercel con el adaptador `@astrojs/vercel` (función serverless). Las imágenes optimizadas se sirven bajo `/_image`.
- React 19 solo en tres componentes interactivos: `Stories.jsx` (burbujas de veranos en la portada), `EventsGallery.jsx` y `ModalGallery.jsx` (galerías de la página Eventos).
- Tailwind CSS 3. Paleta y fuentes en `nacar-web/tailwind.config.mjs`: `primary` #A4C8C1, `arena` #d2b686, `rosa` #e19889, `azul` #50a3ab, `hoverRosa` #E664C3. Fuente Karla para texto y Wreath-Bol (`font-wreath`, TTF en `public/fonts/`) para títulos.
- Font Awesome Free para iconos.
- SendGrid (`@sendgrid/mail`) envía el formulario de contacto. La clave viene de la variable de entorno `SENDGRID_API_KEY`.
- Transiciones entre páginas con `ClientRouter` (view transitions). Cualquier script de cliente debe engancharse al evento `astro:page-load`, no a `DOMContentLoaded`, o dejará de funcionar al navegar.

## Estructura

| Ruta (dentro de `nacar-web/`) | Contenido |
| --- | --- |
| `astro.config.mjs` | `site`, SSR, adaptador Vercel, integraciones Tailwind y React. |
| `src/layouts/Layout.astro` | Plantilla HTML base. Props `title` y `description`; genera la URL canónica. |
| `src/pages/*.astro` | Una página por ruta: `index`, `conocenos`, `eventos`, `cumpleanos`, `campamento`, `urbanizaciones`, `contacto`. |
| `src/components/` | `Nav.astro`, `Footer.astro`, `Slider.astro` (escudos de ayuntamientos) y los tres componentes React. |
| `src/content.config.ts` | Esquemas (zod) de las colecciones. |
| `src/content/team/` | Fichas del equipo: `name`, `position`, `image`, `linkedin`. |
| `src/content/events/` | Eventos de la página Eventos: `id` (orden), `title`, `description`, `img`, `gallery` (lista de imágenes). |
| `src/content/shields/` | Escudos de ayuntamientos del slider: `id`, `name`, `image` (SVG). |
| `src/content/galleries/` | Veranos de las stories de la portada: `year`, `name`, `cover`, `images`. |
| `src/assets/` | Todas las imágenes. |
| `public/` | `favicon.png`, `favicon.svg`, `robots.txt`, `sitemap.xml` y `fonts/Wreath-Bol.ttf`, servidos tal cual. |
| `.env.development` | Clave de SendGrid para desarrollo local. No existe en el repo; hay que crearla. |

## Flujo de trabajo obligatorio

1. Trabaja siempre dentro de `nacar-web/`. Si no hay `node_modules`, ejecuta `npm install` (Node 20 o superior).
2. Haz el cambio. Si tocas páginas, componentes o contenido, arranca `npm run dev` (http://localhost:4321) y comprueba la página afectada.
3. Antes de cada commit ejecuta `npm run build` y confirma que termina con «Complete!» y sin errores. Un build roto no se publica en Vercel, pero tampoco avisa a nadie que no tenga acceso al panel de Vercel.
4. Haz commit con un mensaje claro en castellano y `git push origin master`. Vercel compila y publica solo en uno o dos minutos.
5. Después del push, comprueba la web publicada (ver «Verificar producción»).
6. Si el cambio es grande o quieres revisarlo antes, súbelo en una rama: Vercel crea una vista previa con su propia URL y `master` no se toca hasta hacer merge.

Borra `dist/` y `.vercel/` después de compilar si estorban; ambos están en `.gitignore`.

## Lo que no debes hacer

- Nunca subas al repositorio archivos `.env*`, claves de SendGrid ni ninguna credencial. Están en `.gitignore`; no lo cambies. El repositorio es público.
- No escribas la clave de SendGrid en el código ni en comentarios.
- No cambies `output: 'server'` ni el adaptador de Vercel sin que te lo pidan: el formulario de contacto depende del servidor.
- No vuelvas a activar la integración `@astrojs/sitemap`: con este adaptador su `sitemap-index.xml` no llega a producción (Vercel copia los estáticos antes de que se genere). El sitemap es manual en `public/sitemap.xml`.
- No actualices dependencias (Astro, React, adaptador) salvo que te lo pidan, y entonces hazlo en una rama, compilando y probando todas las páginas.
- No borres imágenes de `src/assets/` sin confirmar que no se usan (busca el nombre del archivo en `src/`): si una ruta deja de existir, el build falla.
- No envíes mensajes reales por el formulario de contacto para probar: llegan a la asociación.

## Editar textos y contenido

- Los textos de cada página están escritos directamente en su archivo `src/pages/*.astro`. Para cambiar un texto, edítalo ahí.
- El título de pestaña y la descripción para buscadores van en `<Layout title="..." description="...">` al inicio de cada página. Mantén una descripción propia por página.
- Equipo, eventos, escudos y veranos son archivos `.md` en `src/content/<colección>/` con solo frontmatter. Para añadir uno, copia otro de la misma carpeta y cambia los campos; para quitarlo, borra el archivo. Los campos obligatorios están en `src/content.config.ts`; si añades un campo nuevo, decláralo ahí.
- Si creas una página nueva en `src/pages/`, añádela también al menú (`Nav.astro`, versión escritorio y móvil) y a `public/sitemap.xml`.
- Enlaces de redes sociales y datos de contacto: en `Footer.astro` y `contacto.astro`.

## Imágenes

- Todas en `src/assets/`. Las páginas las importan al inicio (`import foto from "../assets/foto.jpg"`); las colecciones las referencian por ruta relativa (`../../assets/foto.jpg`) en el frontmatter.
- Para sustituir una imagen sin tocar código, guarda la nueva con el mismo nombre y extensión que la anterior.
- Para una imagen nueva o con otro nombre, copia el archivo a `src/assets/` y cambia el `import` de la página o la ruta del `.md`.
- Los fondos de sección (`style={{ backgroundImage }}`) y las fotos de las galerías React se sirven con el archivo original, sin optimizar. Antes de añadirlos, exporta fondos a JPG o WebP de 1.920 px de ancho como máximo y fotos de galería a unos 1.600 px, y procura que ninguno pase de 400 KB. Solo lo que va por el componente `<Image>` de Astro (logos, equipo, tarjetas) se redimensiona solo.
- Evita tildes y espacios en nombres de archivo nuevos.
- Dónde está cada imagen de página: portada `index.astro` (fondo `Campamento_Buendia.png`, logo, tarjetas `cumpleaños.jpg`, `campamentos.jpg`, `empresa.jpg`, `handsOn.jpg`, `pájaro.png`, `corresponsables.png`); Conócenos (`fill.png`, `Equipo.png`); Eventos (`contorno.png`, `mural.png`); Cumpleaños (`jarras.png`, `coronas.png`); Campamentos (`vestido.png`, `aula.png`); Urbanizaciones (`lona.png`); Contacto (`Conchitas.png`); menú y pie (`logoBlanco.png`).

## Formulario de contacto

- `src/pages/contacto.astro` recibe el POST del formulario en su frontmatter, valida nombre, email, teléfono (9 a 15 dígitos; se admiten espacios y guiones) y mensaje (rechaza etiquetas HTML) y envía el email con SendGrid a `nacarasociacion@gmail.com`, con `replyTo` del visitante.
- Si todo va bien redirige a `/contacto?enviado=1`, que muestra el aviso de éxito. Si falla, vuelve a mostrar la página con el error y los valores escritos.
- En local necesita `nacar-web/.env.development` con `SENDGRID_API_KEY=<clave>` (pídesela a la persona responsable; nunca la pegues en el chat ni en el repo). Sin clave, la web funciona pero el envío falla con un mensaje genérico.
- Para probar sin enviar nada, usa datos inválidos (teléfono «abc» o mensaje vacío): se ejecuta la validación y no se llama a SendGrid.
- En producción la clave está en las variables de entorno del proyecto en Vercel.

## Verificar producción

Tras cada despliegue comprueba, en un navegador, la portada y la página que hayas tocado. Si lo haces con `curl`, añade un User-Agent de navegador: el filtro anti-bots de Vercel responde 403 a las peticiones HEAD y POST de herramientas, y eso no es un fallo de la web.

```sh
for r in / /conocenos /eventos /cumpleanos /campamento /urbanizaciones /contacto /robots.txt /sitemap.xml; do
  printf "%-18s %s\n" "$r" "$(curl -s -o /dev/null -w '%{http_code}' -A 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) Chrome/131.0.0.0' "https://nacarasociacion.com$r")"
done
```

Todas deben responder 200. Los archivos estáticos (`robots.txt`, `sitemap.xml`) pueden tardar unos minutos en refrescarse por la caché de Vercel.

## Detalles que conviene saber

- El repositorio usa `core.autocrlf=true`; los archivos en el disco llevan CRLF y git guarda LF. Los avisos «LF will be replaced by CRLF» al hacer commit son normales.
- Al compilar sale el aviso «Failed to resolve dependency: react-compiler-runtime»; es inofensivo y lo emite @astrojs/react.
- Los estilos de `Layout.astro` tienen ámbito de componente: solo afectan a `html` y `body`. Las clases de las páginas son de Tailwind.
- `@astrojs/sitemap` y `dotenv` siguen en `package.json` pero no se usan; se pueden desinstalar en un commit propio.
- Si un build falla en Vercel, la versión anterior sigue publicada y desde el panel de Vercel se puede volver a cualquier despliegue («Rollback»).

## Mejoras pendientes (no son errores)

1. Reducir el peso de las imágenes: `src/assets` ocupa 141 MB y el fondo de la portada es un PNG de 13,7 MB que se sirve tal cual.
2. Borrar los archivos de `src/assets` que no se usan: `Conchitas1.png`, `contorno1.png`, `fill1.png`, `jarras.jpg`, `vestido.jpg`, `LogoNacar.jpg`, `flecha.gif`, `storiesveranos/Aida.jpeg` y `storiesveranos/creatividad.png`.
3. Actualizar dependencias (Astro 5.1 y React 19.0 son de enero de 2025), en una rama y con pruebas.
4. Desinstalar `@astrojs/sitemap` y `dotenv`.

## Historial reciente

- Hasta febrero de 2025: desarrollo inicial (migración a Astro, páginas, formulario, imágenes).
- 7 de noviembre de 2026: revisión completa y corrección de fallos (portada con el HTML mal cerrado, formulario que devolvía JSON, errata en el menú, import obsoleto del adaptador, sitemap y robots, descripciones y canónicas, README). Desde entonces el código local, GitHub y producción coinciden.
