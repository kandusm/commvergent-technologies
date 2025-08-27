// src/app/insights/page.tsx
import path from "path";
import { promises as fs } from "fs";
import type { BaseMeta, MDXModule } from "@/types/mdx";

async function getContentDir(base: "insights") {
  const tryA = path.join(process.cwd(), "src", "content", base);
  const tryB = path.join(process.cwd(), "content", base);
  for (const p of [tryA, tryB]) {
    try {
      const stat = await fs.stat(p);
      if (stat.isDirectory()) return p;
    } catch {}
  }
  return null;
}

type InsightListItem = { slug: string } & BaseMeta;

export default async function InsightsPage() {
  const dir = await getContentDir("insights");
  const files = dir ? (await fs.readdir(dir)).filter(f => f.endsWith(".mdx")) : [];

  const posts: InsightListItem[] = await Promise.all(
    files.map(async (file) => {
      const slug = file.replace(/\.mdx$/, "");
      const mod = (await import(`@/content/insights/${slug}.mdx`)) as unknown as MDXModule<BaseMeta>;
      const meta = mod.meta ?? {};
      return { slug, ...meta };
    })
  );

  posts.sort((a, b) => +new Date(b.date ?? 0) - +new Date(a.date ?? 0));

  return (
    <section className="space-y-6">
      <h1 className="text-3xl font-bold">Insights</h1>
      {posts.length === 0 ? (
        <p className="text-gray-600">No posts yet.</p>
      ) : (
        <ul className="space-y-4">
          {posts.map((p) => (
            <li key={p.slug}>
              <a className="underline" href={`/insights/${p.slug}`}>
                {p.title || p.slug}
              </a>
              {p.summary && <div className="text-sm text-gray-600">{p.summary}</div>}
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
