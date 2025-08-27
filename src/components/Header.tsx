"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import BrandWordmark from "@/components/BrandWordmark";

type NavItem = { href: string; label: string; aria?: string };

const NAV_ITEMS: NavItem[] = [
  { href: "/projects", label: "Projects" },
  { href: "/insights", label: "Insights" },
  { href: "/about", label: "About" },
];

export default function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => setOpen(false), [pathname]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <>
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:rounded-xl focus:bg-white focus:px-3 focus:py-2 focus:shadow"
      >
        Skip to content
      </a>

      <header
        className={[
          "sticky top-0 z-50 border-b backdrop-blur transition-[background,box-shadow]",
          scrolled ? "bg-white/90 shadow-sm" : "bg-white/80",
        ].join(" ")}
      >
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-3">
          <Link href="/" aria-label="Home" className="flex items-center">
            <Image
              src="/swirl.png"
              alt="CommVergent Technologies"
              width={62}
              height={62}
              priority
            />
            <BrandWordmark />
          </Link>

          {/* Desktop nav */}
          <nav className="hidden items-center gap-6 md:flex">
            {NAV_ITEMS.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  aria-current={isActive ? "page" : undefined}
                  className={[
                    "text-sm transition-colors",
                    isActive
                      ? "text-[var(--brand-black)] font-medium"
                      : "text-gray-600 hover:text-[var(--brand-black)]",
                  ].join(" ")}
                >
                  {item.label}
                </Link>
              );
            })}

            <Link
              href="/contact"
              className="rounded-2xl bg-[var(--brand-red)] px-4 py-2 text-sm font-medium text-white shadow hover:opacity-90"
            >
              Contact
            </Link>
          </nav>

          {/* Mobile menu button */}
          <button
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
            className="rounded-xl p-2 hover:bg-gray-100 focus:outline-none focus:ring md:hidden"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" aria-hidden="true">
              {open ? (
                <path
                  d="M6 6l12 12M6 18L18 6"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
              ) : (
                <path
                  d="M4 6h16M4 12h16M4 18h16"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile drawer */}
        {open && (
          <div className="border-t bg-white md:hidden">
            <nav className="mx-auto max-w-6xl px-6 py-3">
              <ul className="flex flex-col gap-2">
                {NAV_ITEMS.map((item) => {
                  const isActive = pathname === item.href;
                  return (
                    <li key={item.href}>
                      <Link
                        href={item.href}
                        aria-current={isActive ? "page" : undefined}
                        className={[
                          "block rounded-xl px-3 py-2 text-base",
                          isActive
                            ? "bg-gray-100 font-medium text-[var(--brand-black)]"
                            : "text-gray-700 hover:bg-gray-50",
                        ].join(" ")}
                      >
                        {item.label}
                      </Link>
                    </li>
                  );
                })}
                <li className="pt-1">
                  <Link
                    href="/contact"
                    className="block rounded-xl bg-[var(--brand-red)] px-3 py-2 text-center text-base font-medium text-white"
                  >
                    Contact
                  </Link>
                </li>
              </ul>

              <div className="mt-4 border-t pt-3 text-sm text-gray-600">
                <a
                  href="https://automation.commvergent.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline"
                >
                  CommVergent Automation →
                </a>
              </div>
            </nav>
          </div>
        )}
      </header>
    </>
  );
}
