"use client";

import * as React from "react";

type SubmitState = "idle" | "submitting" | "success" | "error";

type FormValues = {
  name: string;
  email: string;
  message: string;
  _gotcha?: string;  // honeypot
  _subject?: string; // optional subject for Formspree
};

type FormspreeSuccess = { ok: true };
type FormspreeError = { errors?: Array<{ code?: string; message?: string }> };

const CONTACT_EMAIL =
  process.env.NEXT_PUBLIC_CONTACT_EMAIL ?? "hello@commvergent.com";

const FORMSPREE_ID = process.env.NEXT_PUBLIC_FORMSPREE_ID ?? "";
const FORMSPREE_ENDPOINT = FORMSPREE_ID
  ? `https://formspree.io/f/${FORMSPREE_ID}`
  : "";

export default function ContactForm() {
  const [state, setState] = React.useState<SubmitState>("idle");
  const [error, setError] = React.useState<string | null>(null);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setState("submitting");
    setError(null);

    if (!FORMSPREE_ENDPOINT) {
      setState("error");
      setError(
        "Form endpoint not configured. Set NEXT_PUBLIC_FORMSPREE_ID in .env.local and restart."
      );
      return;
    }

    const form = e.currentTarget;
    const formData = new FormData(form);

    const payload: FormValues = {
      name: String(formData.get("name") ?? ""),
      email: String(formData.get("email") ?? ""),
      message: String(formData.get("message") ?? ""),
      _gotcha: String(formData.get("_gotcha") ?? ""),
      _subject: "New contact from commvergent.com",
    };

    // Optional: if honeypot filled, silently succeed
    if (payload._gotcha && payload._gotcha.trim().length > 0) {
      setState("success");
      form.reset();
      return;
    }

    try {
      const res = await fetch(FORMSPREE_ENDPOINT, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const ct = res.headers.get("content-type") ?? "";
      if (!ct.includes("application/json")) {
        await res.text(); // consume body for completeness
        throw new Error(`Unexpected response (${res.status}).`);
      }

      const json: FormspreeSuccess | FormspreeError = await res.json();

      if (!res.ok || !("ok" in json && json.ok === true)) {
        const msg =
          "errors" in json && json.errors && json.errors.length > 0
            ? json.errors[0]?.message ?? "Form submission failed."
            : "Form submission failed.";
        throw new Error(msg);
      }

      setState("success");
      form.reset();
    } catch (err) {
      setState("error");
      setError(err instanceof Error ? err.message : "Unknown error");
    }
  }

  return (
    <form onSubmit={onSubmit} className="space-y-4" noValidate>
      {/* Honeypot */}
      <input
        type="text"
        name="_gotcha"
        tabIndex={-1}
        autoComplete="off"
        className="hidden"
        aria-hidden="true"
      />

      <div className="grid gap-3 sm:grid-cols-2">
        <div>
          <label htmlFor="name" className="block text-sm text-gray-700">
            Name
          </label>
          <input
            required
            id="name"
            name="name"
            type="text"
            autoComplete="name"
            className="mt-1 w-full rounded-xl border px-3 py-2 outline-none focus:ring"
            placeholder="Your name"
            aria-invalid={state === "error" && !!error}
          />
        </div>

        <div>
          <label htmlFor="email" className="block text-sm text-gray-700">
            Email
          </label>
          <input
            required
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            className="mt-1 w-full rounded-xl border px-3 py-2 outline-none focus:ring"
            placeholder="you@company.com"
            aria-invalid={state === "error" && !!error}
          />
        </div>
      </div>

      <div>
        <label htmlFor="message" className="block text-sm text-gray-700">
          Message
        </label>
        <textarea
          required
          id="message"
          name="message"
          rows={5}
          className="mt-1 w-full rounded-xl border px-3 py-2 outline-none focus:ring"
          placeholder="Tell us a bit about your project or idea…"
          aria-invalid={state === "error" && !!error}
        />
      </div>

      <div className="flex flex-wrap items-center gap-3">
        <button
          type="submit"
          disabled={state === "submitting" || state === "success"}
          className="rounded-2xl bg-[var(--brand-red)] px-5 py-2.5 text-white shadow hover:opacity-90 disabled:opacity-60"
        >
          {state === "submitting"
            ? "Sending…"
            : state === "success"
            ? "Sent ✔"
            : "Send message"}
        </button>

        <a
          href={`mailto:${CONTACT_EMAIL}`}
          className="rounded-2xl border px-4 py-2 text-sm hover:bg-gray-50"
        >
          Email us instead
        </a>

        <span role="status" aria-live="polite" className="text-sm text-gray-600">
          {state === "success" && "Thanks! We’ll get back to you soon."}
          {state === "error" && error}
        </span>
      </div>
    </form>
  );
}
