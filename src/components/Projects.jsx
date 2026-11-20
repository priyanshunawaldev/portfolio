import { useState, lazy, Suspense } from "react";
import { motion } from "framer-motion";
import { PROJECTS } from "../data/projectsData";
import { captureProjectClick } from "../lib/posthog";
import {
  Terminal,
  Activity,
  Mic,
  Eye,
  FileText,
  ExternalLink,
} from "lucide-react";
import { GithubIcon } from "./icons";
import { PROJECTS_CONTENT } from "../data/portfolioContent";
import { fadeUp } from "../lib/animations";

const ProjectModal = lazy(() => import("./ProjectModal"));

// User-intent preloading: load modal chunk on hover or keyboard focus
const preloadProjectModal = () => {
  if (typeof window !== "undefined") {
    void import("./ProjectModal");
  }
};

const PROJECT_ICONS = {
  "pulse-engine": Activity,
  reflex: Terminal,
  prepwise: Mic,
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

  const allProjects = [...PROJECTS_CONTENT.projects];
  const flagshipProjects = allProjects.filter((p) => Boolean(p.featured));
  const otherProjects = allProjects.filter((p) => !p.featured);

  // Render a Featured Showcase Card (Elevated, full-width presentation)
  const renderFlagshipCard = (project, i) => {
    const Icon = PROJECT_ICONS[project.id] || Terminal;
    const githubLink = project.githubUrl || project.link;
    const demoLink = project.demoUrl;

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
        aria-label={`View case study for ${project.title}`}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            openProject(project);
          }
        }}
        className="w-full cursor-pointer group outline-none relative rounded-2xl focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-bg-primary"
      >
        <div className="p-6 sm:p-8 rounded-2xl border-2 border-accent/30 bg-bg-secondary hover:border-accent shadow-sm hover:shadow-xl transition-all duration-300 space-y-6">
          {/* Top Bar: Icon + Featured Badge + Type */}
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-border/60 pb-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-accent/15 border border-accent/30 flex items-center justify-center text-accent shrink-0">
                <Icon size={20} />
              </div>
              {project.badge && (
                <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-mono font-semibold bg-accent/10 text-accent border border-accent/25">
                  {project.badge}
                </span>
              )}
            </div>
            <span className="text-xs text-text-secondary px-2.5 py-1 rounded-md bg-bg-tertiary border border-border/70 font-mono">
              {project.type}
            </span>
          </div>

          {/* Title & Summary */}
          <div className="space-y-2.5 text-left">
            <h3 className="text-2xl sm:text-3xl font-extrabold text-text-primary group-hover:text-accent transition-colors">
              {project.title}
            </h3>
            <p className="text-sm sm:text-base text-text-secondary leading-relaxed">
              {project.summary}
            </p>
          </div>

          {/* Benchmark Metric Box */}
          {project.benchmark && (
            <div className="rounded-xl bg-accent/5 border border-accent/20 p-3.5 text-xs sm:text-sm text-text-primary text-left">
              <span className="text-text-secondary dark:text-text-primary/90 font-sans text-xs sm:text-sm leading-relaxed">
                {project.benchmark}
              </span>
            </div>
          )}

          {/* Skills Row matching standard cards */}
          <div className="flex flex-wrap gap-1.5 pt-1 text-left">
            {project.skills.map((skill) => (
              <span
                key={skill}
                className="text-xs sm:text-[13px] font-mono px-2.5 py-1 rounded-md bg-bg-tertiary text-text-secondary font-medium"
              >
                {skill}
              </span>
            ))}
          </div>

          {/* Action Buttons in next line (below skills, full row) */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 pt-4 border-t border-border/60 relative z-10">
            {githubLink && (
              <a
                href={githubLink}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => e.stopPropagation()}
                className="flex-1 inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl border border-border/80 bg-bg-tertiary hover:border-accent text-text-primary hover:text-accent font-semibold text-sm transition-colors shadow-xs min-h-[44px] z-30 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
              >
                <GithubIcon size={16} />
                <span>View on GitHub</span>
              </a>
            )}
            {demoLink ? (
              <a
                href={demoLink}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => e.stopPropagation()}
                className="flex-1 inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold transition-all min-h-[44px] z-30 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
                style={{ backgroundColor: "var(--accent)", color: "var(--text-on-accent)" }}
              >
                <ExternalLink size={16} />
                <span>Live Demo</span>
              </a>
            ) : (
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  openProject(project);
                }}
                className="flex-1 inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold transition-all min-h-[44px] z-30 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
                style={{ backgroundColor: "var(--accent)", color: "var(--text-on-accent)" }}
              >
                <FileText size={16} />
                <span>Explore Case Study</span>
              </button>
            )}
          </div>
        </div>
      </motion.div>
    );
  };

  // Render a Standard Project Card
  const renderStandardCard = (project, i) => {
    const Icon = PROJECT_ICONS[project.id] || Terminal;
    const githubLink = project.githubUrl || project.link;
    const demoLink = project.demoUrl;
    const isOddLast = otherProjects.length % 2 === 1 && i === otherProjects.length - 1;

    return (
      <div key={project.id} className={isOddLast ? "md:col-span-2 flex justify-center w-full" : "w-full"}>
        <motion.div
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
          aria-label={`View case study for ${project.title}`}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") {
              e.preventDefault();
              openProject(project);
            }
          }}
          className={`cursor-pointer group outline-none h-full relative rounded-2xl focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-bg-primary text-left w-full ${
            isOddLast ? "md:w-[calc(50%-12px)]" : ""
          }`}
        >
          <div className="p-6 sm:p-7 rounded-2xl border border-border bg-bg-secondary hover:border-accent/50 shadow-xs hover:shadow-lg transition-all duration-300 flex flex-col justify-between h-full space-y-5">
            <div className="space-y-4">
              {/* Top Bar */}
              <div className="flex items-center justify-between gap-2">
                <div className="w-10 h-10 rounded-xl bg-accent/10 border border-accent/20 flex items-center justify-center text-accent">
                  <Icon size={19} />
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="text-xs font-mono text-text-secondary px-2.5 py-1 rounded-md bg-bg-tertiary border border-border/70">
                    {project.type}
                  </span>
                </div>
              </div>

              {/* Title & Summary */}
              <div className="space-y-2">
                <h3 className="text-xl sm:text-2xl font-bold text-text-primary group-hover:text-accent transition-colors">
                  {project.title}
                </h3>
                <p className="text-sm sm:text-base text-text-secondary leading-relaxed">
                  {project.summary}
                </p>
              </div>

              {/* Benchmark metric */}
              {project.benchmark && (
                <div className="rounded-lg bg-accent/5 border border-accent/20 p-3 text-xs sm:text-sm text-text-primary min-h-[48px] flex items-center">
                  <span className="text-text-secondary dark:text-text-primary/90 font-sans text-xs sm:text-sm leading-relaxed">
                    {project.benchmark}
                  </span>
                </div>
              )}
            </div>

            <div className="space-y-3.5 pt-2 border-t border-border/60 relative z-10">
              {/* Skills */}
              <div className="flex flex-wrap gap-1.5">
                {project.skills.map((skill) => (
                  <span
                    key={skill}
                    className="text-xs sm:text-[13px] font-mono px-2.5 py-1 rounded-md bg-bg-tertiary text-text-secondary font-medium"
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
                    className="flex-1 inline-flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl border border-border bg-bg-tertiary hover:border-accent text-text-primary text-xs font-semibold transition-colors min-h-[44px] z-30 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
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
                    className="flex-1 inline-flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold transition-colors min-h-[44px] z-30 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
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
                    className="flex-1 inline-flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold transition-colors min-h-[44px] z-30 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
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
      </div>
    );
  };

  return (
    <section
      id="projects"
      className="py-16 sm:py-24 relative scroll-mt-28 sm:scroll-mt-32"
    >
      <div className="container max-w-4xl mx-auto px-4 sm:px-6 space-y-10">
        {/* Section Heading */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px 0px" }}
          variants={fadeUp}
          className="text-center w-full"
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-text-primary tracking-tight text-center mx-auto">
            {PROJECTS_CONTENT.sectionTitle}
          </h2>
        </motion.div>

        {/* Flagship / Featured System(s) Block */}
        {flagshipProjects.length > 0 && (
          <div className="space-y-6">
            {flagshipProjects.map((project, i) => renderFlagshipCard(project, i))}
          </div>
        )}

        {/* Other Notable Projects Sub-section in 2x2 Grid with Centered 3rd Project */}
        {otherProjects.length > 0 && (
          <div className="pt-2">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {otherProjects.map((project, i) => renderStandardCard(project, i))}
            </div>
          </div>
        )}
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
