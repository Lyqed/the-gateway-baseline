import type { Metadata } from "next";
import Link from "next/link";
import {
  ADMISSION_RULES,
  CANDIDATES,
  CANDIDATES_INTRO,
  SPEC_VERSION,
} from "@/lib/spec";

/**
 * The provisional track. Candidates are presented with their open
 * admission questions stated plainly; a candidate cannot score on the
 * tracker for one full verification cycle, and adjudications are
 * recorded whichever way they go. Presenting the open questions is the
 * point: the ruler stays straight in public.
 */

export const metadata: Metadata = {
  title: "Candidates",
  description:
    "Checks proposed for the Gateway Baseline, held in the provisional track while their admission questions are argued in public.",
};

export default function CandidatesPage() {
  return (
    <article>
      <p className="mono-label text-steel-dark">
        {SPEC_VERSION} · Provisional track
      </p>
      <h1 className="text-section mt-3 font-medium tracking-tight">
        Candidates
      </h1>
      <div className="mt-6 max-w-2xl space-y-4 text-steel-dark">
        {CANDIDATES_INTRO.map((p, i) => (
          <p key={i} className={i === 0 ? "text-ink" : undefined}>
            {p}
          </p>
        ))}
      </div>

      <div className="mt-12 space-y-12">
        {CANDIDATES.map((candidate) => (
          <section key={candidate.code} aria-labelledby={candidate.slug}>
            <h2 id={candidate.slug} className="flex items-baseline gap-5">
              <span className="mono-label text-gold-deep">
                {candidate.code}
              </span>
              <span className="text-xl font-medium tracking-tight">
                {candidate.title}
              </span>
            </h2>
            <p className="mt-4 border-l-2 border-gold bg-gold-wash py-4 pl-5 pr-5">
              {candidate.statement}
            </p>
            <h3 className="mono-label mt-5 text-steel-dark">Open questions</h3>
            <ul className="mt-3 space-y-3">
              {candidate.openQuestions.map((q, i) => (
                <li key={i} className="flex gap-4 text-sm">
                  <span
                    aria-hidden
                    className="mt-2.5 h-px w-4 shrink-0 bg-steel"
                  />
                  <span className="text-steel-dark">{q}</span>
                </li>
              ))}
            </ul>
          </section>
        ))}
      </div>

      <section className="mt-14 border-t border-steel pt-6">
        <h2 className="mono-label text-steel-dark">
          What admission takes
        </h2>
        <ol className="mt-4 space-y-3">
          {ADMISSION_RULES.map((rule, i) => (
            <li key={i} className="flex gap-4 text-sm">
              <span className="mono-label mt-0.5 shrink-0 text-steel-dark">
                {String(i + 1).padStart(2, "0")}
              </span>
              <span className="text-steel-dark">{rule}</span>
            </li>
          ))}
        </ol>
        <p className="mt-6 text-sm text-steel-dark">
          Back to{" "}
          <Link
            href="/spec"
            className="text-skylight-deep underline underline-offset-4 hover:text-ink"
          >
            the specification
          </Link>
          .
        </p>
      </section>
    </article>
  );
}
