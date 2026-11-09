const SKILL_GROUPS = [
  { title: "Languages", items: ["Python", "TypeScript", "JavaScript", "SQL"] },
  { title: "Backend", items: ["FastAPI", "SQLAlchemy", "PostgreSQL", "Redis", "Celery", "Alembic"] },
  { title: "Frontend", items: ["React", "Next.js", "Tailwind CSS", "Vite"] },
  { title: "AI / ML", items: ["Gemini", "Vapi", "OpenAI", "Anthropic", "NumPy", "Pandas"] },
  { title: "Tools", items: ["Docker", "Git", "Locust", "pytest", "uv"] },
  { title: "Concepts", items: ["distributed systems", "idempotency", "concurrency", "DSA"] },
];

export default function Skills() {
  return (
    <section id="skills" className="py-16 lg:py-24">
      <div className="container-custom">
        <h2 className="text-h2 text-text-primary font-bold mb-12">Skills</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {SKILL_GROUPS.map((group, idx) => (
            <div key={group.title} className="card-glass p-8 fade-in-up" style={{ animationDelay: `${idx * 0.1}s` }}>
              <h3 className="text-accent text-sm font-bold mono tracking-widest mb-4 uppercase">
                {group.title}
              </h3>
              <div className="flex flex-wrap gap-2">
                {group.items.map((skill) => (
                  <span
                    key={skill}
                    className="text-xs bg-bg-primary/40 border border-border px-3 py-1.5 rounded-full text-text-secondary hover:border-accent transition-colors"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
