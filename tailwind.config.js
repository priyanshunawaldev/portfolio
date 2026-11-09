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
        "bg-primary": "var(--bg-primary)",
        "bg-secondary": "var(--bg-secondary)",
        "bg-tertiary": "var(--bg-tertiary)",
        "text-primary": "var(--text-primary)",
        "text-secondary": "var(--text-secondary)",
        "accent": "var(--accent)",
        "accent-light": "var(--accent-light)",
        "border": "var(--border)",
      },
      fontFamily: {
        mono: ["JetBrains Mono", "ui-monospace", "Menlo", "monospace"],
        sans: ["Inter", "ui-sans-serif", "system-ui", "sans-serif"],
      },
      fontSize: {
        h1: ["3.5rem", { lineHeight: "1.1", letterSpacing: "-0.02em" }],
        h2: ["2rem", { lineHeight: "1.2", letterSpacing: "-0.01em" }],
        h3: ["1.5rem", { lineHeight: "1.3" }],
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
        "glow": "0 0 30px rgba(45, 212, 191, 0.15)",
        "glow-lg": "0 0 60px rgba(45, 212, 191, 0.2)",
      },
      backdropBlur: {
        xs: "2px",
      },
    },
  },
  plugins: [],
};
