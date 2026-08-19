import type { Metadata } from "next";
import Link from "next/link";
import { SITE_CONFIG } from "@/lib/site-config";
import { SPEC_VERSION } from "@/lib/spec";

/**
 * Chrome for the ledger, matching the specification section. Indexable
 * on its own metadata while the root holds.
 */
export const metadata: Metadata = {
  title: `Ledger, ${SITE_CONFIG.name}`,
  description:
    "The dated record behind the Gateway Baseline tracker: verification passes, corrections kept rather than erased, upstream patches with their real statuses, and the dispute protocol.",
  robots: { index: true, follow: true },
};

export default function LedgerLayout({
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
          <Link href="/ledger" className="mono-label text-steel-dark hover:text-ink">
            Ledger
          </Link>
        </div>
      </header>
      <main className="mx-auto w-full max-w-3xl flex-1 px-6 pb-24 pt-14">
        {children}
      </main>
      <footer className="border-t border-steel">
        <div className="mx-auto flex w-full max-w-3xl flex-wrap items-baseline justify-between gap-3 px-6 py-6">
          <p className="mono-label text-steel-dark">
            The record only grows. Nothing is rewritten.
          </p>
          <nav className="flex gap-5">
            <Link href="/spec" className="mono-label text-steel-dark hover:text-ink">
              Specification {SPEC_VERSION}
            </Link>
          </nav>
        </div>
      </footer>
    </div>
  );
}
