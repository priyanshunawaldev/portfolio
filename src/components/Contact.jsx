import { useState } from "react";
import { motion } from "framer-motion";
import { Mail, ArrowUpRight, Copy, MapPin, Clock } from "lucide-react";
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
  const directEmail = CONTACT_CONTENT.directEmail || PERSONAL_INFO.email;

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
          className="p-6 sm:p-10 md:p-12 rounded-3xl border border-border bg-bg-secondary shadow-sm space-y-6 overflow-hidden"
        >
          {/* Email Click-to-Copy with JetBrains Mono Bold, hover copy icon, zero green box */}
          <div className="flex flex-col items-center justify-center max-w-full overflow-hidden">
            <button
              type="button"
              onClick={handleCopyEmail}
              aria-label="Copy email address"
              className="group inline-flex items-center justify-center gap-2.5 font-mono font-bold text-text-primary cursor-pointer tracking-tight text-center max-w-full min-h-[44px] py-1.5 px-3 rounded-xl transition-opacity hover:opacity-85 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent select-text border-0 bg-transparent"
              style={{
                fontSize: "clamp(1.15rem, 3.4vw, 2.15rem)",
                lineHeight: 1.3,
                wordBreak: "break-word",
                overflowWrap: "anywhere",
              }}
            >
              <span>{directEmail}</span>
              <Copy
                size={20}
                className="opacity-0 group-hover:opacity-100 transition-opacity text-text-secondary shrink-0"
                aria-hidden="true"
              />
            </button>

            {/* Plain copy feedback indicator (no green box, no "Click to copy" placeholder) */}
            <div className="min-h-[24px] mt-2 flex items-center justify-center text-center px-2">
              {copied && (
                <span className="text-xs sm:text-sm font-sans font-medium text-text-primary animate-fade-up">
                  Email copied to clipboard.
                </span>
              )}
            </div>
          </div>

          {/* Action Row: Send Email (mailto) + LinkedIn + GitHub (Copy Email button removed) */}
          <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
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
