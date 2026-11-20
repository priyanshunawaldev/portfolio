import { motion } from "framer-motion";
import {
  PythonIcon,
  FastApiIcon,
  PostgresIcon,
  RedisIcon,
  DockerIcon,
  ReactIcon,
  NextJsIcon,
  TypeScriptIcon,
  TailwindIcon,
  GitIcon,
  PytestIcon,
  WebSocketIcon,
  DatabaseIconCustom,
} from "./TechIcons";
import { SKILLS_CONTENT } from "../data/portfolioContent";
import { Terminal, ShieldCheck } from "lucide-react";

const ICON_MAP = {
  python: PythonIcon,
  fastapi: FastApiIcon,
  postgres: PostgresIcon,
  redis: RedisIcon,
  sqlite: DatabaseIconCustom,
  database: DatabaseIconCustom,
  react: ReactIcon,
  typescript: TypeScriptIcon,
  nextjs: NextJsIcon,
  tailwind: TailwindIcon,
  docker: DockerIcon,
  git: GitIcon,
  pytest: PytestIcon,
  terminal: Terminal,
  api: WebSocketIcon,
  websocket: WebSocketIcon,
  server: DatabaseIconCustom,
};

const fadeUp = {
  hidden: { opacity: 0, y: 16 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.45, ease: [0.22, 1, 0.36, 1], delay: i * 0.08 },
  }),
};

export default function Skills() {
  return (
    <section
      id="skills"
      className="py-16 sm:py-24 relative scroll-mt-28 sm:scroll-mt-32"
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
            {SKILLS_CONTENT.sectionTitle}
          </h2>
        </motion.div>

        {/* Structured Grid with Clear Depth Signals */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 w-full mx-auto">
          {SKILLS_CONTENT.categories.map((cat, catIdx) => {
            const isPrimary = cat.depth === "primary" || (cat.category && cat.category.includes("Primary"));

            return (
              <motion.div
                key={cat.category}
                custom={catIdx}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-40px 0px" }}
                variants={fadeUp}
                className={`p-6 sm:p-7 rounded-2xl bg-bg-secondary shadow-sm space-y-5 transition-all duration-300 ${
                  isPrimary
                    ? "md:col-span-2 border-2 border-accent/40 hover:border-accent shadow-md"
                    : "border border-border hover:border-accent/40"
                }`}
              >
                {/* Category Header with Depth Badge */}
                <div className="flex flex-wrap items-center justify-between gap-2 pb-3 border-b border-border/70">
                  <div className="flex items-center gap-2.5">
                    <h3 className="text-base sm:text-lg font-mono font-bold text-text-primary tracking-tight">
                      {cat.category}
                    </h3>
                  </div>

                  {isPrimary ? (
                    <span className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full text-xs font-mono font-semibold bg-accent/15 text-accent border border-accent/30">
                      <ShieldCheck size={13} />
                      Primary Engineering Focus
                    </span>
                  ) : (
                    <span className="text-xs font-mono text-text-secondary">
                      {cat.depth === "secondary" ? "Storage & Ops" : "Supporting"}
                    </span>
                  )}
                </div>

                {/* Skill Pills: No truncate, comfortable padding & 13-14px font */}
                <div className="flex flex-wrap gap-2.5 sm:gap-3">
                  {cat.skills.map((skill) => {
                    const Icon = ICON_MAP[skill.icon] || DatabaseIconCustom;
                    return (
                      <span
                        key={skill.name}
                        className={`inline-flex items-center gap-2.5 px-3.5 py-2 rounded-xl text-xs sm:text-sm font-medium transition-all ${
                          isPrimary
                            ? "bg-bg-tertiary border border-border/90 text-text-primary hover:border-accent hover:text-accent shadow-sm"
                            : "bg-bg-tertiary/70 border border-border/70 text-text-primary hover:border-accent/40 hover:text-accent"
                        }`}
                      >
                        <Icon size={18} className="shrink-0 text-accent" />
                        <span className="whitespace-nowrap">{skill.name}</span>
                      </span>
                    );
                  })}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
