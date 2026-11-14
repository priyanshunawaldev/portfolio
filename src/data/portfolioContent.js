/**
 * =============================================================================
 * PORTFOLIO CONTENT & CENTRAL DATA DIRECTORY
 * =============================================================================
 * 
 * Edit this single file to update any text, links, bio, skills, resume, photo,
 * and project cards across the entire portfolio website without touching code!
 * 
 * 📌 HOW TO CHANGE YOUR EMAIL:
 *    - Update `email: "you@yourdomain.com"` in PERSONAL_INFO below.
 *    - Automatically updates mailto links, copy buttons, and contact displays!
 * 
 * 📌 HOW TO UPDATE YOUR RESUME (Local PDF or External URL):
 *    - If local file: Put your PDF into `/public` (e.g. `public/My_Resume.pdf`)
 *      and set `resumePath: "/My_Resume.pdf"`.
 *    - If external URL (e.g. Cloudflare Pages, GitHub, Google Drive):
 *      set `resumePath: "https://yourdomain.com/resume.pdf"`.
 *    - Automatically updates all buttons across Header, Hero, and Mobile Drawer!
 * 
 * 📌 HOW TO CHANGE YOUR HERO PHOTO:
 *    - Put your new image in `/public` (e.g. `public/hero-image.webp`).
 *    - Update `heroImage: "/hero-image.webp"` in PERSONAL_INFO below.
 * 
 * 📌 HOW TO MAKE A PROJECT "FEATURED":
 *    - In PROJECTS_CONTENT.projects, set `featured: true` on any project.
 *    - Whichever project has `featured: true` will AUTOMATICALLY appear at the
 *      very top of the website with the wide "Featured" spotlight banner!
 *    - You can swap the featured project anytime just by changing which project
 *      has `featured: true`.
 * 
 * 📌 HOW TO ADD / REMOVE A PROJECT:
 *    - Add or remove an object in PROJECTS_CONTENT.projects.
 *    - (Optional) Add extended case study details in `src/data/projectsData.js`
 *      if you want a deep-dive modal panel. If not added there, the modal will
 *      still display all summary info cleanly without crashing!
 * =============================================================================
 */

export const PERSONAL_INFO = {
  name: "Priyanshu Nawal",
  role: "Software Developer · Python Full-Stack",
  shortBio: "Software Developer building scalable full-stack web apps, high-throughput Python APIs, and automated developer tools.",
  email: "priyanshu.nawal.dev@gmail.com",
  githubUrl: "https://github.com/priyanshunawaldev",
  linkedinUrl: "https://linkedin.com/in/priyanshunawal",
  resumePath: "/Priyanshu_Nawal_Resume.pdf",
  heroImage: "/hero-image.webp",
  location: "India · Open to Hybrid & Relocation",
  availability: "Available immediately for Software Developer & Python Full-Stack roles",
  keyStack: "Python · FastAPI · React · PostgreSQL · REST APIs",
  heroHook: "Building clean, dependable software end-to-end — from robust Python services to responsive web applications.",
};

export const HERO_CONTENT = {
  role: "Software Developer · Python Full-Stack",
  headline: "Priyanshu Nawal",
  valueProposition: "Computer Science graduate building full-stack web applications, clean Python APIs, and practical developer tools.",
  hook: "Building clean, dependable software end-to-end — from robust Python services to responsive web applications.",
  credibilityStrip: {
    location: "India · Open to Hybrid & Relocation",
    availability: "Available immediately for Software Developer & Python Full-Stack roles",
    keyStack: "Python · FastAPI · React · PostgreSQL · REST APIs",
    stackList: ["Python", "FastAPI", "React", "PostgreSQL", "Full-Stack"],
  },
};

