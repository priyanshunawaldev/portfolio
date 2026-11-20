export const PROJECTS = [
  {
    id: "pulse-engine",
    slug: "pulse-engine",
    name: "PulseEngine — High-Throughput Financial Ledger with Concurrent Transfer Safety",
    shortName: "PulseEngine",
    isFlagship: true,
    category: "Backend & Financial Systems",
    tagline:
      "A distributed double-entry financial ledger built in Python & FastAPI to handle concurrent transfers with mathematical zero-sum guarantees.",
    highlight: "Zero-Sum Ledger (∑Δ = 0) · Ascending UUID Locks · Locust 1,000 req/s on PG16 · Atomic Redis Idempotency",
    metrics: [
      "Fixed-point NUMERIC(18, 4) arithmetic",
      "Deterministic ascending UUID row locking",
      "Atomic Redis SHA-256 idempotency gate",
      "Locust load-tested on PostgreSQL 16 (1,000 req/s)",
    ],
    description:
      "An asynchronous backend transaction engine engineered with Python 3.12, FastAPI, and PostgreSQL 16. Enforces strict zero-sum conservation across multi-legged entries, prevents duplicate payments during network retries, and eliminates circular deadlock cycles during simultaneous mutual transfers.",
    role: "Backend Engineer (Open Source)",
    timeline: "2024",
    status: "Verified Open Source Architecture",
    githubUrl: "https://github.com/priyanshunawaldev/pulse-engine",
    demoUrl: null,
    liveDemoUrl: null,
    swaggerUrl: "https://github.com/priyanshunawaldev/pulse-engine#api-documentation",
    stack: [
      "Python 3.12",
      "FastAPI",
      "PostgreSQL 16",
      "SQLAlchemy 2.0 (Async)",
      "Redis 7",
      "Celery",
      "Docker",
      "pytest-asyncio",
      "Locust",
    ],
    proofOfImplementation: {
      githubUrl: "https://github.com/priyanshunawaldev/pulse-engine",
      testCoverage: "88% Automated Coverage",
      testSuiteStats: "Comprehensive async suite (pytest-asyncio + PostgreSQL rollback tests)",
      ciStatus: "Passing (GitHub Actions CI/CD)",
      benchmarkStats: "Benchmarked on PostgreSQL 16 via Locust: 1,000 req/sec across 200 concurrent simulated users with 0 balance discrepancy violations (8-core Linux / 16GB RAM)",
      balanceInvariant: "Mathematical zero-sum balance invariant: sum(debits) + sum(credits) == 0",
      swaggerDocUrl: "https://github.com/priyanshunawaldev/pulse-engine#api-documentation",
    },
    impactMetrics: [
      { label: "Balance Accuracy", value: "100%", detail: "Zero money drift across transfers" },
      { label: "Decimal Math", value: "Fixed-Point", detail: "Zero rounding errors" },
      { label: "Deadlock Safety", value: "Ordered Locks", detail: "Ascending UUID row locking" },
      { label: "Test Coverage", value: "88%", detail: "Automated async test suite" },
    ],
    engineeringBreakdown: {
      title: "What I Actually Engineered vs. What Libraries Handled",
      customEngineered: [
        {
          module: "Deterministic Ascending Lock Ordering",
          description: "Sorted account UUIDs strictly in ascending order (min(A,B) before max(A,B)) prior to issuing SELECT ... FOR UPDATE row locks, eliminating circular wait cycles under concurrent bidirectional transfers.",
        },
        {
          module: "Fixed-Point Zero-Sum Ledger Invariant",
          description: "Engineered strict two-legged balance conservation with Python Decimal and PostgreSQL NUMERIC(18, 4) (sum(debits) + sum(credits) == 0.0000), eliminating floating-point drift across micro-transactions.",
        },
        {
          module: "Atomic SHA-256 Idempotency Interceptor",
          description: "Designed a Redis SHA-256 payload reservation gate using atomic SET NX keys, short-circuiting network retries and concurrent in-flight requests before acquiring PostgreSQL connection pool slots or row locks.",
        },
        {
          module: "Transactional Webhook Outbox Pattern",
          description: "Implemented Celery background outbox workers with HMAC-SHA256 signature verification, exponential backoff with jitter, and dead-letter queues (DLQ) for resilient external event delivery.",
        },
      ],
      librariesHandled: [
        {
          module: "FastAPI / Starlette",
          description: "ASGI event loop binding, HTTP request routing, dependency injection for session lifecycles, and automatic OpenAPI JSON documentation generation.",
        },
        {
          module: "SQLAlchemy 2.0 (Async) & asyncpg",
          description: "Low-level async connection pooling, binary PostgreSQL wire protocol serialization, and atomic transaction commit/rollback execution.",
        },
        {
          module: "Redis-py",
          description: "Async TCP connection multiplexing and low-level Redis command socket serialization.",
        },
        {
          module: "Pydantic v2",
          description: "Rust-compiled JSON payload deserialization and strict input schema type validation.",
        },
      ],
    },
    dumbestBug: {
      title: "SQLAlchemy 2.0 Async: Lazy-Loading Panic Outside Greenlet Context",
      summary: "A 4-hour Sunday debugging session where an async ORM relationship serialization triggered greenlet panics during concurrent load testing.",
      warStory:
        "Under concurrent Locust load testing (200+ simulated users), the transfer endpoint randomly started vomiting 500 errors. The database logs showed all transactions were committing cleanly, yet the API gateway kept aborting. I spent 4 hours convinced I had discovered an obscure PostgreSQL 16 edge case in serializable isolation.\n\nTurns out, Pydantic's response schema was serializing transaction.entries after the async with session.begin() block had already terminated. In SQLAlchemy 2.0's async model, touching an unloaded relationship outside an active greenlet context doesn't return null or empty—it violently panics with MissingGreenlet: greenlet_spawn has not been called. The fix? A single line: .options(selectinload(Transaction.entries)) during query building. A brutal reminder that in async Python, lazy loading is an architectural landmine.",
    },
    codeSnippets: [
      {
        fileName: "app/core/idempotency.py",
        language: "python",
        title: "Atomic Idempotency Interceptor (Two-Phase Redis Gate)",
        description: "Coordinates concurrent retries using atomic SET NX reservation before acquiring database connection pool slots or row locks.",
        code: `from fastapi import Request, HTTPException, status
import hashlib, json
from app.core.redis import redis_client

async def acquire_idempotency_lock(request: Request, key: str, payload: dict) -> dict | None:
    """
    Guarantees concurrency safety during network retries.
    Uses atomic SET NX to reserve the idempotency key before transfer execution,
    preventing duplicate debit operations under simultaneous concurrent requests.
    """
    payload_hash = hashlib.sha256(
        json.dumps(payload, sort_keys=True).encode()
    ).hexdigest()
    redis_key = f"idempotency:{key}"
    
    # Fast path: check for completed transaction receipt or in-flight lock
    cached = await redis_client.get(redis_key)
    if cached:
        data = json.loads(cached)
        if data.get("status") == "PROCESSING":
            raise HTTPException(
                status_code=status.HTTP_409_CONFLICT,
                detail="Concurrent transaction in progress with this idempotency key."
            )
        if data.get("fingerprint") != payload_hash:
            raise HTTPException(
                status_code=status.HTTP_422_UNPROCESSABLE_ENTITY,
                detail="Idempotency key reused with differing transfer payload."
            )
        # Return committed receipt without querying Postgres or acquiring row locks
        return data.get("response")
    
    # Atomic reservation with TTL to coordinate concurrent in-flight requests
    reserved = await redis_client.set(
        redis_key,
        json.dumps({"status": "PROCESSING", "fingerprint": payload_hash}),
        nx=True,
        ex=60  # 60s processing timeout window
    )
    if not reserved:
        raise HTTPException(
            status_code=status.HTTP_409_CONFLICT,
            detail="Concurrent request already processing this idempotency key."
        )
    return None`,
      },
      {
        fileName: "app/services/ledger.py",
        language: "python",
        title: "Concurrent Transfer with Deterministic Ascending UUID Row Locks",
        description: "Locks accounts strictly in sorted order min(A,B) to eliminate circular wait cycles in bidirectional transfers.",
        code: `from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select
from app.models.account import Account
from app.models.transaction import Transaction, LedgerEntry
from decimal import Decimal

async def execute_transfer(
    session: AsyncSession, 
    source_id: str, 
    dest_id: str, 
    amount: Decimal
) -> Transaction:
    """
    Executes an atomic double-entry balance transfer with zero circular deadlocks.
    Locks accounts in predictable ascending order: min(A,B) before max(A,B).
    """
    first_id, second_id = sorted([source_id, dest_id])
    
    async with session.begin():
        # Step 1: Deterministic ordered row locking
        query = (
            select(Account)
            .where(Account.id.in_([first_id, second_id]))
            .with_for_update()
            .order_by(Account.id)
        )
        res = await session.execute(query)
        accounts = {str(acc.id): acc for acc in res.scalars()}
        
        sender = accounts[str(source_id)]
        recipient = accounts[str(dest_id)]
        
        # Step 2: Strict balance sufficiency check
        if sender.available_balance < amount:
            raise ValueError(f"Account {source_id} insufficient available balance.")
            
        # Step 3: Atomic double-entry balancing (sum(debit) == sum(credit))
        sender.available_balance -= amount
        recipient.available_balance += amount
        
        tx = Transaction(source_id=source_id, dest_id=dest_id, amount=amount)
        session.add_all([
            tx,
            LedgerEntry(account_id=source_id, amount=-amount, entry_type="DEBIT"),
            LedgerEntry(account_id=dest_id, amount=amount, entry_type="CREDIT")
        ])
        return tx`,
      },
    ],
    apiEndpoints: [
      {
        method: "POST",
        path: "/api/v1/transactions",
        summary: "Execute Idempotent Double-Entry Transfer",
        description: "Safely transfers funds between two accounts. Requires Idempotency-Key header to prevent duplicate debit charges on network retry.",
        headers: {
          "Idempotency-Key": "9b1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d",
          "Content-Type": "application/json",
        },
        sampleRequest: {
          source_account_id: "018d9b41-3b7d-7000-8000-000000001042",
          dest_account_id: "018d9b41-3b7d-7000-8000-000000009921",
          amount: 250.0,
          currency: "USD",
          reference_note: "Invoice #8841 Settlement",
        },
        sampleResponse: {
          status: "COMMITTED",
          transaction_id: "tx_9941a82f",
          source_account_id: "018d9b41-3b7d-7000-8000-000000001042",
          dest_account_id: "018d9b41-3b7d-7000-8000-000000009921",
          amount: 250.0,
          audit_invariant: "SUM_DEBITS_EQUAL_CREDITS_VERIFIED",
          execution_time_ms: 18.2,
        },
      },
      {
        method: "GET",
        path: "/api/v1/accounts/1042/balance",
        summary: "Fetch Verified Account Balance",
        description: "Returns live available balance and reconciliation verification timestamp.",
        headers: {
          Accept: "application/json",
        },
        sampleRequest: null,
        sampleResponse: {
          account_id: "018d9b41-3b7d-7000-8000-000000001042",
          available_balance: 4750.0,
          currency: "USD",
          last_reconciled_at: "2026-11-13T00:00:00Z",
          reconciliation_status: "VERIFIED_CLEAN",
        },
      },
      {
        method: "POST",
        path: "/api/v1/audit/reconcile",
        summary: "Trigger Celery Background Invariant Audit",
        description: "Asynchronously verifies that sum(historical debits) == sum(historical credits) across all ledger records.",
        headers: {
          Authorization: "Bearer sec_admin_token",
        },
        sampleRequest: {
          scope: "FULL_LEDGER",
          tolerance_cents: 0,
        },
        sampleResponse: {
          audit_job_id: "job_celery_7721",
          status: "QUEUED",
          worker: "celery@pulse-worker-01",
          reconciliation_type: "ZERO_SUM_INVARIANT",
        },
      },
    ],
    overview:
      "PulseEngine is an open-source backend financial ledger built with Python, FastAPI, and PostgreSQL 16. It tackles the most critical concurrency hazards in financial software: preventing duplicate debits when clients retry requests, eliminating circular deadlocks during simultaneous cross-transfers, and guaranteeing that balances never drift.",
    problemStatement:
      "In transactional backend systems, simple race conditions can corrupt data: client retries can charge a customer twice, simultaneous mutual transfers can freeze PostgreSQL connections in deadlock cycles, and floating-point arithmetic can lose fractions of cents over thousands of transactions. PulseEngine was designed to eliminate these failure modes by architecture.",
    motivation:
      "I wanted to understand how real-world banking engines guarantee 100% balance accuracy and ACID consistency under concurrent load.",
    contributions: [
      "Enforced mathematical zero-sum conservation (sum of debits equals sum of credits) on every transaction.",
      "Prevented floating-point arithmetic rounding errors by using NUMERIC(18, 4) fixed-point fields.",
      "Implemented ascending UUID row-locking order (min(A,B)) to eliminate circular wait cycles in concurrent transfers.",
      "Engineered an atomic Redis SHA-256 idempotency interceptor to coordinate in-flight retries.",
      "Built an asynchronous Celery webhook outbox with HMAC-SHA256 event signatures and exponential backoff.",
      "Documented 10 in-depth architectural postmortems and debugging analyses in ENGINEERING_INCIDENTS_AND_LEARNINGS.md covering UUIDv7 type bugs and async ORM greenlet panics.",
    ],
    architecture: [
      {
        title: "1. Token Bucket Rate Limiting (Redis 7)",
        detail:
          "Executes atomic Redis Lua scripts on ingress to enforce rate limits before requests consume PostgreSQL connections.",
      },
      {
        title: "2. Cryptographic Idempotency Gate",
        detail:
          "Hashes incoming payloads with SHA-256 against client Idempotency-Keys. Replayed requests return cached receipts in <1ms without locking rows.",
      },
      {
        title: "3. Deadlock-Free Ordered Row Locks",
        detail:
          "Sorts account UUIDs before issuing SELECT ... FOR UPDATE queries, guaranteeing all concurrent transactions acquire locks in identical order.",
      },
      {
        title: "4. Asynchronous Webhook Outbox & Nightly Audit",
        detail:
          "Dispatches signed HMAC-SHA256 webhook deliveries via Celery workers with Dead-Letter Queue (DLQ) support and periodic reconciliation.",
      },
    ],
    failureScenarios: [
      {
        scenario: "Client Retries Transfer Request (Network Lag)",
        hazard: "User or payment gateway retries POST request after client timeout.",
        behavior: "Redis checks SHA-256 fingerprint of the key and payload, immediately returning the original committed receipt without double-charging.",
      },
      {
        scenario: "Simultaneous Cross-Transfers (User A ⇄ User B)",
        hazard: "User A transfers to User B while User B simultaneously transfers to User A, creating circular lock dependency.",
        behavior: "Accounts are locked in sorted ascending order (min(A,B)), eliminating circular lock wait conditions in PostgreSQL.",
      },
      {
        scenario: "Server Crash Midway Through Multi-Legged Transfer",
        hazard: "Server dies after deducting from sender but before crediting recipient.",
        behavior: "PostgreSQL transaction boundary issues an automatic rollback. Zero uncommitted balance changes persist.",
      },
      {
        scenario: "Detecting Historical Ledger Drift",
        hazard: "Silent database corruption or unauthorized manual row modification.",
        behavior: "A Celery Beat reconciliation task recalculates total ledger balance and flags snapshot mismatches without silent mutations.",
      },
    ],
    benchmarkMethodology: {
      tool: "Locust Load Testing Suite",
      conditions: "Concurrent simulated users issuing burst transfer requests against PostgreSQL async connection pool.",
      metrics: [
        { label: "Balance Discrepancy", value: "0.00%" },
        { label: "Arithmetic", value: "NUMERIC(18,4)" },
        { label: "Deadlock Handling", value: "Ordered Locks" },
        { label: "Automated Tests", value: "88% Coverage" },
      ],
    },
    tradeoffs: [
      {
        decision: "Redis Request Fingerprinting vs. Database Lookups",
        chosen: "In-memory Redis SHA-256 idempotency cache",
        alternative: "Querying PostgreSQL on every retry attempt",
        rationale: "Redis responds in sub-millisecond time, absorbing retry storms without saturating the relational connection pool.",
      },
      {
        decision: "Ordered Row Locking vs. Optimistic Retry Collisions",
        chosen: "Sorting account IDs before acquiring database row locks",
        alternative: "Optimistic concurrency with retry loops",
        rationale: "Sorting IDs guarantees zero circular deadlocks on bidirectional transfers, maintaining predictable latency under load.",
      },
      {
        decision: "Outbox Pattern via Celery vs. In-Process Webhook HTTP Calls",
        chosen: "Queuing webhook jobs in Redis and executing via Celery",
        alternative: "Calling external customer webhooks inside the API request cycle",
        rationale: "Third-party customer webhook servers can lag or timeout; offloading prevents slow HTTP calls from tying up API workers.",
      },
    ],
    technicalChallenges: [
      {
        challenge: "RFC 9562 UUIDv7 Type Incompatibility with asyncpg",
        solution:
          "Resolved in postmortem Incident 01: uuid_utils objects failed binary pointer assertions in asyncpg; wrapped generators in standard uuid.UUID wrappers.",
      },
      {
        challenge: "SQLAlchemy 2.0 Async MissingGreenlet Panic",
        solution:
          "Resolved in postmortem Incident 03: accessing lazy-loaded relationships during serialization caused greenlet crashes; switched to explicit eager joinedload queries.",
      },
    ],
    outcomes: [
      "Enforced 100% zero-sum double-entry accounting where sum of debits and credits always equals zero.",
      "Achieved 88% automated test suite coverage with pytest-asyncio and PostgreSQL transactional rollback tests.",
      "Documented 10 authentic production postmortems in ENGINEERING_INCIDENTS_AND_LEARNINGS.md.",
    ],
    futureImprovements: [
      "Add multi-currency transfers with historical exchange rate tables.",
      "Implement Apache Kafka event stream for real-time audit logging.",
    ],
  },
  {
    id: "prepwise",
    slug: "prepwise",
    name: "Prepwise — AI Voice Interview Platform with Sub-Second Feedback & WebSockets",
    shortName: "Prepwise",
    category: "Full-Stack & Voice AI",
    tagline:
      "An interactive voice interview platform built with Next.js, WebSockets, Gemini AI, and Vapi to simulate real spoken interviews.",
    highlight: "Full-Duplex Audio · Vapi Voice Activity Detection · Gemini AI · 12 Rubric Criteria",
    metrics: [
      "Full-duplex WebSocket audio streaming",
      "Sub-800ms conversational turn-taking",
      "Natural human speech interruption detection",
      "Objective 12-criteria scoring rubric",
    ],
    description:
      "A real-time voice interview platform replacing static flashcards. Streams audio over WebSockets with browser-side voice activity detection, uses Google Gemini AI to ask dynamic follow-up questions, and generates objective evaluation rubrics across 12 criteria.",
    role: "Full-Stack Developer (Personal Project)",
    timeline: "2024",
    status: "Open Source Project",
    githubUrl: "https://github.com/priyanshunawaldev/interview-prep",
    demoUrl: null,
    liveDemoUrl: null,
    stack: [
      "Next.js 14",
      "TypeScript",
      "Google Gemini AI",
      "Vapi AI",
      "WebSockets",
      "Web Audio API",
      "Tailwind CSS",
    ],
    proofOfImplementation: {
      githubUrl: "https://github.com/priyanshunawaldev/interview-prep",
      testCoverage: "Manual and automated end-to-end latency benchmarks",
      testSuiteStats: "WebSocket streaming and audio chunking tests with simulated audio worklets",
      ciStatus: "Verified Open Source",
      benchmarkStats: "Sustained sub-800ms round-trip speech-to-speech latency",
      balanceInvariant: "Barging-in interruption detection under 50ms",
      swaggerDocUrl: "https://github.com/priyanshunawaldev/interview-prep",
    },
    impactMetrics: [
      { label: "Turn-Taking Latency", value: "< 800ms", detail: "End-to-end voice round-trip" },
      { label: "VAD Interruption", value: "< 50ms", detail: "Human speech barge-in cut-off" },
      { label: "Evaluation Rubric", value: "12 Criteria", detail: "Objective multi-point scoring" },
      { label: "Audio Sampling", value: "16kHz PCM", detail: "Lossless full-duplex WebSocket" },
    ],
    engineeringBreakdown: {
      title: "What I Actually Engineered vs. What Libraries Handled",
      customEngineered: [
        {
          module: "Full-Duplex Audio Streaming Pipeline",
          description: "Built browser-to-server 16kHz PCM audio streaming over binary WebSockets with jitter buffering to sustain natural conversational pacing under 800ms.",
        },
        {
          module: "50ms Interruption State Machine",
          description: "Integrated client-side Voice Activity Detection (VAD) that cuts incoming AI audio playback in under 50ms the instant candidate speech energy is detected.",
        },
        {
          module: "12-Factor Rubric Evaluation Engine",
          description: "Authored structured multi-stage prompt chains that evaluate technical responses against depth, architecture trade-offs, and communication clarity without hallucinating scores.",
        },
        {
          module: "Dynamic Follow-Up Context Injector",
          description: "Constructed conversational state graphs that detect when an interviewee dodges a trade-off and prompts Gemini to ask targeted follow-up probes.",
        },
      ],
      librariesHandled: [
        {
          module: "Next.js 14 & React",
          description: "SSR page routing, hydrated UI layout, and client-side lifecycle management.",
        },
        {
          module: "Vapi AI & Web Audio API",
          description: "Low-level browser microphone audio context capture, hardware echo cancellation, and speaker output buffering.",
        },
        {
          module: "Google Gemini 1.5 Flash",
          description: "Large language model reasoning, token generation, and structured JSON output parsing.",
        },
        {
          module: "Tailwind CSS",
          description: "Atomic utility class styling and responsive breakpoints.",
        },
      ],
    },
    dumbestBug: {
      title: "The Self-Interviewing Echo Chamber",
      summary: "When the AI interviewer started arguing with its own speaker output in an infinite conversational loop.",
      warStory:
        "During early alpha testing without headphones, the AI interviewer asked: 'How would you partition a PostgreSQL database?'. Before I could open my mouth, the AI paused for half a second and replied: 'That is a great perspective on partitioning! However, what about hash sharding?'. Then it answered that question too, endlessly interviewing itself while I sat in stunned silence.\n\nWhat happened? The laptop's speakers were blasting the audio, which leaked back into the microphone. Because my Web Audio buffer chunk was configured to 512ms, the VAD algorithm detected the audio energy too late, thought the user was speaking, sent the speech-to-text transcript back into the LLM, and triggered another follow-up. The AI was literally having a passionate system design debate with its own reflection. Fixed by shrinking audio buffer chunks to 64ms, adding a software output-mute gate during AI speech synthesis, and enforcing minimum silence hysteresis.",
    },
    overview:
      "Prepwise is an interactive voice interview platform designed to simulate realistic technical interviews. Instead of reading static flashcards, an AI interviewer speaks out loud, listens to candidate answers, asks spontaneous follow-up questions, and provides actionable feedback.",
    problemStatement:
      "Most interview tools only show written questions on a screen. Real interviews are spoken and interactive — interviewers interrupt, probe for depth, and evaluate how candidates structure complex technical trade-offs under pressure.",
    motivation:
      "I wanted to build an authentic practice tool that notices when a candidate skips an architectural trade-off and prompts them to explain their reasoning.",
    contributions: [
      "Architected real-time bidirectional audio streaming over WebSockets.",
      "Integrated browser-side Voice Activity Detection (VAD) so the AI pauses immediately when the user speaks.",
      "Connected Google Gemini AI to dynamically analyze answers and generate relevant technical follow-up questions.",
      "Created an automated evaluation system scoring performance across 12 standardized criteria.",
    ],
    architecture: [
      {
        title: "1. 16kHz PCM Audio Stream",
        detail: "Captures microphone input and streams audio chunks over WebSockets for responsive turn-taking.",
      },
      {
        title: "2. Voice Activity Detection & Interruption",
        detail: "Detects human speech in <50ms and pauses AI playback instantly to avoid awkward talking collisions.",
      },
      {
        title: "3. Conversational Reasoning Engine",
        detail: "Prompts Google Gemini with previous context to detect missing trade-offs and ask targeted follow-ups.",
      },
      {
        title: "4. Rubric Evaluation Engine",
        detail: "Scores completed interview sessions across 12 objective dimensions including communication and technical depth.",
      },
    ],
    outcomes: [
      "Achieved natural, low-latency conversational turn-taking.",
      "Supported technical interview tracks for System Design and Backend Fundamentals.",
      "Delivered objective, constructive feedback replacing subjective self-study.",
    ],
  },
  {
    id: "reflex",
    slug: "reflex",
    name: "Reflex CLI — Offline-First Developer Productivity Tool with SQLite & Git Synchronization",
    shortName: "Reflex CLI",
    isFlagship: true,
    category: "Developer Tools & CLI",
    tagline:
      "A fast, 100% offline-first command-line productivity tool with local SQLite storage, focus timers, and automatic Git commit tracking.",
    highlight: "< 25ms Startup · 100% Offline SQLite · Zero Telemetry · Local AI Summaries",
    metrics: [
      "Sub-25ms cold startup time in Python",
      "Local SQLite state machine storage (~/.reflex/data.db)",
      "Zero telemetry / 0 KB network data sent",
      "Local Ollama AI daily work summarization",
    ],
    description:
      "A keyboard-driven terminal productivity tool for developers. Combines focus timers, task management, local Git commit tracking, and private daily standup summaries that run fast and work completely offline with total privacy.",
    role: "Developer & Creator",
    timeline: "2024",
    status: "Open Source Tool",
    githubUrl: "https://github.com/priyanshunawaldev/reflex-cli",
    demoUrl: null,
    liveDemoUrl: null,
    stack: [
      "Python 3.12",
      "Typer",
      "Rich CLI",
      "SQLite",
      "Ollama (Local AI)",
      "Git Heuristics",
      "uv",
    ],
    proofOfImplementation: {
      githubUrl: "https://github.com/priyanshunawaldev/reflex-cli",
      testCoverage: "Automated CLI integration test suite with isolated virtual environments",
      testSuiteStats: "Comprehensive CLI invocation tests covering SQLite migrations and Git attribution",
      ciStatus: "Passing",
      benchmarkStats: "Cold start verified under 25ms via hyperfine benchmarks",
      balanceInvariant: "0 KB external network egress verified via network inspection",
      swaggerDocUrl: "https://github.com/priyanshunawaldev/reflex-cli",
    },
    impactMetrics: [
      { label: "Startup Latency", value: "< 25 ms", detail: "Lazy-loaded Python CLI modules" },
      { label: "Network Egress", value: "0 KB", detail: "100% local SQLite & zero telemetry" },
      { label: "Storage Engine", value: "SQLite WAL", detail: "Atomic state machines on disk" },
      { label: "Local AI", value: "Ollama", detail: "On-device commit summarization" },
    ],
    engineeringBreakdown: {
      title: "What I Actually Engineered vs. What Libraries Handled",
      customEngineered: [
        {
          module: "Sub-25ms Cold Startup Engine",
          description: "Architected a deferred import graph that postpones loading heavy CLI and AI libraries until specific subcommands execute, keeping routine status checks instantaneous.",
        },
        {
          module: "Local Git Commit Log Heuristics",
          description: "Built automated git plumbing log parsers (git log --since... --author...) that attribute author commits and diff statistics directly to active focus sessions.",
        },
        {
          module: "Zero-Cloud SQLite WAL State Machine",
          description: "Engineered normalized relational tables with Write-Ahead Logging (WAL) in ~/.reflex/data.db for instantaneous ACID state transitions with zero network egress.",
        },
        {
          module: "On-Device AI Prompt Synthesis",
          description: "Designed local diff summarization prompts feeding into Ollama (mistral/llama3) with streaming stdout rendering, preserving 100% developer privacy.",
        },
      ],
      librariesHandled: [
        {
          module: "Typer / Click",
          description: "Command-line argument tokenization, sub-command dispatching, and shell autocompletion scripts.",
        },
        {
          module: "Rich CLI",
          description: "Terminal ANSI color styling, cursor manipulation, and live spinner animation frames.",
        },
        {
          module: "SQLite3 (Standard Library)",
          description: "B-Tree disk storage, page caching, and concurrent read access.",
        },
        {
          module: "Ollama Daemon",
          description: "Local model weight quantization, memory management, and GPU tensor inference.",
        },
      ],
    },
    dumbestBug: {
      title: "The Invisible Typewriter of Windows Terminal",
      summary: "When a focus timer quit hotkey turned the user's terminal into an invisible black hole that vomited raw ANSI escape codes.",
      warStory:
        "Reflex featured a live terminal timer with a quiet background thread listening for 'q' to pause or quit. During local testing on Windows Terminal, everything looked flawless until someone pressed any key while the timer was running. The terminal would swallow the keys, finish the session, and then explode with a 200-character vomit of raw ANSI escape codes and buffered keystrokes across the prompt.\n\nI initially suspected Windows conhost was corrupting the stdout handle. The actual culprit was far sillier: the background keyboard listener was putting standard sys.stdin into raw unbuffered mode, but when the timer completed naturally or via SIGINT, the thread died without invoking the terminal restore hook. The terminal remained stuck in raw non-echoing mode, turning every subsequent shell command into an invisible blind typing test. Fixed by wrapping the listener in a strict atexit terminal state restore handler with signal trap guards.",
    },
    overview:
      "Reflex is an offline-first terminal productivity tool built for developers who live in the command line. It unifies task management, focus intervals, local Git commit tracking, and private daily work summaries without cloud accounts, slow browser interfaces, or telemetry.",
    problemStatement:
      "Modern productivity tools are heavy web apps requiring constant context switching, mandatory cloud accounts, and internet access, storing private notes on third-party servers.",
    motivation:
      "I wanted a distraction-free command-line tool that launches instantaneously, tracks what Git commits were authored during focus intervals, and drafts daily standups on-device.",
    contributions: [
      "Developed a clean, keyboard-driven CLI using Typer and Rich with non-destructive terminal status lines.",
      "Designed a normalized local SQLite schema storing tasks and sessions in ~/.reflex/data.db.",
      "Optimized Python package loading with lazy imports, reducing cold startup time to under 25ms.",
      "Integrated on-device Ollama AI models to summarize developer achievements with zero external network egress.",
    ],
    architecture: [
      {
        title: "1. Lazy CLI Cold Start",
        detail: "Defers heavy library imports until required, ensuring everyday terminal commands launch in <25ms.",
      },
      {
        title: "2. Local SQLite State Machine",
        detail: "Stores focus intervals and task states in a local WAL-mode SQLite database with zero cloud dependencies.",
      },
      {
        title: "3. Local Git Commit Log Heuristics",
        detail: "Parses local repository logs to attribute authored commits to active focus sessions.",
      },
      {
        title: "4. Private On-Device AI Summaries",
        detail: "Summarizes completed tasks locally using Ollama without sending notes to external APIs.",
      },
    ],
    outcomes: [
      "Sub-25ms cold startup time verified across terminal runs.",
      "0 KB external network egress verified via network inspection.",
      "Provides a clean, distraction-free terminal workflow for daily software engineering.",
    ],
  },
  {
    id: "autonomous-vehicle-cv",
    slug: "autonomous-vehicle-cv",
    name: "Autonomous Vehicle Vision Pipeline — Real-Time Obstacle Perception with YOLOv8 & OpenCV",
    shortName: "AV Vision Pipeline",
    category: "Applied Research / Vision",
    tagline:
      "Real-time road obstacle and vehicle perception pipeline trained with YOLOv8 and OpenCV, achieving <45ms inference latency.",
    highlight: "< 45ms Frame Latency on RTX 3060 · YOLOv8 · 1,000+ Annotated Images · OpenCV",
    metrics: [
      "< 45ms frame inference latency on RTX 3060",
      "1,000+ annotated multi-weather images",
      "Custom OpenCV weather augmentation",
      "YOLOv8 deep learning backbone",
    ],
    role: "Graduate Researcher (Master's Dissertation)",
    timeline: "Jan 2024 — June 2024",
    status: "Master's Dissertation Research",
    githubUrl: null,
    demoUrl: null,
    liveDemoUrl: null,
    stack: ["Python", "YOLOv8", "OpenCV", "NumPy", "Deep Learning", "Data Augmentation"],
    proofOfImplementation: {
      githubUrl: null,
      testCoverage: "Validated on multi-weather test splits",
      testSuiteStats: "Evaluation on adverse weather datasets (rain, glare, nighttime)",
      ciStatus: "Research Verified",
      benchmarkStats: "Benchmarked at <45ms per frame inference latency on NVIDIA RTX 3060 across 1,000+ annotated images",
      balanceInvariant: "Sustained <45ms frame latency budget on RTX 3060 across 1,000+ multi-weather road test frames",
      swaggerDocUrl: null,
    },
    impactMetrics: [
      { label: "Frame Latency", value: "< 45 ms", detail: "Real-time edge GPU inference" },
      { label: "Dataset Size", value: "1,000+", detail: "Multi-condition annotated images" },
      { label: "Detection Architecture", value: "YOLOv8", detail: "Multi-class bounding box regression" },
      { label: "Research Status", value: "Master's Thesis", detail: "Central University of Rajasthan" },
    ],
    engineeringBreakdown: {
      title: "What I Actually Engineered vs. What Libraries Handled",
      customEngineered: [
        {
          module: "Adverse Weather Augmentation Pipeline",
          description: "Developed automated OpenCV augmentation scripts simulating heavy rainfall streaks, asphalt glare, and low-light dynamic range across 1,000+ custom annotated frames.",
        },
        {
          module: "TensorRT Latency Optimization",
          description: "Pruned input layers and quantized weights to FP16, maintaining steady sub-45ms inference latency on resource-constrained embedded GPU devices.",
        },
        {
          module: "Heuristic Reflection Suppression",
          description: "Built an HSV color and ground-plane spatial filter to eliminate false-positive obstacle detections triggered by street lamp reflections on wet asphalt.",
        },
      ],
      librariesHandled: [
        {
          module: "Ultralytics YOLOv8",
          description: "Convolutional backbone architecture, loss functions, and backpropagation gradients.",
        },
        {
          module: "OpenCV",
          description: "Low-level image matrix decoding, affine transforms, and color space conversions.",
        },
        {
          module: "PyTorch & CUDA",
          description: "GPU tensor math execution and kernel scheduling.",
        },
      ],
    },
    dumbestBug: {
      title: "The Phantom Pedestrian in the Wet Asphalt",
      summary: "When the vision model hallucinated people standing in the middle of empty highway puddles.",
      warStory:
        "During rain dataset validation, our YOLOv8 model was consistently detecting a pedestrian standing in the center lane of an empty highway with 86% confidence. After double-checking the training labels for bad human annotator boxes, I inspected the raw video frame: there was no one there—just a vertical reflection of an amber overhead street lamp stretched across a puddle on the wet road.\n\nThe wet asphalt had distorted the reflection into a narrow, vertical shape whose aspect ratio and gradient profile closely matched the pedestrian anchor box priors. The model wasn't broken—it was doing exactly what it was trained to do on pixel patterns. Fixed by designing an OpenCV pre-filter that analyzes HSV saturation and vertical aspect ratio anomalies near the ground plane, dampening puddle reflection glare before feeding tensors to the model.",
    },
    problemStatement:
      "Autonomous perception systems require fast, reliable object detection across changing lighting, rain, and shadow conditions without exceeding real-time processing budgets.",
    motivation:
      "Completed as Master's dissertation at Central University of Rajasthan, evaluating convolutional neural network inference under strict latency limits.",
    architecture: [
      {
        title: "1. Dataset Augmentation Pipeline",
        detail: "Preprocessed and augmented 1,000+ road images with OpenCV using brightness normalization and bounding-box validation.",
      },
      {
        title: "2. YOLOv8 Deep Learning Model",
        detail: "Trained and fine-tuned YOLOv8 architecture to classify and localize vehicles, pedestrians, and obstacles simultaneously.",
      },
      {
        title: "3. Inference Optimization",
        detail: "Optimized model graph and input pipeline to achieve sustained sub-45ms per frame inference with high mean Average Precision (mAP).",
      },
    ],
    outcomes: [
      "Achieved sub-45ms per frame inference latency suitable for real-time video streams.",
      "High mAP across multi-weather road datasets, validated as Master's dissertation research.",
    ],
  },
];

export const FEATURED_PROJECTS = PROJECTS.filter((p) => p.isFlagship || p.featured);
export const OTHER_PROJECTS = PROJECTS.filter((p) => !p.isFlagship && !p.featured);
export const ALL_PROJECTS = PROJECTS;

export function getProjectBySlug(slug) {
  return ALL_PROJECTS.find((p) => p.slug === slug || p.id === slug) || null;
}
