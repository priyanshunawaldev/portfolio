import { motion } from "framer-motion";
import { Briefcase, Calendar, MapPin, Users, GitBranch } from "lucide-react";
import { EXPERIENCE_CONTENT } from "../data/portfolioContent";

const fadeUp = {
  hidden: { opacity: 0, y: 16 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.45, ease: [0.22, 1, 0.36, 1], delay: i * 0.08 },
  }),
};

const EXP_ICONS = {
  "open-source-backend": GitBranch,
  "cs-mentor": Users,
};

export default function Experience() {
  return (
    <section
      id="experience"
      className="py-16 sm:py-24 relative scroll-mt-28 sm:scroll-mt-32"
    >
      <div className="container-custom space-y-10">
        {/* Centered Heading */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px 0px" }}
          variants={fadeUp}
          className="text-center"
        >
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-text-primary tracking-tight">
            {EXPERIENCE_CONTENT.sectionTitle}
          </h2>
        </motion.div>

        {/* Experience Timeline Cards */}
        <div className="max-w-4xl mx-auto space-y-6">
          {(EXPERIENCE_CONTENT?.experiences || EXPERIENCE_CONTENT?.roles || []).map((exp, idx) => {
            const Icon = EXP_ICONS[exp.id] || Briefcase;
            const bullets = exp.bullets || exp.highlights || [];
            const roleTitle = exp.role || exp.title;

            return (
              <motion.div
                key={exp.id || idx}
                custom={idx}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-40px 0px" }}
                variants={fadeUp}
                className="p-6 sm:p-8 rounded-2xl border border-border bg-bg-secondary hover:border-accent/40 shadow-sm hover:shadow-xl transition-all duration-300 space-y-5"
              >
                {/* Header Row */}
                <div className="flex flex-wrap items-start justify-between gap-3 border-b border-border/60 pb-4">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2.5">
                      <div className="w-9 h-9 rounded-xl bg-accent/10 border border-accent/20 flex items-center justify-center text-accent shrink-0">
                        <Icon size={18} />
                      </div>
                      <h3 className="font-serif text-xl sm:text-2xl font-bold text-text-primary">
                        {roleTitle}
                      </h3>
                    </div>
                    <p className="text-sm sm:text-base text-accent font-medium font-mono pl-[46px]">
                      {exp.organization}
                    </p>
                  </div>

                  <div className="flex flex-wrap items-center gap-2 pl-[46px] sm:pl-0">
                    <span className="inline-flex items-center gap-1.5 text-xs font-mono font-medium text-text-secondary px-3 py-1 rounded-full bg-bg-tertiary border border-border/70">
                      <Calendar size={13} className="text-accent" />
                      {exp.period}
                    </span>
                    <span className="inline-flex items-center gap-1.5 text-xs font-mono text-text-secondary px-2.5 py-1 rounded-full bg-bg-tertiary/70 border border-border/60">
                      <MapPin size={13} />
                      {exp.location}
                    </span>
                  </div>
                </div>

                {/* Impact Bullets */}
                <ul className="space-y-2.5 text-sm sm:text-base text-text-secondary pl-1 sm:pl-2">
                  {bullets.map((bullet, bulletIdx) => (
                    <li key={bulletIdx} className="flex items-start gap-3">
                      <span className="w-1.5 h-1.5 rounded-full bg-accent shrink-0 mt-2" />
                      <span className="leading-relaxed font-normal text-text-secondary dark:text-text-primary/90 text-left">
                        {bullet}
                      </span>
                    </li>
                  ))}
                </ul>

                {/* Tech Pills */}
                {exp.skills && exp.skills.length > 0 && (
                  <div className="pt-3 border-t border-border/60 flex flex-wrap gap-1.5 pl-1 sm:pl-2">
                    {exp.skills.map((skill) => (
                      <span
                        key={skill}
                        className="text-xs font-mono px-2.5 py-1 rounded-md bg-bg-tertiary border border-border/70 text-text-primary font-medium"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                )}
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
