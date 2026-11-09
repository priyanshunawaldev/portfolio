export default function About() {
  return (
    <section id="about" className="py-16 lg:py-24 -mt-16 relative z-10">
      <div className="container-custom">
        <div className="max-w-3xl">
          <h2 className="text-h2 text-text-primary font-bold mb-6">About</h2>
          <p className="text-lg text-text-secondary leading-relaxed mb-6">
            Computer Science graduate with a focus on building robust, scalable backend systems. I care deeply about hard problems done well — distributed systems, idempotency under retries, deadlock-free locking, and reconciliation that doesn't lie.
          </p>
          <p className="text-lg text-text-secondary leading-relaxed">
            Everything ships tested, in public. Always learning, always building.
          </p>
        </div>
      </div>
    </section>
  );
}
