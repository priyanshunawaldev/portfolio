import { motion } from "framer-motion";
import { ABOUT_CONTENT } from "../data/portfolioContent";

const fadeUp = {
  hidden: { opacity: 0, y: 16 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.45, ease: [0.22, 1, 0.36, 1], delay: i * 0.08 },
  }),
};

export default function About() {
  return (
    <section id="about" className="py-16 sm:py-24 relative scroll-mt-28 sm:scroll-mt-32">
      <div className="container-custom space-y-8 sm:space-y-10">
        {/* Centered Heading */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px 0px" }}
          variants={fadeUp}
          className="text-center"
        >
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-text-primary tracking-tight">
            {ABOUT_CONTENT?.sectionTitle || "About Me"}
          </h2>
        </motion.div>

        {/* Centered Editorial Container */}
        <motion.div
          custom={1}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px 0px" }}
          variants={fadeUp}
          className="max-w-3xl mx-auto space-y-6 text-left"
        >
          {/* Personal Hook Quote with accent left border */}
          <blockquote className="border-l-[3px] border-accent pl-5 py-1">
            <p className="text-lg sm:text-xl font-medium text-text-primary leading-relaxed text-left">
              Full-stack software developer with an Integrated M.Sc. in Computer Science, building production-ready Python backends, clean REST APIs, and responsive React web applications.
            </p>
          </blockquote>

          {/* Authentic, human-written narrative without repetitive "I" */}
          <div className="space-y-4 text-base sm:text-lg text-text-secondary leading-relaxed font-normal text-left">
            <p>
              Core engineering work centers on end-to-end web systems — crafting structured REST APIs with FastAPI, designing relational schemas in PostgreSQL and SQLite, and pairing them with clean, accessible React interfaces. Every project emphasizes thoughtful fundamentals: clean code, thorough automated testing with pytest, and reliable error handling.
            </p>
            <p>
              Beyond web applications, hands-on development spans building offline-first developer CLIs in Python, mentoring junior engineers on data structures and database internals, and shipping practical tools built for real-world reliability.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
