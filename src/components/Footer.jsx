import { ArrowUp } from "lucide-react";
import { GithubIcon, LinkedinIcon } from "./icons";
import { PERSONAL_INFO } from "../data/portfolioContent";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="py-8 border-t border-border bg-bg-secondary/60 transition-colors">
      <div className="container-custom">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
          <div className="flex items-center gap-3">
            <a
              href="#hero"
              onClick={(e) => {
                e.preventDefault();
                scrollToTop();
              }}
              className="min-h-[44px] min-w-[36px] flex items-center justify-center p-1 rounded-lg hover:opacity-80 transition-opacity cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent shrink-0"
              aria-label="Priyanshu Nawal — Back to Top"
              title="Back to Top"
            >
              <img
                src="/logo-dark.png"
                alt="PN"
                className="h-6 w-6 hidden dark:block object-contain opacity-90 shrink-0"
                width="24"
                height="24"
              />
              <img
                src="/logo-light.png"
                alt="PN"
                className="h-6 w-6 block dark:hidden object-contain opacity-90 shrink-0"
                width="24"
                height="24"
              />
            </a>
            <span className="text-text-secondary text-xs sm:text-sm font-sans font-medium">
              © {currentYear} {PERSONAL_INFO.name}
            </span>
          </div>

          <div className="flex items-center gap-4 text-xs sm:text-sm text-text-secondary">
            <a
              href="https://github.com/priyanshunawaldev/portfolio"
              target="_blank"
              rel="noopener noreferrer"
              className="min-h-[44px] inline-flex items-center px-1.5 hover:text-accent transition-colors rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
            >
              Source ↗
            </a>
            <a
              href={PERSONAL_INFO.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="min-h-[44px] inline-flex items-center gap-1.5 px-1.5 hover:text-accent transition-colors rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
            >
              <GithubIcon size={15} />
              <span>GitHub</span>
            </a>
            <a
              href={PERSONAL_INFO.linkedinUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="min-h-[44px] inline-flex items-center gap-1.5 px-1.5 hover:text-accent transition-colors rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
            >
              <LinkedinIcon size={15} />
              <span>LinkedIn</span>
            </a>
            <button
              type="button"
              onClick={scrollToTop}
              className="w-11 h-11 rounded-xl border border-border hover:border-accent hover:bg-bg-tertiary text-text-secondary hover:text-accent flex items-center justify-center transition-colors active:scale-[0.97] cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
              aria-label="Back to top of page"
            >
              <ArrowUp size={16} />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
