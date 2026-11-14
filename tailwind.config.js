/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "class",
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        "bg-primary": "rgb(var(--bg-primary-rgb) / <alpha-value>)",
        "bg-secondary": "rgb(var(--bg-secondary-rgb) / <alpha-value>)",
        "bg-tertiary": "rgb(var(--bg-tertiary-rgb) / <alpha-value>)",
        "text-primary": "rgb(var(--text-primary-rgb) / <alpha-value>)",
        "text-secondary": "rgb(var(--text-secondary-rgb) / <alpha-value>)",
        "accent": "rgb(var(--accent-rgb) / <alpha-value>)",
        "accent-light": "rgb(var(--accent-light-rgb) / <alpha-value>)",
        "border": "rgb(var(--border-rgb) / <alpha-value>)",
      },
      fontFamily: {
        mono: ["JetBrains Mono", "ui-monospace", "Menlo", "monospace"],
        sans: ["Inter", "ui-sans-serif", "system-ui", "sans-serif"],
        serif: ["Source Serif 4", "Georgia", "Cambria", "Times New Roman", "serif"],
      },
      fontSize: {
        h1: ["clamp(2.5rem, 5vw, 3.5rem)", { lineHeight: "1.1", letterSpacing: "-0.02em" }],
        h2: ["clamp(1.75rem, 3.5vw, 2.25rem)", { lineHeight: "1.2", letterSpacing: "-0.01em" }],
        h3: ["clamp(1.25rem, 2.5vw, 1.5rem)", { lineHeight: "1.3" }],
        body: ["1rem", { lineHeight: "1.6" }],
      },
      animation: {
        "fade-up": "fadeInUp 0.6s ease-out forwards",
        "slide-right": "slideInRight 0.6s ease-out forwards",
        "float": "float 6s ease-in-out infinite",
      },
      keyframes: {
        fadeInUp: {
          "0%": { opacity: "0", transform: "translateY(20px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        slideInRight: {
          "0%": { opacity: "0", transform: "translateX(20px)" },
          "100%": { opacity: "1", transform: "translateX(0)" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-10px)" },
        },
      },
      boxShadow: {
        "glow": "0 0 30px rgba(var(--accent-rgb), 0.15)",
        "glow-lg": "0 0 60px rgba(var(--accent-rgb), 0.2)",
      },
      backdropBlur: {
        xs: "2px",
      },
    },
  },
  plugins: [],
};
