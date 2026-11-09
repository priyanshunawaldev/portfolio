import { useEffect, useRef } from "react";
import { capturePageView } from "../lib/posthog.js";

export default function Hero() {
  const heroRef = useRef(null);

  useEffect(() => {
    capturePageView();
  }, []);

  return (
    <section className="relative min-h-screen flex items-center pt-20 pb-0">
      <div className="absolute inset-0 z-0">
        {/* Animated background gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-accent/10 via-transparent to-transparent opacity-40" />
      </div>

      <div className="container-custom relative z-10 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left side: headline + CTA */}
          <div className="fade-in-up">
            <span className="inline-block text-accent text-sm font-bold mono tracking-widest mb-6 opacity-80">
              software developer
            </span>
            <h1 className="text-h1 text-text-primary font-black mb-6">
              Priyanshu Nawal
            </h1>
            <p className="text-2xl text-text-secondary leading-relaxed mb-8 max-w-lg font-light">
              Python engineer building distributed backend systems and AI tools.
            </p>
            <p className="text-lg text-text-secondary/70 mb-10 max-w-md leading-relaxed">
              Real systems, real problems. PulseEngine. Prepwise. Reflex.
            </p>
            <div className="flex flex-wrap gap-4">
              <a href="#projects" className="btn-primary">
                View Projects
              </a>
              <a href="/Priyanshu_Nawal_Resume.pdf" className="btn-secondary">
                Download Resume
              </a>
            </div>
          </div>

          {/* Right side: Photo with animation */}
          <div className="flex justify-center items-center slide-in-right">
            <div className="relative group">
              {/* Animated background circle */}
              <div className="absolute inset-0 bg-gradient-to-br from-accent via-accent-light to-accent rounded-full blur-2xl opacity-30 group-hover:opacity-50 transition-opacity duration-500 animate-float" />

              {/* Photo container */}
              <div className="relative z-10 w-80 h-80 lg:w-96 lg:h-96 rounded-3xl overflow-hidden border-2 border-accent/30 shadow-glow-lg group-hover:border-accent transition-all duration-500">
                <img
                  ref={heroRef}
                  src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=500&h=500&fit=crop"
                  alt="Priyanshu Nawal"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                {/* Overlay gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-bg-primary/40 via-transparent to-transparent" />
              </div>

              {/* Decorative elements */}
              <div className="absolute -top-4 -right-4 w-32 h-32 bg-accent/10 rounded-full blur-3xl" />
              <div className="absolute -bottom-4 -left-4 w-40 h-40 bg-accent/5 rounded-full blur-3xl" />
            </div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 z-20 animate-bounce">
        <svg
          className="w-6 h-6 text-accent"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 14l-7 7m0 0l-7-7m7 7V3"
          />
        </svg>
      </div>
    </section>
  );
}
