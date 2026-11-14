import {
  Activity,
  Terminal,
  Zap,
  CheckCircle2,
  ShieldCheck,
  Database,
  Radio,
  ArrowRight,
  ArrowDown,
  Cpu,
  Layers,
  Globe,
  Mic,
  Sparkles,
} from "lucide-react";

const PIPELINES = {
  "pulse-engine": {
    title: "End-to-End Ledger Transaction Pipeline",
    badge: "SERIALIZABLE ISOLATION",
    badgeColor: "text-emerald-700 dark:text-emerald-400 border-emerald-600/30 bg-emerald-500/10",
    icon: Activity,
    stages: [
      {
        step: "01",
        label: "INGRESS",
        title: "HTTP POST",
        detail: "Client transfer request with unique idempotency key header",
        tag: "FastAPI Async",
        icon: Globe,
        flowLabel: "Idempotency Key",
        highlight: false,
      },
      {
        step: "02",
        label: "FILTER",
        title: "SHA-256 Gate",
        detail: "Catches duplicate retries in <1ms before database locks",
        tag: "Redis In-Memory",
        icon: ShieldCheck,
        flowLabel: "Cache Miss",
        highlight: true,
      },
      {
        step: "03",
        label: "EXECUTE",
        title: "Deterministic Lock",
        detail: "Sorted account IDs eliminate circular deadlock cycles",
        tag: "PostgreSQL · min(A,B)",
        icon: Database,
        flowLabel: "Async Commit",
        highlight: false,
      },
      {
        step: "04",
        label: "RECONCILE",
        title: "Continuous Audit",
        detail: "Validates sum(debit) == sum(credit) across ledger records",
        tag: "Celery Workers",
        icon: Activity,
        highlight: false,
      },
    ],
  },
  prepwise: {
    title: "Full-Duplex Voice Latency Architecture",
    badge: "< 800ms ROUND-TRIP",
    badgeColor: "text-blue-700 dark:text-blue-400 border-blue-600/30 bg-blue-500/10",
    icon: Radio,
    stages: [
      {
        step: "01",
        label: "CAPTURE",
        title: "16kHz PCM Stream",
        detail: "Continuous mic buffers streamed via binary WebSocket",
        tag: "Audio Ingestion",
        icon: Mic,
        flowLabel: "Binary WS",
        highlight: false,
      },
      {
        step: "02",
        label: "TURN-TAKING",
        title: "Silence & VAD",
        detail: "Detects human interruptions and natural speech pauses",
        tag: "Vapi Voice Agent",
        icon: Radio,
        flowLabel: "<800ms Latency",
        highlight: true,
      },
      {
        step: "03",
        label: "INTELLIGENCE",
        title: "Follow-Up LLM",
        detail: "Generates conversational context and follow-up probes",
        tag: "Gemini AI",
        icon: Sparkles,
        flowLabel: "Rubric Scoring",
        highlight: false,
      },
      {
        step: "04",
        label: "EVALUATION",
        title: "Rubric Scoring",
        detail: "Synthesizes feedback across 12 interview criteria",
        tag: "Structured Scoring",
        icon: CheckCircle2,
        highlight: false,
      },
    ],
  },
  reflex: {
    title: "Offline Terminal Architecture & State Flow",
    badge: "0 KB NETWORK EGRESS",
    badgeColor: "text-accent border-accent/30 bg-accent/10",
    icon: Terminal,
    stages: [
      {
        step: "01",
        label: "COLD START",
        title: "Lazy CLI Engine",
        detail: "Deferred heavy imports launch CLI in under 25ms",
        tag: "uv + Typer CLI",
        icon: Terminal,
        flowLabel: "<25ms Startup",
        highlight: false,
      },
      {
        step: "02",
        label: "STATE MACHINE",
        title: "Atomic SQLite",
        detail: "Locally manages focus intervals and developer task state",
        tag: "~/.reflex/data.db",
        icon: Database,
        flowLabel: "Zero Network",
        highlight: true,
      },
      {
        step: "03",
        label: "CORRELATION",
        title: "Local Git Log",
        detail: "Attributes authored branch commits to focus timers",
        tag: "Local Only",
        icon: Layers,
        flowLabel: "On-Device",
        highlight: false,
      },
      {
        step: "04",
        label: "SYNTHESIS",
        title: "Local Ollama LLM",
        detail: "Generates daily standup summaries on-device",
        tag: "100% Private",
        icon: Cpu,
        highlight: false,
      },
    ],
  },
  "task-workflow-system": {
    title: "Relational Workflow Management Pipeline",
    badge: "TRANSACTIONAL INTEGRITY",
    badgeColor: "text-emerald-700 dark:text-emerald-400 border-emerald-600/30 bg-emerald-500/10",
    icon: Layers,
    stages: [
      {
        step: "01",
        label: "VALIDATION",
        title: "Client & API Input",
        detail: "Validates payloads before backend request processing",
        tag: "JavaScript + REST",
        icon: Globe,
        flowLabel: "Validated Payload",
        highlight: false,
      },
      {
        step: "02",
        label: "ROUTING",
        title: "Django CRUD API",
        detail: "Processes task creation, updates, and priority filters",
        tag: "Python / Django",
        icon: Layers,
        flowLabel: "ORM Query",
        highlight: true,
      },
      {
        step: "03",
        label: "PERSISTENCE",
        title: "Normalized MySQL",
        detail: "Enforces primary and foreign key constraints across tables",
        tag: "MySQL",
        icon: Database,
        flowLabel: "Commit",
        highlight: false,
      },
      {
        step: "04",
        label: "RENDERING",
        title: "Live Task State",
        detail: "Updates task cards and deadline filters in place",
        tag: "100+ Tasks",
        icon: CheckCircle2,
        highlight: false,
      },
    ],
  },
  "autonomous-vehicle-cv": {
    title: "Real-Time Object Detection Pipeline",
    badge: "< 45ms INFERENCE",
    badgeColor: "text-accent border-accent/30 bg-accent/10",
    icon: Cpu,
    stages: [
      {
        step: "01",
        label: "INGESTION",
        title: "Road Frame Stream",
        detail: "Multi-condition driving image and video frame ingestion",
        tag: "OpenCV",
        icon: Globe,
        flowLabel: "Frame Buffer",
        highlight: false,
      },
      {
        step: "02",
        label: "PREPROCESSING",
        title: "Augmentation",
        detail: "Brightness normalization, scaling, and label validation",
        tag: "OpenCV + NumPy",
        icon: Cpu,
        flowLabel: "1,000+ Samples",
        highlight: true,
      },
      {
        step: "03",
        label: "INFERENCE",
        title: "YOLOv8 Engine",
        detail: "Multi-class bounding box regression and classification",
        tag: "<45ms / Frame",
        icon: Zap,
        flowLabel: "Detections",
        highlight: false,
      },
      {
        step: "04",
        label: "OUTPUT",
        title: "Object Localization",
        detail: "Identifies vehicles, pedestrians, and road obstacles",
        tag: "High mAP",
        icon: CheckCircle2,
        highlight: false,
      },
    ],
  },
};

