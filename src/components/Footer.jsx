export default function Footer() {
  return (
    <footer className="py-12 border-t border-border bg-bg-secondary/20 backdrop-blur-sm">
      <div className="container-custom">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 text-center md:text-left">
          <div>
            <p className="text-text-secondary text-sm">
              © {new Date().getFullYear()} Priyanshu Nawal
            </p>
          </div>
          <p className="text-text-secondary/60 text-xs mono">
            Built with React + Vite + Tailwind
          </p>
          <a
            href="https://github.com/priyanshunawaldev/portfolio"
            target="_blank"
            rel="noopener noreferrer"
            className="text-accent hover:text-accent-light text-sm font-semibold transition-colors"
          >
            View source →
          </a>
        </div>
      </div>
    </footer>
  );
}
