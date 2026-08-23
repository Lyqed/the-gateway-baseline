import Link from "next/link";
import {
  CHECKS,
  NORMATIVE_CHECKS,
  GATEWAYS,
  LAST_VERIFIED,
  type GatewayRow,
} from "@/lib/gateways";
import { SIDE_LABEL, SPEC_CHECKS, type SpecSide } from "@/lib/spec";
import { Reveal } from "@/components/reveal/Reveal";

/**
 * The conformance scoreboard: every gateway measured against the same
 * bar, sorted by what it verifies. Not a marketing table, a
 * verification record.
 *
 * Status is encoded in FORM, not only color: a filled square
 * (verified), a half square (partial), a hollow square (missing). The
 * semantic tokens, teal / gold / blossom, carry the same meaning for
 * anyone who sees color. Each cell's sourced reasoning is its title
 * attribute; each column header links to the normative text it scores.
 */

const STATUS_META = {
  yes: { glyph: "■", label: "verified", fill: "var(--teal)" },
  partial: { glyph: "◧", label: "partial", fill: "var(--gold)" },
  no: { glyph: "□", label: "missing", fill: "var(--blossom)" },
} as const;

function verifiedCount(g: GatewayRow): number {
  return NORMATIVE_CHECKS.filter((c) => g.cells[c.key]?.status === "yes")
    .length;
}

/**
 * Sort key: the verified count leads (it is the number the column
 * shows), partials break ties only.
 */
function weight(g: GatewayRow): number {
  return NORMATIVE_CHECKS.reduce((acc, c) => {
    const s = g.cells[c.key]?.status;
    return acc + (s === "yes" ? 1 : s === "partial" ? 0.01 : 0);
  }, 0);
}

const slugByKey = new Map(SPEC_CHECKS.map((c) => [c.key, c.slug]));

/** Column groups in CHECKS order: side + how many columns it spans. */
function sideGroups(): { side: SpecSide; span: number }[] {
  const groups: { side: SpecSide; span: number }[] = [];
  for (const check of CHECKS) {
    const side = SPEC_CHECKS.find((s) => s.key === check.key)?.side;
    if (!side) continue;
    const last = groups[groups.length - 1];
    if (last && last.side === side) last.span += 1;
    else groups.push({ side, span: 1 });
  }
  return groups;
}

