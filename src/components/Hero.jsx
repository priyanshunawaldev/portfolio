import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { capturePageView, captureDownload } from "../lib/posthog";
import { GithubIcon, LinkedinIcon } from "./icons";
import { FileText, ArrowUpRight, ArrowDown } from "lucide-react";
import { PERSONAL_INFO } from "../data/portfolioContent";
import { fadeUp, staggerContainer } from "../lib/animations";

export default function Hero() {
  const [imgError, setImgError] = useState(false);

  useEffect(() => {
    capturePageView();
  }, []);

  const scrollToProjects = (e) => {
    e.preventDefault();
    const el = document.getElementById("projects");
    if (el) {
      const topOffset = el.getBoundingClientRect().top + window.pageYOffset - 72;
      window.scrollTo({ top: topOffset, behavior: "smooth" });
    }
  };

  return (
    <section
      id="hero"
      className="relative w-full overflow-x-clip bg-bg-primary flex flex-col items-center justify-between px-4 sm:px-6 select-none"
      style={{
        minHeight: "100svh",
        paddingTop: "clamp(96px, 13vh, 136px)",
        paddingBottom: "clamp(24px, 4vh, 44px)",
      }}
    >
      <div className="container max-w-4xl mx-auto my-auto px-4 sm:px-6 flex flex-col items-center text-center">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={staggerContainer}
          className="space-y-6 sm:space-y-7 flex flex-col items-center"
        >
          {/* Photo and photo size from main branch */}
          <motion.div
            variants={fadeUp}
            className="avatar rounded-full overflow-hidden relative mx-auto ring-2 ring-emerald-700/15 dark:ring-emerald-400/20 shadow-md shrink-0 select-none"
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
          </motion.div>

          {/* Name, size, and position */}
          <motion.div variants={fadeUp} className="w-full flex flex-col items-center text-center">
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-text-primary leading-[1.1] text-center mx-auto">
              {PERSONAL_INFO.name}
            </h1>
          </motion.div>

          {/* Text below name with balanced width matching max-w-4xl section */}
          <motion.p
            variants={fadeUp}
            className="text-base sm:text-lg md:text-xl text-text-secondary leading-relaxed max-w-2xl mx-auto font-normal px-2"
          >
            {PERSONAL_INFO.shortBio || "Software Developer building scalable full-stack web apps, high-throughput Python APIs, and automated developer tools."}
          </motion.p>

          {/* Recruiter-friendly availability badge */}
          <motion.div variants={fadeUp} className="pt-0.5">
            <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-mono font-medium text-accent bg-accent/10 border border-accent/20">
              <span className="w-2 h-2 rounded-full bg-accent animate-pulse" aria-hidden="true" />
              <span>Available immediately · Open to Remote &amp; Hybrid Roles</span>
            </span>
          </motion.div>

          {/* Action Row: View Resume + Explore Projects + Socials */}
          <motion.div
            variants={fadeUp}
            className="flex flex-wrap items-center justify-center gap-3 sm:gap-4 pt-1"
          >
            <a
              href={PERSONAL_INFO.resumePath}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => captureDownload()}
              className="btn-primary"
            >
              <FileText size={16} aria-hidden="true" />
              <span>View Resume</span>
              <ArrowUpRight size={14} aria-hidden="true" />
            </a>

            <a
              href="#projects"
              onClick={scrollToProjects}
              className="btn-secondary"
            >
              <span>Explore Projects</span>
              <ArrowDown size={14} className="text-accent" aria-hidden="true" />
            </a>

            <div className="flex items-center gap-2">
              <a
                href={PERSONAL_INFO.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub Profile"
                className="w-11 h-11 rounded-lg border border-border bg-bg-secondary hover:bg-bg-tertiary text-text-primary hover:text-accent transition-colors flex items-center justify-center min-w-[44px] min-h-[44px] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
              >
                <GithubIcon size={18} />
              </a>
              <a
                href={PERSONAL_INFO.linkedinUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn Profile"
                className="w-11 h-11 rounded-lg border border-border bg-bg-secondary hover:bg-bg-tertiary text-text-primary hover:text-accent transition-colors flex items-center justify-center min-w-[44px] min-h-[44px] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
              >
                <LinkedinIcon size={18} />
              </a>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
