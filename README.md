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
| Deployment | Vercel server output for the contact API route |
| Static SEO files | `public/robots.txt`, `public/sitemap-index.xml`, `public/sitemap-0.xml` |

## Technical notes

- Shared layout exposes metadata props for title, description, canonical, Open Graph, Twitter card, robots and JSON-LD schema.
- Home canonical: `https://yassergandhi.dev/`.

## Contact form

The contact form posts to `src/pages/api/brief.ts`.

Environment variables:

- `RESEND_API_KEY`: required to send email through Resend.
- `CONTACT_TO`: required recipient address.
- `CONTACT_FROM`: optional sender address. Defaults to Resend's onboarding sender.

Local testing:

```bash
RESEND_API_KEY=... CONTACT_TO=you@example.com npm run dev
```

If `RESEND_API_KEY` or `CONTACT_TO` is missing, the API returns `503` JSON with the fallback email. The frontend then shows an email fallback instead of pretending the brief was sent.

## Local development

```bash
npm install
npm run dev        # http://localhost:4321
npm run build
npm run preview
```
