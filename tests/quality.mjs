import fs from 'node:fs';

const read = (path) => fs.readFileSync(path, 'utf8');
const count = (source, pattern) => (source.match(pattern) || []).length;
const assert = (condition, message) => {
  if (!condition) throw new Error(message);
};
const pngDimensions = (path) => {
  const file = fs.readFileSync(path);
  return { width: file.readUInt32BE(16), height: file.readUInt32BE(20) };
};

const home = read('dist/index.html');
const evaluation = read('dist/evaluacion/index.html');
const contacto = read('dist/contacto/index.html');
const sitemap = read('dist/sitemap-0.xml');
const version = JSON.parse(read('dist/version.json'));
const vercel = JSON.parse(read('vercel.json'));
const campaign = read('src/config/campaignLinks.ts');
const layout = read('src/layouts/Layout.astro');
const css = read('src/styles/global.css');
const motion = read('src/scripts/revealMotion.ts');
const tally = read('src/components/TallyEvaluation.astro');
const brandComponent = read('src/components/BrandMark.astro');
const brand = read('public/brand-y.svg');
const favicon = read('public/favicon.svg');
const og = read('public/og-image.svg');
const productSource = [
  ...fs.readdirSync('src/components').filter((name) => name.endsWith('.astro')).map((name) => read(`src/components/${name}`)),
  read('src/pages/index.astro'),
  read('src/pages/evaluacion.astro'),
  css,
].join('\n');

// Arquitectura y acción.
assert(count(home, /<h1[ >]/g) === 1 && count(evaluation, /<h1[ >]/g) === 1, 'un H1 por página');
assert(count(home, /<main[ >]/g) === 1 && count(evaluation, /<main[ >]/g) === 1, 'un main por página');
assert(home.includes('Diseño y desarrollo web para negocios'), 'categoría visible');
assert(count(home, /Revisar un caso reciente/g) >= 2, 'CTA dominante al inicio y cierre');
assert(home.includes('href="/evaluacion?originPage=home&amp;offer=evaluacion_inicial"'), 'CTA a evaluación');
for (const id of ['situaciones', 'como-trabajo', 'trayectoria', 'revisar']) {
  assert(home.includes(`id="${id}"`), `bloque V9 conservado: ${id}`);
}

// SEO y metadata exacta.
assert(home.includes('<title>Diseño y desarrollo web para negocios en CDMX | Yasser Gandhi</title>'), 'title orgánico V10');
assert(home.includes('Diseño páginas y sistemas web para negocios que ya reciben interés. Revisamos qué pasa después de que alguien te encuentra y construimos sólo lo necesario.'), 'description V10');
assert(home.includes('rel="canonical" href="https://yassergandhi.dev/"'), 'canonical home');
assert(evaluation.includes('rel="canonical" href="https://yassergandhi.dev/evaluacion"'), 'canonical evaluación');
assert(evaluation.includes('noindex, follow'), 'evaluación noindex, follow');
assert(home.includes('"@type":"ProfessionalService"') && home.includes('"@type":"Service"'), 'schema de servicios');
assert(sitemap.includes('<loc>https://yassergandhi.dev/</loc>') && sitemap.includes('2026-07-31T05:45:00.000Z'), 'sitemap y lastmod V10');
assert(count(layout, /<Analytics \/>/g) === 1, 'una instancia de Analytics');

// Tally y atribución.
assert(count(evaluation, /<iframe/g) === 1 && evaluation.includes('MeQjR0'), 'Tally MeQjR0');
assert(evaluation.includes('<noscript>') && evaluation.includes('Abrir formulario'), 'fallback sin JavaScript');
for (const parameter of ['utm_source', 'utm_medium', 'utm_campaign', 'utm_content', 'originPage', 'offer']) {
  assert(tally.includes(`'${parameter}'`), `parámetro Tally: ${parameter}`);
}
assert(count(tally, /'utm_source'|'utm_medium'|'utm_campaign'|'utm_content'|'originPage'|'offer'/g) === 6, 'seis parámetros exactos');
assert(campaign.includes('CANACO_CARD_URL') && campaign.includes('CANACO_FLYER_URL'), 'campañas CANACO');
assert(campaign.includes('utm_source=bmv') && campaign.includes('networking_bmv_agosto_2026'), 'campaña BMV');

