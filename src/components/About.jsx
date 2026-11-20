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
  const quote = ABOUT_CONTENT?.quote;
  const paragraphs = ABOUT_CONTENT?.paragraphs || [];

  return (
    <section id="about" className="py-16 sm:py-24 relative scroll-mt-28 sm:scroll-mt-32">
      <div className="container max-w-4xl mx-auto px-4 sm:px-6 space-y-8 sm:space-y-10">
        {/* Centered Heading */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px 0px" }}
          variants={fadeUp}
          className="text-center w-full"
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-text-primary tracking-tight text-center mx-auto">
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
          {quote && (
            <blockquote className="border-l-[3px] border-accent pl-5 py-1">
              <p className="text-lg sm:text-xl font-medium text-text-primary leading-relaxed text-left">
                {quote}
              </p>
            </blockquote>
          )}

          {/* Authentic, human-written narrative */}
          <div className="space-y-4 text-base sm:text-lg text-text-secondary leading-relaxed font-normal text-left">
            {paragraphs.map((p, idx) => (
              <p key={idx}>{p}</p>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