export const ABOUT_CONTENT = {
  sectionTitle: "About Me",
  quote:
    "I care most about the unglamorous parts of software: clean API contracts, database constraints that protect data integrity, and services that don't panic under concurrent traffic.",
  paragraphs: [
    "I'm a software developer with a graduate background in Computer Science (Integrated M.Sc., Central University of Rajasthan, 2024). I genuinely enjoy the process of turning complex backend requirements into clean, dependable systems that people can rely on.",
    "Most of my day-to-day engineering centers on Python and full-stack web development — designing structured REST APIs with FastAPI, modeling clean relational schemas in PostgreSQL and SQLite, and pairing them with fast, responsive React interfaces. I place high value on automated testing with pytest, safe concurrency, and writing code that is straightforward for other engineers to read and maintain.",
    "Beyond web services, I like tinkering with developer tooling — from terminal CLIs that make shell workflows faster to real-time WebSockets audio streams and computer vision pipelines.",
  ],
  focusAreas: [
    {
      title: "Full-Stack Web Development",
      detail: "Interactive React & Next.js applications backed by clean REST APIs and real-time WebSockets.",
    },
    {
      title: "Python Backend & APIs",
      detail: "FastAPI services, PostgreSQL schemas, Celery workers, and structured automated testing.",
    },
    {
      title: "Developer Tools & Practical AI",
      detail: "Offline-first CLIs with SQLite, local automation scripts, and practical voice AI pipelines.",
    },
  ],
};

export const SKILLS_CONTENT = {
  sectionTitle: "Skills",
  categories: [
    {
      category: "Core Backend & Systems (Primary)",
      depth: "primary",
      skills: [
        { name: "Python", icon: "python" },
        { name: "FastAPI", icon: "fastapi" },
        { name: "REST APIs", icon: "api" },
        { name: "WebSockets", icon: "websocket" },
        { name: "Celery", icon: "server" },
        { name: "pytest", icon: "pytest" },
      ],
    },
    {
      category: "Databases & Infrastructure",
      depth: "secondary",
      skills: [
        { name: "PostgreSQL", icon: "postgres" },
        { name: "Redis", icon: "redis" },
        { name: "SQLite", icon: "sqlite" },
        { name: "SQLAlchemy", icon: "database" },
        { name: "Docker", icon: "docker" },
        { name: "Linux", icon: "terminal" },
      ],
    },
    {
      category: "Frontend & Supporting",
      depth: "supporting",
      skills: [
        { name: "React", icon: "react" },
        { name: "TypeScript", icon: "typescript" },
        { name: "Next.js", icon: "nextjs" },
        { name: "Tailwind CSS", icon: "tailwind" },
        { name: "Git", icon: "git" },
        { name: "CI / CD", icon: "git" },
      ],
    },
  ],
};

