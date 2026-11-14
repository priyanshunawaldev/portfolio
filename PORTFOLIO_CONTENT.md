# Priyanshu Nawal — Portfolio Content Configuration Guide

This file acts as the primary reference for all content rendered across your portfolio website. All text, links, project descriptions, skills, experience, and education details are centralized in `src/data/portfolioContent.js` and `src/data/projectsData.js`.

Whenever you want to modify any text, add projects, or change details, update `src/data/portfolioContent.js` directly.

---

## 1. Personal Information & Credibility Strip
- **Name**: Priyanshu Nawal
- **Role**: Software Developer · Python Full-Stack
- **Best Hero Hook**: "Building clean, dependable software end-to-end — from robust Python services to responsive web applications."
- **Value Proposition**: Computer Science graduate building full-stack web applications, clean Python APIs, and practical developer tools.
- **Email**: priyanshu.nawal.dev@gmail.com
- **GitHub**: https://github.com/priyanshunawaldev
- **LinkedIn**: https://linkedin.com/in/priyanshunawal
- **Resume**: `/Priyanshu_Nawal_Resume.pdf`
- **Location**: India · Open to Hybrid & Relocation
- **Availability**: Available immediately for Software Developer & Python Full-Stack roles
- **Key Stack**: Python · FastAPI · React · PostgreSQL · REST APIs

---

## 2. About Me (Human-Written, Centered Narrative)
- **Title**: About Me
- **Core Narrative**:
  "Full-stack software developer with an Integrated M.Sc. in Computer Science, building production-ready Python backends, clean REST APIs, and responsive React web applications. Core engineering work centers on end-to-end web systems — crafting structured REST APIs with FastAPI, designing relational schemas in PostgreSQL and SQLite, and pairing them with clean, accessible React interfaces. Every project emphasizes thoughtful fundamentals: clean code, thorough automated testing with pytest, and reliable error handling. Beyond web applications, hands-on development spans building offline-first developer CLIs in Python, mentoring junior engineers on data structures and database internals, and shipping practical tools built for real-world reliability."

---

## 3. Skills (Depth Signals & Proper Categorization)
- **Title**: Skills
- **Categories & Depth Signals**:
  - **Core Backend & Systems (Primary)**: Python, FastAPI, REST APIs, WebSockets, Celery, pytest
  - **Databases & Infrastructure**: PostgreSQL, Redis, SQLite, SQLAlchemy, Docker, Linux
  - **Frontend & Supporting**: React, TypeScript, Next.js, Tailwind CSS, Git, CI / CD

---

## 4. Experience (Technical & Production Ownership)
- **Title**: Experience
- **Roles**:
  1. **Open-Source Backend Engineering** (2024 — Present)
     - *Role*: Backend Engineering (Independent / Open Source)
     - *Description*: Architecting and shipping production-grade distributed backend systems, financial transaction engines, and developer CLIs in Python.
     - *Key Highlights*:
       - Engineered PulseEngine, a distributed double-entry ledger handling concurrent transfers with zero-deadlock guarantees and sub-millisecond Redis idempotency verification.
       - Authored Reflex CLI, an offline-first terminal OS managing developer logs and local SQLite persistence with sub-25ms cold startup.
       - Built Prepwise, a sub-second voice AI interview pipeline leveraging WebSockets and asynchronous LLM streaming.
     - *Stack*: Python, FastAPI, PostgreSQL, Redis, Distributed Systems, SQLAlchemy, Docker
  2. **Technical CS Educator & Consultant** (2023 — 2024)
     - *Role*: Technical Mentorship & CS Education (Chegg / Mentorship)
     - *Description*: Guided university students and developers through complex computer science concepts, distributed systems, algorithms, and database design.
     - *Key Highlights*:
       - Resolved 500+ complex technical problems across Data Structures, Algorithms, OS concurrency, and Relational Database internals.
       - Conducted code reviews and architectural walkthroughs emphasizing ACID guarantees, thread safety, and time/space complexity optimization.
       - Authored in-depth technical explanations and reference implementations in Python and C++.
     - *Stack*: Algorithms, Data Structures, DBMS Internals, Operating Systems, Python, Code Review

