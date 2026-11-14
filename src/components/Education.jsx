import { motion } from "framer-motion";
import { GraduationCap, BookOpen, Layers } from "lucide-react";
import { EDUCATION_CONTENT } from "../data/portfolioContent";

const fadeUp = {
  hidden: { opacity: 0, y: 16 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.45, ease: [0.22, 1, 0.36, 1], delay: i * 0.08 },
  }),
};

export default function Education() {
  return (
    <section
      id="education"
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
            {EDUCATION_CONTENT.sectionTitle}
          </h2>
        </motion.div>

        {/* Single Comprehensive Clean Card Centered */}
        <motion.div
          custom={1}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-40px 0px" }}
          variants={fadeUp}
          className="max-w-3xl mx-auto"
        >
          <div className="p-6 sm:p-8 rounded-2xl border border-border bg-bg-secondary shadow-sm hover:border-accent/40 transition-all duration-300 space-y-6">
            {/* Degree & College Header */}
            <div className="flex flex-wrap items-baseline justify-between gap-3 border-b border-border/60 pb-5">
              <div className="space-y-1">
                <div className="flex items-center gap-2.5">
                  <div className="w-10 h-10 rounded-xl bg-accent/10 border border-accent/20 flex items-center justify-center text-accent shrink-0">
                    <GraduationCap size={22} />
                  </div>
                  <h3 className="font-serif text-xl sm:text-2xl font-bold text-text-primary">
                    {EDUCATION_CONTENT.degree}
                  </h3>
                </div>
                <p className="text-sm sm:text-base text-accent font-medium pl-[50px]">
                  {EDUCATION_CONTENT.institution}
                </p>
              </div>

              <span className="text-xs font-mono font-medium text-text-secondary px-3 py-1 rounded-full bg-bg-tertiary border border-border/70">
                {EDUCATION_CONTENT.duration}
              </span>
            </div>

            {/* Real Master's Dissertation with 3 Core Bullet Points */}
            <div className="space-y-3 pl-1 sm:pl-2">
              <div className="flex items-center gap-2 text-sm sm:text-base font-semibold text-text-primary">
                <BookOpen size={18} className="text-accent shrink-0" />
                <span>Master&apos;s Dissertation: {EDUCATION_CONTENT.dissertation.title}</span>
              </div>

              <ul className="space-y-2.5 text-sm sm:text-base text-text-secondary dark:text-text-primary/90 pl-6">
                {EDUCATION_CONTENT.dissertation.bullets.map((bullet, idx) => (
                  <li key={idx} className="flex items-start gap-2.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-accent shrink-0 mt-2" />
                    <span className="leading-relaxed text-left">{bullet}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Distinguishing Graduate Topics */}
            <div className="space-y-3 pt-4 border-t border-border/60 pl-1 sm:pl-2">
              <div className="flex items-center gap-2 text-xs font-semibold text-text-secondary uppercase tracking-wider font-mono">
                <Layers size={14} className="text-accent" />
                <span>Distinguishing Graduate Topics &amp; Systems Focus</span>
              </div>
              <div className="flex flex-wrap gap-2 pt-1">
                {EDUCATION_CONTENT.coursework.map((course) => (
                  <span
                    key={course}
                    className="text-xs sm:text-[13px] px-3.5 py-1.5 rounded-lg bg-bg-tertiary border border-border/80 text-text-primary font-medium"
                  >
                    {course}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