export const EXPERIENCE_CONTENT = {
  sectionTitle: "Experience",
  experiences: [
    {
      id: "open-source-backend",
      role: "Open-Source Backend Engineering",
      title: "Open-Source Backend Engineering",
      organization: "Independent / Open Source",
      period: "2024 — Present",
      location: "Remote",
      type: "Backend Engineering",
      description:
        "Architecting and shipping production-grade distributed backend systems, financial transaction engines, and developer CLIs in Python.",
      bullets: [
        "Engineered PulseEngine, a distributed double-entry ledger handling concurrent transfers with zero-deadlock guarantees and sub-millisecond Redis idempotency verification.",
        "Authored Reflex CLI, an offline-first terminal OS managing developer logs and local SQLite persistence with sub-25ms cold startup.",
        "Built Prepwise, a sub-second voice AI interview pipeline leveraging WebSockets and asynchronous LLM streaming.",
      ],
      highlights: [
        "Engineered PulseEngine, a distributed double-entry ledger handling concurrent transfers with zero-deadlock guarantees and sub-millisecond Redis idempotency verification.",
        "Authored Reflex CLI, an offline-first terminal OS managing developer logs and local SQLite persistence with sub-25ms cold startup.",
        "Built Prepwise, a sub-second voice AI interview pipeline leveraging WebSockets and asynchronous LLM streaming.",
      ],
      skills: ["Python", "FastAPI", "PostgreSQL", "Redis", "Distributed Systems", "SQLAlchemy", "Docker"],
    },
    {
      id: "cs-mentor",
      role: "Technical CS Educator & Consultant",
      title: "Technical CS Educator & Consultant",
      organization: "Chegg / Technical Mentorship",
      period: "2023 — 2024",
      location: "Remote",
      type: "Consulting & Education",
      description:
        "Guided university students and developers through complex computer science concepts, distributed systems, algorithms, and database design.",
      bullets: [
        "Resolved 500+ complex technical problems across Data Structures, Algorithms, OS concurrency, and Relational Database internals.",
        "Conducted code reviews and architectural walkthroughs emphasizing ACID guarantees, thread safety, and time/space complexity optimization.",
        "Authored in-depth technical explanations and reference implementations in Python and C++.",
      ],
      highlights: [
        "Resolved 500+ complex technical problems across Data Structures, Algorithms, OS concurrency, and Relational Database internals.",
        "Conducted code reviews and architectural walkthroughs emphasizing ACID guarantees, thread safety, and time/space complexity optimization.",
        "Authored in-depth technical explanations and reference implementations in Python and C++.",
      ],
      skills: ["Algorithms", "Data Structures", "DBMS Internals", "Operating Systems", "Python", "Code Review"],
    },
  ],
  roles: [
    {
      id: "open-source-backend",
      role: "Open-Source Backend Engineering",
      title: "Open-Source Backend Engineering",
      organization: "Independent / Open Source",
      period: "2024 — Present",
      location: "Remote",
      type: "Backend Engineering",
      description:
        "Architecting and shipping production-grade distributed backend systems, financial transaction engines, and developer CLIs in Python.",
      bullets: [
        "Engineered PulseEngine, a distributed double-entry ledger handling concurrent transfers with zero-deadlock guarantees and sub-millisecond Redis idempotency verification.",
        "Authored Reflex CLI, an offline-first terminal OS managing developer logs and local SQLite persistence with sub-25ms cold startup.",
        "Built Prepwise, a sub-second voice AI interview pipeline leveraging WebSockets and asynchronous LLM streaming.",
      ],
      highlights: [
        "Engineered PulseEngine, a distributed double-entry ledger handling concurrent transfers with zero-deadlock guarantees and sub-millisecond Redis idempotency verification.",
        "Authored Reflex CLI, an offline-first terminal OS managing developer logs and local SQLite persistence with sub-25ms cold startup.",
        "Built Prepwise, a sub-second voice AI interview pipeline leveraging WebSockets and asynchronous LLM streaming.",
      ],
      skills: ["Python", "FastAPI", "PostgreSQL", "Redis", "Distributed Systems", "SQLAlchemy", "Docker"],
    },
    {
      id: "cs-mentor",
      role: "Technical CS Educator & Consultant",
      title: "Technical CS Educator & Consultant",
      organization: "Chegg / Technical Mentorship",
      period: "2023 — 2024",
      location: "Remote",
      type: "Consulting & Education",
      description:
        "Guided university students and developers through complex computer science concepts, distributed systems, algorithms, and database design.",
      bullets: [
        "Resolved 500+ complex technical problems across Data Structures, Algorithms, OS concurrency, and Relational Database internals.",
        "Conducted code reviews and architectural walkthroughs emphasizing ACID guarantees, thread safety, and time/space complexity optimization.",
        "Authored in-depth technical explanations and reference implementations in Python and C++.",
      ],
      highlights: [
        "Resolved 500+ complex technical problems across Data Structures, Algorithms, OS concurrency, and Relational Database internals.",
        "Conducted code reviews and architectural walkthroughs emphasizing ACID guarantees, thread safety, and time/space complexity optimization.",
        "Authored in-depth technical explanations and reference implementations in Python and C++.",
      ],
      skills: ["Algorithms", "Data Structures", "DBMS Internals", "Operating Systems", "Python", "Code Review"],
    },
  ],
};

