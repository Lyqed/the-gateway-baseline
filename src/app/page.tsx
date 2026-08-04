import { SITE_CONFIG } from "@/lib/site-config";

/**
 * HOLDING PAGE. The full page (Hero, WhyAuthoritative, TrustChoice,
 * Requirements, and the unmounted Tracker) is preserved at
 * `page.full.tsx.bak`. Every section component and the tracker data
 * remain in the tree untouched; only the root route is replaced.
 *
 * Set as a specification cover sheet rather than a centred placeholder.
 * The grammar is borrowed from standards documents: a designation line,
 * the title set large and plainly against a hard left edge, a rule, and
 * the scope stated underneath. Authority comes from the structure, not
 * from decoration.
 *
 * The pairing carries it. The title is the sans at display size with
 * tight tracking; everything around it is the mono voice, small and
 * widely tracked. Large-and-tight against small-and-wide is what makes
 * the page read as issued rather than styled.
 */
export default function Holding() {
  return (
    <main className="grid-paper flex flex-1 items-center">
      <div className="mx-auto w-full max-w-4xl px-6 py-24 sm:px-10">
        {/* Designation. Sits above the rule like a document number. */}
        <div className="flex items-baseline justify-between gap-4 border-b border-steel pb-4">
          <p className="mono-label text-steel-dark">The standard</p>
          <p className="mono-label text-steel-dark">Est. 2026</p>
        </div>

        <h1 className="text-hero mt-10 font-medium">
          The
          <br />
          Gateway
          <br />
          Baseline
        </h1>

        {/* The scope, set against the monarch rule: the one accent on
            the page, and it marks the sentence that says what this is. */}
        <p className="mt-12 max-w-xl border-l-2 border-monarch py-1 pl-5 font-mono text-sm leading-relaxed tracking-[0.06em] text-ink sm:text-base">
          An open standard for LLM gateways.
        </p>

        <div className="mt-16 border-t border-steel pt-5">
          <p className="mono-label text-steel-dark">
            {SITE_CONFIG.url.replace("https://", "")}
          </p>
        </div>
      </div>
    </main>
  );
}
