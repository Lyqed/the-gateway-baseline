import Link from "next/link";
import { NAV_ITEMS, SITE_CONFIG } from "@/lib/site-config";
import { SPEC_VERSION } from "@/lib/spec";

/** The ring + dot mark, inline at header scale. */
function Mark() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 32 32"
      fill="none"
      className="size-5 shrink-0"
    >
      <circle cx="16" cy="16" r="11" stroke="var(--ink)" strokeWidth="2.5" />
      <circle cx="24" cy="7.5" r="4" fill="var(--monarch)" />
    </svg>
  );
}

/**
 * Document-grade header: mark, name, the frozen version as a badge,
 * and the reading order. Hairline rule, mono labels, no client JS.
 */
export function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 border-b border-steel bg-atrium">
      <div className="mx-auto flex h-14 w-full max-w-6xl items-center justify-between gap-4 px-6">
        <Link
          href="/"
          className="flex items-center gap-2.5 text-sm font-medium tracking-tight text-ink"
        >
          <Mark />
          <span className="hidden sm:inline">{SITE_CONFIG.name}</span>
          <span
            className="rounded-sm border border-steel px-1.5 py-0.5 font-mono text-[0.62rem] font-medium tracking-[0.08em] text-steel-dark"
            title={`Specification version ${SPEC_VERSION}`}
          >
            {SPEC_VERSION}
          </span>
        </Link>

        <nav aria-label="Sections">
          <ul className="flex items-center gap-4 sm:gap-7">
            {NAV_ITEMS.map((item) => (
              <li
                key={item.href}
                className={item.primary ? undefined : "hidden sm:block"}
              >
                <a
                  href={item.href}
                  className="mono-label text-steel-dark transition-colors duration-150 hover:text-ink"
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </header>
  );
}
