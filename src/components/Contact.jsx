import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Mail, ArrowUpRight, Copy, MapPin, Clock, Check } from "lucide-react";
import { GithubIcon, LinkedinIcon } from "./icons";
import { CONTACT_CONTENT, PERSONAL_INFO } from "../data/portfolioContent";

const fadeUp = {
  hidden: { opacity: 0, y: 16 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.45, ease: [0.22, 1, 0.36, 1], delay: i * 0.08 },
  }),
};

export default function Contact() {
  const [copied, setCopied] = useState(false);
  const directEmail = PERSONAL_INFO.email;

  const handleCopyEmail = async () => {
    try {
      await navigator.clipboard.writeText(directEmail);
      setCopied(true);
      setTimeout(() => setCopied(false), 2200);
    } catch {
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
      <div className="container-custom max-w-4xl text-center space-y-8 sm:space-y-10">
        {/* Section Heading */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px 0px" }}
          variants={fadeUp}
        >
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-text-primary tracking-tight">
            {CONTACT_CONTENT.sectionTitle || "Get in Touch"}
          </h2>
        </motion.div>

        {/* Big Email Display Card */}
        <motion.div
          custom={1}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px 0px" }}
          variants={fadeUp}
          className="p-5 sm:p-10 md:p-12 rounded-3xl border border-border bg-bg-secondary shadow-sm space-y-5 overflow-visible"
        >
          {/* Email Click-to-Copy with JetBrains Mono Bold, hover copy icon */}
          <div className="relative flex flex-col items-center justify-center max-w-full">
            <button
              type="button"
              onClick={handleCopyEmail}
              aria-label="Copy email address"
              className="group inline-flex items-center justify-center gap-2 sm:gap-2.5 font-mono font-bold text-text-primary cursor-pointer tracking-tight text-center max-w-full min-h-[44px] py-1.5 px-2 sm:px-3 rounded-xl transition-opacity hover:opacity-85 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent select-text border-0 bg-transparent"
              style={{
                fontSize: "clamp(0.95rem, 3.8vw, 2.15rem)",
                lineHeight: 1.3,
                wordBreak: "break-all",
                overflowWrap: "anywhere",
              }}
            >
              <span className="break-all sm:break-normal">{directEmail}</span>
              {copied ? (
                <Check
                  size={20}
                  className="text-accent stroke-[2.5] shrink-0 opacity-100 transition-all duration-150 animate-fade-in"
                  aria-hidden="true"
                />
              ) : (
                <Copy
                  size={20}
                  className="opacity-0 group-hover:opacity-100 transition-opacity text-text-secondary shrink-0"
                  aria-hidden="true"
                />
              )}
            </button>

            {/* Fast Green Pop-up / Toast Notification with Green Background */}
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

          {/* Action Row: Send Email (mailto) + LinkedIn + GitHub directly below with tight natural spacing */}
          <div className="flex flex-wrap items-center justify-center gap-3 pt-1">
            <a
              href={`mailto:${directEmail}`}
              className="btn-primary"
              aria-label="Open email client"
            >
              <Mail size={16} />
              <span>Send Email</span>
              <ArrowUpRight size={14} />
            </a>

            <a
              href={PERSONAL_INFO.linkedinUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl border border-border/80 bg-bg-tertiary hover:border-accent text-text-primary hover:text-accent font-medium text-sm transition-colors shadow-xs min-h-[44px] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
              aria-label="LinkedIn Profile"
            >
              <LinkedinIcon size={16} />
              <span>LinkedIn</span>
            </a>

            <a
              href={PERSONAL_INFO.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl border border-border/80 bg-bg-tertiary hover:border-accent text-text-primary hover:text-accent font-medium text-sm transition-colors shadow-xs min-h-[44px] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
              aria-label="GitHub Profile"
            >
              <GithubIcon size={16} />
              <span>GitHub</span>
            </a>
          </div>

          {/* Quick Context Details: Line 1 with blinking dot, Line 2 centered with MapPin and Clock */}
          <div className="pt-6 border-t border-border/60 flex flex-col items-center justify-center gap-2 sm:gap-2.5 text-sm sm:text-base text-text-secondary text-center">
            <div className="flex items-center justify-center gap-2">
              <span className="w-2 h-2 rounded-full bg-accent animate-pulse shrink-0" />
              <span className="text-text-primary font-medium">
                {PERSONAL_INFO.availability}
              </span>
            </div>
            <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-1">
              <div className="flex items-center gap-1.5">
                <MapPin size={16} className="text-accent shrink-0" />
                <span>{PERSONAL_INFO.location}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Clock size={16} className="text-accent shrink-0" />
                <span>{CONTACT_CONTENT.responseTime}</span>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
