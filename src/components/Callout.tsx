import * as React from "react";

type Variant = "tip" | "note" | "warning" | "danger";

const styles: Record<Variant, string> = {
  tip: "border-green-300 bg-green-50 text-green-900",
  note: "border-blue-300 bg-blue-50 text-blue-900",
  warning: "border-amber-300 bg-amber-50 text-amber-900",
  danger: "border-red-300 bg-red-50 text-red-900",
};

const iconFor: Record<Variant, string> = {
  tip: "💡",
  note: "🗒️",
  warning: "⚠️",
  danger: "⛔",
};

interface CalloutProps {
  type?: Variant;
  title?: string;
  children: React.ReactNode;
}

export default function Callout({ type = "note", title, children }: CalloutProps) {
  const role: React.AriaRole = type === "warning" || type === "danger" ? "alert" : "note";
  return (
    <div role={role} className={`not-prose mt-6 rounded-2xl border p-4 ${styles[type]}`}>
      <div className="flex items-start gap-3">
        <div className="text-xl leading-none" aria-hidden>
          {iconFor[type]}
        </div>
        <div>
          {title && <div className="font-semibold">{title}</div>}
          <div className="prose mt-1">{children}</div>
        </div>
      </div>
    </div>
  );
}
