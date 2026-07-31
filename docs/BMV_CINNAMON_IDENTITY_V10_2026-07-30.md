# BMV Cinnamon Identity V10 — 2026-07-30

## Base y alcance

- Base visual, técnica y estratégica: `feat/bmv-conversion-v9`.
- SHA de partida: `c5ed01dfafb81c9449243518b11db54a4b5d391d`.
- `git fetch --prune` confirmó la rama local y remota.
- V9 no estaba integrada en `main`; V10 se creó directamente desde V9.
- Rama: `feat/bmv-cinnamon-identity-v10`.
- No se recuperó código histórico ni se modificaron `main`, producción o Tally remoto.

V10 evoluciona la identidad y el tono sin reconstruir la arquitectura. Se conservan los cinco bloques de la home, `/evaluacion`, Tally `MeQjR0`, seis parámetros de atribución, campañas CANACO y BMV, redirect `/contacto`, sitemap, Analytics, build SHA, progressive enhancement y reduced motion.

## Decisión del isotipo

La nueva Y representa dos caminos que convergen en una decisión. El brazo izquierdo es continuo; el derecho se interrumpe antes de completarse. Una pieza naranja ocupa ese momento sin cerrar por completo el espacio visual: representa la observación que permite entender qué ocurrió y decidir cómo seguir.

Se eliminó por completo el signo semejante a “+”. La marca no usa símbolos médicos, flechas, nodos, globos, bombillas, círculos, iniciales adicionales ni referencias directas al logo de Ubuntu.

### Geometría

- `viewBox`: `0 0 120 120`.
- Márgenes ópticos: 8 unidades a la izquierda, 8 a la derecha y 8 en la base.
- Brazos: 20–24 unidades de grosor aparente.
- Tallo: 20 unidades, firme y ligeramente más estrecho que el conjunto de brazos.
- Unión: centrada en `x=60`, limpia y sin trazos superpuestos.
- Corte: aproximadamente 12°, dentro del intervalo 8°–18°.
- Pieza: paralelogramo naranja de 19 × 9 unidades; a 32 px conserva más de 2 px de altura.
- Construcción: tres paths rellenos, sin strokes finos, máscaras, filtros ni IDs.

La asimetría se concentra en el brazo derecho. El remate superior queda separado, pero alineado con el brazo y la pieza. A 16 px la Y sigue siendo reconocible; a partir de 24–32 px se distingue el corte.

### Variantes

1. Primaria bicolor: papel + naranja, `public/brand-y.svg`.
2. Monocromática clara: `public/brand-y-mono-light.svg`.
3. Monocromática oscura: `public/brand-y-mono-dark.svg`.
4. Favicon simplificado: `public/favicon.svg`.
5. Open Graph: `public/og-image.svg` y `public/og-image.png`.

`BrandMark.astro` usa `currentColor` para el cuerpo, `--mark-piece` para la pieza, modo `monochrome`, modo decorativo y etiqueta accesible. No genera IDs, por lo que puede aparecer varias veces en una página.

## Paleta Cinnamon

| Token | Valor | Uso |
| --- | --- | --- |
| `--ink` | `#140d0a` | fondo principal |
| `--surface` | `#1e1410` | footer y superficies |
| `--raised` | `#291a14` | bloques elevados |
| `--orange` | `#e95420` | CTA, líneas, pieza |
| `--orange-bright` | `#ff7043` | foco, hover y labels |
| `--orange-deep` | `#a83a18` | recurso grande o secundario |
| `--paper` | `#f5f0ec` | texto principal |
| `--muted` | `#c5b5aa` | texto secundario |
| `--line` | `rgba(233, 84, 32, .38)` | divisiones narrativas |
| `--line-soft` | `rgba(245, 240, 236, .14)` | divisiones discretas |

No quedan valores lima en CSS, isotipo, favicon u Open Graph. No se añadieron aubergine dominante, azul, dorado, gradientes, halos, glassmorphism ni naranja en párrafos.

