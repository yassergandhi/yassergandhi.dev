# Estado de analítica

Fecha de corte: 24 de julio de 2026.

| Sistema | Estado |
| --- | --- |
| Vercel Web Analytics | Activo; componente montado una vez en el layout |
| Google Search Console | Activo |
| Cloudflare DNS | Confirmado |
| Tally | Publicado, ID `MeQjR0` |
| GA4 | Suspendido |
| Google Tag Manager | No instalado |
| Clarity | No instalado |
| Píxeles publicitarios | No instalados |

## Privacidad

No hay eventos personalizados del formulario. Las respuestas, nombres, correos, teléfonos, texto libre y descripciones del caso no se envían a Vercel Analytics. El iframe comunica directamente con Tally.

## Parámetros permitidos

El embed transfiere solamente:

- `utm_source`
- `utm_medium`
- `utm_campaign`
- `utm_content`
- `originPage`
- `offer`

La existencia de los campos ocultos correspondientes debe confirmarse manualmente dentro de Tally. No se realizó un envío de prueba.

## Campaña CANACO

Las URLs diferenciadas de tarjeta y flyer están fijadas en `CANACO_CAMPAIGN_URLS.md`. Comparten fuente, medio, campaña y oferta; `utm_content` distingue el material. El copy quedó cerrado para impresión y las URLs no deben modificarse después de imprimir.

## SEO técnico

La home permanece en el sitemap. `/evaluacion` declara canonical absoluto y `noindex, follow`; `/contacto` no aparece en sitemap y redirige de forma permanente en Vercel. Robots permite rastrear las páginas para que los motores puedan leer sus directivas.
