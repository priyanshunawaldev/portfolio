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
      style={{ minHeight: "100svh", paddingTop: "clamp(96px, 12vh, 128px)", paddingBottom: "clamp(48px, 8vh, 80px)" }}
    >
      <div className="container-custom max-w-4xl mx-auto flex flex-col items-center justify-center text-center" style={{ minHeight: "calc(100svh - clamp(96px, 12vh, 128px) - clamp(48px, 8vh, 80px))" }}>
        <div className="space-y-6 sm:space-y-7">

          {/* Circular Portrait with Static Sage Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            className="inline-block mx-auto select-none"
          >
            <div
              className="avatar rounded-full overflow-hidden relative mx-auto ring-2 ring-emerald-700/15 dark:ring-emerald-400/20"
              style={{
                width: "clamp(190px, 22vw, 248px)",
                aspectRatio: "1 / 1",
                borderRadius: "9999px",
                overflow: "hidden",
                background: "#E4F1EA",
                boxShadow: "0 10px 28px -10px rgb(0 0 0 / .14)",
              }}
            >
              {!imgError ? (
                <img
                  src={PERSONAL_INFO.heroImage || "/hero-image.webp"}
                  alt={`Portrait of ${PERSONAL_INFO.name}`}
                  onError={() => setImgError(true)}
                  className="w-full h-full block scale-105 object-cover object-top"
                  loading="eager"
                  decoding="async"
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
          <div className="space-y-3 sm:space-y-3.5">
            <motion.h1
              custom={1}
              initial="hidden"
              animate="visible"
              variants={fadeUp}
              className="font-serif text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-text-primary leading-[1.1]"
            >
              {PERSONAL_INFO.name}
            </motion.h1>

            <motion.p
              custom={2}
              initial="hidden"
              animate="visible"
              variants={fadeUp}
              className="font-sans text-base sm:text-lg md:text-xl text-text-secondary leading-relaxed font-normal max-w-2xl mx-auto"
            >
              Software Developer building scalable full-stack web apps, high-throughput Python APIs, and automated developer tools.
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
              <span className="text-border select-none" aria-hidden="true">·</span>
              <span>India (Open to Hybrid &amp; Relocation)</span>
              <span className="text-border select-none" aria-hidden="true">·</span>
              <span className="font-mono font-medium">Python · FastAPI · React · PostgreSQL · Docker</span>
            </motion.p>
          </div>

          {/* Action Bar: View Resume (primary) + See Projects (secondary) + GitHub + LinkedIn */}
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
              <span>View Resume</span>
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
              aria-label="GitHub Profile"
              title="GitHub Profile"
              className="w-11 h-11 min-w-[44px] min-h-[44px] rounded-xl border border-border/80 bg-bg-secondary/80 hover:bg-bg-secondary text-text-primary hover:text-accent transition-colors shadow-sm flex items-center justify-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
            >
              <GithubIcon size={18} />
            </a>

            <a
              href={PERSONAL_INFO.linkedinUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn Profile"
              title="LinkedIn Profile"
              className="w-11 h-11 min-w-[44px] min-h-[44px] rounded-xl border border-border/80 bg-bg-secondary/80 hover:bg-bg-secondary text-text-primary hover:text-accent transition-colors shadow-sm flex items-center justify-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
            >
              <LinkedinIcon size={18} />
            </a>
          </motion.div>

          {/* Subtle Scroll Indicator */}
          <motion.div
            custom={5}
            initial="hidden"
            animate="visible"
            variants={fadeUp}
            className="pt-6 sm:pt-8 flex flex-col items-center justify-center"
          >
            <a
              href="#about"
              onClick={(e) => {
                e.preventDefault();
                const el = document.getElementById("about");
                if (el) {
                  const topOffset = el.getBoundingClientRect().top + window.pageYOffset - 90;
                  window.scrollTo({ top: topOffset, behavior: "smooth" });
                }
              }}
              className="group inline-flex flex-col items-center gap-1.5 text-text-secondary/70 hover:text-accent transition-colors duration-200 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent rounded-full py-1.5 px-3 select-none"
              aria-label="Scroll to explore portfolio"
            >
              <span className="font-mono text-[10px] sm:text-[11px] font-semibold tracking-[0.2em] uppercase">
                SCROLL TO EXPLORE
              </span>
              <motion.div
                animate={{ y: [0, 4, 0] }}
                transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
              >
                <ArrowDown size={14} className="text-text-secondary/60 group-hover:text-accent transition-colors" />
              </motion.div>
            </a>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