// Infraestructura.
assert(vercel.redirects.some((item) => item.source === '/contacto' && item.destination === '/evaluacion' && item.permanent), 'redirect /contacto');
assert(contacto.includes('originPage') && contacto.includes('window.location.replace'), 'fallback de redirect');
assert(version.productVersion === 'bmv-cinnamon-identity-v10' && version.commit, 'version.json y build SHA');

// Isotipo y activos.
assert(brandComponent.includes('viewBox="0 0 120 120"'), 'viewBox del isotipo');
assert(brandComponent.includes('brand-mark-piece') && css.includes('--mark-piece'), 'pieza naranja configurable');
assert(brandComponent.includes('monochrome') && brandComponent.includes('decorative'), 'variantes accesible y monocromática');
assert(count(brand, /<path/g) === 3 && brand.includes('#E95420') && !brand.includes('<circle') && !brand.includes('<line'), 'isotipo primario sin signo añadido');
assert(fs.existsSync('public/brand-y-mono-light.svg') && fs.existsSync('public/brand-y-mono-dark.svg'), 'variantes monocromáticas');
assert(favicon.includes('#140D0A') && favicon.includes('#E95420') && count(favicon, /<path/g) === 3, 'favicon V10 simplificado');
assert(og.includes('1200') && og.includes('630') && og.includes('VEAMOS QUÉ PASA DESPUÉS.') && !og.includes('LA PROMESA ABRE LA PUERTA'), 'Open Graph V10');
assert(JSON.stringify(pngDimensions('public/og-image.png')) === JSON.stringify({ width: 1200, height: 630 }), 'PNG Open Graph 1200 × 630');

// Color, fuentes y motion.
for (const token of ['--ink: #140d0a', '--surface: #1e1410', '--raised: #291a14', '--orange: #e95420', '--orange-bright: #ff7043', '--orange-deep: #a83a18', '--paper: #f5f0ec', '--muted: #c5b5aa']) {
  assert(css.includes(token), `token V10: ${token}`);
}
for (const legacyColor of ['#d7ed55', '#e5fa69', '#d2e659', '#141314', '#eeeded']) {
  assert(!`${css}${brand}${favicon}${og}`.toLowerCase().includes(legacyColor), `color legacy ausente: ${legacyColor}`);
}
assert(!/\blime\b/i.test(`${css}${brand}${favicon}${og}`), 'lima ausente');
assert(layout.includes('/fonts/barlow-condensed-800-latin.woff2') && layout.includes('/fonts/instrument-sans-latin.woff2'), 'fuentes V9 conservadas y locales');
assert(count(layout, /rel="preload" href="\/fonts\//g) === 2, 'dos requests de fuente');
assert(css.includes('@keyframes piece-settle') && css.includes('translate(-3px, 2px)'), 'motion narrativo de la pieza');
assert(css.includes('@media (prefers-reduced-motion: reduce)') && css.includes('animation: none !important'), 'reduced motion');
assert(motion.includes('IntersectionObserver') && Buffer.byteLength(motion) < 5000, 'script de motion ligero');
assert(!css.includes('opacity: 0'), 'contenido visible sin JavaScript');

// Regresiones de lenguaje y dependencias.
for (const pattern of [
  /\$24,999/i, /\b24999\b/i, /\bSaaS\b/i, /Customer Success/i, /\bonboarding\b/i,
  /\bhandoff\b/i, /\bfriction\b/i, /\blead\b/i, /\bjourney\b/i, /\bfunnel\b/i,
  /\bhigh-ticket\b/i, /AVANTI 15/i, /\bGSAP\b/i, /SplitText/i, /ScrollTrigger/i,
  /\bfricción\b/i, /\bcontinuidad\b/i, /\brecorrido\b/i, /\bintervención\b/i,
  /\bdiagnóstico\b/i, /caso investigable/i, /evidencia suficiente/i,
]) {
  assert(!pattern.test(productSource), `regresión prohibida: ${pattern}`);
}

console.log('quality BMV Cinnamon Identity V10: OK');
