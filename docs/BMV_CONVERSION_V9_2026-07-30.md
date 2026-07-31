# BMV Conversion V9 — 2026-07-30

## Punto de partida

- Fuente de verdad verificada: `main`.
- SHA local y remoto después de `git fetch --prune`: `25f7f074c9d55fb0f982767d7158c3c9378a2091`.
- Commit: `merge: publica identidad y copy V8.1`.
- Rama creada desde ese SHA: `feat/bmv-conversion-v9`.
- `main` no había avanzado respecto del punto de partida esperado. No se consultaron ni integraron ramas históricas.

## Problema estratégico

V8.1 conservaba una identidad sólida, pero la home pedía demasiado tiempo antes de hacer evidente la oferta. Repartía la tesis entre varias secciones de continuidad, posibilidades, método, inventario, evaluación y cierre. El CTA “Contar una situación” exigía que el visitante decidiera qué contar antes de entender el beneficio inmediato. La ruta `/evaluacion` añadía explicación y posibles desenlaces antes del formulario.

La V9 concentra la decisión comercial en una pregunta reconocible: una persona ya mostró interés; revisemos qué ocurrió antes de asumir que hace falta construir una página nueva.

## Arquitectura anterior

La home tenía nueve bloques de contenido: hero, problema, continuidad, resultados posibles, método, inventario de capacidades, evidencia, explicación de la evaluación y CTA final. La navegación incluía “Posibilidades”, una sección retirada en V9.

`/evaluacion` presentaba tres columnas de explicación y una lista de cinco posibles desenlaces antes de Tally.

## Arquitectura nueva

La home tiene exactamente cinco bloques principales:

1. Hero: categoría, deseo reconocible, revisión del caso, CTA y microcopy.
2. Situaciones: tres momentos observables en filas editoriales.
3. Cómo trabajo: observar, ubicar lo que necesita claridad y construir lo necesario.
4. Trayectoria: quince años, investigación cualitativa, lenguaje, pedagogía, desarrollo web y enlaces de evidencia.
5. CTA final: una pregunta concreta y el mismo CTA dominante.

La navegación quedó reducida a Situaciones, Cómo trabajo, Trayectoria y Revisar un caso. En móvil se conserva la marca y el CTA directo; los anclajes secundarios no ocupan un segundo renglón.

`/evaluacion` funciona como landing autónoma: introducción breve, franja de expectativas, advertencia sensible y Tally inmediato. Hay menos de 90 palabras visibles antes del iframe.

## Jerarquía de copy

- Categoría: “Diseño y desarrollo de sitios y sistemas web”.
- Deseo: “¿Quieres una página que atraiga clientes?”.
- Contraste: “Primero veamos qué pasa con las personas que ya llegan.”
- Explicación: sigue un caso real y deja la decisión de construcción para después.
- CTA dominante: “Revisar un caso reciente”.
- Reducción de esfuerzo: dos minutos y no hace falta identificar el problema.

La frase “quiero una página que atraiga clientes” es la única formulación atribuible al mercado CANACO con evidencia suficiente. V9 la transforma en una pregunta honesta; no aparece como cita, testimonio ni afirmación atribuida a clientes.

Las tres escenas de Situaciones —cómo encuentran al negocio, qué piden y qué deja de estar claro— son copy de reconocimiento. No son testimonios, no llevan comillas y no implican frecuencia medida.

## Decisión tipográfica

Se compararon tres combinaciones en 390 × 844, 768 × 1024 y 1440 × 900:

- A: Barlow Condensed 800 + Instrument Sans.
- B: Archivo Black + Instrument Sans.
- C: Archivo 900 + Instrument Sans.

Se eligió A. Barlow Condensed conserva la fuerza autoral y la relación vertical con el isotipo Y, ocupa menos ancho, resuelve bien signos y acentos y permite mantener el CTA en el primer viewport. Archivo Black resultó más rígida y ancha; Archivo se acercó a una interfaz de producto más genérica. Las nueve capturas comparativas están en `tmp/final-bmv-v9/type-*.png`.

Las fuentes finales se sirven localmente en dos archivos WOFF2: Barlow Condensed 800 e Instrument Sans variable 400–700. No hay solicitudes a Google Fonts ni archivos descartados en producción.

## Sistema de color

Se conserva negro, blanco, gris y lima. Se ajustó el negro a `#121212`, la superficie a `#1b1b1b`, la superficie elevada a `#242424` y la lima a `#d7ed55`. La lima se usa para CTA, foco, isotipo, líneas, labels y el contraste breve del H1. No se usa para párrafos ni se introdujeron azul/dorado, gradientes, halos o superficies de producto.

## Narrativa de motion

El hero sigue: isotipo, categoría, deseo, contraste, explicación y CTA. Cada paso usa un desplazamiento breve sin ocultar el contenido; la secuencia termina antes de 800 ms y el CTA inicia a los 500 ms. El H1 permanece pintado, por lo que la animación no retrasa LCP.

En scroll se usan tres recursos:

1. líneas que avanzan;
2. entradas breves de títulos y filas;
3. cambio de estado lima en el contraste y la secuencia.

