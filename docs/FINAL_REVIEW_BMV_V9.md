# Revisión final BMV V9

## Qué cambió y por qué

La home pasó de nueve bloques a cinco. La primera pantalla ahora dice qué se ofrece, qué momento se revisa, por qué se decide antes de construir y qué debe hacer la persona. El CTA único es “Revisar un caso reciente”.

`/evaluacion` quedó como landing breve y autónoma: menos de 90 palabras antes de Tally, expectativa de dos minutos, datos al final, aviso sensible y fallback sin JavaScript. La campaña BMV se añadió sin alterar las URLs CANACO ni convertir el evento en posicionamiento permanente.

## Cómo revisar

1. Ejecuta `ASTRO_TELEMETRY_DISABLED=1 npm run build`.
2. Ejecuta `npm test`.
3. Ejecuta `ASTRO_TELEMETRY_DISABLED=1 npm run preview -- --host 127.0.0.1 --port 4321`.
4. Abre `http://127.0.0.1:4321/` y `http://127.0.0.1:4321/evaluacion`.
5. Confirma en Tally remoto el orden y contenido interno de los campos.

URL local: `http://127.0.0.1:4321/`

Preview remoto: `https://yassergandhi-pek1nuy5f-yassergandhis-projects.vercel.app`

El deployment está `READY` y home/evaluación respondieron HTTP 200. Tiene protección de Vercel; una persona fuera del equipo puede requerir acceso o un enlace compartido.

## Capturas

Las capturas finales no se versionan porque `tmp/` está ignorado. Están en `tmp/final-bmv-v9/`:

- `home-mobile.png`
- `home-desktop.png`
- `evaluacion-mobile.png`
- `evaluacion-desktop.png`
- `reduced-motion.png`
- `first-viewport-390x844.png`
- `home-mobile-full.png`
- `home-desktop-full.png`
- nueve comparativas `type-*.png`

## Resultado

Build y pruebas pasan. QA cubre nueve viewports sin overflow, CTA visible, JavaScript desactivado, motion reducido, parámetros de Tally, enlaces, consola y red. Lighthouse móvil, mediana de tres: Performance 100, Accessibility 100, Best Practices 96, SEO 100, LCP 1.206 s, CLS 0 y TBT 0 ms.

## Decisiones humanas pendientes

- Aprobar o rechazar la jerarquía y copy comercial en la PR.
- Revisar y, si corresponde, editar los campos internos de Tally `MeQjR0`; el repositorio no puede hacerlo.
- Confirmar que el QR impreso use `BMV_EVENT_URL`. Las tarjetas sin UTM funcionan, pero no ofrecen atribución específica.
- Autorizar merge a `main` y deployment de producción. Ninguna de esas acciones se ejecutó en este trabajo.
