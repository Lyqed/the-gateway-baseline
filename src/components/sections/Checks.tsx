import Link from "next/link";
import {
  CANDIDATES,
  SIDE_LABEL,
  SPEC_CHECKS,
  SPEC_VERSION,
  type SpecSide,
} from "@/lib/spec";
import { Reveal } from "@/components/reveal/Reveal";

/**
 * The bar itself: nine normative checks rendered from lib/spec, the
 * single source of truth, grouped by side. Each row links to its
 * normative page. The three provisional candidates follow, visibly
 * separated and visibly unscored — the queue is public, the bar is not
 * quietly extended.
 */

const SIDES: readonly SpecSide[] = ["control", "invoice", "operations"];

const SIDE_NOTE: Record<SpecSide, string> = {
  control: "Who spends, and what stops them",
  invoice: "The name lands on the provider's bill",
  operations: "The rules hold on a running fleet",
};

export function Checks() {
  return (
    <section
      id="checks"
      aria-labelledby="checks-heading"
      className="mx-auto w-full max-w-6xl scroll-mt-20 px-6 py-[var(--space-section)]"
    >
      <div className="max-w-2xl">
        <p className="mono-label text-steel-dark">The bar</p>
        <h2 id="checks-heading" className="text-section mt-5 font-medium">
          Nine checks. Each one falsifiable.
        </h2>
        <p className="mt-6 leading-relaxed text-steel-dark">
          Every check is a page of normative text: numbered clauses, a single
          pass condition a verifier decides from evidence, what scores
          partial, and the reasoning. The codes below are the columns on the
          scoreboard.
        </p>
      </div>

      <div className="mt-14 space-y-12">
        {SIDES.map((side, si) => {
          const checks = SPEC_CHECKS.filter((c) => c.side === side);
          if (checks.length === 0) return null;
          return (
            <Reveal key={side} delay={si * 60}>
              <div className="grid gap-x-10 gap-y-4 sm:grid-cols-[11rem_1fr]">
                <div>
                  <h3 className="mono-label text-ink">{SIDE_LABEL[side]}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-steel-dark">
                    {SIDE_NOTE[side]}
                  </p>
                </div>
                <ul className="divide-y divide-steel border-y border-steel">
                  {checks.map((check) => (
                    <li key={check.code}>
                      <Link
                        href={`/spec/${check.slug}`}
                        className="group grid grid-cols-[4.5rem_1fr_auto] items-baseline gap-4 py-4 sm:grid-cols-[4.5rem_11rem_1fr_auto]"
                      >
                        <span className="font-mono text-sm font-medium text-monarch-deep">
                          {check.code}
                        </span>
                        <span className="mono-label hidden text-steel-dark sm:block">
                          {check.short}
                        </span>
                        <span className="font-medium text-ink transition-colors group-hover:text-skylight-deep">
                          {check.title}
                        </span>
                        <span
                          aria-hidden="true"
                          className="text-steel-dark transition-colors group-hover:text-skylight-deep"
                        >
                          &rsaquo;
                        </span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          );
        })}
      </div>

      {/* The provisional track: published, argued, unscored. */}
      <Reveal>
        <aside
          aria-labelledby="candidates-heading"
          className="mt-16 border border-dashed border-steel bg-gold-wash/60 px-6 py-8 sm:px-8"
        >
          <div className="flex flex-wrap items-baseline justify-between gap-4">
            <h3 id="candidates-heading" className="mono-label text-gold-deep">
              Provisional track · {SPEC_VERSION} · does not score
            </h3>
            <Link
              href="/spec/candidates"
              className="mono-label text-skylight-deep hover:text-ink"
            >
              Open questions <span aria-hidden="true">&rsaquo;</span>
            </Link>
          </div>
          <ul className="mt-5 space-y-3">
            {CANDIDATES.map((c) => (
              <li key={c.code} className="flex gap-4">
                <span className="w-[4.5rem] shrink-0 font-mono text-sm font-medium text-gold-deep">
                  {c.code}
                </span>
                <span className="text-sm leading-relaxed text-ink">
                  {c.title}
                </span>
              </li>
            ))}
          </ul>
          <p className="mt-5 max-w-3xl text-sm leading-relaxed text-steel-dark">
            Candidates are published and argued in the open, with their
            admission questions stated plainly. A candidate cannot score until
            a full verification cycle completes after its admission, and it
            can be reworded or withdrawn while it waits.
          </p>
        </aside>
      </Reveal>
    </section>
  );
}
