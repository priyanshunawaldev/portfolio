import { useState, lazy, Suspense } from "react";
import { motion } from "framer-motion";
import { PROJECTS } from "../data/projectsData";
import { captureProjectClick } from "../lib/posthog";
import {
  Terminal,
  Activity,
  Mic,
  Briefcase,
  Eye,
  FileText,
  ExternalLink,
  Sparkles,
} from "lucide-react";
import { GithubIcon } from "./icons";
import { PROJECTS_CONTENT } from "../data/portfolioContent";

const ProjectModal = lazy(() => import("./ProjectModal"));

// User-intent preloading: load modal chunk on hover or keyboard focus
const preloadProjectModal = () => {
  if (typeof window !== "undefined") {
    void import("./ProjectModal");
  }
};

const fadeUp = {
  hidden: { opacity: 0, y: 16 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.45, ease: [0.22, 1, 0.36, 1], delay: i * 0.08 },
  }),
};

const PROJECT_ICONS = {
  "pulse-engine": Activity,
  reflex: Terminal,
  prepwise: Mic,
  "job-application-tracker": Briefcase,
  "autonomous-vehicle-cv": Eye,
};

export default function Projects() {
  const [selectedProject, setSelectedProject] = useState(null);

  const openProject = (projectSummary) => {
    const fullProject =
      PROJECTS.find((p) => p.id === projectSummary.id) || projectSummary;
    setSelectedProject(fullProject);
    captureProjectClick(projectSummary.title);
  };

  const allProjects = PROJECTS_CONTENT.projects;

  const renderProjectCard = (project, i) => {
    const isFlagship = project.id === "pulse-engine";
    const Icon = PROJECT_ICONS[project.id] || Terminal;
    const githubLink = project.githubUrl || project.link;
    const demoLink = project.demoUrl;

    if (isFlagship) {
      return (
        <motion.div
          key={project.id}
          custom={i}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-40px 0px" }}
          variants={fadeUp}
          whileHover={{ y: -3 }}
          transition={{ duration: 0.2 }}
          onClick={() => openProject(project)}
          onMouseEnter={preloadProjectModal}
          onFocus={preloadProjectModal}
          tabIndex={0}
          role="button"
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") {
              e.preventDefault();
              openProject(project);
            }
          }}
          className="col-span-1 md:col-span-2 cursor-pointer group outline-none relative rounded-2xl focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-bg-primary"
        >
          <div className="p-6 sm:p-8 rounded-2xl border-2 border-accent/30 bg-bg-secondary hover:border-accent shadow-sm hover:shadow-xl transition-all duration-300 relative overflow-hidden">
            {/* Subtle background glow */}
            <div className="absolute -top-24 -right-24 w-72 h-72 bg-accent/5 rounded-full blur-3xl pointer-events-none" />

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 relative z-10">
              {/* Left: Content */}
              <div className="lg:col-span-7 space-y-4">
                {/* Badge row */}
                <div className="flex flex-wrap items-center gap-2.5">
                  <div className="w-10 h-10 rounded-xl bg-accent/15 border border-accent/30 flex items-center justify-center text-accent shrink-0">
                    <Icon size={20} />
                  </div>
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono font-semibold bg-accent/10 text-accent border border-accent/25">
                    <Sparkles size={12} />
                    Featured
                  </span>
                  <span className="text-xs font-mono text-text-secondary px-2.5 py-1 rounded-md bg-bg-tertiary border border-border/70">
                    {project.type}
                  </span>
                </div>

                <h3 className="font-serif text-2xl sm:text-3xl font-bold text-text-primary group-hover:text-accent transition-colors">
                  {project.title}
                </h3>
                <p className="text-sm sm:text-base text-text-secondary leading-relaxed pr-2 sm:pr-8 max-w-xl">
                  {project.summary}
                </p>

                {/* Skills */}
                <div className="flex flex-wrap gap-1.5 pt-2">
                  {project.skills.map((skill) => (
                    <span
                      key={skill}
                      className="text-xs sm:text-[13px] font-mono px-2.5 py-1 rounded-md bg-bg-tertiary border border-border/70 text-text-primary font-medium"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              {/* Right: Benchmark box + action buttons */}
              <div className="lg:col-span-5 flex flex-col justify-between gap-4">
                <div className="rounded-xl bg-accent/5 border border-accent/20 p-3.5 text-xs sm:text-sm text-text-primary">
                  <span className="text-text-secondary dark:text-text-primary/90 font-sans text-xs sm:text-sm leading-relaxed">
                    PostgreSQL 16 · Locust 1,000 req/sec · 0 balance violations · 8-core Linux / 16GB RAM
                  </span>
                </div>

                <div className="flex items-center gap-2.5">
                  {githubLink && (
                    <a
                      href={githubLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={(e) => e.stopPropagation()}
                      className="flex-1 inline-flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-xl border border-border bg-bg-tertiary hover:border-accent text-text-primary text-xs sm:text-sm font-semibold transition-all min-h-[44px] z-30 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
                    >
                      <GithubIcon size={15} />
                      <span>GitHub</span>
                    </a>
                  )}
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      openProject(project);
                    }}
                    className="flex-1 inline-flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all min-h-[44px] z-30 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
                    style={{ backgroundColor: "var(--accent)", color: "var(--text-on-accent)" }}
                  >
                    <FileText size={15} />
                    <span>Case Study</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      );
    }

    // Standard Project Card
    return (
      <motion.div
        key={project.id}
        custom={i}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-40px 0px" }}
        variants={fadeUp}
        whileHover={{ y: -4 }}
        transition={{ duration: 0.2 }}
        onClick={() => openProject(project)}
        onMouseEnter={preloadProjectModal}
        onFocus={preloadProjectModal}
        tabIndex={0}
        role="button"
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            openProject(project);
          }
        }}
        className="cursor-pointer group outline-none h-full relative rounded-2xl focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-bg-primary"
      >
        <div className="p-6 sm:p-7 sm:pr-8 rounded-2xl border border-border bg-bg-secondary hover:border-accent/50 shadow-sm hover:shadow-lg transition-all duration-300 flex flex-col justify-between h-full space-y-5">
          <div className="space-y-4">
            {/* Top Bar */}
            <div className="flex items-center justify-between gap-2">
              <div className="w-10 h-10 rounded-xl bg-accent/10 border border-accent/20 flex items-center justify-center text-accent">
                <Icon size={19} />
              </div>
              <span className="text-xs font-mono text-text-secondary px-2.5 py-1 rounded-md bg-bg-tertiary border border-border/70">
                {project.type}
              </span>
            </div>

            {/* Title & Summary */}
            <div className="space-y-2">
              <h3 className="font-serif text-xl sm:text-2xl font-bold text-text-primary group-hover:text-accent transition-colors">
                {project.title}
              </h3>
              <p className="text-sm sm:text-base text-text-secondary leading-relaxed pr-2 sm:pr-6">
                {project.summary}
              </p>
            </div>

            {/* Benchmark metric with same background styling as PulseEngine (no tick) */}
            {project.benchmark && (
              <div className="rounded-xl bg-accent/5 border border-accent/20 p-3.5 text-xs sm:text-sm text-text-primary">
                <span className="text-text-secondary dark:text-text-primary/90 font-sans text-xs sm:text-sm leading-relaxed">
                  {project.benchmark}
                </span>
              </div>
            )}
          </div>

          <div className="space-y-4 pt-2 border-t border-border/60 relative z-10">
            {/* Skills */}
            <div className="flex flex-wrap gap-1.5">
              {project.skills.map((skill) => (
                <span
                  key={skill}
                  className="text-xs sm:text-[13px] font-mono px-2.5 py-1 rounded-md bg-bg-tertiary border border-border/70 text-text-primary font-medium"
                >
                  {skill}
                </span>
              ))}
            </div>

            {/* Action Buttons */}
            <div className="flex items-center gap-2 pt-1">
              {githubLink && (
                <a
                  href={githubLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={(e) => e.stopPropagation()}
                  className="flex-1 inline-flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl border border-border bg-bg-tertiary hover:border-accent text-text-primary text-xs sm:text-sm font-semibold transition-colors min-h-[44px] z-30 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
                >
                  <GithubIcon size={14} />
                  <span>GitHub</span>
                </a>
              )}
              {demoLink ? (
                <a
                  href={demoLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={(e) => e.stopPropagation()}
                  className="flex-1 inline-flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-colors min-h-[44px] z-30 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
                  style={{ backgroundColor: "var(--accent)", color: "var(--text-on-accent)" }}
                >
                  <ExternalLink size={14} />
                  <span>Live Demo</span>
                </a>
              ) : (
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    openProject(project);
                  }}
                  className="flex-1 inline-flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-colors min-h-[44px] z-30 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
                  style={{ backgroundColor: "var(--accent)", color: "var(--text-on-accent)" }}
                >
                  <FileText size={14} />
                  <span>Case Study</span>
                </button>
              )}
            </div>
          </div>
        </div>
      </motion.div>
    );
  };

  return (
    <section
      id="projects"
      className="py-16 sm:py-24 relative"
    >
      <div className="container-custom space-y-10">
        {/* Heading */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px 0px" }}
          variants={fadeUp}
          className="text-center"
        >
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-text-primary tracking-tight">
            {PROJECTS_CONTENT.sectionTitle}
          </h2>
        </motion.div>

        {/* All projects flat — PulseEngine spans 2 cols, rest in grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          {allProjects.map((project, i) => renderProjectCard(project, i))}
        </div>
      </div>

      {/* Case Study Modal */}
      {selectedProject && (
        <Suspense fallback={null}>
          <ProjectModal
            project={selectedProject}
            isOpen={Boolean(selectedProject)}
            onClose={() => setSelectedProject(null)}
          />
        </Suspense>
      )}
    </section>
  );
}
