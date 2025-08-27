import type { MetadataRoute } from "next";
import fs from "node:fs";
import path from "node:path";
import type { MDXModule, InsightMeta, ProjectMeta } from "@/types/mdx";

const ORIGIN =
  process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/+$/, "") ||
  "https://commvergent.com";

function safeReadDir(relPath: string): fs.Dirent[] {
  try {
    const dir = path.join(process.cwd(), relPath);
    return fs.readdirSync(dir, { withFileTypes: true });
  } catch {
    return [];
  }
}

function lastModFrom(relPathFile: string, metaDate?: string): Date {
  if (metaDate) return new Date(metaDate);
  try {
    const stat = fs.statSync(path.join(process.cwd(), relPathFile));
    return stat.mtime;
  } catch {
    return new Date();
  }
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const routes: MetadataRoute.Sitemap = [
    { url: `${ORIGIN}/`, lastModified: new Date() },
    { url: `${ORIGIN}/about`, lastModified: new Date() },
    { url: `${ORIGIN}/contact`, lastModified: new Date() },
    { url: `${ORIGIN}/projects`, lastModified: new Date() },
    { url: `${ORIGIN}/insights`, lastModified: new Date() },
  ];

  // Insights (MDX)
  const insightFiles = safeReadDir("src/content/insights").filter(
    (d) => d.isFile() && d.name.endsWith(".mdx"),
  );
  for (const d of insightFiles) {
    const slug = d.name.replace(/\.mdx$/, "");
    try {
      const mod = (await import(
        `@/content/insights/${slug}.mdx`
      )) as MDXModule<InsightMeta>;
      const meta = mod.meta ?? {};
      if (meta.draft) continue;
      routes.push({
        url: `${ORIGIN}/insights/${slug}`,
        lastModified: lastModFrom(`src/content/insights/${d.name}`, meta.date),
      });
    } catch {
      /* ignore */
    }
  }

  // Projects (MDX)
  const projectFiles = safeReadDir("src/content/projects").filter(
    (d) => d.isFile() && d.name.endsWith(".mdx"),
  );
  for (const d of projectFiles) {
    const slug = d.name.replace(/\.mdx$/, "");
    try {
      const mod = (await import(
        `@/content/projects/${slug}.mdx`
      )) as MDXModule<ProjectMeta>;
      const meta = mod.meta ?? {};
      if (meta.draft) continue;
      routes.push({
        url: `${ORIGIN}/projects/${slug}`,
        lastModified: lastModFrom(`src/content/projects/${d.name}`, meta.date),
      });
    } catch {
      /* ignore */
    }
  }

  return routes;
}
