import Link from "next/link";

export default function Hero() {
  return (
    <section className="relative overflow-hidden rounded-2xl border bg-gradient-to-br from-[var(--brand-red)] to-black text-white">
      {/* subtle vignette */}
      <div
        aria-hidden
        className="absolute inset-0 opacity-15 [mask-image:radial-gradient(ellipse_at_center,black,transparent_70%)]"
      />
      <div className="relative mx-auto max-w-6xl px-6 py-16">
        <div className="max-w-2xl">
          <h1 className="text-4xl font-bold tracking-tight">
            Building the Future Through Technology and Ideas
          </h1>
          <p className="mt-4 text-white/80">
            Partner-driven innovation across software development, emerging tech, and idea
            incubation.
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              href="/projects"
              className="rounded-2xl bg-white px-5 py-3 font-medium text-[var(--brand-black)] shadow hover:opacity-90"
            >
              Explore Projects
            </Link>
            <Link
              href="/insights"
              className="rounded-2xl border border-white/30 bg-white/10 px-5 py-3 font-medium text-white backdrop-blur hover:bg-white/20"
            >
              Read Insights
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
