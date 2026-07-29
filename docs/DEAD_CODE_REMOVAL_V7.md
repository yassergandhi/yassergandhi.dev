# Eliminación de código muerto V7

El grafo de imports mostró que `SimpleTextMotion.astro` era el único consumidor de `simpleTextMotion.ts` y `simple-text-motion.css`; la home era su único consumidor. Se retiraron juntos después de reemplazar la home. GSAP no tenía otros imports y se eliminó del lockfile.

Los componentes históricos restantes no se borraron: no participan en las rutas actuales, pero requieren una auditoría separada antes de eliminarlos. CSS V6 fue reemplazado por el sistema V7. Se conservaron favicon, OG, robots, sitemap, campaignLinks, Tally y Footer.
