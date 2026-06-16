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

## Contact form

The contact form posts to `/api/brief` and is intended to run as a Vercel Serverless Function. It validates required fields, rejects the `website` honeypot field, applies length limits, and sends mail through the Resend HTTP API when email environment variables are configured.

Required environment variables:

| Variable | Required | Purpose |
| --- | --- | --- |
| `RESEND_API_KEY` | Yes | API key used to call `https://api.resend.com/emails`. |
| `CONTACT_TO` | Yes | Destination email address for Hidden Scaffold Review briefs. |
| `CONTACT_FROM` | No | Sender address. Defaults to `onboarding@resend.dev` if omitted. |

If `RESEND_API_KEY` or `CONTACT_TO` is missing, the endpoint returns a `503` JSON response with a fallback `mailto:` URL. The frontend does not fake success; it shows the fallback email link.

Local testing:

```bash
npm run dev
# submit the form at http://localhost:4321/#contact
# without env vars, expect a 503 response and fallback mailto link
```
