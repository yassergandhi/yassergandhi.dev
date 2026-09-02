# yassergandhi.dev

> **Status: archived 2026 product/market experiment**
>
> This repository preserves the commercial version of yassergandhi.dev that tested a qualitative friction-analysis offer for SaaS onboarding, support, forms and handoffs. The offer is no longer an active commercial priority.

Live domain: [yassergandhi.dev](https://yassergandhi.dev)

## What this experiment tested

The site positioned qualitative research as a paid service for teams dealing with repeated support questions, onboarding gaps, weak intake data and incomplete handoffs.

The core message was:

> “Find where your users stop acting — before support absorbs the cost.”

The offer was taken beyond internal ideation: it was exposed through a priced proposition and in-person networking. It did not produce enough commercial evidence to justify continuing the service as an active offer.

That result should be read as market evidence about this specific positioning, not as a technical failure of the site.

## Why the repository remains public

A product can be archived without making its assets worthless.

This codebase is preserved as:

- an Astro implementation sample;
- a record of a real product/market experiment;
- a source of historical positioning and copy decisions;
- an example of explicit scope reduction from form-based lead capture back to email contact;
- infrastructure that may later be repurposed for a different technical role.

Reusing the domain does not automatically reopen the commercial hypothesis.

## Current codebase

| Layer | Choice |
|---|---|
| Framework | Astro |
| Styling | CSS custom properties in `src/styles/global.css` |
| Typography | Ubuntu and Ubuntu Mono via Google Fonts |
| Metadata | Shared Astro layout props plus JSON-LD graph injection |
| Contact | Mailto brief with prefilled inquiry prompts |
| Static SEO files | `public/robots.txt`, `public/sitemap-index.xml`, `public/sitemap-0.xml` |

## Technical notes

- shared layout props cover title, description, canonical URL, Open Graph, Twitter card, robots and JSON-LD;
- the home canonical is `https://yassergandhi.dev/`;
- homepage sections are composed as modular Astro components;
- contact is currently email-only;
- there is no active form submission endpoint or Resend integration.

## What this repository does not prove

- product-market fit;
- validated willingness to pay;
- a repeatable acquisition channel;
- an active consulting practice;
- revenue from the friction-analysis offer.

Those claims require transaction evidence, not copy or deployment.

## Local development

```bash
npm install
npm run dev
npm run build
npm run preview
```

## Current strategic role

The domain is available for future reuse as a developer portfolio, technical project launcher, documentation surface or another web application.

No new role is assumed until there is a concrete reason to implement it.

## About

**Yasser Gandhi Hernández Esquivel**

Software Developer · React + TypeScript · Web applications and API integration

B.S. Web Systems Development (UdeG, 2025) · M.Ed. Pedagogy (UNAM, 2020) · German Studies (UNAM, 2012)

[LinkedIn](https://linkedin.com/in/yassergandhi)
