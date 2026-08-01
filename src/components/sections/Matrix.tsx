import {
  CRITERIA,
  GATEWAYS,
  TRACKED_REFS,
  gatewayScore,
  topScore,
  type Gateway,
} from "@/lib/gateways";
import { Reveal } from "@/components/reveal/Reveal";
import { Butterfly } from "@/components/marks/Butterfly";
import {
  STATUS_LABEL,
  STATUS_TEXT_CLASS,
  StatusDot,
} from "@/components/sections/StatusDot";

function cellTitle(gateway: Gateway, criterionId: string): string {
  const criterion = CRITERIA.find((c) => c.id === criterionId);
  const cell = gateway.support[criterionId];
  if (!criterion || !cell) return "";
  return `${gateway.name} · ${criterion.code} ${criterion.short}: ${STATUS_LABEL[cell.status]} — ${cell.note}`;
}

function Legend() {
  return (
    <ul className="flex flex-wrap gap-x-6 gap-y-2 font-mono text-xs text-steel-dark">
      {(["yes", "partial", "no", "unknown"] as const).map((status) => (
        <li key={status} className="flex items-center gap-2">
          <StatusDot status={status} />
          <span>{STATUS_LABEL[status]}</span>
        </li>
      ))}
      <li className="flex items-center gap-2">
        <span
          aria-hidden="true"
          className="inline-block size-3 bg-monarch"
        />
        <span>Leading — closest to the bar</span>
      </li>
    </ul>
  );
}

