# yassergandhi.dev

Commercial homepage for Yasser Gandhi Hernández Esquivel.

Live at [yassergandhi.dev](https://yassergandhi.dev)

## Positioning

yassergandhi.dev sells qualitative friction analysis for SaaS onboarding, support, forms, handoffs and activation.

Core message:

“Find where your users stop acting — before support absorbs the cost.”

The homepage is positioned for Customer Success, Implementation, Support, Product Education and early-stage B2B SaaS teams dealing with repeated support questions, onboarding gaps, weak intake data and incomplete handoffs.

huhuGERMAN is referenced only as a protected living lab for structured friction, user reflection and feedback design. The site does not expose internal method details, private data or testimonials.

## Stack

| Layer | Choice |
| --- | --- |
| Framework | Astro |
| Styling | CSS custom properties in `src/styles/global.css` |
| Typography | Ubuntu and Ubuntu Mono via Google Fonts |
| Metadata | Shared Astro layout props plus JSON-LD graph injection |
| Contact | Mailto brief with prefilled inquiry prompts |
| Static SEO files | `public/robots.txt`, `public/sitemap-index.xml`, `public/sitemap-0.xml` |

## Technical notes

- Shared layout exposes metadata props for title, description, canonical, Open Graph, Twitter card, robots and JSON-LD schema.
- Home canonical: `https://yassergandhi.dev/`.
- Homepage sections are modular Astro components composed in `src/pages/index.astro`.

## Contact

Contact is email-only for now. The homepage uses a `mailto:` CTA with a prefilled `Friction Audit Inquiry` subject and a short checklist for the friction brief. There is no active form submission endpoint or Resend integration.

## Local development

```bash
npm install
npm run dev        # http://localhost:4321
npm run build
npm run preview
```
