import { useState, useEffect, useRef, useLayoutEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sun, Moon, Menu, X, ArrowLeft, ArrowUpRight } from "lucide-react";
import { useRouter } from "../lib/router";
import { ALL_PROJECTS } from "../data/projectsData";
import { PERSONAL_INFO } from "../data/portfolioContent";
import { captureDownload } from "../lib/posthog";

const NAV_LINKS = [
  { label: "Home", href: "hero" },
  { label: "About", href: "about" },
  { label: "Experience", href: "experience" },
  { label: "Skills", href: "skills" },
  { label: "Projects", href: "projects" },
  { label: "Education", href: "education" },
  { label: "Contact", href: "contact" },
];

const SECTION_IDS = ["hero", "about", "experience", "skills", "projects", "education", "contact"];

export default function Header({ isDark, onToggleTheme }) {
  const { path, navigate } = useRouter();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("hero");
  const isClickScrollingRef = useRef(false);
  const clickTimeoutRef = useRef(null);

  // Sliding pill refs
  const navRef = useRef(null);
  const linkRefs = useRef({});
  const [pillStyle, setPillStyle] = useState({ width: 0, transform: "translateX(0px)" });

  const normalizedPath = path.replace(/^\//, "").replace(/\/$/, "");
  const candidateSlug = normalizedPath.startsWith("projects/")
    ? normalizedPath.replace("projects/", "")
    : normalizedPath;
  const activeProject = ALL_PROJECTS.find(
    (p) => p.slug === candidateSlug || p.id === candidateSlug
  );
  const isCaseStudy = Boolean(activeProject);

  // Measure active link and position the sliding pill
  const updatePill = () => {
    const activeEl = linkRefs.current[activeSection];
    const navEl = navRef.current;
    if (!activeEl || !navEl || isCaseStudy) return;

    const navRect = navEl.getBoundingClientRect();
    const linkRect = activeEl.getBoundingClientRect();
    const offsetX = linkRect.left - navRect.left;

    setPillStyle({
      width: linkRect.width,
      transform: `translateX(${offsetX}px)`,
    });
  };

  useLayoutEffect(() => {
    updatePill();
  }, [activeSection, isCaseStudy]);

  useEffect(() => {
    window.addEventListener("resize", updatePill);
    if (document.fonts) {
      document.fonts.ready.then(updatePill);
    }
    // Small timeout to guarantee DOM is measured after first paint
    const t = setTimeout(updatePill, 100);
    return () => {
      window.removeEventListener("resize", updatePill);
      clearTimeout(t);
    };
  }, []);

  // Deterministic Scroll-Spy tracking active section on page scroll
  useEffect(() => {
    if (isCaseStudy) return;

    const handleScroll = () => {
      if (isClickScrollingRef.current) return;

      const scrollY = window.scrollY;
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;

      // Top of page
      if (scrollY < 100) {
        setActiveSection("hero");
        return;
      }

      // Bottom of page
      if (windowHeight + scrollY >= documentHeight - 70) {
        setActiveSection("contact");
        return;
      }

      // Check each section bounding rect relative to the header trigger line
      const triggerLine = 160; // 160px from top of viewport
      let currentSection = "hero";

      for (const id of SECTION_IDS) {
        const el = document.getElementById(id);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= triggerLine) {
            currentSection = id;
          }
        }
      }

      setActiveSection(currentSection);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleScroll);

    // Initial run
    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
      if (clickTimeoutRef.current) clearTimeout(clickTimeoutRef.current);
    };
  }, [isCaseStudy]);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) setIsMenuOpen(false);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") setIsMenuOpen(false);
    };
    if (isMenuOpen) window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isMenuOpen]);

  const scrollToSection = (e, sectionId) => {
    e.preventDefault();
    setIsMenuOpen(false);

    if (isCaseStudy) {
      navigate(`/#${sectionId}`);
      return;
    }

    setActiveSection(sectionId);
    isClickScrollingRef.current = true;
    if (clickTimeoutRef.current) clearTimeout(clickTimeoutRef.current);
    clickTimeoutRef.current = setTimeout(() => {
      isClickScrollingRef.current = false;
    }, 850);

    if (sectionId === "hero") {
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }

    const el = document.getElementById(sectionId);
    if (el) {
      const topOffset = el.getBoundingClientRect().top + window.pageYOffset - 90;
      window.scrollTo({ top: topOffset, behavior: "smooth" });
    }
  };

  return (
    <header className="fixed top-3 sm:top-5 left-0 right-0 z-50 flex justify-center px-3 sm:px-4 pointer-events-none transition-all duration-200">
      <div className="flex items-center gap-2 sm:gap-3 pointer-events-auto max-w-full">
        {/* Main Floating Capsule Dock */}
        <div className="flex items-center h-11 sm:h-12 pl-3.5 sm:pl-4 pr-2.5 sm:pr-3.5 rounded-full bg-bg-secondary/90 backdrop-blur-md border border-border/80 shadow-lg shadow-black/5 dark:shadow-black/25">
          {/* Case Study Mode: Back link */}
          {isCaseStudy ? (
            <div className="flex items-center gap-2 px-1">
              <button
                type="button"
                onClick={() => navigate("/#projects")}
                className="inline-flex items-center gap-1.5 min-h-[44px] px-2 text-xs sm:text-sm font-medium text-text-secondary hover:text-accent transition-colors cursor-pointer rounded-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
              >
                <ArrowLeft size={15} />
                <span>All Projects</span>
              </button>
              <span className="text-border" aria-hidden="true">/</span>
              <span className="mono text-xs font-semibold text-text-primary truncate max-w-[140px] sm:max-w-[200px]">
                {activeProject?.name}
              </span>
            </div>
          ) : (
            <>
              {/* Brand Monogram Anchor with Theme-Aware Swapping */}
              <a
                href="#hero"
                onClick={(e) => scrollToSection(e, "hero")}
                className="flex items-center justify-center pr-2 py-1 rounded-full hover:opacity-80 transition-opacity focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent shrink-0"
                aria-label="Priyanshu Nawal — Home"
              >
                <img
                  src="/logo-dark.png"
                  alt="PN"
                  className="h-[26px] w-[26px] hidden dark:block object-contain"
                  width="26"
                  height="26"
                />
                <img
                  src="/logo-light.png"
                  alt="PN"
                  className="h-[26px] w-[26px] block dark:hidden object-contain"
                  width="26"
                  height="26"
                />
              </a>

              {/* Desktop Dock Links with Sliding Pill Indicator */}
              <nav ref={navRef} aria-label="Main Navigation" className="hidden md:flex items-center gap-0.5 relative">
                {/* Sliding pill background */}
                {pillStyle.width > 0 && (
                  <div
                    className="absolute top-1/2 -translate-y-1/2 left-0 h-[30px] rounded-full transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] pointer-events-none"
                    style={{
                      width: pillStyle.width,
                      transform: `translateY(-50%) ${pillStyle.transform}`,
                      background: "color-mix(in srgb, var(--accent) 12%, transparent)",
                      border: "1px solid color-mix(in srgb, var(--accent) 25%, transparent)",
                    }}
                  />
                )}

                {NAV_LINKS.map((link) => {
                  const isActive = activeSection === link.href;
                  return (
                    <a
                      key={link.label}
                      ref={(el) => { linkRefs.current[link.href] = el; }}
                      href={`#${link.href}`}
                      onClick={(e) => scrollToSection(e, link.href)}
                      className={`relative px-3 sm:px-3.5 py-1.5 text-xs sm:text-sm font-medium transition-colors duration-300 rounded-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent z-10 ${
                        isActive
                          ? "text-accent font-semibold"
                          : "text-text-secondary hover:text-text-primary"
                      }`}
                    >
                      <span>{link.label}</span>
                    </a>
                  );
                })}

                {/* Resume download quick link */}
                <a
                  href={PERSONAL_INFO.resumePath || "/Priyanshu_Nawal_Resume.pdf"}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => captureDownload()}
                  className="ml-1 inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs mono font-medium text-text-secondary hover:text-accent transition-colors z-10"
                >
                  <span>Resume</span>
                  <ArrowUpRight size={12} className="text-accent" />
                </a>
              </nav>

              {/* Mobile Dock Content */}
              <div className="flex md:hidden items-center gap-1">
                <a
                  href="#hero"
                  onClick={(e) => scrollToSection(e, "hero")}
                  className="min-h-[44px] inline-flex items-center text-xs font-medium text-text-secondary hover:text-text-primary px-2 py-1 rounded-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
                >
                  Home
                </a>
                <span className="text-border/60 text-xs select-none" aria-hidden="true">|</span>
                <a
                  href="#projects"
                  onClick={(e) => scrollToSection(e, "projects")}
                  className="min-h-[44px] inline-flex items-center text-xs font-medium text-text-secondary hover:text-text-primary px-2 py-1 rounded-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
                >
                  Projects
                </a>
                <a
                  href="#contact"
                  onClick={(e) => scrollToSection(e, "contact")}
                  className="min-h-[44px] inline-flex items-center text-xs font-medium text-text-secondary hover:text-text-primary px-2 py-1 rounded-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
                >
                  Contact
                </a>
                <button
                  type="button"
                  onClick={() => setIsMenuOpen(!isMenuOpen)}
                  aria-label={isMenuOpen ? "Close menu" : "Open menu"}
                  aria-expanded={isMenuOpen}
                  className="w-10 h-10 sm:w-11 sm:h-11 min-w-[40px] min-h-[40px] rounded-full flex items-center justify-center text-text-secondary hover:text-text-primary cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent ml-0.5"
                >
                  {isMenuOpen ? <X size={18} /> : <Menu size={18} />}
                </button>
              </div>
            </>
          )}
        </div>

        {/* Separate Floating Circular Theme Toggle */}
        <button
          type="button"
          onClick={onToggleTheme}
          aria-label={isDark ? "Switch to light theme" : "Switch to dark theme"}
          className="w-11 h-11 sm:w-12 sm:h-12 rounded-full flex items-center justify-center bg-bg-secondary/90 backdrop-blur-md border border-border/80 shadow-lg shadow-black/5 dark:shadow-black/25 text-text-primary hover:text-accent hover:border-accent/50 transition-colors duration-150 active:scale-95 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent shrink-0"
        >
          {isDark ? <Sun size={17} className="text-amber-400" /> : <Moon size={17} className="text-text-secondary" />}
        </button>
      </div>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {isMenuOpen && !isCaseStudy && (
          <div className="fixed inset-0 top-16 z-40 md:hidden pointer-events-auto">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.16 }}
              onClick={() => setIsMenuOpen(false)}
              className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            />

            <motion.nav
              aria-label="Mobile Navigation"
              initial={{ opacity: 0, y: -8, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -8, scale: 0.98 }}
              transition={{ duration: 0.18, ease: [0.23, 1, 0.32, 1] }}
              className="relative mx-4 mt-2 rounded-2xl border border-border/80 bg-bg-secondary/95 backdrop-blur-md p-4 shadow-2xl space-y-1.5"
            >
              {NAV_LINKS.map((link) => {
                const isActive = activeSection === link.href;
                return (
                  <a
                    key={link.label}
                    href={`#${link.href}`}
                    onClick={(e) => scrollToSection(e, link.href)}
                    className={`flex items-center justify-between px-4 min-h-[44px] rounded-xl text-sm font-medium transition-colors ${
                      isActive
                        ? "bg-accent/10 text-accent font-semibold"
                        : "text-text-primary hover:bg-bg-tertiary"
                    }`}
                  >
                    <span>{link.label}</span>
                    {isActive && <span className="w-1.5 h-1.5 rounded-full bg-accent" />}
                  </a>
                );
              })}

              <div className="pt-3 mt-2 border-t border-border/60">
                <a
                  href={PERSONAL_INFO.resumePath || "/Priyanshu_Nawal_Resume.pdf"}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => {
                    captureDownload();
                    setIsMenuOpen(false);
                  }}
                  className="btn-primary w-full justify-center"
                >
                  <span>Download Resume (PDF)</span>
                  <ArrowUpRight size={15} />
                </a>
              </div>
            </motion.nav>
          </div>
        )}
      </AnimatePresence>
    </header>
  );
}
