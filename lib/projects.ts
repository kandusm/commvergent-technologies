export type Project = {
  slug: string;
  title: string;
  summary: string;
  date: string; // ISO date
};

export const projects: Project[] = [
  {
    slug: "ai-lab-toolkit",
    title: "AI Lab Toolkit",
    summary: "Open tools for rapid prototyping and evaluation.",
    date: "2025-08-01",
  },
  {
    slug: "edge-observability",
    title: "Edge Observability",
    summary: "Lightweight telemetry for constrained environments.",
    date: "2025-06-10",
  },
];

export function getProject(slug: string) {
  return projects.find((p) => p.slug === slug) ?? null;
}