---

## 5. Projects
Projects are configured with explicit `githubUrl` and `demoUrl` fields. Projects marked `featured: true` display directly in the primary grid; `featured: false` projects unfold cleanly under "Show more projects".

1. **PulseEngine** (`featured: true` — Flagship)
   - *Type*: Financial Backend
   - *Summary*: A double-entry ledger service that processes simultaneous money transfers without double-charging or balance errors.
   - *Benchmark*: Benchmarked on PostgreSQL 16 · Locust 1,000 req/sec · 0 balance invariant violations · 8-core Linux / 16GB RAM
   - *Core Skills*: Python, FastAPI, PostgreSQL, Redis
   - *GitHub*: https://github.com/priyanshunawaldev/pulse-engine
   - *Demo*: null

2. **Reflex CLI** (`featured: true`)
   - *Type*: Developer Tool
   - *Summary*: An offline-first command-line tool that lets developers track daily notes, tasks, and git commits straight from their shell.
   - *Benchmark*: Sub-25ms cold startup · 0 KB network egress · Local SQLite
   - *Core Skills*: Python, SQLite, Typer, Rich
   - *GitHub*: https://github.com/priyanshunawaldev/reflex-cli
   - *Demo*: null

3. **Prepwise** (`featured: true`)
   - *Type*: Voice AI System
   - *Summary*: An interactive voice interview platform that asks realistic spoken questions and gives immediate spoken feedback.
   - *Benchmark*: Sub-second bidirectional audio streaming over WebSockets
   - *Core Skills*: Next.js, WebSockets, FastAPI, Gemini AI
   - *GitHub*: https://github.com/priyanshunawaldev/interview-prep
   - *Demo*: null

4. **YOLOv8 Real-Time Detection** (`featured: false` — Applied Research / Vision)
   - *Type*: Applied Research / Vision
   - *Summary*: Real-time road obstacle perception pipeline trained with YOLOv8 and OpenCV, achieving <45ms latency on RTX 3060.
   - *Benchmark*: <45ms latency on RTX 3060 · 1,000+ annotated multi-weather test frames
   - *Core Skills*: Python, YOLOv8, OpenCV, NumPy
   - *GitHub*: https://github.com/priyanshunawaldev
   - *Demo*: null

5. **Job Tracker Service** (`featured: false` — Backend Service)
   - *Type*: Backend Service
   - *Summary*: A production REST API service for tracking and categorizing job applications across hiring pipelines.
   - *Benchmark*: Sub-80ms API latency · 92% automated test coverage
   - *Core Skills*: Python, FastAPI, PostgreSQL, Docker
   - *GitHub*: https://github.com/priyanshunawaldev/job-application-tracker
   - *Demo*: null

---

## 6. Education
- **Degree**: Integrated M.Sc. in Computer Science (5-Year Dual Degree)
- **Institution**: Central University of Rajasthan
- **Duration**: 2019 — 2024
- **Dissertation**: *Real-Time Object Detection using YOLOv8*
  - Trained and evaluated YOLOv8 object detection models optimized for edge devices
  - Achieved sub-45ms real-time video inference (<45ms latency on RTX 3060) without requiring high-end GPU clusters
  - Streamlined multi-threaded frame buffer pipelines to eliminate video lag and frame drops
- **Advanced Coursework**:
  - Distributed Systems
  - Database Internals
  - Concurrency & Multithreading
  - Computer Vision
  - Data Structures & Algorithms
  - Operating Systems

---

## 7. Contact
- **Direct Email**: priyanshu.nawal.dev@gmail.com
- **Subtext**: Have an open software engineering role, a project in mind, or want to discuss full-stack development? Reach out directly.
- **Response Time**: Usually responds within 24 hours
- **Location**: India · Open to Hybrid & Relocation
- **Availability**: Available immediately for Software Developer & Python Full-Stack roles
