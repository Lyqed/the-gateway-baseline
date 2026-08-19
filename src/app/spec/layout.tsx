import type { Metadata } from "next";
import Link from "next/link";
import { SITE_CONFIG } from "@/lib/site-config";
import { SPEC_VERSION, SPEC_FROZEN } from "@/lib/spec";

/**
 * Chrome for the specification section. The root route holds; the spec
 * is online. These routes are indexable on their own metadata, overriding
 * the holding layout's noindex, because publishing the spec is the act
 * of putting the standard online.
 */
export const metadata: Metadata = {
  title: {
    default: `${SPEC_VERSION}, ${SITE_CONFIG.name}`,
    template: `%s, ${SPEC_VERSION}, ${SITE_CONFIG.name}`,
  },
  description:
    "The Gateway Baseline specification: the normative checks an LLM gateway either meets or does not, scoped to money and the controls around it.",
  robots: { index: true, follow: true },
};

export default function SpecLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <div className="flex min-h-full flex-1 flex-col">
      <header className="border-b border-steel">
        <div className="mx-auto flex w-full max-w-3xl items-baseline justify-between px-6 py-5">
          <Link
            href="/"
            className="text-sm font-medium uppercase tracking-tight hover:text-skylight-deep"
          >
            {SITE_CONFIG.name}
          </Link>
          <Link href="/spec" className="mono-label text-steel-dark hover:text-ink">
            Specification {SPEC_VERSION}
          </Link>
        </div>
      </header>
      <main className="mx-auto w-full max-w-3xl flex-1 px-6 pb-24 pt-14">
        {children}
      </main>
      <footer className="border-t border-steel">
        <div className="mx-auto flex w-full max-w-3xl flex-wrap items-baseline justify-between gap-3 px-6 py-6">
          <p className="mono-label text-steel-dark">
            {SPEC_VERSION}, frozen {SPEC_FROZEN}
          </p>
          <nav className="flex gap-5">
            <Link href="/spec" className="mono-label text-steel-dark hover:text-ink">
              Checks
            </Link>
            <Link
              href="/spec/candidates"
              className="mono-label text-steel-dark hover:text-ink"
            >
              Candidates
            </Link>
            <Link
              href="/spec#changelog"
              className="mono-label text-steel-dark hover:text-ink"
            >
              Changelog
            </Link>
            <Link
              href="/ledger"
              className="mono-label text-steel-dark hover:text-ink"
            >
              Ledger
            </Link>
          </nav>
        </div>
      </footer>
    </div>
  );
}
