let phInstance = null;
let phInitPromise = null;

const runIdle = (fn) => {
  if (typeof window !== "undefined" && "requestIdleCallback" in window) {
    window.requestIdleCallback(fn, { timeout: 2000 });
  } else {
    setTimeout(fn, 100);
  }
};

const getPostHog = async () => {
  const apiKey = import.meta.env.VITE_POSTHOG_KEY;
  if (!apiKey) return null;

  if (phInstance) return phInstance;

  if (!phInitPromise) {
    phInitPromise = import("posthog-js")
      .then(({ default: posthog }) => {
        phInstance = posthog.init(apiKey, {
          api_host: "https://app.posthog.com",
          autocapture: false,
          capture_pageview: false,
        });
        return phInstance;
      })
      .catch((err) => {
        console.warn("PostHog initialization skipped or failed:", err);
        return null;
      });
  }

  return phInitPromise;
};

export const capturePageView = () => {
  runIdle(async () => {
    try {
      const client = await getPostHog();
      client?.capture("$pageview");
    } catch {
      // Non-blocking analytics fallback
    }
  });
};

export const captureProjectClick = (projectName) => {
  runIdle(async () => {
    try {
      const client = await getPostHog();
      client?.capture("project_click", { project: projectName });
    } catch {
      // Non-blocking analytics fallback
    }
  });
};

export const captureDownload = () => {
  runIdle(async () => {
    try {
      const client = await getPostHog();
      client?.capture("download", { file: "Priyanshu_Nawal_Resume.pdf" });
    } catch {
      // Non-blocking analytics fallback
    }
  });
};

export const captureContactSubmitted = () => {
  runIdle(async () => {
    try {
      const client = await getPostHog();
      client?.capture("contact_submitted");
    } catch {
      // Non-blocking analytics fallback
    }
  });
};
