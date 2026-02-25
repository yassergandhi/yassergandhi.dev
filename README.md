# yassergandhi.dev

**Personal portfolio** for Yasser Gandhi Hernández Esquivel — Learning Systems Architect, AI-Driven Instructional Designer, and German C1 specialist.

Live at [yassergandhi.dev](https://yassergandhi.dev)

---

## What this site communicates

This is not a generic developer portfolio. It is visual evidence that three profiles converge in one person:

- **Pedagogo Investigador** — 15 years teaching German at UAM Azcapotzalco and UNAM, M.A. Pedagogy (CONACYT fellow), Hamburg fieldwork 2019, Scopus peer reviewer
- **Germanista C1** — B.A. German Literature (UNAM), C1 certified (Universität Offenburg 2019), Hochdeutsch ↔ Umgangssprache gap specialist
- **Desarrollador** — B.Sc. Web Systems (UdeG, GPA 98.5), TypeScript · React · Astro · Supabase · Zod · DDD · ADRs

The intersection of those three profiles describes one person in the EdTech/DACH talent market. That's the positioning: Purple Squirrel.

---

## Stack

| Layer | Choice | Why |
|-------|--------|-----|
| Framework | Astro | Zero client JS by default, instant load, SEO-optimal |
| Styling | Tailwind CSS + CSS custom properties | Ubuntu Lynx tokens without a build step |
| Typography | Ubuntu (Google Fonts) | huhuGERMAN brand identity — same font across portfolio and platform creates visual coherence |
| Hosting | Vercel | Existing deployment, automatic previews |

---

## Ubuntu Lynx Design System

All visual properties derived from the Ubuntu operating system identity — Canonical's brand, adapted as the huhuGERMAN platform palette.

```css
--aubergine:      #300A24  /* dominant — depth, authority */
--aubergine-dark: #1a0514  /* page background */
--orange:         #E95420  /* Canonical Orange — calls to action */
--orange-light:   #FF6B35  /* hover states */
--white-warm:     #F5F0F0  /* text — warmth, not cold */
```

**Why this palette, not teal/dark:** The previous version used a generic "CSE technical" identity common across SaaS portfolios. The real identity — educator, Germanist, system builder — required something different. Aubergine Ubuntu Lynx is unusual in the EdTech market, immediately recognizable as tied to the main project, and visually coherent with the huhuGERMAN platform.

---

## What changed from v1

| Before | After |
|--------|-------|
| "Technical Support & Application Support L1–L2" | "Learning Systems Architect" |
| Generic CSE portfolio | Purple Squirrel EdTech positioning |
| DM Sans · teal #2dd4bf · black background | Ubuntu · Aubergine #300A24 · Canonical Orange |
| Demo project context | 15 years + production platform context |
| "Available for support roles" | "15 years. Real classrooms. Real evidence." |

---

## SEO alignment

LinkedIn headline, site `<title>`, meta description, and Open Graph tags all contain the same keywords:

> Learning Systems Architect · AI-Driven Instructional Designer · German C1 · huhuGERMAN · EdTech · DaF · DACH · Zod · Supabase · Domain-Driven Design

---

## Target roles

- AI-Driven Learning Strategist (gt.school, 2 Hour Learning, Crossover)
- Senior Instructional Designer (Samsara, Coursera, Duolingo)
- Curriculum Architect — Language AI (Speak, Elsa, Babbel)
- AI Training Data Specialist — German (Scale AI, Appen)
- Learning Experience Designer — DACH (Personio, Adaptavist)
- NLP Data Contributor (Apple, Google, Amazon)

---

## Local development

```bash
npm install
npm run dev        # http://localhost:4321
npm run build
npm run preview
```

---

*HIER DARFST DU FEHLER MACHEN.*