### Contraste WCAG

| Par | Relación |
| --- | ---: |
| papel sobre ink | 17.00:1 |
| muted sobre ink | 9.68:1 |
| naranja sobre ink | 5.27:1 |
| naranja brillante sobre ink | 7.01:1 |
| ink sobre naranja | 5.27:1 |
| naranja sobre raised | 4.60:1 |
| papel sobre raised | 14.82:1 |

Todos los pares visibles alcanzan AA. `--orange-deep` no se usa como texto pequeño.

## Decisión tipográfica

Se compararon:

- Barlow Condensed 800 + Instrument Sans 400–700.
- Ubuntu Sans con display condensado + Ubuntu Sans 400–700.

La comparación se hizo en 390 × 844, 768 × 1024 y 1440 × 900; las capturas están en `tmp/final-bmv-v10/type-*.png`.

Se conserva Barlow Condensed + Instrument Sans. Barlow mantiene mejor economía horizontal, mayor contraste editorial y una relación más precisa con la verticalidad del isotipo. En 390 × 844 conserva CTA y microcopy completos; Ubuntu Sans ensancha el H1, desplaza el microcopy al límite inferior y se acerca más a una interfaz de sistema. La mejora de Ubuntu no fue inequívoca.

Las dos familias siguen alojadas localmente en dos WOFF2, sin Google Fonts ni requests duplicados.

## Copy: V9 frente a V10

### Hero

V9:

- “Diseño y desarrollo de sitios y sistemas web”.
- “Primero veamos qué pasa con las personas que ya llegan.”
- Explicación en tono más analítico.

V10:

- “Diseño y desarrollo web para negocios que ya reciben interés”.
- “Veamos qué pasa después de que alguien te encuentra.”
- “Partimos de un caso reciente…” y decisiones expresadas como acciones cotidianas.
- CTA: “Revisar un caso reciente”.
- Microcopy: “Dos minutos. Tus datos van al final.”

La pregunta “¿Quieres una página que atraiga clientes?” sigue siendo un deseo reconocible, no una promesa ni un testimonio.

### Situaciones

El título ahora reconoce primero a las personas interesadas y formula la incertidumbre en lenguaje hablado. Las filas se redujeron a canal, solicitud y duda posterior. Se retiraron explicaciones que repetían la tesis.

### Cómo trabajo

La secuencia se expresa como verbos observables:

1. seguimos lo que ocurrió;
2. ubicamos lo que quedó poco claro;
3. hacemos el cambio que corresponde.

No aparecen vocablos internos de consultoría ni anglicismos prohibidos.

### Trayectoria

La sección quedó en dos párrafos breves. Conserva investigación cualitativa, pedagogía, lenguaje, diseño, desarrollo web, GitHub, ORCID y huhuGERMAN.

### Evaluación y cierre

`/evaluacion` comienza con “Piensa en la última persona que mostró interés”. El texto y la nota sensible preceden inmediatamente al iframe. No hay explicación metodológica antes de Tally.

El cierre del footer es: “Primero vemos qué pasó. Después construimos lo necesario.”

## Motion del isotipo

El cuerpo de la Y aparece primero. La interrupción ya existe en el HTML y nunca se oculta. La pieza naranja parte 3 px a la izquierda y 2 px abajo, y se asienta en 360 ms. Después avanzan kicker, dos ideas del H1, cuerpo y CTA. La secuencia completa permanece dentro de 900 ms.

Hover y foco desplazan la pieza un máximo de 2 px, una sola vez, sin rotación, pulso ni escala. Reduced motion elimina transforms, animaciones y transiciones. Sin JavaScript, la Y y la pieza permanecen visibles y en posición final.

## Open Graph y SEO

