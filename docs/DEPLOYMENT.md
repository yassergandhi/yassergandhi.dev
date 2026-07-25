# Despliegue y validación pendiente

No se realizó deploy ni se modificaron Vercel, Cloudflare, DNS o Search Console durante este cierre.

## Comprobable localmente

- Astro genera `/`, `/evaluacion` y el fallback HTML de `/contacto`.
- La home y `/evaluacion` responden como páginas locales.
- Metadata, canonical, JSON-LD, OG, enlaces y parámetros se pueden inspeccionar en el HTML generado.
- El fallback de `/contacto` conserva query strings mediante JavaScript.

## Requiere preview de Vercel

- confirmar que `/contacto` responde con redirect permanente 308;
- confirmar que Vercel conserva la query string al redirigir a `/evaluacion`;
- verificar la carga externa de Tally en condiciones de preview;
- revisar la imagen OG raster en un depurador social.

Una respuesta local 200 de Astro para `/contacto` valida el fallback, no el redirect de Vercel.