export function Tracker() {
  const rows = [...GATEWAYS].sort((a, b) => weight(b) - weight(a));
  const groups = sideGroups();
  const max = NORMATIVE_CHECKS.length;

  // Column indexes where a side group begins (draws the group rule).
  const boundaries = new Set<number>();
  let acc = 0;
  for (const grp of groups) {
    boundaries.add(acc);
    acc += grp.span;
  }

  return (
    <section
      id="tracker"
      aria-labelledby="tracker-heading"
      className="scroll-mt-20 border-t border-steel/60 bg-panel"
    >
      <div className="mx-auto w-full max-w-6xl px-6 py-[var(--space-section)]">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div className="max-w-2xl">
            <p className="mono-label text-steel-dark">The scoreboard</p>
            <h2 id="tracker-heading" className="text-section mt-5 font-medium">
              Every gateway, against the same bar.
            </h2>
            <p className="mt-6 leading-relaxed text-steel-dark">
              The nine checks of{" "}
              <Link
                href="/spec"
                className="text-skylight-deep underline underline-offset-2 hover:text-ink"
              >
                GB/1.0
              </Link>
              , read against each gateway&rsquo;s public documentation. Rows
              are ordered by what they verify. Hover any cell for the sourced
              reasoning; every column header opens the normative text it
              scores.
            </p>
          </div>
          <p className="mono-label text-steel-dark">
            Verified {LAST_VERIFIED}
          </p>
        </div>

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

        {/* Desktop: the matrix. Sized to the container, no horizontal scroll. */}
        <Reveal className="hidden lg:block">
          <div className="mt-8 border border-steel/60 bg-atrium">
            <table className="w-full table-fixed border-collapse text-left">
              <colgroup>
                <col className="w-[13.5rem]" />
                {CHECKS.map((c) => (
                  <col key={c.key} />
                ))}
                <col className="w-[5.5rem]" />
              </colgroup>
              <caption className="sr-only">
                Gateway Baseline conformance, GB-1 through GB-9, verified{" "}
                {LAST_VERIFIED}
              </caption>
              <thead>
                {/* Side group band */}
                <tr className="border-b border-steel/50">
                  <td aria-hidden />
                  {groups.map((grp) => (
                    <th
                      key={grp.side}
                      scope="colgroup"
                      colSpan={grp.span}
                      className="border-l border-steel/40 px-2.5 pb-1.5 pt-3 text-center font-mono text-[0.6rem] font-medium uppercase tracking-[0.18em] text-steel-dark"
                    >
                      {SIDE_LABEL[grp.side]}
                    </th>
                  ))}
                  <td aria-hidden />
                </tr>
                <tr className="border-b border-ink/80">
                  <th
                    scope="col"
                    className="px-4 py-3 font-mono text-[0.66rem] font-medium uppercase tracking-[0.12em] text-steel-dark"
                  >
                    Gateway
                  </th>
                  {CHECKS.map((c, i) => {
                    const slug = slugByKey.get(c.key);
                    const boundary = boundaries.has(i);
                    return (
                      <th
                        key={c.key}
                        scope="col"
                        title={c.title}
                        className={`px-2.5 py-3 text-center font-mono text-[0.66rem] font-medium uppercase tracking-[0.08em] text-steel-dark ${
                          boundary ? "border-l border-steel/40" : ""
                        }`}
                      >
                        {slug ? (
                          <Link
                            href={`/spec/${slug}`}
                            className="group block"
                          >
                            <span className="block text-ink underline decoration-transparent decoration-1 underline-offset-2 transition-colors group-hover:decoration-skylight-deep">
                              {c.code}
                            </span>
                            <span className="mt-0.5 block normal-case tracking-normal">
                              {c.short}
                            </span>
                          </Link>
                        ) : (
                          <>
                            <span className="block text-ink">{c.code}</span>
                            <span className="mt-0.5 block normal-case tracking-normal">
                              {c.short}
                            </span>
                          </>
                        )}
                      </th>
                    );
                  })}
                  <th
                    scope="col"
                    className="px-4 py-3 text-center font-mono text-[0.66rem] font-medium uppercase tracking-[0.12em] text-steel-dark"
                  >
                    Verified
                  </th>
                </tr>
              </thead>
              <tbody>
                {rows.map((g) => {
                  const n = verifiedCount(g);
                  return (
                    <tr key={g.id} className="border-b border-steel/40">
                      <th
                        scope="row"
                        className="px-4 py-4 align-middle"
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
                          {g.kind} · {g.lastVerified}
                        </span>
                      </th>
                      {CHECKS.map((c, i) => {
                        const cell = g.cells[c.key];
                        const meta = STATUS_META[cell.status];
                        const boundary = boundaries.has(i);
                        return (
                          <td
                            key={c.key}
                            title={`${c.code} ${meta.label}: ${cell.note}`}
                            className={`px-2.5 py-4 text-center ${
                              boundary ? "border-l border-steel/40" : ""
                            }`}
                          >
                            <span className="sr-only">
                              {c.code} {meta.label}
                            </span>
                            <span
                              aria-hidden
                              className="text-[1.1rem] leading-none"
                              style={{ color: meta.fill }}
                            >
                              {meta.glyph}
                            </span>
                          </td>
                        );
                      })}
                      <td className="px-4 py-4 text-center align-middle">
                        <span className="font-mono text-sm font-medium text-ink">
                          {n}/{max}
                        </span>
                        <span
                          aria-hidden
                          className="mx-auto mt-1.5 block h-1 w-12 bg-steel/40"
                        >
                          <span
                            className="block h-full"
                            style={{
                              width: `${(n / max) * 100}%`,
                              background: "var(--teal)",
                            }}
                          />
                        </span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </Reveal>

        {/* Mobile and tablet: one card per gateway, the nine cells as a grid. */}
        <ul className="mt-8 space-y-4 lg:hidden">
          {rows.map((g) => {
            const n = verifiedCount(g);
            return (
              <li
                key={g.id}
                className="border border-steel/60 bg-atrium p-4"
              >
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <a
                      href={g.url}
                      className="font-medium text-ink underline decoration-skylight/50 decoration-1 underline-offset-2"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {g.name}
                    </a>
                    <span className="mt-0.5 block font-mono text-[0.62rem] uppercase tracking-[0.1em] text-steel-dark">
                      {g.kind} · {g.lastVerified}
                    </span>
                  </div>
                  <div className="shrink-0 text-right">
                    <span className="font-mono text-sm font-medium text-ink">
                      {n}/{max}
                    </span>
                    <span
                      aria-hidden
                      className="mt-1.5 block h-1 w-14 bg-steel/40"
                    >
                      <span
                        className="block h-full"
                        style={{
                          width: `${(n / max) * 100}%`,
                          background: "var(--teal)",
                        }}
                      />
                    </span>
                  </div>
                </div>
                <ul className="mt-4 grid grid-cols-3 gap-px border border-steel/40 bg-steel/40">
                  {CHECKS.map((c) => {
                    const cell = g.cells[c.key];
                    const meta = STATUS_META[cell.status];
                    const slug = slugByKey.get(c.key);
                    const inner = (
                      <>
                        <span className="flex items-center justify-between gap-2">
                          <span className="font-mono text-[0.62rem] font-medium text-ink">
                            {c.code}
                          </span>
                          <span
                            aria-hidden
                            className="text-base leading-none"
                            style={{ color: meta.fill }}
                          >
                            {meta.glyph}
                          </span>
                        </span>
                        <span className="mt-1 block font-mono text-[0.6rem] text-steel-dark">
                          {c.short}
                        </span>
                        <span className="sr-only">{meta.label}</span>
                      </>
                    );
                    return (
                      <li
                        key={c.key}
                        title={`${c.code} ${meta.label}: ${cell.note}`}
                        className="bg-atrium px-2.5 py-2"
                      >
                        {slug ? (
                          <Link href={`/spec/${slug}`} className="block">
                            {inner}
                          </Link>
                        ) : (
                          inner
                        )}
                      </li>
                    );
                  })}
                </ul>
              </li>
            );
          })}
        </ul>

        <p className="mt-6 max-w-2xl font-mono text-xs leading-relaxed text-steel-dark">
          Verified against public documentation, scored against{" "}
          <Link
            href="/spec"
            className="text-skylight-deep underline underline-offset-2 hover:text-ink"
          >
            GB/1.0
          </Link>{" "}
          and nothing else. A cell is a reading of what the docs say a gateway
          does, not a claim about what a deployment achieves. Corrections
          welcome: every judgment is sourced, and every adjudication is
          recorded, dated, in the{" "}
          <Link
            href="/record"
            className="text-skylight-deep underline underline-offset-2 hover:text-ink"
          >
            record
          </Link>
          , whichever direction it moves. The three provisional candidates,
          GB-10 through GB-12, do not appear here because{" "}
          <Link
            href="/spec/candidates"
            className="text-skylight-deep underline underline-offset-2 hover:text-ink"
          >
            candidates do not score
          </Link>
          .
        </p>
      </div>
    </section>
  );
}
