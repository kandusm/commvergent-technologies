// src/app/contact/page.tsx
import ContactForm from "@/components/ContactForm";

export const dynamic = "force-dynamic"; // ensure env is read at request time

export const metadata = {
  title: "Contact — CommVergent Technologies",
  description: "Get in touch to discuss projects, partnerships, or ideas.",
};

export default function ContactPage() {
  const raw = (process.env.NEXT_PUBLIC_BOOKING_URL ?? "").trim();
  if (process.env.NODE_ENV === "production" && !raw) {
  throw new Error("BOOKING_URL is not set in the environment.");
}
  const bookingUrl =
    raw && (raw.startsWith("http://") || raw.startsWith("https://"))
      ? raw
      : raw
      ? `https://${raw}`
      : "";

  const contactEmail =
    (process.env.NEXT_PUBLIC_CONTACT_EMAIL ?? "contact@commvergent.com").trim();

  const enabled = bookingUrl.length > 0;

  return (
    <section className="space-y-10">
      <header className="space-y-2">
        <h1 className="text-3xl font-bold">Contact</h1>
        <p className="text-gray-600">
          Short form for quick notes. Prefer to talk? Schedule a call.
        </p>
      </header>

      <div className="grid gap-10 md:grid-cols-3">
        <div className="md:col-span-2 rounded-2xl border p-6">
          <ContactForm />
        </div>

        <aside className="rounded-2xl border p-6">
          <h2 className="text-xl font-semibold">Schedule a call</h2>
          <p className="mt-2 text-gray-600">
            Book a quick intro with us. We’ll discuss scope, timing, and fit.
          </p>

          <div className="mt-4 flex flex-col gap-3">
            {enabled ? (
              <a
                href={bookingUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-2xl px-4 py-2 text-center font-medium text-white shadow
                           bg-[var(--brand-red)] hover:opacity-90 focus:outline-none
                           focus:ring-2 focus:ring-[var(--brand-red)] focus:ring-offset-2"
              >
                Schedule a call
              </a>
            ) : (
              <span
                aria-disabled="true"
                className="rounded-2xl px-4 py-2 text-center font-medium text-white shadow
                           bg-[var(--brand-red)] opacity-50 cursor-not-allowed"
                title="Set NEXT_PUBLIC_BOOKING_URL in .env.local and restart"
              >
                Schedule a call
              </span>
            )}

            <a
              href={`mailto:${contactEmail}?subject=CommVergent%20—%20Schedule%20a%20call`}
              className="rounded-2xl border px-4 py-2 text-center hover:bg-gray-50"
            >
              Or email us
            </a>

            {!enabled && (
              <div className="text-xs text-gray-500">
                Add <code>NEXT_PUBLIC_BOOKING_URL</code> in <code>.env.local</code> (include <code>https://</code>), then restart dev / rebuild for prod.
              </div>
            )}
          </div>
        </aside>
      </div>
    </section>
  );
}