- OG recreado en SVG y PNG de 1200 × 630.
- Fondo `#140d0a`, marca bicolor, naranja `#e95420` y papel `#f5f0ec`.
- Titular: “¿QUIERES UNA PÁGINA QUE ATRAIGA CLIENTES?”.
- Contraste: “VEAMOS QUÉ PASA DESPUÉS.”
- Firma: `yassergandhi.dev`.
- El PNG es el recurso usado por metadata.
- Title: `Diseño y desarrollo web para negocios en CDMX | Yasser Gandhi`.
- Meta description actualizada a interés, momento posterior y construcción necesaria.
- Open Graph, Twitter, schema y `lastmod` actualizados.
- Product version: `bmv-cinnamon-identity-v10`.
- `/evaluacion` conserva `noindex, follow` y canonical.

## Archivos modificados

- `src/components/BrandMark.astro`
- `src/components/Footer.astro`
- `src/pages/index.astro`
- `src/pages/evaluacion.astro`
- `src/pages/version.json.ts`
- `src/layouts/Layout.astro`
- `src/config/siteMetadata.mjs`
- `src/styles/global.css`
- `tests/quality.mjs`
- `public/brand-y.svg`
- `public/brand-y-mono-light.svg`
- `public/brand-y-mono-dark.svg`
- `public/favicon.svg`
- `public/og-image.svg`
- `public/og-image.png`

## QA

- `npm ci`: aprobado.
- Build Astro: aprobado.
- Pruebas semánticas: `quality BMV Cinnamon Identity V10: OK`.
- Preview local: aprobado.
- Viewports: 320 × 568, 360 × 800, 390 × 844, 430 × 932, 768 × 1024, 1024 × 768, 1280 × 800, 1440 × 900 y 1920 × 1080.
- Overflow horizontal: ninguno.
- CTA del hero: visible en los nueve primeros viewports.
- Logo: comprobado a 16, 24, 32, 48, 64, 128 y 256 px.
- Consola: cero errores.
- Red: cero cargas fallidas.
- Enlaces internos: HTTP 200.
- JavaScript desactivado: contenido, navegación y fallback visibles.
- Reduced motion: cero elementos narrativos transformados.
- Tally: iframe, ID, seis parámetros y dos fallbacks presentes.
- Fuentes: dos requests locales, sin duplicados.

### Lighthouse móvil

Mediana de tres corridas:

| Métrica | Resultado |
| --- | ---: |
| Performance | 100 |
| Accessibility | 100 |
| Best Practices | 96 |
| SEO | 100 |
| LCP | 1.217 s |
| CLS | 0 |
| TBT | 0 ms |
| FCP | 0.907 s |

## Capturas

`tmp/final-bmv-v10/` contiene:

- `logo-sizes.png`
- `hero-mobile.png`
- `hero-desktop.png`
- `page-full-mobile.png`
- `page-full-desktop.png`
- `evaluacion-mobile.png`
- `evaluacion-desktop.png`
- `reduced-motion.png`
- `og.png`
- `before-v9.png`
- `after-v10.png`
- seis comparativas tipográficas

`tmp/` permanece ignorado y no se versiona.

## Dependencias externas y Tally

Tally `MeQjR0` sigue siendo una dependencia remota. El repositorio controla el encabezado local, iframe, carga dinámica, fallback y parámetros, pero no puede cambiar:

- texto de campos;
- duplicados;
- obligatoriedad;
- orden;
- lógica condicional;
- confirmación final.

Estos puntos sólo pueden revisarse y corregirse desde Tally. Las campañas CANACO y BMV permanecen intactas.

## Rollback

V10 no modifica `main`. Para descartar antes del merge, cerrar la PR y eliminar la rama cuando corresponda. Si se integra y después debe revertirse, usar `git revert` sobre los commits V10 en orden inverso. No usar `reset --hard` ni force push. El punto de retorno completo a V9 es `c5ed01dfafb81c9449243518b11db54a4b5d391d`.
