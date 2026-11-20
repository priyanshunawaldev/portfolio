import { motion } from "framer-motion";
import { GraduationCap, Calendar, BookOpen, Layers } from "lucide-react";
import { EDUCATION_CONTENT } from "../data/portfolioContent";
import { fadeUp } from "../lib/animations";

export default function Education() {
  return (
    <section
      id="education"
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
            {EDUCATION_CONTENT.sectionTitle}
          </h2>
        </motion.div>

        {/* Editorial Timeline Track matching Experience.jsx */}
        <div className="w-full relative pl-6 sm:pl-8 border-l-2 border-border/70 space-y-10 ml-2 sm:ml-4">
          <motion.div
            custom={0}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-40px 0px" }}
            variants={fadeUp}
            className="relative space-y-4"
          >
            {/* Timeline Node on Left Border */}
            <div className="absolute -left-[31px] sm:-left-[39px] top-1.5 w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-bg-primary border-2 border-accent flex items-center justify-center text-accent">
              <GraduationCap size={15} aria-hidden="true" />
            </div>

            {/* Header Information */}
            <div className="space-y-1">
              <div className="flex flex-wrap items-baseline justify-between gap-2">
                <h3 className="text-lg sm:text-xl font-bold text-text-primary text-left">
                  Integrated M.Sc. in <span className="whitespace-nowrap">Computer Science</span>
                </h3>
                <div className="flex items-center gap-2">
                  <span className="inline-flex items-center gap-1.5 text-xs font-mono font-medium text-text-secondary px-2.5 py-0.5 rounded-full bg-bg-secondary border border-border/60">
                    <Calendar size={12} className="text-accent" />
                    {EDUCATION_CONTENT.duration}
                  </span>
                  <span className="inline-flex items-center text-xs font-mono text-text-secondary px-2.5 py-0.5 rounded-full bg-bg-secondary border border-border/60">
                    5-Year Dual Degree
                  </span>
                </div>
              </div>
              <p className="text-sm font-mono text-accent font-medium">
                {EDUCATION_CONTENT.institution}
              </p>
            </div>

            {/* Master's Dissertation with 3 Core Bullet Points */}
            <div className="space-y-2.5 pt-1 text-left">
              <div className="flex items-center gap-2 text-sm sm:text-base font-semibold text-text-primary">
                <BookOpen size={16} className="text-accent shrink-0" aria-hidden="true" />
                <span>Master&apos;s Dissertation: {EDUCATION_CONTENT.dissertation.title}</span>
              </div>

              <ul className="space-y-2 text-sm sm:text-base text-text-secondary pl-5">
                {EDUCATION_CONTENT.dissertation.bullets.map((bullet, idx) => (
                  <li key={idx} className="flex items-start gap-2.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-accent shrink-0 mt-2" />
                    <span className="leading-relaxed text-left">{bullet}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Core Graduate Coursework */}
            <div className="pt-2 space-y-2 text-left">
              <div className="flex items-center gap-1.5 text-xs font-mono text-text-secondary font-medium">
                <Layers size={13} className="text-accent" />
                <span>Core Graduate Coursework:</span>
              </div>
              <div className="flex flex-wrap gap-2 pt-1">
                {EDUCATION_CONTENT.coursework.map((course) => (
                  <span
                    key={course}
                    className="text-xs sm:text-[13px] px-3 py-1 rounded-lg bg-bg-secondary border border-border/70 text-text-secondary hover:border-accent hover:text-accent font-medium font-mono transition-colors cursor-default select-none shadow-2xs"
                  >
                    {course}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
