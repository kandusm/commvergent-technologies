// src/app/projects/page.tsx
import path from "path";
import { promises as fs } from "fs";
import Link from "next/link";
import type { MDXModule, ProjectMeta } from "@/types/mdx";

async function getContentDir(base: "projects") {
  const tryA = path.join(process.cwd(), "src", "content", base);
  const tryB = path.join(process.cwd(), "content", base);
  for (const p of [tryA, tryB]) {
    try { const s = await fs.stat(p); if (s.isDirectory()) return p; } catch {}
  }
  return null;
}

type ListedProject = { slug: string } & ProjectMeta;

export default async function ProjectsPage() {
  const dir = await getContentDir("projects");
  const files = dir ? (await fs.readdir(dir)).filter(f => f.endsWith(".mdx")) : [];

  const items: ListedProject[] = await Promise.all(
    files.map(async (file) => {
      const slug = file.replace(/\.mdx$/, "");
      const mod = (await import(`@/content/projects/${slug}.mdx`)) as unknown as MDXModule<ProjectMeta>;
      const meta = mod.meta ?? {};
      return { slug, ...meta };
    })
  );

  items.sort((a, b) => +new Date(b.date ?? 0) - +new Date(a.date ?? 0));

  return (
    <section className="space-y-6">
      <h1 className="text-3xl font-bold">Projects</h1>
      {items.length === 0 ? (
        <p className="text-gray-600">No projects yet.</p>
      ) : (
        <ul className="grid gap-6 md:grid-cols-2">
          {items.map((p) => (
            <li key={p.slug} className="rounded-2xl border p-6">
              <h2 className="text-xl font-semibold">{p.title || p.slug}</h2>
              {p.summary && <p className="mt-2 text-gray-600">{p.summary}</p>}
              <div className="mt-4">
                <Link href={`/projects/${p.slug}`} className="underline">Read more →</Link>
              </div>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
