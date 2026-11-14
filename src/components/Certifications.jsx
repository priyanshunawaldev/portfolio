import { useRef } from "react";
import { motion, useInView } from "framer-motion";

const CERTIFICATIONS = [
  {
    title: "Python for Everybody Specialization",
    issuer: "University of Michigan · Coursera",
    skills: ["Python 3", "Data Structures", "REST APIs", "SQLite", "Data Parsing"],
  },
  {
    title: "Generative AI with Python",
    issuer: "Google Cloud",
    skills: ["Gemini APIs", "Prompt Engineering", "Embeddings", "LLM Integration"],
  },
];

const fadeUp = {
  hidden: { opacity: 0, y: 12 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, ease: [0.23, 1, 0.32, 1], delay: i * 0.08 },
  }),
};

export default function Certifications() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px 0px" });

  return (
    <section id="certifications" className="py-16 sm:py-20 border-b border-border/60">
      <div className="container-custom space-y-8">
        {/* Header */}
        <div className="space-y-1">
          <h2 className="text-xl sm:text-2xl font-bold text-text-primary tracking-tight">
            Certifications
          </h2>
        </div>

        <div ref={ref} className="space-y-5">
          {CERTIFICATIONS.map((cert, i) => (
            <motion.div
              key={cert.title}
              custom={i}
              initial="hidden"
              animate={inView ? "visible" : "hidden"}
              variants={fadeUp}
              className="pb-5 border-b border-border/40 last:border-b-0 last:pb-0 space-y-2"
            >
              <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-0.5">
                <p className="text-sm font-semibold text-text-primary">{cert.title}</p>
                <span className="text-xs mono text-text-secondary shrink-0">{cert.issuer}</span>
              </div>
              <div className="flex flex-wrap gap-1.5">
                {cert.skills.map((skill) => (
                  <span
                    key={skill}
                    className="text-[11px] mono px-2 py-0.5 rounded-md border border-border/60 text-text-secondary font-medium"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
