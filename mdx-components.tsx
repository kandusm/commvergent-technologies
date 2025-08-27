import type { MDXComponents } from "mdx/types";
import * as React from "react";
import Callout from "@/components/Callout";

const H2: React.FC<React.ComponentProps<"h2">> = (props) => (
  <h2 className="mt-10 scroll-m-20 text-2xl font-semibold" {...props} />
);

const A: React.FC<React.ComponentProps<"a">> = (props) => (
  <a className="underline decoration-[var(--brand-red)]" {...props} />
);

const CodeEl: React.FC<React.ComponentProps<"code">> = (props) => (
  <code className="rounded bg-gray-100 px-1 py-0.5" {...props} />
);

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    h2: H2,
    a: A,
    code: CodeEl,
    Callout,
    ...components,
  };
}