export const PROJECTS_CONTENT = {
  sectionTitle: "Projects",
  // 💡 Whichever project has `featured: true` will automatically appear at the top
  // with the wide Featured spotlight card. Set only one as true (or more if desired).
  projects: [
    {
      id: "pulse-engine",
      title: "PulseEngine",
      featured: true,
      type: "Financial Backend",
      summary: "A concurrent double-entry accounting engine built in Python & FastAPI. Enforces zero-sum balance math across money transfers, verifies Redis SHA-256 idempotency keys in <1ms to prevent duplicate payments, and uses ordered row locks in PostgreSQL so simultaneous transfers never deadlock.",
      benchmark: "PostgreSQL 16 · Locust 1,000 req/sec · Zero balance violations · 8-core Linux",
      skills: ["Python", "FastAPI", "PostgreSQL", "Redis"],
      link: "https://github.com/priyanshunawaldev/pulse-engine",
      githubUrl: "https://github.com/priyanshunawaldev/pulse-engine",
      demoUrl: null,
    },
    {
      id: "reflex",
      title: "Reflex CLI",
      featured: false,
      type: "Developer Tool",
      summary: "A lightweight, offline-first terminal assistant I built to log daily dev notes, active tasks, and Git commits directly from the shell into local SQLite — zero telemetry, zero cloud dependencies, and instant <25ms startup.",
      benchmark: "Sub-25ms cold startup · 0 KB network egress · Local SQLite",
      skills: ["Python", "SQLite", "Typer", "Rich"],
      link: "https://github.com/priyanshunawaldev/reflex-cli",
      githubUrl: "https://github.com/priyanshunawaldev/reflex-cli",
      demoUrl: null,
    },
    {
      id: "prepwise",
      title: "Prepwise",
      featured: false,
      type: "Voice AI System",
      summary: "A full-stack voice interview platform that simulates realistic technical screenings. It streams spoken candidate audio over bidirectional WebSockets to FastAPI and Gemini AI, delivering natural conversational follow-ups with sub-second turnaround.",
      benchmark: "Sub-second bidirectional audio streaming over WebSockets",
      skills: ["Next.js", "WebSockets", "FastAPI", "Gemini AI"],
      link: "https://github.com/priyanshunawaldev/interview-prep",
      githubUrl: "https://github.com/priyanshunawaldev/interview-prep",
      demoUrl: null,
    },
    {
      id: "autonomous-vehicle-cv",
      title: "YOLOv8 Real-Time Detection",
      featured: false,
      type: "Applied Research / Vision",
      summary: "My Master's dissertation research: a real-time road perception pipeline trained on multi-weather driving datasets with YOLOv8 and OpenCV, achieving sustained <45ms frame inference latency on RTX 3060 edge hardware.",
      benchmark: "<45ms latency on RTX 3060 · 1,000+ annotated multi-weather test frames",
      skills: ["Python", "YOLOv8", "OpenCV", "NumPy"],
      link: null,
      githubUrl: null,
      demoUrl: null,
    },
  ],
};

export const EDUCATION_CONTENT = {
  sectionTitle: "Education",
  degree: "Integrated M.Sc. in Computer Science (5-Year Dual Degree)",
  institution: "Central University of Rajasthan",
  duration: "2019 — 2024",
  dissertation: {
    title: "Real-Time Object Detection using YOLOv8",
    bullets: [
      "Trained and evaluated YOLOv8 object detection models optimized for edge devices",
      "Achieved sub-45ms real-time video inference (<45ms latency on RTX 3060) without requiring high-end GPU clusters",
      "Streamlined multi-threaded frame buffer pipelines to eliminate video lag and frame drops",
    ],
  },
  coursework: [
    "Distributed Systems",
    "Database Internals",
    "Concurrency & Multithreading",
    "Computer Vision",
    "Data Structures & Algorithms",
    "Operating Systems",
  ],
};

export const CONTACT_CONTENT = {
  sectionTitle: "Get in Touch",
  directEmail: "priyanshu.nawal.dev@gmail.com",
  subtext: "Have an open software engineering role, a project in mind, or want to discuss full-stack development? Reach out directly.",
  responseTime: "I respond within 24 hours",
  location: "India · Open to Hybrid & Relocation",
  availability: "Available immediately for Software Developer & Python Full-Stack roles",
};
