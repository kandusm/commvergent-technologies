import Link from "next/link";

export const metadata = {
  title: "About — CommVergent Technologies",
  description:
    "Who we are, how we work, and why CommVergent Technologies is separate from CommVergent Automation.",
};

export default function AboutPage() {
  // Read your Microsoft Bookings link if you’ve set it (BOOKING_URL) — optional CTA
  const raw = (process.env.BOOKING_URL ?? "").trim();
  const bookingUrl =
    raw && (raw.startsWith("http://") || raw.startsWith("https://"))
      ? raw
      : raw
      ? `https://${raw}`
      : "";
  const hasBooking = bookingUrl.length > 0;

  return (
    <article className="mx-auto max-w-3xl px-6 py-12">
      {/* Header */}
      <header className="mb-8">
        <h1 className="text-4xl md:text-6xl font-extrabold leading-[1.05] tracking-tight">
          About CommVergent Technologies
        </h1>
        <p className="mt-3 text-lg text-gray-700">
          A senior engineering studio for ideas that need to become products—fast, clean, and
          maintainable.
        </p>
      </header>

      {/* Brand split note */}
      <section className="mb-10 rounded-2xl border p-5">
        <h2 className="text-xl font-semibold">Two brands, one shared DNA</h2>
        <p className="mt-2 text-gray-700">
          CommVergent Technologies focuses on{" "}
          <strong>software, data, and product engineering</strong>.{" "}
          <a
            href="https://automation.commvergent.com"
            target="_blank"
            rel="noopener noreferrer"
            className="underline"
          >
            CommVergent Automation
          </a>{" "}
          is a separate practice focused on industrial and workflow automation. Some partners overlap,
          many do not; the missions and sites remain distinct by design.
        </p>
      </section>

      {/* What we do */}
      <section className="mb-10">
        <h2 className="text-2xl font-bold">What we do</h2>
        <ul className="mt-3 list-disc pl-6 space-y-2 text-gray-800">
          <li>Ship greenfield products and internal tools with a senior-heavy team.</li>
          <li>Untangle legacy codebases and modernize build/test/deploy pipelines.</li>
          <li>Stand up data/AI prototypes that are production-viable, not throwaways.</li>
          <li>Design simple systems first—optimize only where it matters.</li>
        </ul>
      </section>

      {/* How we work */}
      <section className="mb-10">
        <h2 className="text-2xl font-bold">How we work</h2>
        <div className="mt-3 grid gap-4 sm:grid-cols-2">
          <div className="rounded-2xl border p-4">
            <h3 className="font-semibold">Small, senior teams</h3>
            <p className="mt-1 text-gray-700">
              Fewer meetings, more ownership. Partners write code and make architectural decisions.
            </p>
          </div>
          <div className="rounded-2xl border p-4">
            <h3 className="font-semibold">Clarity over ceremony</h3>
            <p className="mt-1 text-gray-700">
              Lightweight docs, visible roadmaps, and one source of truth for scope and state.
            </p>
          </div>
          <div className="rounded-2xl border p-4">
            <h3 className="font-semibold">Automate the boring</h3>
            <p className="mt-1 text-gray-700">
              Bootstrap scripts, CI checks, and scaffolds so teams move faster with fewer regressions.
            </p>
          </div>
          <div className="rounded-2xl border p-4">
            <h3 className="font-semibold">Quality as a habit</h3>
            <p className="mt-1 text-gray-700">
              Tests where they pay, observability from day one, and clean boundaries between concerns.
            </p>
          </div>
        </div>
      </section>

      {/* Capabilities */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold">Capabilities</h2>
        <div className="mt-3 grid gap-3 sm:grid-cols-2">
          {[
            {
              title: "Product Engineering",
              blurb: "Next.js apps, APIs, integrations, and internal tools.",
            },
            {
              title: "Data & AI",
              blurb: "ETL, feature stores, pragmatic ML/AI pilots that can go to prod.",
            },
            {
              title: "Systems & Infra",
              blurb: "Build/test/deploy pipelines, observability, cost-aware scaling.",
            },
            {
              title: "Automation",
              blurb: "When useful, we connect software to real-world workflows and devices.",
            },
          ].map((c) => (
            <div key={c.title} className="rounded-2xl border p-4">
              <h3 className="font-semibold">{c.title}</h3>
              <p className="mt-1 text-gray-700">{c.blurb}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Recent highlights */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold">Recent highlights</h2>
        <ul className="mt-3 list-disc pl-6 space-y-2 text-gray-800">
          <li>
            <Link href="/projects/design-manufacturing-workflow-automation" className="underline">
              Design & manufacturing workflow automation
            </Link>{" "}
            — end-to-end asset, listing, and work-order pipeline.
          </li>
          <li>
            <Link href="/insights/brand-architecture-split" className="underline">
              Why we split the brands
            </Link>{" "}
            — positioning CommVergent Technologies and CommVergent Automation clearly.
          </li>
        </ul>
      </section>

      {/* CTA */}
      <section className="rounded-2xl border p-5">
        <h2 className="text-xl font-semibold">Let’s talk</h2>
        <p className="mt-2 text-gray-700">
          Have a product to ship or a system to simplify? We’ll help you get there quickly and cleanly.
        </p>

        <div className="mt-4 flex flex-wrap gap-3">
          <Link
            href="/contact"
            className="rounded-2xl border px-4 py-2 font-medium hover:bg-gray-50"
          >
            Contact us
          </Link>

          {hasBooking ? (
            <a
              href={bookingUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-2xl bg-[var(--brand-red)] px-4 py-2 font-medium text-white hover:opacity-90"
            >
              Schedule a call
            </a>
          ) : null}
        </div>
      </section>
    </article>
  );
}
