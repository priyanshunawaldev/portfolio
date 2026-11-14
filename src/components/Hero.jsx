import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { capturePageView, captureDownload } from "../lib/posthog";
import { GithubIcon, LinkedinIcon } from "./icons";
import { FileText, ArrowUpRight, ArrowDown } from "lucide-react";
import { PERSONAL_INFO } from "../data/portfolioContent";

const fadeUp = {
  hidden: { opacity: 0, y: 16 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: [0.22, 1, 0.36, 1],
      delay: i * 0.08,
    },
  }),
};

export default function Hero() {
  const [imgError, setImgError] = useState(false);

  useEffect(() => {
    capturePageView();
  }, []);

  const scrollToProjects = (e) => {
    e.preventDefault();
    const el = document.getElementById("projects");
    if (el) {
      const topOffset = el.getBoundingClientRect().top + window.pageYOffset - 100;
      window.scrollTo({ top: topOffset, behavior: "smooth" });
    }
  };

  return (
    <section
      id="hero"
      className="relative overflow-hidden"
      style={{ minHeight: "100svh", paddingTop: "72px", paddingBottom: "12vh" }}
    >
      <div className="container-custom max-w-4xl h-full grid place-content-center text-center" style={{ minHeight: "calc(100svh - 72px - 12vh)" }}>
        <div className="space-y-8 sm:space-y-10">

          {/* Circular Portrait with Static Sage Gradient Backdrop */}
          <motion.div
            custom={0}
            initial="hidden"
            animate="visible"
            variants={fadeUp}
            className="inline-block mx-auto select-none"
          >
            <div
              className="w-44 h-44 sm:w-52 sm:h-52 md:w-60 md:h-60 rounded-full overflow-hidden relative mx-auto"
              style={{
                background: "linear-gradient(145deg, #E4F1EA, #B9D8C8)",
                border: "3px solid var(--bg-secondary)",
                boxShadow: "0 0 0 1px var(--border), 0 12px 32px -12px rgb(0 0 0 / .25)",
              }}
            >
              {!imgError ? (
                <img
                  src="/portrait.png"
                  alt={`Portrait of ${PERSONAL_INFO.name}`}
                  onError={() => setImgError(true)}
                  className="w-full h-full object-cover object-top relative z-10"
                  loading="eager"
                  decoding="async"
                  style={{
                    WebkitBackfaceVisibility: "hidden",
                    backfaceVisibility: "hidden",
                    transform: "translateZ(0)",
                  }}
                />
              ) : (
                <div className="w-full h-full flex flex-col items-center justify-center relative z-10 text-text-primary">
                  <span className="text-4xl font-serif font-bold">PN</span>
                  <span className="text-xs opacity-90 mt-1 font-sans">{PERSONAL_INFO.name}</span>
                </div>
              )}
            </div>
          </motion.div>

          {/* Name + Tagline */}
          <div className="space-y-4">
            <motion.h1
              custom={1}
              initial="hidden"
              animate="visible"
              variants={fadeUp}
              className="font-serif text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-bold tracking-tight text-text-primary leading-[1.08]"
            >
              {PERSONAL_INFO.name}
            </motion.h1>

            <motion.p
              custom={2}
              initial="hidden"
              animate="visible"
              variants={fadeUp}
              className="font-sans text-lg sm:text-xl md:text-2xl text-text-secondary leading-relaxed font-normal max-w-2xl mx-auto"
            >
              Software Developer building{" "}
              <span className="text-text-primary font-medium">full-stack web applications</span>,{" "}
              dependable Python APIs, and practical developer tools.
            </motion.p>

            {/* Status line — not a boxed block */}
            <motion.p
              custom={3}
              initial="hidden"
              animate="visible"
              variants={fadeUp}
              className="text-sm sm:text-base text-text-secondary inline-flex flex-wrap items-center justify-center gap-x-2.5 gap-y-1.5"
            >
              <span className="inline-flex items-center gap-1.5 text-accent font-medium">
                <span className="w-2 h-2 rounded-full bg-accent animate-pulse" />
                Available immediately
              </span>
              <span className="text-border" aria-hidden="true">·</span>
              <span>India · Open to Hybrid &amp; Relocation</span>
              <span className="text-border" aria-hidden="true">·</span>
              <span className="font-mono font-medium">Python · Full-Stack · React · FastAPI</span>
            </motion.p>
          </div>

          {/* Action Bar: Resume (primary) + See Projects (secondary) + GitHub + LinkedIn */}
          <motion.div
            custom={4}
            initial="hidden"
            animate="visible"
            variants={fadeUp}
            className="flex flex-wrap items-center justify-center gap-3 sm:gap-4 pt-2"
          >
            <a
              href={PERSONAL_INFO.resumePath}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => captureDownload()}
              className="btn-primary"
            >
              <FileText size={17} />
              <span>Resume PDF</span>
              <ArrowUpRight size={15} />
            </a>

            <a
              href="#projects"
              onClick={scrollToProjects}
              className="btn-secondary"
            >
              <span>See Projects</span>
              <ArrowDown size={16} className="text-accent" />
            </a>

            <a
              href={PERSONAL_INFO.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2.5 min-h-[44px] rounded-xl border border-border/80 bg-bg-secondary/80 hover:bg-bg-secondary text-text-primary hover:text-accent font-medium text-sm transition-colors shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
            >
              <GithubIcon size={17} />
              <span>GitHub</span>
            </a>

            <a
              href={PERSONAL_INFO.linkedinUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2.5 min-h-[44px] rounded-xl border border-border/80 bg-bg-secondary/80 hover:bg-bg-secondary text-text-primary hover:text-accent font-medium text-sm transition-colors shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
            >
              <LinkedinIcon size={17} />
              <span>LinkedIn</span>
            </a>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
