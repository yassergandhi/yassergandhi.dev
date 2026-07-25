# yassergandhi.dev

Sitio comercial de Yasser Gandhi Hernández Esquivel.

North Star V6: **Tu negocio no empezó con una página. Empezó con una vida que alguien quería construir.**

La categoría pública es **sitios y sistemas web con investigación cualitativa**. La oferta fijada para validación es **Proyecto de sitio o sistema web con investigación cualitativa**, desde **$24,999 MXN, IVA incluido**. El alcance final se define después de la evaluación.

La distinción pública está en las preguntas: primero se recupera por qué vale la pena mantener vivo el negocio, después se reconstruye un caso reciente y sólo entonces se decide qué construir. V5 conserva autoridad sobre oferta, precio, evaluación, URLs, métricas y validación CANACO.

La identidad visual usa aubergine oscuro como superficie premium principal, crema para texto y revelaciones puntuales, y naranja Ubuntu `#E95420` para identificar y avanzar. El papel cálido dejó de ser el fondo dominante.

## Estado confirmado

- Tally publicado: `https://tally.so/r/MeQjR0`
- ID de Tally: `MeQjR0`
- DNS administrado en Cloudflare.
- Vercel Web Analytics activo.
- Google Search Console activo.
- GA4 suspendido; tampoco se usan Google Tag Manager, Clarity ni píxeles.
- Precio público: desde `$24,999 MXN, IVA incluido`.

## Rutas

- `/`: escena fundacional, preguntas, método, cambios posibles, oferta, trayectoria y límites.
- `/evaluacion`: copy visible, privacidad, resultados posibles y un único embed de Tally dentro de un shell visual; usa `noindex, follow`.
- `/contacto`: compatibilidad mediante redirect permanente a `/evaluacion`, conservando la cadena de consulta en Vercel; incluye respaldo HTML y no se publica como CTA.

## Stack

| Capa | Elección |
| --- | --- |
| Framework | Astro |
| Estilos | Sistema editorial aubergine oscuro con propiedades personalizadas |
| Tipografía | Ubuntu y Ubuntu Mono |
| Analítica | Vercel Web Analytics |
| Formulario | Tally `MeQjR0` |
| SEO | Metadata compartida, JSON-LD, robots y sitemap estático |

El sitio no almacena respuestas del formulario ni manda texto libre o datos personales a Analytics.

El repositorio sólo puede diseñar el contenedor exterior del formulario. El interior del iframe se configura manualmente dentro de Tally; consulta `docs/TALLY_THEME.md`.

El menú móvil permanece disponible mediante `details` y `summary`. Se conserva el favicon existente y el wordmark `yassergandhi.dev_`.

La home no oculta información esencial detrás de tarjetas. Los disclosures se reservan para detalle secundario y el shell de Tally conserva su superficie propia.

Las URLs impresas de CANACO están fijadas en `docs/CANACO_CAMPAIGN_URLS.md`.

## Desarrollo local

```bash
npm install
npm run dev
npm run build
npm run preview
```
