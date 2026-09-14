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
 * The nine checks as cards: each one a discrete thing a gateway does or
 * does not do. Grouped by side, linked to its normative page. The three
 * provisional candidates follow on a soft card, visibly unscored.
 */

const SIDES: readonly SpecSide[] = ["control", "invoice", "operations"];

const SIDE_NOTE: Record<SpecSide, string> = {
  control: "Who the request belongs to, and which rules apply.",
  invoice: "The name lands on the provider's bill.",
  operations: "The rules hold on a running fleet.",
};

export function Checks() {
  return (
    <section
      id="checks"
      aria-labelledby="checks-heading"
      className="mx-auto w-full max-w-6xl scroll-mt-20 px-6 py-10 sm:py-14"
    >
      <div className="max-w-3xl">
        <p className="mono-label text-steel-dark">The nine checks</p>
        <h2 id="checks-heading" className="text-section mt-3 text-ink">
          Each one falsifiable.
        </h2>
        <p className="mt-5 text-[1.0625rem] leading-relaxed text-steel-dark">
          Every check is a page of normative text: numbered clauses, a single
          pass condition a verifier decides from evidence, what scores
          partial, and the reasoning.
        </p>
      </div>

      <div className="mt-10 space-y-8">
        {SIDES.map((side, si) => {
          const checks = SPEC_CHECKS.filter((c) => c.side === side);
          if (checks.length === 0) return null;
          return (
            <Reveal key={side} delay={si * 60}>
              <div>
                <p className="px-1 text-[0.9375rem] text-steel-dark">
                  <span className="font-semibold text-ink">{SIDE_LABEL[side]}.</span>{" "}
                  {SIDE_NOTE[side]}
                </p>
                <ul className="mt-3 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                  {checks.map((check) => (
                    <li key={check.code}>
                      <Link
                        href={`/spec/${check.slug}`}
                        className="card lift group flex h-full flex-col p-7"
                      >
                        <span className="pill w-fit font-mono">{check.code}</span>
                        <span className="mt-5 text-[1.25rem] font-semibold leading-snug tracking-tight text-ink">
                          {check.title}
                        </span>
                        <span className="mt-auto pt-6 text-[0.9375rem] text-skylight group-hover:underline">
                          Read the check <span aria-hidden="true">&rsaquo;</span>
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

      <Reveal>
        <aside
          aria-labelledby="candidates-heading"
          className="card mt-8 bg-gold-wash px-7 py-8 sm:px-9"
        >
          <div className="flex flex-wrap items-baseline justify-between gap-4">
            <h3 id="candidates-heading" className="text-[1.0625rem] font-semibold text-ink">
              Provisional track
              <span className="pill pill-partial ml-3 align-middle">Does not score</span>
            </h3>
            <Link href="/spec/candidates" className="link-more !text-[0.9375rem]">
              Open questions <span aria-hidden="true">&rsaquo;</span>
            </Link>
          </div>
          <ul className="mt-5 grid gap-3 sm:grid-cols-3">
            {CANDIDATES.map((c) => (
              <li key={c.code} className="text-[0.9375rem] leading-relaxed text-ink">
                <span className="font-mono text-[0.8125rem] text-gold-deep">{c.code}</span>
                <span className="mt-1 block">{c.title}</span>
              </li>
            ))}
          </ul>
          <p className="mt-5 max-w-3xl text-[0.875rem] leading-relaxed text-steel-dark">
            Candidates for {SPEC_VERSION} are published and argued in the open.
            A candidate cannot score until a full verification cycle completes
            after its admission, and it can be reworded or withdrawn while it
            waits.
          </p>
        </aside>
      </Reveal>
    </section>
  );
}
