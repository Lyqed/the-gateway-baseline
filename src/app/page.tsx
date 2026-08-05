import { SITE_CONFIG } from "@/lib/site-config";

/**
 * HOLDING PAGE. The full page (Hero, WhyAuthoritative, TrustChoice,
 * Requirements, and the unmounted Tracker) is preserved at
 * `page.full.tsx.bak`. Every section component and the tracker data
 * remain in the tree untouched; only the root route is replaced.
 *
 * Centred on both axes at every width, so the mark reads the same on a
 * phone as on a desktop. One statement, punctuated by a colon: the name
 * declares, the clause after it defines. The break between them is a
 * line break on wide screens and a wrap on narrow ones, but the colon
 * holds the sentence together either way.
 */
export default function Holding() {
  return (
    <main className="grid-paper flex flex-1 items-center justify-center">
      <div className="mx-auto w-full max-w-3xl px-6 py-24 text-center">
        <h1 className="text-section font-medium uppercase leading-tight tracking-tight">
          {SITE_CONFIG.name}:
        </h1>
        <p className="mx-auto mt-5 max-w-lg font-mono text-[0.72rem] uppercase leading-relaxed tracking-[0.22em] text-steel-dark sm:text-xs sm:tracking-[0.28em]">
          {SITE_CONFIG.tagline}
        </p>
        <p className="mt-10">
          <a
            href="/spec"
            className="mono-label text-skylight-deep underline underline-offset-4 hover:text-ink"
          >
            Specification GB/1.0
          </a>
        </p>
      </div>
    </main>
  );
}
