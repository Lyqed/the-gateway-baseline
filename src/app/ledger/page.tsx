import {
  CORRECTIONS,
  DISPUTE_PROTOCOL,
  PASSES,
  PATCH_LEDGER,
  PATCH_STATUS_DATE,
} from "@/lib/ledger";

/**
 * The verification ledger. Corrections lead: a record that keeps its own
 * mistakes, dated, is the credential for everything else on the board.
 */
export default function LedgerPage() {
  return (
    <article>
      <p className="mono-label text-steel-dark">The record behind the tracker</p>
      <h1 className="text-section mt-3 font-medium tracking-tight">
        Verification ledger
      </h1>
      <p className="mt-6 max-w-2xl text-steel-dark">
        Dated verification passes, corrections kept rather than erased, and
        every upstream patch the standard has produced, with its real status.
        The record only grows; nothing in it is rewritten after the fact.
      </p>

      {/* Corrections lead. */}
      <section className="mt-14" aria-labelledby="corrections-heading">
        <h2 id="corrections-heading" className="mono-label text-blossom-deep">
          Corrections
        </h2>
        <ol className="mt-4 space-y-6">
          {CORRECTIONS.map((c, i) => (
            <li key={i} className="border-l-2 border-blossom bg-atrium py-1 pl-5">
              <p className="flex flex-wrap items-baseline gap-x-4">
                <time dateTime={c.date} className="mono-label text-steel-dark">
                  {c.date}
                </time>
                <span className="font-medium">{c.subject}</span>
              </p>
              <p className="mt-2 text-sm text-steel-dark">{c.note}</p>
            </li>
          ))}
        </ol>
      </section>

      {/* Passes */}
      <section className="mt-14" aria-labelledby="passes-heading">
        <h2 id="passes-heading" className="mono-label text-teal-deep">
          Verification passes
        </h2>
        <ol className="mt-4 space-y-5">
          {PASSES.map((p, i) => (
            <li key={i} className="flex gap-5">
              <time
                dateTime={p.date}
                className="mono-label mt-1 shrink-0 text-steel-dark"
              >
                {p.date}
              </time>
              <span className="text-sm">{p.note}</span>
            </li>
          ))}
        </ol>
      </section>

      {/* Patch ledger */}
      <section className="mt-14" aria-labelledby="patches-heading">
        <h2 id="patches-heading" className="mono-label text-steel-dark">
          Upstream patch ledger
        </h2>
        <p className="mt-3 max-w-2xl text-sm text-steel-dark">
          The standard moves by patches into the gateways it scores, not only
          by scoring them. Statuses verified {PATCH_STATUS_DATE} against the
          GitHub API.
        </p>
        <ul className="mt-5 divide-y divide-steel border-y border-steel">
          {PATCH_LEDGER.map((ref) => (
            <li key={`${ref.repo}#${ref.number}`} className="py-4">
              <p className="flex flex-wrap items-baseline gap-x-3">
                <a
                  href={ref.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-mono text-sm text-skylight-deep underline underline-offset-2 hover:text-ink"
                >
                  {ref.repo}#{ref.number}
                </a>
                <span className="font-medium">{ref.title}</span>
                {ref.ours ? (
                  <span className="mono-label text-violet-deep">ours</span>
                ) : null}
              </p>
              <p className="mt-1 text-sm text-steel-dark">
                {ref.moves}. <span className="text-ink">{ref.status}.</span>
              </p>
            </li>
          ))}
        </ul>
      </section>

      {/* Dispute protocol */}
      <section className="mt-14" aria-labelledby="disputes-heading">
        <h2 id="disputes-heading" className="mono-label text-steel-dark">
          Disputing a cell
        </h2>
        <div className="mt-4 max-w-2xl space-y-4 text-steel-dark">
          {DISPUTE_PROTOCOL.map((p, i) => (
            <p key={i} className={i === 0 ? "text-ink" : undefined}>
              {p}
            </p>
          ))}
        </div>
      </section>
    </article>
  );
}
