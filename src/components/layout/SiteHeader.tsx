import Link from "next/link";
import { SITE_CONFIG } from "@/lib/site-config";
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
      <g className="monarch-orbit">
        <circle cx="24" cy="7.5" r="4" fill="var(--monarch)" />
      </g>
    </svg>
  );
}

const NAV = [
  { label: "Overview", href: "/#how" },
  { label: "Scoreboard", href: "/#tracker" },
  { label: "Spec", href: "/spec" },
  { label: "Record", href: "/record" },
] as const;

/**
 * Product nav: the name, four sentence-case links, the version as a
 * soft capsule, and one blue pill. Sticky and translucent.
 */
export function SiteHeader() {
  return (
    <header className="nav-glass sticky top-0 z-50">
      <div className="mx-auto flex h-13 w-full max-w-6xl items-center justify-between gap-4 px-6">
        <Link
          href="/"
          className="flex items-center gap-2.5 text-[0.95rem] font-semibold tracking-tight text-ink"
        >
          <Mark />
          <span className="hidden sm:inline">{SITE_CONFIG.name}</span>
          <span className="pill" title={`Specification version ${SPEC_VERSION}`}>
            {SPEC_VERSION}
          </span>
        </Link>

        <nav aria-label="Sections" className="flex items-center gap-5 sm:gap-7">
          <ul className="hidden items-center gap-6 text-[0.875rem] text-ink/80 sm:flex">
            {NAV.map((item) => (
              <li key={item.href}>
                <a
                  href={item.href}
                  className="transition-colors duration-150 hover:text-ink"
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
          <a
            href="/#tracker"
            className="btn-primary !px-3.5 !py-1.5 !text-[0.8125rem]"
          >
            View scores
          </a>
        </nav>
      </div>
    </header>
  );
}
