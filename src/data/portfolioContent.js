/**
 * PORTFOLIO CONTENT & COPY
 * 
 * Edit this single file to update any text, links, years, bio, skills,
 * projects, and education across the entire portfolio website.
 */

export const PERSONAL_INFO = {
  name: "Priyanshu Nawal",
  role: "Software Developer · Python Full-Stack",
  shortBio: "Building full-stack web applications, dependable Python APIs, and practical developer tools.",
  email: "priyanshu.nawal.dev@gmail.com",
  githubUrl: "https://github.com/priyanshunawaldev",
  linkedinUrl: "https://linkedin.com/in/priyanshunawal",
  resumePath: "/Priyanshu_Nawal_Resume.pdf",
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
  paragraph:
    "Software engineering is most rewarding when complex problems turn into clean, reliable tools that people actually enjoy using. With a graduate foundation from an Integrated M.Sc. in Computer Science, engineering work centers on Python full-stack systems — creating structured REST APIs with FastAPI, modeling relational schemas in PostgreSQL and SQLite, and pairing them with responsive React user interfaces. Clean code, automated test suites, and practical usability always come first.",
  paragraphs: [
    "Software engineering is most rewarding when complex problems turn into clean, reliable tools that people actually enjoy using. With a graduate foundation from an Integrated M.Sc. in Computer Science, engineering work centers on Python full-stack systems — creating structured REST APIs with FastAPI, modeling relational schemas in PostgreSQL and SQLite, and pairing them with responsive React user interfaces. Clean code, automated test suites, and practical usability always come first.",
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
  // Set featured: true to always display in the main view.
  // Projects with featured: false unfold under "Show more projects".
  projects: [
    {
      id: "pulse-engine",
      title: "PulseEngine",
      featured: true,
      type: "Financial Backend",
      summary: "A double-entry ledger service that processes simultaneous money transfers without double-charging or balance errors.",
      benchmark: "Benchmarked on PostgreSQL 16 · Locust 1,000 req/sec · 0 balance invariant violations · 8-core Linux / 16GB RAM",
      skills: ["Python", "FastAPI", "PostgreSQL", "Redis"],
      link: "https://github.com/priyanshunawaldev/pulse-engine",
      githubUrl: "https://github.com/priyanshunawaldev/pulse-engine",
      demoUrl: null,
    },
    {
      id: "reflex",
      title: "Reflex CLI",
      featured: true,
      type: "Developer Tool",
      summary: "An offline-first command-line tool that lets developers track daily notes, tasks, and git commits straight from their shell.",
      benchmark: "Sub-25ms cold startup · 0 KB network egress · Local SQLite",
      skills: ["Python", "SQLite", "Typer", "Rich"],
      link: "https://github.com/priyanshunawaldev/reflex-cli",
      githubUrl: "https://github.com/priyanshunawaldev/reflex-cli",
      demoUrl: null,
    },
    {
      id: "prepwise",
      title: "Prepwise",
      featured: true,
      type: "Voice AI System",
      summary: "An interactive voice interview platform that asks realistic spoken questions and gives immediate spoken feedback.",
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
      summary: "Real-time road obstacle perception pipeline trained with YOLOv8 and OpenCV, achieving <45ms latency on RTX 3060.",
      benchmark: "<45ms latency on RTX 3060 · 1,000+ annotated multi-weather test frames",
      skills: ["Python", "YOLOv8", "OpenCV", "NumPy"],
      link: "https://github.com/priyanshunawaldev",
      githubUrl: "https://github.com/priyanshunawaldev",
      demoUrl: null,
    },
    {
      id: "job-application-tracker",
      title: "Job Tracker Service",
      featured: false,
      type: "Backend Service",
      summary: "A production REST API service for tracking and categorizing job applications across hiring pipelines.",
      benchmark: "Sub-80ms API latency · 92% automated test coverage",
      skills: ["Python", "FastAPI", "PostgreSQL", "Docker"],
      link: "https://github.com/priyanshunawaldev/job-application-tracker",
      githubUrl: "https://github.com/priyanshunawaldev/job-application-tracker",
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
  responseTime: "Usually responds within 24 hours",
  location: "India · Open to Hybrid & Relocation",
  availability: "Available immediately for Software Developer & Python Full-Stack roles",
};
