# Priyanshu Nawal — Developer Portfolio

Personal engineering portfolio website for **Priyanshu Nawal**, Software Developer specializing in Python backends, clean REST APIs, and modern React full-stack web applications.

Live at: [priyanshunawal.dev](https://priyanshunawal.dev)

---

## 🛠 Tech Stack

- **Framework:** [React 18](https://react.dev/) + [Vite 6](https://vitejs.dev/)
- **Styling:** [Tailwind CSS](https://tailwindcss.com/) with dual-theme design system (Light / Dark)
- **Typography:** `Source Serif 4` (editorial display), `Inter` (body), `JetBrains Mono` (technical)
- **Animation:** [Framer Motion](https://www.framer.com/motion/) with `prefers-reduced-motion` compliance
- **Icons:** [Lucide React](https://lucide.dev/)
- **Hosting:** [Cloudflare Pages](https://pages.cloudflare.com/) (Edge CDN with automated Git deployment)

---

## 🚀 Key Systems Featured

- **[PulseEngine](https://github.com/priyanshunawaldev/pulse-engine):** High-throughput double-entry financial ledger service in Python/FastAPI with ordered PostgreSQL row locking, sub-millisecond Redis SHA-256 idempotency verification, and zero-deadlock guarantees.
- **[Reflex CLI](https://github.com/priyanshunawaldev/reflex-cli):** Offline-first developer terminal tool for logging work sessions, tasks, and Git commits with local SQLite persistence and sub-25ms cold startup.
- **[Prepwise](https://github.com/priyanshunawaldev/interview-prep):** Real-time voice interview platform leveraging WebSockets and asynchronous Gemini AI audio streaming for sub-second feedback.

---

## 📝 Editing Content (Non-Technical Guide)

All personal details, bio, skills, education, experience, and project cards are centralized in **one single file**:

```
src/data/portfolioContent.js
```

To update any text on the website:
1. Open [`src/data/portfolioContent.js`](./src/data/portfolioContent.js).
2. Edit any text value (e.g., `name`, `role`, `summary`, `email`, `location`, `coursework`).
3. Save the file. The changes will immediately reflect across the entire website without touching any component code or styling.

A detailed field-by-field reference guide is available in [`PORTFOLIO_CONTENT.md`](./PORTFOLIO_CONTENT.md).

---

## 💻 Local Development

```bash
# 1. Install dependencies
npm install

# 2. Start local development server
npm run dev
# Server runs at http://localhost:5173/

# 3. Build for production (outputs to dist/)
npm run build

# 4. Preview production build locally
npm run preview
```

---

## ☁️ Deployment (Cloudflare Pages)

This project is configured out of the box for instant deployment on **Cloudflare Pages**:

1. Log in to [Cloudflare Dashboard](https://dash.cloudflare.com/) and navigate to **Workers & Pages** > **Create application** > **Pages** > **Connect to Git**.
2. Select this GitHub repository.
3. Configure the build settings:
   - **Framework preset:** `Vite`
   - **Build command:** `npm run build`
   - **Build output directory:** `dist`
   - **Root directory:** `/` (default)
4. Under **Environment variables (Production)**, optionally add:
   - `NODE_VERSION`: `20`
   - `VITE_POSTHOG_KEY`: *(Optional)* Your PostHog analytics key
5. Click **Save and Deploy**. Cloudflare Pages will build the site and deploy it globally across their edge network.

*Note: Client-side SPA routing (`public/_redirects`) and security headers (`public/_headers`) are pre-configured in the repository for seamless direct-link loading and A+ security ratings.*

---

## 🔒 Security & Privacy

- **Security Headers:** Enforces `nosniff`, `DENY` frame embedding, strict referrer policy, and Permissions-Policy.
- **Zero Secrets:** All local `.env` keys and private configs are excluded via `.gitignore`.
- **Safe External Links:** 100% of outbound external links use `rel="noopener noreferrer"` to mitigate reverse tab-nabbing.
- **Client Sanitization:** Pure declarative React rendering with zero unsafe HTML/eval sinks.

---

## 👤 Author

**Priyanshu Nawal**
- Email: [priyanshu.nawal.dev@gmail.com](mailto:priyanshu.nawal.dev@gmail.com)
- LinkedIn: [linkedin.com/in/priyanshunawal](https://linkedin.com/in/priyanshunawal)
- GitHub: [github.com/priyanshunawaldev](https://github.com/priyanshunawaldev)
