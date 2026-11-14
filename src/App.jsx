import { useEffect, useState, lazy, Suspense } from "react";
import { MotionConfig } from "framer-motion";
import { RouterProvider, useRouter } from "./lib/router";
import Header from "./components/Header";
import Hero from "./components/Hero";
import About from "./components/About";
import Experience from "./components/Experience";
import Education from "./components/Education";
import Certifications from "./components/Certifications";
import Skills from "./components/Skills";
import Projects from "./components/Projects";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import { ALL_PROJECTS } from "./data/projectsData";

const ProjectDetail = lazy(() => import("./components/ProjectDetail"));

function MainContent({ isDark, onToggleTheme }) {
  const { path } = useRouter();

  // Handle direct hash navigation when navigating back to /#projects, etc.
  useEffect(() => {
    if (window.location.hash) {
      const hashId = window.location.hash.substring(1);
      // Validate hash identifier to allow only alphanumeric, hyphen, and underscore
      if (/^[a-zA-Z0-9_-]+$/.test(hashId)) {
        setTimeout(() => {
          const el = document.getElementById(hashId);
          if (el) {
            const topOffset = el.getBoundingClientRect().top + window.pageYOffset - 76;
            window.scrollTo({ top: topOffset, behavior: "smooth" });
          }
        }, 100);
      }
    }
  }, [path]);

  // Determine if viewing a case study page (matches both /:slug and /projects/:slug)
  const normalizedPath = path.replace(/^\//, "").replace(/\/$/, "");
  const candidateSlug = normalizedPath.startsWith("projects/")
    ? normalizedPath.replace("projects/", "")
    : normalizedPath;

  const matchedProject = ALL_PROJECTS.find(
    (p) => p.slug === candidateSlug || p.id === candidateSlug
  );
  const isCaseStudy = Boolean(matchedProject);
  const caseStudySlug = matchedProject ? matchedProject.slug : null;

  return (
    <div className="min-h-screen flex flex-col bg-bg-primary text-text-primary transition-colors duration-200 relative">
      {/* Skip to content link for keyboard accessibility */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-[60] focus:px-4 focus:py-2 focus:rounded-lg focus:bg-accent focus:text-bg-primary focus:font-semibold focus:text-sm"
      >
        Skip to main content
      </a>

      <Header isDark={isDark} onToggleTheme={onToggleTheme} />

      <main id="main-content" className="flex-grow">
        {isCaseStudy ? (
          <Suspense
            fallback={
              <div className="min-h-[70vh] flex items-center justify-center">
                <div className="w-6 h-6 border-2 border-accent border-t-transparent rounded-full animate-spin" />
              </div>
            }
          >
            <ProjectDetail slug={caseStudySlug} />
          </Suspense>
        ) : (
          <>
            <Hero />
            <About />
            <Experience />
            <Skills />
            <Projects />
            <Education />
            <Contact />
          </>
        )}
      </main>

      <Footer />
    </div>
  );
}

export default function App() {
  const [isDark, setIsDark] = useState(() => {
    if (typeof window !== "undefined") {
      const savedTheme = localStorage.getItem("theme");
      if (savedTheme) {
        return savedTheme === "dark";
      }
    }
    return false;
  });

  useEffect(() => {
    const root = document.documentElement;
    if (isDark) {
      root.classList.add("dark");
      root.classList.remove("light");
      localStorage.setItem("theme", "dark");
    } else {
      root.classList.remove("dark");
      root.classList.add("light");
      localStorage.setItem("theme", "light");
    }
  }, [isDark]);

  const toggleTheme = () => {
    setIsDark((prev) => !prev);
  };

  return (
    <MotionConfig reducedMotion="user">
      <RouterProvider>
        <MainContent isDark={isDark} onToggleTheme={toggleTheme} />
      </RouterProvider>
    </MotionConfig>
  );
}