export function ArchitecturePipeline({ projectId }) {
  const pipeline = PIPELINES[projectId] || PIPELINES["pulse-engine"];
  const IconComponent = pipeline.icon || Activity;

  return (
    <div className="p-5 sm:p-6 rounded-xl border border-border bg-bg-primary/60 space-y-5">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between pb-4 border-b border-border gap-3">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-lg bg-accent/10 border border-accent/25 flex items-center justify-center text-accent shrink-0">
            <IconComponent size={18} />
          </div>
          <div>
            <span className="text-[11px] mono uppercase tracking-wider text-text-secondary block">
              Architecture Flow
            </span>
            <h4 className="text-sm sm:text-base font-bold text-text-primary">
              {pipeline.title}
            </h4>
          </div>
        </div>

        <span className={`px-2.5 py-1 rounded-md border text-[11px] mono font-bold self-start sm:self-auto ${pipeline.badgeColor}`}>
          {pipeline.badge}
        </span>
      </div>

      {/* Responsive Stage Grid */}
      <div className="flex flex-col lg:flex-row items-stretch lg:items-center gap-2.5">
        {pipeline.stages.map((stage, idx) => {
          const StageIcon = stage.icon || Cpu;

          return (
            <div key={stage.step} className="flex-1 flex flex-col lg:flex-row items-center gap-2">
              <div
                className={`w-full h-full min-h-[156px] p-4 rounded-xl border flex flex-col justify-between transition-colors ${
                  stage.highlight
                    ? "border-accent/60 bg-accent/5"
                    : "border-border bg-bg-secondary"
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[11px] mono font-bold text-accent bg-accent/10 px-2 py-0.5 rounded">
                      {stage.step}
                    </span>
                    <StageIcon size={15} className="text-text-secondary" />
                  </div>

                  <div className="text-[10px] text-text-secondary mono font-semibold tracking-wider">
                    {stage.label}
                  </div>
                  <div className="font-bold text-text-primary text-sm mt-0.5">
                    {stage.title}
                  </div>
                  <p className="text-xs text-text-secondary mt-1 leading-relaxed">
                    {stage.detail}
                  </p>
                </div>

                <div className="mt-3 pt-2 border-t border-border/60 text-[11px] mono text-accent font-semibold">
                  {stage.tag}
                </div>
              </div>

              {idx < pipeline.stages.length - 1 && (
                <div
                  className="flex flex-col items-center justify-center text-accent shrink-0 py-0.5 lg:py-0"
                  aria-hidden="true"
                >
                  <ArrowRight className="hidden lg:block w-4 h-4" />
                  <ArrowDown className="lg:hidden w-4 h-4" />
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
