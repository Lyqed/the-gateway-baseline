import Link from "next/link";
import {
  ADMISSION_RULES,
  CANDIDATES,
  EVIDENCE_CLASSES,
  NON_GOALS,
  SIDE_LABEL,
  SPEC_CHANGELOG,
  SPEC_CHECKS,
  SPEC_FROZEN,
  SPEC_INTRO,
  SPEC_VERSION,
  VERSION_RULES,
  type SpecSide,
} from "@/lib/spec";

/**
 * The specification index: what the Baseline is, the nine normative
 * checks grouped by side, the governance rules that keep the ruler
 * straight, and the dated history of every change to the bar.
 */

const SIDES: readonly SpecSide[] = ["control", "invoice", "operations"];

function RuleList({ items }: { items: readonly string[] }) {
  return (
    <ol className="mt-4 space-y-3">
      {items.map((rule, i) => (
        <li key={i} className="flex gap-4">
          <span className="mono-label mt-1 shrink-0 text-steel-dark">
            {String(i + 1).padStart(2, "0")}
          </span>
          <span>{rule}</span>
        </li>
      ))}
    </ol>
  );
}

export default function SpecIndex() {
  return (
    <article>
      <p className="mono-label text-steel-dark">
        Specification {SPEC_VERSION}, frozen {SPEC_FROZEN}
      </p>
      <h1 className="text-section mt-3 font-medium tracking-tight">
        The Gateway Baseline
      </h1>
      <div className="mt-6 max-w-2xl space-y-4 text-steel-dark">
        {SPEC_INTRO.map((p, i) => (
          <p key={i} className={i === 0 ? "text-ink" : undefined}>
            {p}
          </p>
        ))}
      </div>

      {/* The checks, grouped by side */}
      <section className="mt-14" aria-labelledby="checks-heading">
        <h2 id="checks-heading" className="mono-label text-steel-dark">
          The checks
        </h2>
        <div className="mt-4 space-y-8">
          {SIDES.map((side) => {
            const checks = SPEC_CHECKS.filter((c) => c.side === side);
            if (checks.length === 0) return null;
            return (
              <div key={side}>
                <h3 className="mono-label text-steel-dark">{SIDE_LABEL[side]}</h3>
                <ul className="mt-2 divide-y divide-steel border-y border-steel">
                  {checks.map((check) => (
                    <li key={check.code}>
                      <Link
                        href={`/spec/${check.slug}`}
                        className="lift group flex items-baseline gap-5 py-4"
                      >
                        <span className="mono-label shrink-0 text-monarch-deep">
                          {check.code}
                        </span>
                        <span className="font-medium group-hover:text-skylight-deep">
                          {check.title}
                        </span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>
        <p className="mt-6 text-sm text-steel-dark">
          Three further checks are candidates in the{" "}
          <Link
            href="/spec/candidates"
            className="text-skylight-deep underline underline-offset-4 hover:text-ink"
          >
            provisional track
          </Link>
          . A candidate cannot score for one full verification cycle.
        </p>
      </section>

      {/* Evidence classes */}
      <section className="mt-14" aria-labelledby="evidence-heading">
        <h2 id="evidence-heading" className="mono-label text-steel-dark">
          Evidence classes
        </h2>
        <dl className="mt-4 space-y-5">
          {EVIDENCE_CLASSES.map((cls) => (
            <div key={cls.id} className="border-l-2 border-steel pl-5">
              <dt className="font-medium">{cls.name}</dt>
              <dd className="mt-1 text-sm text-steel-dark">{cls.description}</dd>
            </div>
          ))}
        </dl>
      </section>

      {/* Governance */}
      <section className="mt-14" aria-labelledby="governance-heading">
        <h2 id="governance-heading" className="mono-label text-steel-dark">
          Version rules
        </h2>
        <RuleList items={VERSION_RULES} />
        <h2 className="mono-label mt-10 text-steel-dark">
          Admission rules for new checks
        </h2>
        <RuleList items={ADMISSION_RULES} />
      </section>

      {/* Non-goals */}
      <section className="mt-14" aria-labelledby="nongoals-heading">
        <h2 id="nongoals-heading" className="mono-label text-steel-dark">
          Non-goals
        </h2>
        <ul className="mt-4 space-y-3">
          {NON_GOALS.map((item, i) => (
            <li key={i} className="flex gap-4">
              <span aria-hidden className="mt-2.5 h-px w-4 shrink-0 bg-steel" />
              <span className="text-steel-dark">{item}</span>
            </li>
          ))}
        </ul>
      </section>

      {/* Changelog */}
      <section className="mt-14" aria-labelledby="changelog" id="changelog">
        <h2 className="mono-label text-steel-dark">
          Changes to the bar
        </h2>
        <ol className="mt-4 space-y-4">
          {SPEC_CHANGELOG.map((change, i) => (
            <li key={i} className="flex gap-5">
              <time
                dateTime={change.date}
                className="mono-label mt-1 shrink-0 text-steel-dark"
              >
                {change.date}
              </time>
              <span className="text-sm">{change.note}</span>
            </li>
          ))}
        </ol>
      </section>

      <p className="mt-14 border-t border-steel pt-6 text-sm text-steel-dark">
        Candidate proposals and disputes over any scored cell are welcome from
        anyone, including scored vendors. Every adjudication is recorded, dated,
        whichever direction it moves.
      </p>
    </article>
  );
}