/** Desktop: the full 8×9 table with a sticky gateway column. */
function MatrixTable({ top }: { top: number }) {
  const sides = [
    { label: "Control", span: CRITERIA.filter((c) => c.side === "control").length },
    { label: "Invoice", span: CRITERIA.filter((c) => c.side === "invoice").length },
    { label: "Operations", span: CRITERIA.filter((c) => c.side === "operations").length },
  ];

  return (
    <div className="matrix-scroll hidden border border-steel bg-atrium md:block">
      <table className="w-full border-collapse font-mono text-xs">
        <caption className="sr-only">
          Gateway Baseline support matrix: {GATEWAYS.length} gateways against{" "}
          {CRITERIA.length} checks. Each cell links status to a sourced note,
          also listed in the cell notes disclosures below.
        </caption>
        <thead>
          <tr className="border-b border-steel/60">
            <td className="matrix-sticky px-4 py-2" />
            {sides.map((side) => (
              <th
                key={side.label}
                colSpan={side.span}
                scope="colgroup"
                className="mono-label border-l border-steel px-2 py-2 text-left font-normal text-steel-dark"
              >
                {side.label}
              </th>
            ))}
          </tr>
          <tr className="border-b border-steel">
            <th scope="col" className="matrix-sticky px-4 py-3 text-left">
              Gateway
            </th>
            {CRITERIA.map((criterion) => (
              <th
                key={criterion.id}
                scope="col"
                title={criterion.title}
                className={`px-2 py-3 text-center font-medium ${
                  criterion.side !== "control" ? "border-l border-steel/60" : ""
                } ${criterion.id === CRITERIA[0].id ? "border-l border-steel" : ""}`}
              >
                {criterion.code}
                <span className="mt-1 block font-normal text-steel-dark">
                  {criterion.short}
                </span>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {GATEWAYS.map((gateway) => {
            const score = gatewayScore(gateway);
            const leading = score === top;
            return (
              <tr
                key={gateway.id}
                className={`border-b border-steel/40 last:border-b-0 ${
                  leading ? "is-leading bg-[oklch(69%_0.185_55/0.08)]" : ""
                }`}
              >
                <th
                  scope="row"
                  className="matrix-sticky min-w-52 px-4 py-3 text-left font-medium"
                >
                  <span className="flex items-center gap-2">
                    {gateway.name}
                    {leading && (
                      <span className="border border-monarch px-1.5 py-0.5 text-[0.625rem] uppercase tracking-widest text-monarch-text">
                        Leading
                      </span>
                    )}
                  </span>
                  <span className="mt-1 block font-normal text-steel-dark">
                    {gateway.kind} · {score}/{CRITERIA.length} · verified{" "}
                    {gateway.lastVerified}
                  </span>
                </th>
                {CRITERIA.map((criterion) => {
                  const cell = gateway.support[criterion.id];
                  if (!cell) return <td key={criterion.id} />;
                  return (
                    <td
                      key={criterion.id}
                      title={cellTitle(gateway, criterion.id)}
                      className="border-l border-steel/40 px-2 py-3 text-center"
                    >
                      <StatusDot status={cell.status} />
                      <span className="sr-only">
                        {STATUS_LABEL[cell.status]}
                      </span>
                    </td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

/** Mobile: the dot-strip pattern, one card per gateway. */
function MatrixStrips({ top }: { top: number }) {
  return (
    <ul className="space-y-3 md:hidden">
      {GATEWAYS.map((gateway) => {
        const score = gatewayScore(gateway);
        const leading = score === top;
        return (
          <li
            key={gateway.id}
            className={`border border-steel p-4 ${
              leading ? "bg-[oklch(69%_0.185_55/0.08)]" : "bg-atrium"
            }`}
          >
            <div className="flex items-baseline justify-between gap-3">
              <p className="font-mono text-sm font-medium">
                {gateway.name}
                {leading && (
                  <span className="ml-2 border border-monarch px-1.5 py-0.5 font-mono text-[0.625rem] uppercase tracking-widest text-monarch-text">
                    Leading
                  </span>
                )}
              </p>
              <p className="font-mono text-xs text-steel-dark">
                {score}/{CRITERIA.length}
              </p>
            </div>
            <p className="mt-1 font-mono text-xs text-steel-dark">
              {gateway.kind} · verified {gateway.lastVerified}
            </p>
            <div className="mt-3 flex flex-wrap gap-2">
              {CRITERIA.map((criterion) => {
                const cell = gateway.support[criterion.id];
                if (!cell) return null;
                return (
                  <span
                    key={criterion.id}
                    title={cellTitle(gateway, criterion.id)}
                  >
                    <StatusDot status={cell.status} size={16} />
                    <span className="sr-only">
                      {criterion.code} {criterion.short}:{" "}
                      {STATUS_LABEL[cell.status]}
                    </span>
                  </span>
                );
              })}
            </div>
          </li>
        );
      })}
    </ul>
  );
}

/** Accessible disclosure: every cell's note text, per gateway. */
function CellNotes() {
  return (
    <div className="mt-12">
      <h3 className="mono-label text-steel-dark">
        Cell notes — every judgment, in words
      </h3>
      <div className="mt-4 border-t border-steel">
        {GATEWAYS.map((gateway) => (
          <details key={gateway.id} className="gateway-notes border-b border-steel/60">
            <summary className="flex items-baseline justify-between gap-4 py-4 font-mono text-sm">
              <span>
                {gateway.name}{" "}
                <span className="font-normal text-steel-dark">
                  · {gateway.kind} · verified {gateway.lastVerified}
                </span>
              </span>
              <span aria-hidden="true" className="marker text-steel-dark" />
            </summary>
            <dl className="grid gap-x-8 gap-y-5 pb-8 md:grid-cols-2">
              {CRITERIA.map((criterion) => {
                const cell = gateway.support[criterion.id];
                if (!cell) return null;
                return (
                  <div key={criterion.id}>
                    <dt className="flex items-center gap-2 font-mono text-xs font-medium">
                      <StatusDot status={cell.status} size={12} />
                      <span>
                        {criterion.code} {criterion.short}
                      </span>
                      <span className={STATUS_TEXT_CLASS[cell.status]}>
                        {STATUS_LABEL[cell.status]}
                      </span>
                    </dt>
                    <dd className="mt-1.5 pl-5 text-sm leading-relaxed text-steel-dark">
                      {cell.note}
                    </dd>
                  </div>
                );
              })}
            </dl>
          </details>
        ))}
      </div>
      <p className="mt-4 font-mono text-xs text-steel-dark">
        Gateway docs:{" "}
        {GATEWAYS.map((gateway, index) => (
          <span key={gateway.id}>
            {index > 0 && " · "}
            <a
              href={gateway.url}
              className="text-skylight-text underline decoration-steel underline-offset-4 hover:decoration-skylight-text"
            >
              {gateway.name} ↗
            </a>
          </span>
        ))}
      </p>
    </div>
  );
}

/** Upstream signals: the refs that move cells, cited by number. */
function UpstreamSignals() {
  return (
    <div className="mt-14 border-t border-steel pt-8">
      <h3 className="mono-label text-steel-dark">
        Upstream signals — refs that move cells
      </h3>
      <ul className="mt-5 space-y-3">
        {TRACKED_REFS.map((ref) => {
          const href = `https://github.com/${ref.repo}/${
            ref.kind === "pr" ? "pull" : "issues"
          }/${ref.number}`;
          return (
            <li
              key={`${ref.repo}#${ref.number}`}
              className="flex flex-wrap items-baseline gap-x-3 gap-y-1 font-mono text-xs"
            >
              <a
                href={href}
                className="text-skylight-text underline decoration-steel underline-offset-4 hover:decoration-skylight-text"
              >
                {ref.repo} #{ref.number} ↗
              </a>
              <span className="uppercase text-steel-dark">{ref.kind}</span>
              {ref.check && (
                <span className="font-medium text-monarch-text">
                  {ref.check}
                </span>
              )}
              <span className="text-ink">{ref.title}</span>
              <span className="text-steel-dark">— {ref.moves}</span>
              {ref.ours && <span className="text-violet">ours</span>}
            </li>
          );
        })}
      </ul>
    </div>
  );
}

/**
 * The matrix — the heart of the site. 8 gateways × 9 checks, every
 * cell a dated, sourced judgment. The monarch sits at this section's
 * edge: transformation happens here.
 */
export function Matrix() {
  const top = topScore();

  return (
    <section
      id="matrix"
      aria-labelledby="matrix-heading"
      className="relative border-y border-steel bg-panel py-[var(--space-section)]"
    >
      <Reveal className="absolute -top-9 right-6 sm:right-14">
        <Butterfly className="w-16 rotate-6 sm:w-20" />
      </Reveal>

      <div className="mx-auto w-full max-w-6xl px-6">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div>
            <p className="mono-label text-steel-dark">02 — The matrix</p>
            <h2
              id="matrix-heading"
              className="text-section mt-4 font-medium"
            >
              {GATEWAYS.length} gateways × {CRITERIA.length} checks
            </h2>
          </div>
          {top < CRITERIA.length && (
            <p className="rotate-[-2deg] font-hand text-xl text-violet">
              no one clears the bar yet
            </p>
          )}
        </div>

        <div className="mt-8">
          <Legend />
        </div>

        <div className="mt-8">
          <MatrixTable top={top} />
          <MatrixStrips top={top} />
        </div>

        <CellNotes />
        <UpstreamSignals />
      </div>
    </section>
  );
}
