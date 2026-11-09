export default function Header() {
  const scrollToSection = (e, sectionId) => {
    e.preventDefault();
    const element = document.getElementById(sectionId);
    element?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-40 border-b border-border bg-bg-primary/40 backdrop-blur-md">
      <nav className="container-custom py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <span className="text-accent font-black text-2xl mono">PN</span>
          <span className="text-text-secondary text-xs mono tracking-widest uppercase hidden sm:inline">
            Developer
          </span>
        </div>
        <div className="hidden md:flex items-center gap-8 text-sm font-medium">
          <a
            href="#about"
            onClick={(e) => scrollToSection(e, "about")}
            className="text-text-secondary hover:text-accent transition-colors"
          >
            About
          </a>
          <a
            href="#projects"
            onClick={(e) => scrollToSection(e, "projects")}
            className="text-text-secondary hover:text-accent transition-colors"
          >
            Projects
          </a>
          <a
            href="#contact"
            onClick={(e) => scrollToSection(e, "contact")}
            className="text-text-secondary hover:text-accent transition-colors"
          >
            Contact
          </a>
        </div>
      </nav>
    </header>
  );
}
