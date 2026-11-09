# Priyanshu Nawal — Portfolio Website

A real, minimal, non-AI-looking personal portfolio. Single page: hero → about/skills → projects → contact → footer. Showcases three public GitHub projects (PulseEngine, Prepwise, Reflex) and the real engineering stack behind them. Starts on a GitHub Pages subdomain, moves to `priyanshunawal.dev` on Cloudflare Pages after the domain is bought.

## Stack
- React 18 + Vite (build/dev)
- Tailwind CSS (styling)
- Formspree (contact form; swap-able to Cloudflare Pages Forms later)
- Posthog (analytics: page_view, project_click, download, contact_submitted)
- UptimeRobot (uptime monitoring)
- Hosting: GitHub Pages (staging) → Cloudflare Pages + priyanshunawal.dev (prod)

## Project structure
```
portfolio/
├── index.html
├── package.json
├── vite.config.js
├── tailwind.config.js
├── postcss.config.js
├── .env.example            # VITE_POSTHOG_KEY, VITE_FORMSPREE_ID
├── .gitignore
├── README.md
├── PLAN.md                 # this file
├── public/
│   ├── hero-photo.jpg       # Priyanshu drops photo here
│   └── Priyanshu_Nawal_Resume.pdf
└── src/
    ├── main.jsx
    ├── App.jsx
    ├── index.css
    ├── lib/
    │   └── posthog.js        # init + capture helpers
    └── components/
        ├── Hero.jsx
        ├── About.jsx
        ├── Skills.jsx
        ├── Projects.jsx
        ├── Contact.jsx
        └── Footer.jsx
```

## Build steps
1. `npm install`
2. `npm run dev`      # local at http://localhost:5173
3. `npm run build`    # outputs dist/
4. Deploy `dist/` to GitHub Pages (staging), later Cloudflare Pages (prod)

## Env vars (set in Pages dashboard, never committed)
- `VITE_POSTHOG_KEY`   — Posthog project key
- `VITE_FORMSPREE_ID`  — Formspree form id

## Owner info
- Priyanshu Nawal · priyanshu.nawal.dev@gmail.com
- LinkedIn: https://linkedin.com/in/priyanshunawal
- GitHub: https://github.com/priyanshunawaldev

## Showcase projects (real, public)
1. **PulseEngine** — distributed financial ledger (FastAPI, Postgres, Redis, Celery) — github.com/priyanshunawaldev/pulse-engine
2. **Prepwise** — AI mock-interview platform (Next.js, TypeScript, Gemini, Vapi) — github.com/priyanshunawaldev/interview-prep
3. **Reflex** — AI terminal productivity CLI (Python, Typer, Rich, SQLite) — github.com/priyanshunawaldev/reflex-cli

## Section content

### Hero
- Headline: "Software Developer"
- Sub: "Python engineer building distributed systems and AI tools — PulseEngine, Prepwise, Reflex." (editable)
- Photo: `/hero-photo.jpg` (initials-avatar fallback if missing)
- CTAs: "View Projects" (scroll), "Download Resume" (PDF → Posthog `download`)
- Posthog `page_view` on mount

### About / Skills
- Short intro paragraph (grounded in real work, not the resume's "40%" line)
- Skills clusters (each backed by a repo):
  - Languages: Python, TypeScript, JavaScript, SQL
  - Backend: FastAPI, SQLAlchemy (async), PostgreSQL, Redis, Celery, Alembic, REST APIs
  - Frontend: React, Next.js, Tailwind CSS, HTML/CSS
  - AI/ML: Google Gemini, Vapi AI, OpenAI/Anthropic APIs, NumPy, Pandas
  - Tools/DevOps: Docker, Git, GitHub, Locust, pytest, uv
  - Concepts: distributed systems, idempotency, concurrency, data structures & algorithms

### Projects
- 3 cards: title, one-line description, tech-stack chips, "Source" (GitHub) link
- No live-demo buttons (none hosted) — omit rather than fake
- Card click → Posthog `project_click`
- Order: PulseEngine, Prepwise, Reflex

### Contact
- Form (name, email, message) → Formspree; submit → Posthog `contact_submitted`
- mailto: priyanshu.nawal.dev@gmail.com
- Social links: LinkedIn, GitHub

### Footer
- LinkedIn, GitHub, email, "Built with React + Vite", source link to portfolio repo

## Follow-up (not in this build)
- Reconcile the SDE resume with the GitHub projects so portfolio and resume agree.
