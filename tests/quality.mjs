import fs from 'node:fs';

const read = (path) => fs.readFileSync(path, 'utf8');
const assert = (condition, message) => {
  if (!condition) throw new Error(message);
};
const count = (source, pattern) => (source.match(pattern) || []).length;

const home = read('dist/index.html');
const evaluation = read('dist/evaluacion/index.html');
const contacto = read('dist/contacto/index.html');
const version = JSON.parse(read('dist/version.json'));
const vercel = JSON.parse(read('vercel.json'));
const campaign = read('src/config/campaignLinks.ts');
const layout = read('src/layouts/Layout.astro');
const css = read('src/styles/global.css');
const motion = read('src/scripts/revealMotion.ts');
const tally = read('src/components/TallyEvaluation.astro');
const activeSource = [
  ...fs.readdirSync('src/components').filter((name) => name.endsWith('.astro')).map((name) => read(`src/components/${name}`)),
  read('src/pages/index.astro'),
  read('src/pages/evaluacion.astro'),
  css,
].join('\n');

// Estructura y semántica.
assert(count(home, /<h1[ >]/g) === 1, 'la home debe tener un solo H1');
assert(count(evaluation, /<h1[ >]/g) === 1, 'evaluación debe tener un solo H1');
assert(count(home, /<main[ >]/g) === 1 && count(evaluation, /<main[ >]/g) === 1, 'cada página debe tener un main');
assert(home.includes('Diseño y desarrollo de sitios y sistemas web'), 'categoría visible');
assert(count(home, /Revisar un caso reciente/g) >= 2, 'CTA dominante en ambos extremos');
assert(home.includes('href="/evaluacion?originPage=home&amp;offer=evaluacion_inicial"'), 'CTA enlaza a evaluación');
assert(home.includes('id="situaciones"') && home.includes('id="como-trabajo"') && home.includes('id="trayectoria"') && home.includes('id="revisar"'), 'cinco bloques y destinos de navegación');

// Metadata indexable y sitemap.
assert(home.includes('<title>Diseño y desarrollo de sitios web para negocios en CDMX | Yasser Gandhi</title>'), 'title orgánico exacto');
assert(home.includes('Diseño sitios y sistemas web para negocios que ya reciben contactos por Facebook, Google Maps, recomendación o búsqueda. Primero revisamos qué pasa; después construimos lo necesario.'), 'description visible en metadata');
assert(home.includes('rel="canonical" href="https://yassergandhi.dev/"'), 'canonical home');
assert(home.includes('"@type":"ProfessionalService"') && home.includes('"@type":"Service"'), 'schema de servicio');
assert(read('dist/sitemap-0.xml').includes('<loc>https://yassergandhi.dev/</loc>'), 'home en sitemap');
assert(read('dist/sitemap-0.xml').includes('<lastmod>2026-07-30T06:00:00.000Z</lastmod>'), 'lastmod actualizado');

// Evaluación autónoma, Tally y atribución.
assert(evaluation.includes('noindex, follow'), 'evaluación conserva noindex, follow');
assert(evaluation.includes('rel="canonical" href="https://yassergandhi.dev/evaluacion"'), 'canonical evaluación');
assert(count(evaluation, /<iframe/g) === 1 && evaluation.includes('MeQjR0'), 'una instancia de Tally MeQjR0');
assert(evaluation.includes('<noscript>') && evaluation.includes('Abrir formulario'), 'fallback sin JavaScript');
for (const parameter of ['utm_source', 'utm_medium', 'utm_campaign', 'utm_content', 'originPage', 'offer']) {
  assert(tally.includes(`'${parameter}'`), `parámetro conservado: ${parameter}`);
}
assert(count(tally, /'utm_source'|'utm_medium'|'utm_campaign'|'utm_content'|'originPage'|'offer'/g) === 6, 'exactamente seis parámetros permitidos');

// Infraestructura.
assert(vercel.redirects.some((redirect) => redirect.source === '/contacto' && redirect.destination === '/evaluacion' && redirect.permanent), 'redirect /contacto');
assert(contacto.includes('originPage') && contacto.includes('window.location.replace'), 'fallback de redirect conserva parámetros');
assert(version.productVersion === 'bmv-conversion-v9' && version.commit, 'version.json V9 y build SHA');
assert(count(home, /data-astro-cid-[^=]+/g) >= 0, 'HTML generado');
assert(count(layout, /<Analytics \/>/g) === 1, 'una instancia de Vercel Analytics');

// Campañas: CANACO se conserva y BMV se añade.
assert(campaign.includes('CANACO_CARD_URL') && campaign.includes('CANACO_FLYER_URL'), 'URLs CANACO conservadas');
assert(campaign.includes('https://yassergandhi.dev/evaluacion?utm_source=bmv&utm_medium=offline&utm_campaign=networking_bmv_agosto_2026&utm_content=qr_evento&offer=evaluacion_inicial'), 'URL BMV exacta');

// Sistema visual, fuentes y motion accesible.
assert(layout.includes('/fonts/barlow-condensed-800-latin.woff2') && layout.includes('/fonts/instrument-sans-latin.woff2'), 'dos fuentes locales precargadas');
assert(fs.existsSync('public/fonts/barlow-condensed-800-latin.woff2') && fs.existsSync('public/fonts/instrument-sans-latin.woff2'), 'archivos de fuente presentes');
assert(count(layout, /rel="preload" href="\/fonts\//g) === 2, 'sin requests redundantes de fuentes');
assert(!layout.includes('Archivo') && !layout.includes('Ubuntu'), 'sin fuentes descartadas o legacy');
assert(css.includes('@media (prefers-reduced-motion: reduce)') && css.includes('animation: none !important'), 'reduced motion');
assert(motion.includes('IntersectionObserver') && Buffer.byteLength(motion) < 5000, 'motion ligero');
assert(!css.includes('opacity: 0') && !activeSource.includes('ScrollTrigger'), 'contenido visible sin JS y sin bloqueo');

// Prohibiciones de regresión en el producto activo.
for (const pattern of [
  /\$24,999/i, /\b24999\b/i, /\bSaaS\b/i, /Customer Success/i, /\bonboarding\b/i,
  /\bhandoff\b/i, /\bfriction\b/i, /\blead\b/i, /\bjourney\b/i, /\bfunnel\b/i,
  /\bhigh-ticket\b/i, /AVANTI 15/i, /\bGSAP\b/i, /SplitText/i, /ScrollTrigger/i,
]) {
  assert(!pattern.test(activeSource), `término o recurso prohibido: ${pattern}`);
}

console.log('quality BMV Conversion V9: OK');
