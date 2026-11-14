import { useEffect } from "react";
import { useRouter } from "../lib/router";
import { getProjectBySlug, ALL_PROJECTS } from "../data/projectsData";
import { GithubIcon } from "./icons";
import { ArchitecturePipeline } from "./ProjectArtifacts";
import {
  ArrowLeft,
  ArrowUpRight,
  CheckCircle2,
  ExternalLink,
  ChevronRight,
  Activity,
  Wrench,
  Bug,
  Layers,
  Cpu,
} from "lucide-react";

export default function ProjectDetail({ slug }) {
  const { navigate } = useRouter();
  const project = getProjectBySlug(slug);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [slug]);

  if (!project) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center text-center px-4">
        <h1 className="text-3xl font-extrabold text-text-primary mb-3">Case Study Not Found</h1>
        <p className="text-text-secondary mb-6">The requested project case study could not be located.</p>
        <button
          type="button"
          onClick={() => navigate("/")}
          className="btn-primary"
        >
          <ArrowLeft size={16} />
          <span>Return to Projects</span>
        </button>
      </div>
    );
  }

  const currentIndex = ALL_PROJECTS.findIndex((p) => p.slug === project.slug);
  const nextProject = ALL_PROJECTS[(currentIndex + 1) % ALL_PROJECTS.length];

  return (
    <article className="py-12 sm:py-16 lg:py-20">
      <div className="container-custom max-w-3xl">
        {/* Back breadcrumb */}
        <div className="mb-8">
          <button
            type="button"
            onClick={() => navigate("/#projects")}
            className="inline-flex items-center gap-2 min-h-[44px] text-xs sm:text-sm mono font-semibold text-text-secondary hover:text-accent transition-colors group cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent rounded-md px-1"
          >
            <ArrowLeft size={16} className="transform group-hover:-translate-x-1 transition-transform" />
            <span>Back to Projects</span>
          </button>
        </div>

        {/* Header */}
        <header className="space-y-5 pb-8 border-b border-border">
          <span className="text-xs mono text-accent font-semibold block">
            {project.category}
          </span>

          <h1 className="text-3xl sm:text-4xl font-black tracking-tight text-text-primary">
            {project.name}
          </h1>

          <p className="text-base sm:text-lg text-text-secondary leading-relaxed">
            {project.tagline}
          </p>

          {/* 4-column metadata bar */}
          <dl className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-4 border-t border-border/60 text-xs sm:text-sm">
            <div>
              <dt className="mono text-text-secondary uppercase text-[11px] font-semibold mb-1">Role</dt>
              <dd className="text-text-primary font-medium">{project.role}</dd>
            </div>
            <div>
              <dt className="mono text-text-secondary uppercase text-[11px] font-semibold mb-1">Timeline</dt>
              <dd className="text-text-primary font-medium">{project.timeline}</dd>
            </div>
            <div>
              <dt className="mono text-text-secondary uppercase text-[11px] font-semibold mb-1">Stack</dt>
              <dd className="text-text-primary font-medium">{project.stack.slice(0, 3).join(", ")}</dd>
            </div>
            <div>
              <dt className="mono text-text-secondary uppercase text-[11px] font-semibold mb-1">Source</dt>
              <dd>
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-accent hover:underline font-semibold inline-flex items-center gap-1"
                >
                  <span>GitHub ↗</span>
                </a>
              </dd>
            </div>
          </dl>

          <div className="flex flex-wrap items-center gap-3 pt-1">
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary"
            >
              <GithubIcon size={16} />
              <span>Explore Repository</span>
              <ArrowUpRight size={15} />
            </a>

            {project.liveDemoUrl && (
              <a
                href={project.liveDemoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-secondary"
              >
                <ExternalLink size={16} />
                <span>Live Demo</span>
              </a>
            )}
          </div>
        </header>

        {/* Content Body */}
        <div className="py-10 space-y-12">
          {/* Overview */}
          {project.overview && (
            <section className="space-y-3">
              <h2 className="text-lg font-bold text-text-primary tracking-tight">
                Overview
              </h2>
              <p className="text-sm sm:text-base text-text-secondary leading-relaxed">
                {project.overview}
              </p>
              {project.highlight && (
                <p className="text-sm mono font-semibold text-text-primary">
                  <span className="text-accent mr-2">→</span>
                  {project.highlight}
                </p>
              )}
            </section>
          )}

          {/* Problem & Motivation */}
          <section className="space-y-3">
            <h2 className="text-lg font-bold text-text-primary tracking-tight">
              The Problem
            </h2>
            <p className="text-sm sm:text-base text-text-secondary leading-relaxed text-justify">
              {project.problemStatement}
            </p>
            <p className="text-sm sm:text-base text-text-secondary leading-relaxed text-justify">
              {project.motivation}
            </p>
          </section>

          {/* Architecture Diagram */}
          <section className="space-y-3">
            <h2 className="text-lg font-bold text-text-primary tracking-tight">
              Architecture
            </h2>
            <ArchitecturePipeline projectId={project.id} />
          </section>

          {/* Benchmarks */}
          {project.impactMetrics && (
            <section className="space-y-4">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-bold text-text-primary tracking-tight flex items-center gap-2">
                  <Activity size={18} className="text-accent shrink-0" />
                  <span>Benchmarks</span>
                </h2>
                {project.proofOfImplementation?.ciStatus && (
                  <span className="text-xs mono font-semibold text-emerald-700 dark:text-emerald-400 px-2.5 py-1 rounded-md bg-emerald-500/10 border border-emerald-500/30">
                    {project.proofOfImplementation.ciStatus}
                  </span>
                )}
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {project.impactMetrics.map((im) => (
                  <div
                    key={im.label}
                    className="p-3 rounded-lg border border-border/60 space-y-0.5"
                  >
                    <span className="text-xl sm:text-2xl font-black mono text-accent block tabular-nums">
                      {im.value}
                    </span>
                    <span className="text-xs font-bold text-text-primary block font-mono">
                      {im.label}
                    </span>
                    <span className="text-[11px] text-text-secondary mono block">
                      {im.detail}
                    </span>
                  </div>
                ))}
              </div>

              {project.proofOfImplementation && (
                <p className="text-xs sm:text-sm text-text-secondary flex items-center gap-2">
                  <CheckCircle2 size={15} className="text-emerald-600 dark:text-emerald-400 shrink-0" />
                  <span>{project.proofOfImplementation.testSuiteStats}</span>
                  <a
                    href={project.proofOfImplementation.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-accent hover:underline font-semibold inline-flex items-center gap-1 ml-1"
                  >
                    <span>Verify ↗</span>
                  </a>
                </p>
              )}
            </section>
          )}

          {/* Architecture components */}
          {project.architecture && project.architecture.length > 0 && (
            <section className="space-y-4">
              <h2 className="text-lg font-bold text-text-primary tracking-tight">
                Key Components
              </h2>
              <div className="space-y-3">
                {project.architecture.map((item) => (
                  <div key={item.title} className="pl-4 border-l-2 border-border/60 space-y-1">
                    <h3 className="text-sm font-bold text-text-primary">{item.title}</h3>
                    <p className="text-xs sm:text-sm text-text-secondary leading-relaxed">
                      {item.detail}
                    </p>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* What I Actually Engineered vs. What Libraries Handled */}
          {project.engineeringBreakdown && (
            <section className="space-y-4">
              <details className="group border-t border-border/80 pt-2" open>
                <summary className="cursor-pointer list-none flex items-center gap-2 text-sm font-bold mono text-accent uppercase tracking-wider py-2 hover:opacity-80 transition-opacity">
                  <Wrench size={16} />
                  <span>What I Actually Engineered vs. What Libraries Handled</span>
                  <ChevronRight
                    size={15}
                    className="ml-auto transform transition-transform group-open:rotate-90"
                  />
                </summary>
                <div className="pt-3">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* Custom Engineered */}
                    <div className="p-4 rounded-xl border border-accent/30 bg-accent/5 space-y-3">
                      <div className="flex items-center gap-2 text-xs font-bold mono text-accent uppercase tracking-wider border-b border-accent/20 pb-2">
                        <Layers size={14} />
                        <span>What I Actually Engineered</span>
                      </div>
                      <div className="space-y-3">
                        {project.engineeringBreakdown.customEngineered.map((item) => (
                          <div key={item.module} className="space-y-1">
                            <span className="font-bold text-xs mono text-text-primary block">
                              {item.module}
                            </span>
                            <p className="text-xs text-text-secondary leading-relaxed">
                              {item.description}
                            </p>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Libraries Handled */}
                    <div className="p-4 rounded-xl border border-border/80 bg-bg-tertiary/40 space-y-3">
                      <div className="flex items-center gap-2 text-xs font-bold mono text-text-secondary uppercase tracking-wider border-b border-border/60 pb-2">
                        <Cpu size={14} />
                        <span>What Libraries Handled</span>
                      </div>
                      <div className="space-y-3">
                        {project.engineeringBreakdown.librariesHandled.map((item) => (
                          <div key={item.module} className="space-y-1">
                            <span className="font-bold text-xs mono text-text-primary block">
                              {item.module}
                            </span>
                            <p className="text-xs text-text-secondary leading-relaxed">
                              {item.description}
                            </p>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </details>
            </section>
          )}

          {/* Dumbest Bug I Solved */}
          {project.dumbestBug && (
            <section className="space-y-4">
              <details className="group border-t border-border/80 pt-2" open>
                <summary className="cursor-pointer list-none flex items-center gap-2 text-sm font-bold mono text-amber-500 dark:text-amber-400 uppercase tracking-wider py-2 hover:opacity-80 transition-opacity">
                  <Bug size={16} />
                  <span>Dumbest Bug I Solved: {project.dumbestBug.title}</span>
                  <ChevronRight
                    size={15}
                    className="ml-auto transform transition-transform group-open:rotate-90"
                  />
                </summary>
                <div className="pt-3">
                  <div className="p-4 sm:p-5 rounded-xl border border-amber-500/30 bg-amber-500/5 space-y-2.5">
                    <div className="flex items-center gap-2 text-xs font-bold mono text-amber-600 dark:text-amber-400 uppercase tracking-wider">
                      <span>Debugging War Story &amp; Authentic Lesson</span>
                    </div>
                    <p className="text-xs sm:text-sm font-semibold text-text-primary">
                      {project.dumbestBug.summary}
                    </p>
                    <p className="text-xs sm:text-sm text-text-secondary leading-relaxed whitespace-pre-line pt-1">
                      {project.dumbestBug.warStory}
                    </p>
                  </div>
                </div>
              </details>
            </section>
          )}

          {/* Technical Challenges */}
          {project.technicalChallenges && project.technicalChallenges.length > 0 && (
            <section className="space-y-4">
              <h2 className="text-lg font-bold text-text-primary tracking-tight">
                Challenges &amp; Solutions
              </h2>
              <div className="space-y-4">
                {project.technicalChallenges.map((item) => (
                  <div key={item.challenge} className="space-y-1">
                    <h3 className="text-sm font-bold text-text-primary">{item.challenge}</h3>
                    <p className="text-sm text-text-secondary leading-relaxed">
                      {item.solution}
                    </p>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Outcomes */}
          {project.outcomes && project.outcomes.length > 0 && (
            <section className="space-y-3">
              <h2 className="text-lg font-bold text-text-primary tracking-tight">
                Outcomes
              </h2>
              <ul className="space-y-2 text-sm sm:text-base text-text-secondary">
                {project.outcomes.map((outcome) => (
                  <li key={outcome} className="flex items-start gap-2.5">
                    <CheckCircle2 size={16} className="text-accent shrink-0 mt-0.5" />
                    <span>{outcome}</span>
                  </li>
                ))}
              </ul>
            </section>
          )}

          {/* Future Roadmap */}
          {project.futureImprovements && project.futureImprovements.length > 0 && (
            <section className="space-y-3">
              <h2 className="text-lg font-bold text-text-primary tracking-tight">
                Future Improvements
              </h2>
              <ul className="space-y-1.5 text-sm sm:text-base text-text-secondary">
                {project.futureImprovements.map((item) => (
                  <li key={item} className="flex items-start gap-2.5">
                    <span className="text-accent mono" aria-hidden="true">›</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </section>
          )}

          {/* Technology Stack */}
          <section className="space-y-3">
            <h2 className="text-lg font-bold text-text-primary tracking-tight">
              Full Stack
            </h2>
            <div className="flex flex-wrap gap-1.5">
              {project.stack.map((tech) => (
                <span
                  key={tech}
                  className="text-xs mono border border-border/60 text-text-secondary px-2.5 py-1 rounded-md font-medium"
                >
                  {tech}
                </span>
              ))}
            </div>
          </section>
        </div>

        {/* Footer Navigation */}
        <footer className="pt-8 border-t border-border flex flex-col sm:flex-row items-center justify-between gap-4">
          <button
            type="button"
            onClick={() => navigate("/#projects")}
            className="btn-secondary w-full sm:w-auto"
          >
            <ArrowLeft size={16} />
            <span>All Projects</span>
          </button>

          {nextProject && (
            <button
              type="button"
              onClick={() => navigate(`/projects/${nextProject.slug}`)}
              className="min-h-[44px] inline-flex items-center gap-2 text-sm mono font-semibold text-accent hover:underline cursor-pointer"
            >
              <span>Next: {nextProject.shortName || nextProject.name.split(" — ")[0]}</span>
              <ChevronRight size={16} />
            </button>
          )}
        </footer>
      </div>
    </article>
  );
}
