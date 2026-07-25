# Tema visual de Tally

La apariencia interior se configura dentro de Tally, no desde Astro. El iframe no hereda el CSS del repositorio y el sitio no intenta modificar campos, textos, botones, placeholders ni respuestas.

## Configuración manual base

| Ajuste | Valor |
| --- | --- |
| Tema | Personalizado oscuro |
| Fondo | `#170411` |
| Texto | `#F5F0F0` |
| Acento | `#E95420` |
| Botón | `#E95420` |
| Texto del botón | `#170411` |
| Fuente | Ubuntu |
| Título del formulario en embed | Oculto |
| Contenido alineado a la izquierda | Activado |
| Altura dinámica | Activada |

Los controles de tema, color y fuente disponibles dependen de la interfaz y el plan vigente de la cuenta. Deben confirmarse dentro de Tally; el funcionamiento del formulario no debe condicionarse a contratar Pro.

## Ajustes de inputs, si la cuenta los permite

| Ajuste | Valor |
| --- | --- |
| Fondo del input | `#F5F0F0` o `#FFFFFF` |
| Texto del input | `#170411` |
| Placeholder | `#6F6269` |
| Borde | `#8F838B` |
| Borde al enfocar | `#E95420` |

Si una opción sólo aparece como personalización avanzada o CSS propio, se trata como mejora de Pro y no como requisito. Primero deben aplicarse los ajustes gratuitos visibles en la cuenta.

## Decisión de embed

No se usa `transparentBackground=1`. El iframe, su altura de respaldo y el estado de carga usan `#170411`; el formulario debe tener ese mismo fondo configurado explícitamente en Tally. Así se evita un destello blanco mientras carga o cuando vence la espera.

El componente conserva `hideTitle=1`, `alignLeft=1` y `dynamicHeight=1`.

## Responsabilidad del repositorio

`TallyEvaluation.astro` controla únicamente:

- el shell exterior;
- la URL oficial `data-tally-src`;
- los seis parámetros permitidos;
- el estado de carga;
- la espera de `20 s`;
- el fallback externo;
- la carga única del script oficial;
- una altura de respaldo de `900 px` en escritorio y `1050 px` en móvil.

Tally controla la altura después de inicializar el embed. No se leen respuestas ni contenido interno.

## Diagnóstico local pendiente

En Chrome normal e incógnito, sin bloqueadores, verificar en Network `tally`, `embed.js` y `MeQjR0`: estado del script, estado del iframe, duración, errores CSP o de red y evento de carga. Repetir en localhost y preview de Astro sin enviar el formulario. Si sólo falla en el perfil habitual, registrar interferencia probable de una extensión antes de cambiar CSP.
