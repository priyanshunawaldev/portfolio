# Portfolio Design Plan

**Subject:** Personal portfolio for Priyanshu Nawal — Software Developer (Python focus)  
**Audience:** Recruiters, peers, and hiring managers seeking a technical identity  
**Primary Job:** Showcase engineering depth through a minimal, premium, technically credible design that feels hand-crafted, not templated.

## Color Palette

| Role | Hex | Usage |
|------|-----|-------|
| Base Dark | `#0B1120` | Page background, sidebar, hero container |
| Light Accent | `#2DD4BF` | Primary accent (buttons, links, highlights) |
| Subtle Gradient | `#0F172A` → `#0B1120` (vertical) | Hero background gradient |
| Text Light | `#E2E8F0` | Body text, secondary headings |
| Text Dark | `#C4C4C4` | Body text on dark background, footer |
| Accent Highlight | `#E2E8F0` | CTA buttons, active states |
| Error/Alert | `#F87173` | Form errors, alerts |

*Rationale:* Dark base establishes technical seriousness; `#2DD4BF` (teal) provides premium contrast without being flashy; gradients add depth without flashiness; light text on dark ensures readability; accent colors are limited to avoid visual noise.

## Typography

| Role | Typeface | Weight | Size (px) | Usage |
|------|----------|--------|-----------|-------|
| Headline / Hero | JetBrains Mono | Bold 700 | 48–56 | Hero headline, section titles |
| Subhead / Tagline | JetBrains Mono | Medium 500 | 20–24 | Hero tagline, section subtitles |
| Body Text | Inter | Regular 400 | 16 | Main body copy, project descriptions |
| Body Accent | Inter | Medium 500 | 16 | Highlighted text, skill tags |
| Code / Command | JetBrains Mono | Regular 400 | 14 | Code snippets, command prompts, project tags |

*Rationale:* JetBrains Mono provides technical authenticity for headings, tags, and commands; Inter offers superior readability for body copy and is highly legible on dark backgrounds. The weight hierarchy creates clear visual hierarchy without needing multiple families.

## Layout Concept

### Overall Structure (single-page, scrollable)

```
[Header]   [Navigation]   [Hero]   [About/About-Skills]   [Projects]   [Contact]   [Footer]
```

- **Header:** Fixed top bar with logo (PN) + tagline (small) + minimal nav links (About, Skills, Projects, Contact). Fixed height, subtle shadow.
- **Hero:** Full-width gradient background (`#0F172A → #0B1120`), large hero headline (`JetBrains Mono 56px`), hero tagline (`JetBrains Mono 24px`), portrait photo (`#2DD4BF` accent circle), two CTAs (`View Projects`, `Download Resume`). One-time fade-in animation (fade-in + slight upward translation).
- **About/About-Skills:** Two-column layout on desktop (text left, skill tags right) that collapses to single column on mobile. Grid layout for skill groups.
- **Projects:** Grid of 3 cards (desktop) → 1 column (mobile). Each card: title, one-line description, tech stack chips, source link. Cards have subtle elevation (soft shadow) and hover lift.
- **Contact:** Simple form (name, email, message) with inline validation, plus mailto link and social icons.
- **Footer:** Small text, links, and a subtle divider line.

### Layout Principles

- **Content First:** All sections are vertically stacked; no sidebars, no complex grids beyond the projects grid.
- **Whitespace:** Generous vertical spacing (48–64px) between sections; horizontal padding 48px on desktop, 24px on mobile.
- **Alignment:** Left-aligned text for body; centered hero content; grid-based project cards.
- **Responsive:** Mobile-first, 1-column layout for all sections except hero (which remains two-column on large screens).

### Design Principles

1. **Premium Minimalism** – Every element serves a purpose; no decorative flourishes.
2. **Technical Credibility** – Use monospace for code/identity elements; clean sans-serif for body; precise typography.
3. **Technical Authenticity** – Use real project names, real stack tags, real skill groupings from the resume and repos.
4. **Motion Sparingly** – One-time hero fade, subtle hover lifts, subtle gradient shift on scroll; no endless scroll effects.
5. **Accessibility** – Sufficient color contrast, focus states, reduced motion support, semantic HTML.
6. **SEO Ready** – Semantic HTML, meta tags, structured data ready for schema.org.

### Next Steps

1. Create the `DESIGN-PLAN.md` file in the project root with this content.
2. Scaffold the Vite project (`npm create vite@latest . -- --template react`).
3. Install Tailwind and PostCSS.
4. Build the scaffold files (`index.html`, `src/main.jsx`, `src/App.jsx`, `src/index.css`).
5. Implement the design plan components (Hero, About, Skills, Projects, Contact, Footer) using the refined plan.
6. Add the prototype HTML for design validation (already created in `prototype/portfolio-design.html`).
7. Test locally, then deploy to GitHub Pages staging.

---

**Next Action:** I will create the `DESIGN-PLAN.md` file with this content, then proceed to scaffold the project.