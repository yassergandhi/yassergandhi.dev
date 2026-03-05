# Yasser Gandhi Hernández Esquivel

**Learning Systems Architect · C1 German (Offenburg 2019) · EdTech DACH**  
📍 Mexico City · Remote  
🌐 [yassergandhi.dev](https://yassergandhi.dev) · [huhugerman.com](https://huhugerman.com)  
💼 [linkedin.com/in/yassergandhi](https://linkedin.com/in/yassergandhi)

---

## The problem this repository exists to solve

41% of international students in Germany drop out before graduating (DAAD, Reucher 2019).  
The dominant cause: the gap between scholastic *Hochdeutsch* taught in classrooms  
and the *Umgangssprache* they hear on Day 1 in Hamburg, Berlin, or Munich.

I built the technical infrastructure for an instructional system designed  
specifically for this gap: **huhuGERMAN** — operational since 2011, first documented case 2022.

---

## The architectural decision that defines this work

> "The AI does not decide. It obeys the domain."  
> — ADR core, huhuGERMAN, 2025

In 2024, students in Week 2 of German A1 were receiving AI feedback on *Perfekt*  
and *Akkusativ* — grammar they had not studied yet. The symptom looked like a bug.  
The cause was a missing domain: the system did not know what had been taught.

The fix was not a better prompt. It was a typed pedagogical domain:
```tsexport const WochenKontextSchema = z.object({
gesehen:       z.array(z.string()),  // structures taught
nicht_gesehen: z.array(z.string()),  // structures not yet taught
korrektur:     KorrekturSchema       // what AI can / cannot correct
});

This is Domain-Driven Design applied to a pedagogical problem.  
The prompt-builder executes the domain. The AI obeys.

---

## Stack

`TypeScript` · `Astro` · `Supabase` · `PostgreSQL`  
`Google Apps Script v8` · `Zod` · `SHA-256 identity resolution`

---

## Featured projects

### huhuGERMAN — Pedagogical Domain System
Live instructional system. 30–40 real students/trimester at UAM Azcapotzalco.  
Input auténtico desde A1 · 2011→ · First documented case: July 2022  
UUID identity resolution · Zod schema validation · ADR documentation  
→ [huhugerman.com](https://huhugerman.com)

### Resilient API Integration Demo
Fault injection sandbox: 401s, 500s, latency simulation.  
Diagnostic reproducibility without backend access.  
→ [huhugerman-demo-cse.netlify.app](https://huhugerman-demo-cse.netlify.app)

---

## Background

| | |
|---|---|
| B.Sc. Web Systems Development | UdeG — GPA 98.5 (2025) |
| M.Ed. Pedagogy | UNAM — CONACYT fellowship (2020) |
| B.A. German Language & Literature | UNAM (2012 / titulación 2015) |
| C1 German | Universität Offenburg (2019) |
| Scopus peer-review contributions | 11 formal dictámenes (2017–2025) |
| Active reviewer | RIEM — UNAM Facultad de Medicina |
| Active teaching | CELEX UAM Azcapotzalco — 15 years |

---

## Research trajectory

| Target | Timeline | Notes |
|--------|----------|-------|
| *Die Unterrichtspraxis* (AATG) | May 2026 | Q3 ESCI — first editorial milestone |
| *Language Teaching Research* (SAGE) | 2027 | Q1 SSCI, IF 6.40 |
| *System* (Elsevier) | 2028+ | Q1 SSCI, IF 6.90 — requires n≥30 |

---

*Hier darfst du Fehler machen.*