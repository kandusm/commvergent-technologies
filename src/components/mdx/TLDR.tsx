export default function TLDR({
  children,
  label = "", // pass "TL;DR" if you want the label; keep "" to hide
}: {
  children: React.ReactNode;
  label?: string;
}) {
  return (
    <div
      className="
        my-5 rounded-xl border border-neutral-200 bg-white px-5 py-4 text-[15px] leading-relaxed
        text-[var(--brand-black)] shadow-sm
        border-l-4 [border-left-color:var(--brand-red)]
        dark:bg-neutral-900 dark:border-neutral-800 dark:text-white
      "
    >
      {label ? (
        <div className="mb-1 text-xs font-semibold uppercase tracking-wide text-[var(--brand-red)]">
          {label}
        </div>
      ) : null}
      {children}
    </div>
  );
}


