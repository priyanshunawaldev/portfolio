import posthog from "posthog-js";

let ph = null;
if (import.meta.env.VITE_POSTHOG_KEY) {
  ph = posthog.init(import.meta.env.VITE_POSTHOG_KEY, {
    api_host: "https://app.posthog.com",
  });
}

export const capturePageView = () => ph?.capture("$pageview");
export const captureProjectClick = (projectName) =>
  ph?.capture("project_click", { project: projectName });
export const captureDownload = () => ph?.capture("download");
export const captureContactSubmitted = () =>
  ph?.capture("contact_submitted");
