# Motion V8

Sin dependencias: un `IntersectionObserver` controla números, encabezados, líneas, firma y CTA final. Los elementos son visibles por defecto; sólo se ocultan cuando el observer está disponible y habilita el estado. Al salir completamente pueden repetirse al reentrar. El observer se desconecta en `pagehide`.

El hero usa una secuencia única por carga, sin esperar fuentes. Reduced motion desactiva animaciones, transiciones y transforms. Sin JavaScript todo permanece visible.


## V8.1 — Lifecycle y progressive enhancement

Un bootstrap inline comprueba soporte y preferencia de movimiento antes del primer paint. Su fail-safe elimina `data-motion-capable` en 1500 ms si el módulo no termina. Sin JavaScript, todo permanece visible.

El módulo asigna `data-reveal-ready` una sola vez y sólo alterna `data-visible`. Los grupos reciben `--reveal-order` con intervalos de 80 ms; al salir completamente se prepara una nueva entrada sin retirar el estado ready. Un observer atiende reveals y el pulso único del footer; un segundo observer, sólo en home, actualiza navegación activa y `aria-current`. Ambos se desconectan en `pagehide`.

El hero usa orden explícito, no `:nth-child`. El progreso de lectura utiliza `animation-timeline: scroll()` como mejora progresiva; navegadores sin soporte conservan la línea estática. Reduced motion evita estados, transformaciones y transiciones.
