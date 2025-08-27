import Hero from "@/components/Hero";

export default function Home() {
  return (
    <div className="space-y-10">
      <Hero />
      {/* Optional: quick links or highlights */}
      <section className="grid gap-6 md:grid-cols-3">
        <div className="rounded-2xl border p-6">
          <h3 className="font-semibold">Partner Projects</h3>
          <p className="mt-2 text-gray-600">R&D and product experiments.</p>
        </div>
        <div className="rounded-2xl border p-6">
          <h3 className="font-semibold">Insights</h3>
          <p className="mt-2 text-gray-600">Notes, deep dives, announcements.</p>
        </div>
        <div className="rounded-2xl border p-6">
          <h3 className="font-semibold">Collaborate</h3>
          <p className="mt-2 text-gray-600">Get in touch about new ideas.</p>
        </div>
      </section>
    </div>
  );
}
