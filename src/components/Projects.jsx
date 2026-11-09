import { captureProjectClick } from "../lib/posthog.js";

const PROJECTS = [
  {
    title: "PulseEngine",
    desc: "High-throughput distributed financial ledger with async event ingestion. Handles idempotency via SHA-256, deadlock-free locking, zero-sum conservation, HMAC webhooks, and nightly reconciliation.",
    stack: ["FastAPI", "SQLAlchemy 2.0", "PostgreSQL", "Redis", "Celery", "Docker"],
    url: "https://github.com/priyanshunawaldev/pulse-engine",
  },
  {
    title: "Prepwise",
    desc: "AI-powered mock interview platform. Candidates practice with voice agents, receive instant feedback, and track progress through a comprehensive dashboard.",
    stack: ["Next.js", "TypeScript", "Firebase", "Gemini", "Vapi"],
    url: "https://github.com/priyanshunawaldev/interview-prep",
  },
  {
    title: "Reflex",
    desc: "Terminal productivity OS for developers. Tasks, focus sessions, work logs, AI-powered reviews, and GitHub integration—all running locally with offline support.",
    stack: ["Python", "Typer", "Rich", "SQLite", "Ollama"],
    url: "https://github.com/priyanshunawaldev/reflex-cli",
  },
];

export default function Projects() {
  return (
    <section id="projects" className="py-16 lg:py-24">
      <div className="container-custom">
        <h2 className="text-h2 text-text-primary font-bold mb-12">Projects</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {PROJECTS.map((project, idx) => (
            <a
              key={project.title}
              href={project.url}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => captureProjectClick(project.title)}
              className="card-glass group overflow-hidden fade-in-up h-full flex flex-col"
              style={{ animationDelay: `${idx * 0.15}s` }}
            >
              {/* Accent bar at top */}
              <div className="h-1 bg-gradient-to-r from-accent via-accent-light to-transparent group-hover:shadow-glow transition-all" />

              <div className="p-6 flex flex-col h-full">
                <h3 className="text-h3 text-text-primary font-bold mb-3 group-hover:text-accent transition-colors">
                  {project.title}
                </h3>
                <p className="text-text-secondary text-sm leading-relaxed mb-6 flex-grow">
                  {project.desc}
                </p>
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.stack.map((s) => (
                    <span
                      key={s}
                      className="text-xs bg-bg-primary/40 border border-border/50 px-2 py-1 rounded font-mono text-text-secondary/80 group-hover:border-accent/30 transition-colors"
                    >
                      {s}
                    </span>
                  ))}
                </div>
                <div className="text-accent font-semibold text-sm mono group-hover:translate-x-1 transition-transform">
                  View on GitHub →
                </div>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
