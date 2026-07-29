# Auditoría UI/UX V8

El baseline V7 mantenía el producto correcto, pero utilizaba aubergine/naranja, escala moderada, tres cards repetidas y una firma débil frente a la tarjeta impresa. V8 introduce Y propia, negro/lima, display condensado, listas editoriales y firma huhuGERMAN.

Se eliminaron nueve componentes sin imports activos: CentralQuestion, Contact, ExperienceEvidence, FirstSolution, FoundationalScene, Hero, HowItWorksSection, OfferSection y TrustSection. Incluían narrativa y precio legacy. Git conserva el historial.

Las capturas y resultados de QA se guardan fuera de versión en `tmp/visual-v8/`.


## QA local

Se comprobaron home y evaluación en 320 × 568, 360 × 800, 390 × 844,
430 × 932, 768 × 1024, 820 × 1180, 1024 × 768, 1280 × 800,
1440 × 900 y 1920 × 1080. En todos los casos, `scrollWidth` coincidió con
`clientWidth` y no se detectaron elementos visibles fuera del viewport.

El recorrido por teclado conserva foco visible de 3 px. La home mantiene su
contenido con JavaScript desactivado. Con `prefers-reduced-motion: reduce`,
los elementos permanecen visibles y no reciben transformaciones. El observer
repite las entradas de sección únicamente después de una salida completa; la
secuencia del hero se ejecuta una vez por carga.

## Lighthouse

Mediana de tres corridas por perfil:

| Perfil | Performance | Accessibility | Best Practices | SEO | LCP | CLS | TBT |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: |
| Home móvil | 100 | 100 | 96 | 100 | 1.486 s | 0.00044 | 0 ms |
| Home escritorio | 100 | 100 | 96 | 100 | 0.680 s | 0.00028 | 0 ms |
| Evaluación móvil | 95 | 100 | 96 | 66 | 2.403 s | 0.00018 | 0 ms |
| Home, movimiento reducido | 95 | 100 | 96 | 100 | 2.330 s | 0.02061 | 0 ms |

La puntuación SEO de evaluación refleja su `noindex, follow` intencional. La
evaluación también carga el iframe externo de Tally: su mediana transfirió
917,209 bytes y solicitó cinco fuentes frente a 70,765 bytes y tres solicitudes
de fuentes en la home. No se atribuyeron long tasks al sistema de motion.


## V8.1 — Auditoría de voz e interacción

El lenguaje defensivo de hero, posibilidades, método, alcance y evaluación se sustituyó por orientación concreta basada en situaciones escuchables: clientes que llegan desde Facebook, Google Maps o una recomendación; conversaciones que se enfrían; información que debe explicarse otra vez; y claridad sobre el siguiente paso.

La verificación V8.1 cubre navegación activa, progreso de lectura, stagger por grupos, reentrada sin retirar `data-reveal-ready`, estados de Tally, hover, foco, active, JavaScript desactivado y reduced motion. Las evidencias locales se guardan en `tmp/visual-v8-1/`.


### Resultados Lighthouse V8.1

Mediana de tres corridas por perfil:

| Perfil | Performance | Accessibility | Best Practices | SEO | LCP | CLS | TBT |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: |
| Home móvil | 100 | 100 | 96 | 100 | 1.504 s | 0.00053 | 0 ms |
| Home escritorio | 100 | 100 | 96 | 100 | 0.578 s | 0.00049 | 0 ms |
| Evaluación móvil | 95 | 100 | 96 | 66 | 2.407 s | 0.00266 | 0 ms |
| Home, movimiento reducido | 95 | 100 | 96 | 100 | 2.422 s | 0.00053 | 0 ms |

La puntuación SEO 66 de evaluación corresponde exclusivamente a su `noindex, follow` intencional. La home conserva tres solicitudes de fuentes, TBT de 0 ms y no registra long tasks atribuibles a motion.
