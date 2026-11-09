import { useState } from "react";
import { captureContactSubmitted } from "../lib/posthog.js";

export default function Contact() {
  const [status, setStatus] = useState(null);
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    const form = e.target;
    const formData = new FormData(form);

    try {
      const response = await fetch(
        "https://formspree.io/f/" + import.meta.env.VITE_FORMSPREE_ID,
        {
          method: "POST",
          body: formData,
          headers: { Accept: "application/json" },
        }
      );
      if (response.ok) {
        setStatus("sent");
        captureContactSubmitted();
        form.reset();
        setTimeout(() => setStatus(null), 3000);
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section id="contact" className="py-16 lg:py-24">
      <div className="container-custom">
        <h2 className="text-h2 text-text-primary font-bold mb-12">Let's talk</h2>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact form */}
          <div className="card-glass p-8">
            {status === "sent" ? (
              <div className="flex flex-col items-center justify-center h-full min-h-96">
                <div className="text-5xl mb-4">✓</div>
                <p className="text-text-primary font-semibold text-lg">Message sent!</p>
                <p className="text-text-secondary text-sm mt-2">I'll get back to you soon.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-semibold text-text-secondary mb-2">
                    Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    required
                    className="w-full bg-bg-primary/40 border border-border rounded-lg px-4 py-3 text-text-primary placeholder-text-secondary/50 focus:ring-2 focus:ring-accent focus:border-transparent outline-none transition-all"
                    placeholder="Your name"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-text-secondary mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    name="email"
                    required
                    className="w-full bg-bg-primary/40 border border-border rounded-lg px-4 py-3 text-text-primary placeholder-text-secondary/50 focus:ring-2 focus:ring-accent focus:border-transparent outline-none transition-all"
                    placeholder="your@email.com"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-text-secondary mb-2">
                    Message
                  </label>
                  <textarea
                    name="message"
                    rows={5}
                    required
                    className="w-full bg-bg-primary/40 border border-border rounded-lg px-4 py-3 text-text-primary placeholder-text-secondary/50 focus:ring-2 focus:ring-accent focus:border-transparent outline-none resize-none transition-all"
                    placeholder="What's on your mind?"
                  />
                </div>
                <button
                  type="submit"
                  disabled={submitting}
                  className="btn-primary w-full"
                >
                  {submitting ? "Sending..." : "Send Message"}
                </button>
              </form>
            )}
          </div>

          {/* Direct links */}
          <div className="flex flex-col justify-between">
            <div>
              <h3 className="text-text-primary font-bold text-lg mb-6">Or reach out directly:</h3>
              <div className="space-y-4">
                <a
                  href="mailto:priyanshu.nawal.dev@gmail.com"
                  className="flex items-center gap-4 p-4 rounded-lg border border-border hover:border-accent bg-bg-secondary/30 hover:bg-bg-secondary/50 transition-all group"
                >
                  <span className="text-2xl">✉️</span>
                  <div>
                    <p className="text-text-secondary text-sm">Email</p>
                    <p className="text-text-primary font-semibold group-hover:text-accent transition-colors">
                      priyanshu.nawal.dev@gmail.com
                    </p>
                  </div>
                </a>

                <a
                  href="https://linkedin.com/in/priyanshunawal"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-4 p-4 rounded-lg border border-border hover:border-accent bg-bg-secondary/30 hover:bg-bg-secondary/50 transition-all group"
                >
                  <span className="text-2xl">💼</span>
                  <div>
                    <p className="text-text-secondary text-sm">LinkedIn</p>
                    <p className="text-text-primary font-semibold group-hover:text-accent transition-colors">
                      @priyanshunawal
                    </p>
                  </div>
                </a>

                <a
                  href="https://github.com/priyanshunawaldev"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-4 p-4 rounded-lg border border-border hover:border-accent bg-bg-secondary/30 hover:bg-bg-secondary/50 transition-all group"
                >
                  <span className="text-2xl">🔗</span>
                  <div>
                    <p className="text-text-secondary text-sm">GitHub</p>
                    <p className="text-text-primary font-semibold group-hover:text-accent transition-colors">
                      @priyanshunawaldev
                    </p>
                  </div>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
