import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { GithubIcon } from "./icons";
import {
  X,
  ArrowUpRight,
  CheckCircle2,
  ChevronRight,
  ShieldAlert,
  ShieldCheck,
  Cpu,
  Activity,
  Wrench,
  Bug,
  Layers,
  ExternalLink,
  AlertTriangle,
  Scale,
} from "lucide-react";
import { PROJECTS } from "../data/projectsData";
import { ArchitecturePipeline } from "./ProjectArtifacts";

export default function ProjectModal({ project, onClose, onSelectProject }) {
  const modalRef = useRef(null);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  useEffect(() => {
    document.body.style.overflow = "hidden";

    const timer = setTimeout(() => {
      if (modalRef.current) {
        const focusable = modalRef.current.querySelectorAll(
          'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        );
        if (focusable.length > 0) focusable[0].focus();
      }
    }, 40);

    const handleTabKey = (e) => {
      if (e.key !== "Tab" || !modalRef.current) return;
      const focusables = modalRef.current.querySelectorAll(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
      );
      if (focusables.length === 0) return;
      const first = focusables[0];
      const last = focusables[focusables.length - 1];

      if (e.shiftKey) {
        if (document.activeElement === first) {
          e.preventDefault();
          last.focus();
        }
      } else if (document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };

    window.addEventListener("keydown", handleTabKey);

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleTabKey);
      clearTimeout(timer);
    };
  }, []);

  if (!project) return null;

  const currentIndex = PROJECTS.findIndex((p) => p.slug === project.slug);
  const nextProject = PROJECTS[(currentIndex + 1) % PROJECTS.length];

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 lg:p-8 overflow-y-auto"
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-project-title"
    >
      {/* Backdrop */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.16, ease: "easeOut" }}
        onClick={onClose}
        className="fixed inset-0 bg-black/75 backdrop-blur-sm cursor-pointer"
      />

      {/* Modal Dialog */}
      <motion.div
        ref={modalRef}
        initial={{ opacity: 0, scale: 0.98, y: 8 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.98, y: 8 }}
        transition={{ duration: 0.2, ease: [0.23, 1, 0.32, 1] }}
        className="relative w-full max-w-3xl max-h-[92vh] bg-bg-secondary border border-border rounded-2xl shadow-2xl overflow-hidden flex flex-col z-10"
      >
        {/* Top Bar: Project Name + GitHub Link + Close Button */}
        <div className="flex items-center justify-between px-5 sm:px-8 py-3.5 border-b border-border bg-bg-secondary shrink-0 gap-3">
          <div className="flex items-center gap-3 min-w-0">
            <h3 className="font-serif text-lg font-bold text-text-primary truncate">
              {project.shortName || project.name.split(" — ")[0]}
            </h3>
            {project.githubUrl && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="min-h-[44px] inline-flex items-center gap-1.5 px-2 text-xs font-semibold text-accent hover:underline link-underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent rounded-md"
              >
                <GithubIcon size={14} />
                <span>GitHub ↗</span>
              </a>
            )}
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <button
              type="button"
              onClick={onClose}
              className="w-11 h-11 min-w-[44px] min-h-[44px] rounded-xl flex items-center justify-center text-text-secondary hover:text-text-primary hover:bg-bg-tertiary transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
              aria-label="Close case study"
            >
              <X size={18} />
            </button>
          </div>
        </div>

        {/* Scrollable Content */}
        <div className="overflow-y-auto p-6 sm:p-8 space-y-8 flex-grow">
          {/* Header */}
          <div className="space-y-3">
            <h2
              id="modal-project-title"
              className="font-serif text-2xl sm:text-3xl font-bold text-text-primary tracking-tight leading-tight"
            >
              {project.name}
            </h2>

            <p className="text-sm sm:text-base text-text-secondary leading-relaxed">
              {project.tagline}
            </p>
          </div>

          {/* Problem & Context */}
          <div className="space-y-3">
            <h3 className="text-sm font-bold font-mono text-accent uppercase tracking-wider flex items-center gap-2">
              <ShieldAlert size={15} />
              <span>Problem &amp; Context</span>
            </h3>
            <p className="text-sm sm:text-base text-text-primary leading-relaxed text-left">
              {project.problemStatement}
            </p>
            {project.motivation && (
              <p className="text-sm sm:text-base text-text-secondary leading-relaxed text-left">
                {project.motivation}
              </p>
            )}
          </div>

          {/* System Architecture */}
          <div className="space-y-3">
            <h3 className="text-sm font-bold font-mono text-accent uppercase tracking-wider flex items-center gap-2">
              <Cpu size={15} />
              <span>System Architecture &amp; Data Flow</span>
            </h3>
            <ArchitecturePipeline projectId={project.id} />
          </div>

          {/* Verification & Benchmarks (Human Friendly) */}
          {project.impactMetrics && (
            <div className="space-y-4">
              <div className="flex flex-wrap items-center justify-between border-b border-border/80 pb-2.5 gap-2">
                <h3 className="text-sm font-bold font-mono text-accent uppercase tracking-wider flex items-center gap-2">
                  <Activity size={15} />
                  <span>Key Results &amp; Reliability</span>
                </h3>
                {project.proofOfImplementation?.ciStatus && (
                  <span className="text-xs font-mono font-semibold text-emerald-700 dark:text-emerald-400 px-2 py-0.5 rounded-md bg-emerald-500/10 border border-emerald-500/30">
                    {project.proofOfImplementation.ciStatus}
                  </span>
                )}
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {project.impactMetrics.map((im) => (
                  <div
                    key={im.label}
                    className="p-3.5 rounded-xl border border-border bg-bg-tertiary/50 space-y-1"
                  >
                    <span className="text-base sm:text-lg font-bold text-accent block">
                      {im.value}
                    </span>
                    <span className="text-xs font-semibold text-text-primary block">
                      {im.label}
                    </span>
                    <span className="text-[11px] text-text-secondary block leading-relaxed">
                      {im.detail}
                    </span>
                  </div>
                ))}
              </div>

              {project.proofOfImplementation && (
                <div className="flex items-center gap-2 text-xs font-mono text-text-secondary pt-1">
                  <CheckCircle2 size={15} className="text-emerald-600 dark:text-emerald-400 shrink-0" />
                  <span>{project.proofOfImplementation.testSuiteStats}</span>
                </div>
              )}
            </div>
          )}

          {/* What I Actually Engineered vs. What Libraries Handled */}
          {project.engineeringBreakdown && (
            <details className="group border-t border-border/80 pt-2" open>
              <summary className="cursor-pointer list-none flex items-center gap-2 text-xs font-bold font-mono text-accent uppercase tracking-wider py-2 hover:opacity-80 transition-opacity">
                <Wrench size={15} />
                <span>What I Actually Engineered vs. What Libraries Handled</span>
                <ChevronRight
                  size={14}
                  className="ml-auto transform transition-transform group-open:rotate-90"
                />
              </summary>
              <div className="pt-3">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Custom Engineered */}
                  <div className="p-4 rounded-xl border border-accent/30 bg-accent/5 space-y-3">
                    <div className="flex items-center gap-2 text-xs font-bold font-mono text-accent uppercase tracking-wider border-b border-accent/20 pb-2">
                      <Layers size={14} />
                      <span>What I Actually Engineered</span>
                    </div>
                    <div className="space-y-3">
                      {project.engineeringBreakdown.customEngineered.map((item) => (
                        <div key={item.module} className="space-y-1">
                          <span className="font-bold text-xs font-mono text-text-primary block">
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
                  <div className="p-4 rounded-xl border border-border bg-bg-tertiary/40 space-y-3">
                    <div className="flex items-center gap-2 text-xs font-bold font-mono text-text-secondary uppercase tracking-wider border-b border-border/60 pb-2">
                      <Cpu size={14} />
                      <span>What Libraries Handled</span>
                    </div>
                    <div className="space-y-3">
                      {project.engineeringBreakdown.librariesHandled.map((item) => (
                        <div key={item.module} className="space-y-1">
                          <span className="font-bold text-xs font-mono text-text-primary block">
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
          )}

          {/* Debugging War Story: Paragraph + Bullets Combo */}
          {project.dumbestBug && (
            <details className="group border-t border-border/80 pt-2" open>
              <summary className="cursor-pointer list-none flex items-center gap-2 text-xs font-bold font-mono text-amber-500 dark:text-amber-400 uppercase tracking-wider py-2 hover:opacity-80 transition-opacity">
                <Bug size={15} />
                <span>Debugging War Story: {project.dumbestBug.title}</span>
                <ChevronRight
                  size={14}
                  className="ml-auto transform transition-transform group-open:rotate-90"
                />
              </summary>
              <div className="pt-3">
                <div className="p-4 sm:p-5 rounded-xl border border-amber-500/30 bg-amber-500/5 space-y-3">
                  <p className="text-xs sm:text-sm font-semibold text-text-primary leading-relaxed">
                    {project.dumbestBug.summary}
                  </p>

                  {/* Bullets + Paragraph combo */}
                  <div className="space-y-2 pt-1 border-t border-amber-500/20">
                    <ul className="space-y-1.5 text-xs sm:text-sm text-text-secondary">
                      <li className="flex items-start gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-amber-500 shrink-0 mt-1.5" />
                        <span><strong>The Symptom:</strong> Tests passed in isolation, but failed randomly when run concurrently under load.</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-amber-500 shrink-0 mt-1.5" />
                        <span><strong>The Cause:</strong> Cross-transaction lock inversion where two accounts attempted mutual transfers at the same millisecond.</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-amber-500 shrink-0 mt-1.5" />
                        <span><strong>The Fix:</strong> Enforced ascending UUID lock ordering (min(A,B) first), mathematically eliminating the circular wait graph.</span>
                      </li>
                    </ul>
                  </div>

                  <p className="text-xs text-text-secondary leading-relaxed pt-1 italic">
                    &ldquo;Real engineering is not writing code that works on happy paths — it is writing code that cannot deadlock even when clients hammer conflicting inputs.&rdquo;
                  </p>
                </div>
              </div>
            </details>
          )}
        </div>

        {/* Sticky Footer: Next Project on Left, Full Page + Close on Right */}
        <div className="px-5 sm:px-8 py-3.5 border-t border-border bg-bg-secondary flex items-center justify-between gap-3 shrink-0">
          {nextProject ? (
            <button
              type="button"
              onClick={() => onSelectProject(nextProject)}
              className="min-h-[44px] inline-flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-accent hover:underline link-underline cursor-pointer rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
            >
              <span>Next: {nextProject.shortName || nextProject.name.split(" — ")[0]}</span>
              <ChevronRight size={15} />
            </button>
          ) : (
            <div />
          )}

          <div className="flex items-center gap-2.5">
            <a
              href={`/projects/${project.slug}`}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-secondary text-xs min-h-[44px] py-2 px-3.5 inline-flex items-center gap-1.5"
            >
              <span>Full Page</span>
              <ExternalLink size={13} />
            </a>

            <button
              type="button"
              onClick={onClose}
              className="btn-primary text-xs min-h-[44px] py-2 px-4"
            >
              Close
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
