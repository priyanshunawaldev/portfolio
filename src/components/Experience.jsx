import { motion } from "framer-motion";
import { Briefcase, Calendar, MapPin, Users, GitBranch } from "lucide-react";
import { EXPERIENCE_CONTENT } from "../data/portfolioContent";
import { fadeUp } from "../lib/animations";

const EXP_ICONS = {
  "open-source-backend": GitBranch,
  "cs-mentor": Users,
};

export default function Experience() {
  const experiences = EXPERIENCE_CONTENT?.experiences || [];

  return (
    <section
      id="experience"
      className="py-16 sm:py-20 relative scroll-mt-28 sm:scroll-mt-32"
    >
      <div className="container max-w-4xl mx-auto px-4 sm:px-6 space-y-10">
        {/* Centered Heading */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px 0px" }}
          variants={fadeUp}
          className="text-center w-full"
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-text-primary tracking-tight text-center mx-auto">
            {EXPERIENCE_CONTENT.sectionTitle}
          </h2>
        </motion.div>

        {/* Editorial Timeline Layout */}
        <div className="w-full relative pl-6 sm:pl-8 border-l-2 border-border/70 space-y-10 ml-2 sm:ml-4">
          {experiences.map((exp, idx) => {
            const Icon = EXP_ICONS[exp.id] || Briefcase;

            return (
              <motion.div
                key={exp.id || idx}
                custom={idx}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-40px 0px" }}
                variants={fadeUp}
                className="relative space-y-4"
              >
                {/* Timeline Node on Left Border */}
                <div className="absolute -left-[31px] sm:-left-[39px] top-1.5 w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-bg-primary border-2 border-accent flex items-center justify-center text-accent">
                  <Icon size={14} />
                </div>

                {/* Header Information */}
                <div className="space-y-1">
                  <div className="flex flex-wrap items-baseline justify-between gap-2">
                    <h3 className="text-lg sm:text-xl font-bold text-text-primary text-left">
                      {exp.role}
                    </h3>
                    <div className="flex items-center gap-2">
                      <span className="inline-flex items-center gap-1.5 text-xs font-mono font-medium text-text-secondary px-2.5 py-0.5 rounded-full bg-bg-secondary border border-border/60">
                        <Calendar size={12} className="text-accent" />
                        {exp.period}
                      </span>
                      <span className="inline-flex items-center gap-1 text-xs font-mono text-text-secondary px-2 py-0.5 rounded-full bg-bg-secondary border border-border/60">
                        <MapPin size={11} />
                        {exp.location}
                      </span>
                    </div>
                  </div>
                  <p className="text-sm font-mono text-accent font-medium">
                    {exp.organization}
                  </p>
                </div>

                {/* Narrative Description if provided */}
                {exp.description && (
                  <p className="text-sm text-text-secondary leading-relaxed">
                    {exp.description}
                  </p>
                )}

                {/* Bullets */}
                <ul className="space-y-2 text-sm sm:text-base text-text-secondary">
                  {exp.bullets.map((bullet, bulletIdx) => (
                    <li key={bulletIdx} className="flex items-start gap-2.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-accent shrink-0 mt-2" />
                      <span className="leading-relaxed text-left">
                        {bullet}
                      </span>
                    </li>
                  ))}
                </ul>

                {/* Tech Pills */}
                {exp.skills && exp.skills.length > 0 && (
                  <div className="pt-2 flex flex-wrap gap-1.5">
                    {exp.skills.map((skill) => (
                      <span
                        key={skill}
                        className="text-xs font-mono px-2.5 py-0.5 rounded bg-bg-secondary border border-border/60 text-text-secondary font-medium"
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
