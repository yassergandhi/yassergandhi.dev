# yassergandhi.dev

Commercial homepage for Yasser Gandhi Hernández Esquivel.

Live at [yassergandhi.dev](https://yassergandhi.dev)

## Positioning

Guidance Failure Architecture and Hidden Scaffold Reviews for SaaS/software teams whose critical flows look clear but fail when users have to act.

“When the system stops guiding, the real design begins.”

The site presents the core phenomenon: a system assumes the human can continue, but the system has stopped guiding. The offer helps teams find the hidden scaffold their product assumes but never designed.

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

## Contact

Contact is email-only for now. The homepage uses a `mailto:` CTA with a prefilled `Hidden Scaffold Review Inquiry` subject and a short checklist for the flow brief. There is no active form submission endpoint or Resend integration.

## Local development

```bash
npm install
npm run dev        # http://localhost:4321
npm run build
npm run preview
```
