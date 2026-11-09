import { useEffect, useState } from "react";

export default function App() {
  const [isDark, setIsDark] = useState(true);

  useEffect(() => {
    const root = document.documentElement;
    if (isDark) {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }
  }, [isDark]);

  return (
    <div className={isDark ? "dark" : ""}>
      <button
        onClick={() => setIsDark(!isDark)}
        className="fixed top-6 right-6 z-50 px-4 py-2 rounded-full bg-accent text-bg-primary font-medium text-sm transition-all hover:scale-105"
      >
        {isDark ? "☀️ Light" : "🌙 Dark"}
      </button>

      <Header />
      <Hero />
      <About />
      <Skills />
      <Projects />
      <Contact />
      <Footer />
    </div>
  );
}

import Header from "./components/Header";
import Hero from "./components/Hero";
import About from "./components/About";
import Skills from "./components/Skills";
import Projects from "./components/Projects";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
