// src/app/projects/[slug]/page.tsx
import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import fs from "node:fs";
import path from "node:path";

import type { MDXModule, ProjectMeta } from "@/types/mdx";

/** Pre-render all project slugs under src/content/projects/*.mdx */
export async function generateStaticParams(): Promise<Array<{ slug: string }>> {
  try {
    const dir = path.join(process.cwd(), "src/content/projects");
    const files = fs.readdirSync(dir, { withFileTypes: true });
    return files
      .filter((d) => d.isFile() && d.name.endsWith(".mdx"))
      .map((d) => ({ slug: d.name.replace(/\.mdx$/, "") }));
  } catch {
    // Directory may not exist yet
    return [];
  }
}

/** SEO metadata populated from the MDX frontmatter */
export async function generateMetadata(
  { params }: { params: Promise<{ slug: string }> }
): Promise<Metadata> {
  const { slug } = await params;
  const mod = (await import(`@/content/projects/${slug}.mdx`)) as MDXModule<ProjectMeta>;
  const m = mod.meta ?? {};
  const url = `/projects/${slug}`; // resolved against metadataBase in layout.tsx

  return {
    title: m.title,
    description: m.summary,
    alternates: { canonical: url },
    openGraph: {
      type: "article",
      title: m.title,
      description: m.summary,
      url,
      images: m.hero ? [{ url: m.hero }] : undefined,
      publishedTime: m.date,
      authors: ["CommVergent Technologies"],
    },
    twitter: {
      card: "summary_large_image",
      title: m.title,
      description: m.summary,
      images: m.hero ? [m.hero] : undefined,
    },
    robots: m.draft ? { index: false, follow: false } : undefined,
  };
}

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  try {
    const mod = (await import(`@/content/projects/${slug}.mdx`)) as MDXModule<ProjectMeta>;
    const MDXContent = mod.default;
    const meta = mod.meta ?? {};

    // Hide drafts in production (optional)
    if (meta.draft && process.env.NODE_ENV === "production") {
      notFound();
    }

    const dateLabel = meta.date
      ? new Date(meta.date).toLocaleDateString("en-US", {
          year: "numeric",
          month: "short",
          day: "numeric",
        })
      : null;

    // Absolute URL for JSON-LD
    const origin = process.env.NEXT_PUBLIC_SITE_URL ?? "https://commvergent.com";
    const canonical = `${origin}/projects/${slug}`;

    return (
      <article className="mx-auto max-w-3xl px-6 py-8">
        {/* Back link */}
        <Link
          href="/projects"
          className="mb-3 inline-flex items-center gap-2 text-sm text-gray-600 hover:text-black"
        >
          <svg aria-hidden="true" width="18" height="18" viewBox="0 0 24 24" className="-ml-0.5">
            <path
              d="M15 18l-6-6 6-6"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          Back to Projects
        </Link>

        {/* Title + subhead */}
        <header className="mb-6">
          <h1 className="text-4xl md:text-6xl font-extrabold leading-[1.05] tracking-tight">
            {meta.title ?? slug}
          </h1>
          {(meta.client || dateLabel) && (
            <p className="mt-2 text-sm md:text-base text-gray-600">
              {meta.client}
              {meta.client && dateLabel ? " • " : ""}
              {dateLabel}
            </p>
          )}
        </header>

        {/* JSON-LD CreativeWork schema */}
        {meta.title && (
          <script
            type="application/ld+json"
            suppressHydrationWarning
            dangerouslySetInnerHTML={{
              __html: JSON.stringify({
                "@context": "https://schema.org",
                "@type": "CreativeWork",
                name: meta.title,
                datePublished: meta.date,
                description: meta.summary,
                image: meta.hero ? [meta.hero] : undefined,
                mainEntityOfPage: canonical,
                author: { "@type": "Organization", name: "CommVergent Technologies" },
              }),
            }}
          />
        )}

        {/* Body */}
        <div className="prose max-w-none">
          <MDXContent />
        </div>
      </article>
    );
  } catch {
    notFound();
  }
}
