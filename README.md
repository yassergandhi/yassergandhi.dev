# yassergandhi.dev

Commercial homepage for Yasser Gandhi Hernández Esquivel.

Live at [yassergandhi.dev](https://yassergandhi.dev)

## Positioning

Guidance Failure Architecture and Hidden Scaffold Reviews for SaaS/software teams whose critical flows look clear but fail when users have to act.

“When the system stops guiding, the real design begins.”

The site presents the core phenomenon: a system assumes the human can continue, but the system has stopped guiding. Guidance failure is not just where users stop; it is where the organization starts paying for the missing scaffold elsewhere. Cost of inaction is framed as recurring operational waste, not as a universal promise: support load, onboarding drag, implementation delays, bad intake, poor qualification, customer success workarounds, and churn or retention drag.

## Stack

| Layer | Choice |
| --- | --- |
| Framework | Astro |
| Styling | CSS custom properties in `src/styles/global.css` |
| Typography | Ubuntu and Ubuntu Mono via Google Fonts |
| Metadata | Shared Astro layout props plus JSON-LD graph injection |
| Static SEO files | `public/robots.txt`, `public/sitemap-index.xml`, `public/sitemap-0.xml` |

## Technical notes

- Shared layout exposes metadata props for title, description, canonical, Open Graph, Twitter card, robots and JSON-LD schema.
- Home canonical: `https://yassergandhi.dev/`.
- `huhuGERMAN` is retained as authorial evidence of domain-governed AI and scaffolded experience design.

## Local development

```bash
npm install
npm run dev        # http://localhost:4321
npm run build
npm run preview
```