El sistema sigue basado en CSS, `IntersectionObserver`, custom properties y atributos de datos. Con `prefers-reduced-motion: reduce` no se ejecutan transforms ni movimiento automático. Sin JavaScript, todo el contenido permanece visible.

## Componentes, CSS y scripts

- `index.astro`: reemplazo de nueve bloques por cinco.
- `Nav.astro`: destinos y CTA simplificados.
- `Footer.astro`: CTA y cierre alineados con V9.
- `evaluacion.astro`: introducción autónoma y Tally inmediato.
- `TallyEvaluation.astro`: se conservaron ID, carga dinámica, fallback y seis parámetros; no se modificó el formulario remoto.
- `global.css`: sistema editorial compacto, responsive, fuentes locales, foco y motion.
- `revealMotion.ts`: se conserva como controlador ligero de revelado y navegación activa.
- `version.json.ts`: producto actualizado a `bmv-conversion-v9`, conservando commit, entorno y fecha de build.

## SEO técnico

- Title: `Diseño y desarrollo de sitios web para negocios en CDMX | Yasser Gandhi`.
- Meta description alineada con canales de llegada, revisión y construcción.
- Open Graph y Twitter alineados con la nueva promesa.
- Schema actualizado para `Person`, `WebSite`, `WebPage`, `ProfessionalService` y `Service`.
- Canonical home: `https://yassergandhi.dev/`.
- Canonical evaluación: `https://yassergandhi.dev/evaluacion`.
- `/evaluacion`: `noindex, follow` conservado.
- Sitemap limitado a la home indexable con `lastmod` del 30 de julio de 2026.
- Una sola instancia de Vercel Analytics.

## Campaña BMV y atribución

`BMV_EVENT_URL`:

`https://yassergandhi.dev/evaluacion?utm_source=bmv&utm_medium=offline&utm_campaign=networking_bmv_agosto_2026&utm_content=qr_evento&offer=evaluacion_inicial`

Las URLs CANACO permanecen intactas. Las tarjetas que apuntan directamente a `/evaluacion` sin UTM siguen funcionando, pero no permiten atribuir la visita específicamente a BMV, CANACO u otra pieza.

## Pruebas y resultados

- `npm ci`: aprobado; 202 paquetes instalados desde lockfile.
- `ASTRO_TELEMETRY_DISABLED=1 npm run build`: aprobado; 3 páginas estáticas.
- `npm test`: aprobado; `quality BMV Conversion V9: OK`.
- `npm run preview -- --host 127.0.0.1 --port 4321`: aprobado.
- Viewports: 320 × 568, 360 × 800, 390 × 844, 430 × 932, 768 × 1024, 1024 × 768, 1280 × 800, 1440 × 900 y 1920 × 1080.
- Overflow horizontal: ninguno en los nueve tamaños.
- CTA del hero: visible en los nueve primeros viewports; posición superior a 684 px o menos.
- 390 × 844: categoría, las dos ideas del H1, explicación, CTA completo y microcopy visibles sin scroll.
- JavaScript desactivado: contenido, navegación y fallback de Tally visibles.
- Motion reducido: preferencia detectada, cero elementos narrativos transformados.
- Tally: iframe presente, `MeQjR0`, seis parámetros propagados y dos enlaces de fallback.
- Consola: cero errores.
- Red: cero cargas fallidas y cero 404 durante el recorrido local.
- Enlaces internos probados: HTTP 200.
- Una sola familia display y una familia de texto, servidas con dos requests locales.

Lighthouse móvil, mediana de tres corridas:

| Métrica | Resultado |
| --- | ---: |
| Performance | 100 |
| Accessibility | 100 |
| Best Practices | 96 |
| SEO | 100 |
| LCP | 1.206 s |
| CLS | 0 |
| TBT | 0 ms |
| FCP | 0.758 s |

La auditoría de `/evaluacion` conserva deliberadamente `noindex, follow`; no debe interpretarse su exclusión del índice como un defecto.

## Riesgos y dependencias externas

- Tally es una dependencia remota. Desde el repositorio se verificaron el ID, iframe, fallback, carga y parámetros; no se puede modificar ni certificar aquí el orden, duplicados, textos o campos internos del formulario `MeQjR0`.
- Conviene revisar manualmente el formulario remoto antes de imprimir o distribuir el QR: primer campo, duplicados, campos requeridos, confirmación y entrega de atribución.
- La respuesta prometida “por el medio que elijas” depende de que Tally ofrezca correctamente esa selección.
- Vercel Analytics sólo registra en el entorno compatible; su componente está presente una vez.
- El preview está protegido por Vercel; una persona sin acceso al equipo puede necesitar un enlace compartido o autenticación.
- Best Practices queda en 96 en Lighthouse local. No hay errores de consola ni red; el resultado cumple el objetivo solicitado.

## Rollback

No se modificó `main`. Para descartar V9 basta con cerrar la PR y eliminar la rama de trabajo cuando corresponda. Si los commits fueran integrados y hubiera que revertirlos, usar `git revert` en orden inverso sobre los commits de `feat/bmv-conversion-v9`; no usar `reset --hard` ni force push. El punto de retorno verificado es `25f7f074c9d55fb0f982767d7158c3c9378a2091`.
