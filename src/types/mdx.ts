import type { ComponentType } from "react";
import type { MDXComponents } from "mdx/types";

/** Common front-matter fields shared by insights/projects */
export interface BaseMeta {
  title?: string;
  date?: string;     // ISO string
  summary?: string;
  hero?: string;
  tags?: string[];
  draft?: boolean;
}

/** Projects can include a client */
export interface ProjectMeta extends BaseMeta {
  client?: string;
}

/** Insights reuse BaseMeta as-is */
export type InsightMeta = BaseMeta;

/** Compiled MDX module shape (default export accepts `components`) */
export interface MDXModule<TMeta extends BaseMeta = BaseMeta> {
  default: ComponentType<{ components?: MDXComponents }>;
  meta?: TMeta;
}
