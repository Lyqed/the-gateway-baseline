import { CHECKS, GATEWAYS, LAST_VERIFIED } from "@/lib/gateways";
import { Reveal } from "@/components/reveal/Reveal";

/**
 * The conformance scoreboard: every gateway measured against the same twelve
 * checks. Not a marketing table — a verification record. Our own row leads
 * and is scored from the code against the same bar, reds and all; the
 * integrity rule (our row verified identically to everyone else's) is what
 * makes the rest of the board trustworthy.
 *
 * Status is encoded in FORM, not only color: a filled square (verified), a
 * half square (partial), a hollow square (missing). The semantic tokens —
 * teal / gold / blossom — carry the same meaning for anyone who sees color.
 * Each cell's note is its title attribute, so the reasoning is one hover
 * away and never asserted without a source.
 */

const STATUS_META = {
  yes: { glyph: "■", label: "verified", cls: "text-teal-deep", fill: "var(--teal)" },
  partial: { glyph: "◧", label: "partial", cls: "text-gold-deep", fill: "var(--gold)" },
  no: { glyph: "□", label: "missing", cls: "text-blossom-deep", fill: "var(--blossom)" },
} as const;

function score(cells: Record<string, { status: string }>): string {
  const n = Object.values(cells).filter((c) => c.status === "yes").length;
  return `${n}/${CHECKS.length}`;
}

export function Tracker() {
  return (
    <section
      id="tracker"
      aria-labelledby="tracker-heading"
      className="border-t border-steel/60 bg-panel"
    >
      <div className="mx-auto w-full max-w-6xl px-6 py-[var(--space-section)]">
        <div className="max-w-2xl">
          <p className="mono-label text-steel-dark">The scoreboard</p>
          <h2 id="tracker-heading" className="text-section mt-5 font-medium">
            Every gateway, against the same bar.
          </h2>
          <p className="mt-6 leading-relaxed text-steel-dark">
            The requirements above, coded GB-1 through GB-12, checked against
            each gateway&rsquo;s public documentation. Our own reference
            implementation is on the board too, scored from its code and held
            to the same bar &mdash; the reds are ours to show. Hover any cell
            for the sourced reasoning.
          </p>
        </div>

        {/* What each check means — each check, in one line. */}
        <dl className="mt-12 grid gap-x-10 gap-y-5 sm:grid-cols-2">
          {CHECKS.map((c) => (
            <div key={c.key} className="flex gap-4">
              <dt className="w-16 shrink-0 font-mono text-sm font-medium text-ink">
                {c.code}
              </dt>
              <dd className="text-sm leading-relaxed text-steel-dark">
                <span className="text-ink">{c.short}.</span> {c.title}.
              </dd>
            </div>
          ))}
        </dl>

        {/* Legend */}
        <ul className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-2">
          {(["yes", "partial", "no"] as const).map((s) => (
            <li
              key={s}
              className="flex items-center gap-2 font-mono text-xs uppercase tracking-[0.12em] text-steel-dark"
            >
              <span aria-hidden style={{ color: STATUS_META[s].fill }}>
                {STATUS_META[s].glyph}
              </span>
              {STATUS_META[s].label}
            </li>
          ))}
        </ul>

        <Reveal>
          <div className="mt-8 overflow-x-auto border border-steel/60 bg-atrium">
            <table className="w-full min-w-[1120px] border-collapse text-left">
              <caption className="sr-only">
                Gateway Baseline conformance, GB-1 through GB-12, verified{" "}
                {LAST_VERIFIED}
              </caption>
              <thead>
                <tr className="border-b border-ink/80">
                  <th
                    scope="col"
                    className="sticky left-0 z-10 bg-atrium px-4 py-3 font-mono text-[0.66rem] font-medium uppercase tracking-[0.12em] text-steel-dark"
                  >
                    Gateway
                  </th>
                  {CHECKS.map((c) => (
                    <th
                      key={c.key}
                      scope="col"
                      title={c.title}
                      className="px-2.5 py-3 text-center font-mono text-[0.66rem] font-medium uppercase tracking-[0.08em] text-steel-dark"
                    >
                      <span className="block text-ink">{c.code}</span>
                      <span className="mt-0.5 block normal-case tracking-normal">
                        {c.short}
                      </span>
                    </th>
                  ))}
                  <th
                    scope="col"
                    className="px-3 py-3 text-center font-mono text-[0.66rem] font-medium uppercase tracking-[0.12em] text-steel-dark"
                  >
                    Score
                  </th>
                </tr>
              </thead>
              <tbody>
                {GATEWAYS.map((g) => (
                  <tr
                    key={g.id}
                    className={
                      g.ours
                        ? "border-b border-steel/50 bg-[color-mix(in_oklch,var(--monarch)_7%,transparent)]"
                        : "border-b border-steel/40"
                    }
                  >
                    <th
                      scope="row"
                      className={`sticky left-0 z-10 px-4 py-3.5 align-middle ${
                        g.ours
                          ? "bg-[color-mix(in_oklch,var(--monarch)_7%,var(--surface-panel))]"
                          : "bg-panel"
                      }`}
                    >
                      <a
                        href={g.url}
                        className="font-medium text-ink underline decoration-skylight/50 decoration-1 underline-offset-2 transition-colors hover:decoration-skylight-deep"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {g.name}
                      </a>
                      <span className="mt-0.5 block font-mono text-[0.62rem] uppercase tracking-[0.1em] text-steel-dark">
                        {g.ours ? "reference · ours" : g.kind}
                      </span>
                    </th>
                    {CHECKS.map((c) => {
                      const cell = g.cells[c.key];
                      const meta = STATUS_META[cell.status];
                      return (
                        <td
                          key={c.key}
                          title={`${c.code} — ${meta.label}: ${cell.note}`}
                          className="px-2.5 py-3.5 text-center"
                        >
                          <span className="sr-only">
                            {c.code} {meta.label}
                          </span>
                          <span
                            aria-hidden
                            className="text-[1.05rem] leading-none"
                            style={{ color: meta.fill }}
                          >
                            {meta.glyph}
                          </span>
                        </td>
                      );
                    })}
                    <td className="px-3 py-3.5 text-center">
                      <span
                        className={`font-mono text-sm font-medium ${
                          g.ours ? "text-monarch-deep" : "text-ink"
                        }`}
                      >
                        {score(g.cells)}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Reveal>

        <p className="mt-6 max-w-2xl font-mono text-xs leading-relaxed text-steel-dark">
          Verified {LAST_VERIFIED} against public documentation. A cell is a
          reading of what the docs say a gateway does, not a claim about what a
          deployment achieves. Corrections welcome &mdash; every judgment is
          sourced, and our own row moves down the same way when we fall short.
        </p>
      </div>
    </section>
  );
}
