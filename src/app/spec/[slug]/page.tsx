import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  EVIDENCE_CLASSES,
  SIDE_LABEL,
  SPEC_CHECKS,
  SPEC_VERSION,
  checkBySlug,
} from "@/lib/spec";

/**
 * One page per normative check. The anatomy maps to the semantic color
 * roles: normative clauses in ink, the pass condition on the teal wash
 * (verified), what scores partial on the gold wash, rationale labeled
 * in violet (the human voice). Statically generated per check.
 */

type Params = { slug: string };

export function generateStaticParams(): Params[] {
  return SPEC_CHECKS.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { slug } = await params;
  const check = checkBySlug(slug);
  if (!check) return {};
  return {
    title: `${check.code}: ${check.title}`,
    description: check.passCondition,
  };
}

export default async function CheckPage({
  params,
}: {
  params: Promise<Params>;
}) {
  const { slug } = await params;
  const check = checkBySlug(slug);
  if (!check) notFound();

  const index = SPEC_CHECKS.findIndex((c) => c.slug === check.slug);
  const prev = index > 0 ? SPEC_CHECKS[index - 1] : undefined;
  const next =
    index < SPEC_CHECKS.length - 1 ? SPEC_CHECKS[index + 1] : undefined;
  const evidence = EVIDENCE_CLASSES.filter((cls) =>
    check.evidence.includes(cls.id),
  );

  return (
    <article>
      <p className="mono-label text-steel-dark">
        {SPEC_VERSION} · {SIDE_LABEL[check.side]}
      </p>
      <h1 className="mt-3 flex items-baseline gap-5">
        <span className="mono-label text-monarch-deep">{check.code}</span>
        <span className="text-section font-medium tracking-tight">
          {check.title}
        </span>
      </h1>

      {/* Normative clauses */}
      <section className="mt-10" aria-labelledby="normative-heading">
        <h2 id="normative-heading" className="mono-label text-steel-dark">
          Requirement
        </h2>
        <ol className="mt-4 space-y-4">
          {check.normative.map((clause, i) => (
            <li key={i} className="flex gap-4">
              <span className="mono-label mt-1 shrink-0 text-steel-dark">
                {check.code}.{i + 1}
              </span>
              <span>{clause}</span>
            </li>
          ))}
        </ol>
      </section>

      {/* Pass condition */}
      <section className="mt-10" aria-labelledby="pass-heading">
        <h2 id="pass-heading" className="mono-label text-teal-deep">
          Passes when
        </h2>
        <p className="mt-3 border-l-2 border-teal bg-teal-wash py-4 pl-5 pr-5">
          {check.passCondition}
        </p>
      </section>

      {/* Partial */}
      <section className="mt-8" aria-labelledby="partial-heading">
        <h2 id="partial-heading" className="mono-label text-gold-deep">
          Scores partial when
        </h2>
        <p className="mt-3 border-l-2 border-gold bg-gold-wash py-4 pl-5 pr-5 text-sm">
          {check.partialMeans}
        </p>
      </section>

      {/* Evidence */}
      <section className="mt-10" aria-labelledby="evidence-heading">
        <h2 id="evidence-heading" className="mono-label text-steel-dark">
          Accepted evidence
        </h2>
        <ul className="mt-3 space-y-2">
          {evidence.map((cls) => (
            <li key={cls.id} className="flex gap-4 text-sm">
              <span aria-hidden className="mt-2.5 h-px w-4 shrink-0 bg-steel" />
              <span>
                <span className="font-medium">{cls.name}.</span>{" "}
                <span className="text-steel-dark">{cls.description}</span>
              </span>
            </li>
          ))}
        </ul>
      </section>

      {/* Rationale */}
      <section className="mt-10" aria-labelledby="rationale-heading">
        <h2 id="rationale-heading" className="mono-label text-violet-deep">
          Rationale
        </h2>
        <div className="mt-3 max-w-2xl space-y-4 text-steel-dark">
          {check.rationale.map((p, i) => (
            <p key={i}>{p}</p>
          ))}
        </div>
        <p className="mono-label mt-4 text-steel-dark">Non-normative.</p>
      </section>

      {/* Prev / next */}
      <nav
        className="mt-14 flex justify-between border-t border-steel pt-6"
        aria-label="Between checks"
      >
        {prev ? (
          <Link
            href={`/spec/${prev.slug}`}
            className="mono-label text-steel-dark hover:text-ink"
          >
            {prev.code}: {prev.short}
          </Link>
        ) : (
          <span />
        )}
        {next ? (
          <Link
            href={`/spec/${next.slug}`}
            className="mono-label text-steel-dark hover:text-ink"
          >
            {next.code}: {next.short}
          </Link>
        ) : (
          <span />
        )}
      </nav>
    </article>
  );
}
