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

## 2. About Me (Human-Written, Grounded Narrative)
- **Title**: About Me
- **Core Narrative**:
  "I'm a software developer with a graduate background in Computer Science (Integrated M.Sc., Central University of Rajasthan, 2024). I genuinely enjoy the process of turning complex backend requirements into clean, dependable systems that people can rely on. Most of my day-to-day engineering centers on Python and full-stack web development — designing structured REST APIs with FastAPI, modeling clean relational schemas in PostgreSQL and SQLite, and pairing them with fast, responsive React interfaces. I place high value on automated testing with pytest, safe concurrency, and writing code that is straightforward for other engineers to read and maintain."

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
Projects are configured with explicit `githubUrl` and `demoUrl` fields. Projects marked `featured: true` automatically display with the spotlight banner at the top of the grid.

1. **PulseEngine** (`featured: true` — Spotlight)
   - *Type*: Financial Backend
   - *Summary*: A concurrent double-entry accounting engine built in Python & FastAPI. Enforces zero-sum balance math across money transfers, verifies Redis SHA-256 idempotency keys in <1ms to prevent duplicate payments, and uses ordered row locks in PostgreSQL so simultaneous transfers never deadlock.
   - *Benchmark*: PostgreSQL 16 · Locust 1,000 req/sec · Zero balance violations · 8-core Linux
   - *Core Skills*: Python, FastAPI, PostgreSQL, Redis
   - *GitHub*: https://github.com/priyanshunawaldev/pulse-engine
   - *Demo*: null

2. **Reflex CLI** (`featured: false`)
   - *Type*: Developer Tool
   - *Summary*: A lightweight, offline-first terminal assistant I built to log daily dev notes, active tasks, and Git commits directly from the shell into local SQLite — zero telemetry, zero cloud dependencies, and instant <25ms startup.
   - *Benchmark*: Sub-25ms cold startup · 0 KB network egress · Local SQLite
   - *Core Skills*: Python, SQLite, Typer, Rich
   - *GitHub*: https://github.com/priyanshunawaldev/reflex-cli
   - *Demo*: null

3. **Prepwise** (`featured: false`)
   - *Type*: Voice AI System
   - *Summary*: A full-stack voice interview platform that simulates realistic technical screenings. It streams spoken candidate audio over bidirectional WebSockets to FastAPI and Gemini AI, delivering natural conversational follow-ups with sub-second turnaround.
   - *Benchmark*: Sub-second bidirectional audio streaming over WebSockets
   - *Core Skills*: Next.js, WebSockets, FastAPI, Gemini AI
   - *GitHub*: https://github.com/priyanshunawaldev/interview-prep
   - *Demo*: null

4. **YOLOv8 Real-Time Detection** (`featured: false` — Applied Research / Vision)
   - *Type*: Applied Research / Vision
   - *Summary*: My Master's dissertation research: a real-time road perception pipeline trained on multi-weather driving datasets with YOLOv8 and OpenCV, achieving sustained <45ms frame inference latency on RTX 3060 edge hardware.
   - *Benchmark*: <45ms latency on RTX 3060 · 1,000+ annotated multi-weather test frames
   - *Core Skills*: Python, YOLOv8, OpenCV, NumPy
   - *GitHub*: null (Academic / Master's Dissertation Research)
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
- **Response Time**: Response within 24 hours
- **Location**: India · Open to Hybrid & Relocation
- **Availability**: Available immediately for Software Developer & Python Full-Stack roles
