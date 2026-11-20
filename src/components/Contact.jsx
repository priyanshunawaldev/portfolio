import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Copy, Check, ArrowUpRight, Mail } from "lucide-react";
import { GithubIcon, LinkedinIcon } from "./icons";
import { PERSONAL_INFO, CONTACT_CONTENT } from "../data/portfolioContent";
import { fadeUp } from "../lib/animations";

export default function Contact() {
  const [copied, setCopied] = useState(false);
  const directEmail = PERSONAL_INFO.email;

  const handleCopyEmail = () => {
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(directEmail).then(() => {
        setCopied(true);
        setTimeout(() => setCopied(false), 2200);
      });
    } else {
      const textArea = document.createElement("textarea");
      textArea.value = directEmail;
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand("copy");
      document.body.removeChild(textArea);
      setCopied(true);
      setTimeout(() => setCopied(false), 2200);
    }
  };

  return (
    <section
      id="contact"
      className="py-20 sm:py-28 relative scroll-mt-28 sm:scroll-mt-32"
    >
      <div className="container max-w-4xl mx-auto px-4 sm:px-6 text-center space-y-8 sm:space-y-10">
        {/* Section Heading */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px 0px" }}
          variants={fadeUp}
          className="text-center w-full space-y-2"
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-text-primary tracking-tight text-center mx-auto">
            {CONTACT_CONTENT.sectionTitle || "Get in Touch"}
          </h2>
        </motion.div>

        {/* Elevated Contact Card Container */}
        <motion.div
          custom={1}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px 0px" }}
          variants={fadeUp}
          className="w-full p-6 sm:p-10 md:p-12 rounded-2xl bg-bg-secondary/40 border border-border/80 shadow-xs space-y-7 text-center backdrop-blur-xs"
        >
          {/* Availability / Response Time Badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-xs font-mono font-medium text-accent bg-accent/10 border border-accent/20">
            <span className="w-2 h-2 rounded-full bg-accent animate-pulse" aria-hidden="true" />
            <span>Response within 24 hours</span>
          </div>

          {/* Context Intro */}
          <p className="text-base sm:text-lg md:text-xl text-text-secondary max-w-2xl mx-auto leading-relaxed px-2">
            Have an open Python backend role, an architecture challenge to discuss, or a question? I&apos;d love to connect.
          </p>

          {/* Email Click-to-Copy: Clean Monospace Text (size kept from main) */}
          <div className="relative flex flex-col items-center justify-center max-w-full">
            <button
              type="button"
              onClick={handleCopyEmail}
              aria-label="Copy email address"
              className="group inline-flex items-center justify-center gap-2.5 font-mono font-bold text-text-primary hover:opacity-75 cursor-pointer tracking-tight text-center max-w-full min-h-[44px] py-1 px-2 border-0 bg-transparent transition-opacity focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent rounded-lg select-text text-lg sm:text-2xl md:text-3xl"
            >
              <span className="break-all sm:break-normal whitespace-nowrap">{directEmail}</span>
              {copied ? (
                <Check
                  size={18}
                  className="text-text-primary stroke-[2.5] shrink-0 opacity-100 transition-opacity duration-150"
                  aria-hidden="true"
                />
              ) : (
                <Copy
                  size={18}
                  className="opacity-50 group-hover:opacity-100 transition-opacity text-text-secondary shrink-0"
                  aria-hidden="true"
                />
              )}
            </button>

            {/* Pop-up Toast Notification with Green Background & White Text from Main */}
            <AnimatePresence>
              {copied && (
                <motion.div
                  initial={{ opacity: 0, y: 4, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 2, scale: 0.95 }}
                  transition={{ duration: 0.15, ease: "easeOut" }}
                  className="absolute -top-10 left-1/2 -translate-x-1/2 z-20 pointer-events-none whitespace-nowrap"
                >
                  <span
                    className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full font-sans font-semibold text-xs sm:text-sm shadow-lg shadow-accent/20 border border-accent-light/40"
                    style={{
                      backgroundColor: "var(--accent)",
                      color: "var(--text-on-accent)",
                    }}
                  >
                    <Check size={14} className="stroke-[2.5]" style={{ color: "var(--text-on-accent)" }} />
                    Email copied to clipboard!
                  </span>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Action Row: Send Email + LinkedIn + GitHub (wraps nicely in mobile/tablet as in Image 5) */}
          <div className="flex flex-wrap items-center justify-center gap-3 pt-1 max-w-md mx-auto">
            <a
              href={`mailto:${directEmail}`}
              className="inline-flex items-center justify-center gap-2 px-6 py-2.5 rounded-xl bg-accent text-bg-primary font-semibold text-sm transition-transform motion-safe:hover:-translate-y-0.5 motion-reduce:transform-none shadow-sm shadow-accent/20 min-h-[44px] whitespace-nowrap focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
              aria-label="Open email client"
            >
              <Mail size={16} aria-hidden="true" />
              <span>Send Email</span>
              <ArrowUpRight size={14} aria-hidden="true" />
            </a>

            <a
              href={PERSONAL_INFO.linkedinUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl border border-border/80 bg-bg-secondary hover:border-accent text-text-primary hover:text-accent font-medium text-sm transition-colors shadow-xs min-h-[44px] whitespace-nowrap focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
              aria-label="LinkedIn Profile"
            >
              <LinkedinIcon size={16} />
              <span>LinkedIn</span>
            </a>

            <a
              href={PERSONAL_INFO.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl border border-border/80 bg-bg-secondary hover:border-accent text-text-primary hover:text-accent font-medium text-sm transition-colors shadow-xs min-h-[44px] whitespace-nowrap focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
              aria-label="GitHub Profile"
            >
              <GithubIcon size={16} />
              <span>GitHub</span>
            </a>
          </div>

          {/* Context Details: Responsive text size */}
          <div className="pt-6 border-t border-border/60 flex flex-col items-center justify-center gap-1 text-center">
            <p className="text-sm sm:text-base text-text-secondary font-medium">
              Based in India · Open to Remote &amp; Hybrid Roles
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
