import Link from "next/link";
import {
  COMMUNITY_PATCHES,
  OUR_PATCHES,
  PATCH_STATUS_DATE,
  type PatchRef,
} from "@/lib/ledger";
import { Reveal } from "@/components/reveal/Reveal";

/**
 * Upstream signals — the refs that move cells, cited by number.
 *
 * The standard does not only measure the field; it produces patches.
 * This strip shows our upstream contributions in full, each tied to the
 * check it moves, with its real status on the date shown. The community
 * refs that move the same checks are counted and linked, not listed:
 * the full record, machine-verified against the GitHub API, lives in
 * the ledger.
 */

/** Pull the "(GB-N)" code out of a moves line, if it carries one. */
function splitMoves(moves: string): { code: string | null; text: string } {
  const m = moves.match(/^(.*?)\s*\((GB-\d+)\)\s*$/);
  if (!m) return { code: null, text: moves };
  return { code: m[2], text: m[1] };
}

function isLandedStatus(ref: PatchRef): boolean {
  return ref.expectedState === "merged";
}

function SignalRow({ signal }: { signal: PatchRef }) {
  const { code, text } = splitMoves(signal.moves);
  const landed = isLandedStatus(signal);
  return (
    <li className="grid gap-x-6 gap-y-1 border-b border-steel/40 py-4 sm:grid-cols-[15rem_4rem_1fr]">
      <span className="font-mono text-sm">
        <a
          href={signal.url}
          target="_blank"
          rel="noopener noreferrer"
          className="text-skylight-deep underline decoration-steel decoration-1 underline-offset-4 transition-colors hover:decoration-skylight-deep"
        >
          {signal.repo.split("/")[1] ?? signal.repo}&nbsp;#{signal.number}
        </a>
        <span className="ml-2 uppercase text-steel-dark">{signal.kind}</span>
      </span>
      <span className="font-mono text-sm font-medium text-monarch-deep">
        {code ?? ""}
      </span>
      <span className="text-sm leading-relaxed">
        <span className="font-medium text-ink">{signal.title}.</span>{" "}
        <span className="text-steel-dark">{text}.</span>{" "}
        <span
          className={`font-mono text-xs ${
            landed ? "text-teal-deep" : "text-gold-deep"
          }`}
        >
          {signal.status}
        </span>
      </span>
    </li>
  );
}

export function UpstreamSignals() {
  return (
    <section
      id="signals"
      aria-labelledby="signals-heading"
      className="mx-auto w-full max-w-6xl scroll-mt-20 px-6 py-[var(--space-section)]"
    >
      <div className="flex flex-wrap items-end justify-between gap-6">
        <div className="max-w-2xl">
          <p className="mono-label text-steel-dark">Upstream signals</p>
          <h2 id="signals-heading" className="text-section mt-5 font-medium">
            The bar moves the field.
          </h2>
          <p className="mt-6 leading-relaxed text-steel-dark">
            A standard that only measures is a spectator. These are the
            patches and issues upstream in the tracked gateways that move
            cells on the scoreboard — ours listed in full, each tied to the
            check it moves, with its real status on the date shown.
          </p>
        </div>
        <p className="mono-label text-steel-dark">
          Statuses verified {PATCH_STATUS_DATE}
        </p>
      </div>

      <ul className="mt-10 border-t border-steel/40">
        {OUR_PATCHES.map((signal) => (
          <Reveal key={`${signal.repo}#${signal.number}`}>
            <SignalRow signal={signal} />
          </Reveal>
        ))}
      </ul>

      <p className="mt-8 max-w-2xl text-sm leading-relaxed text-steel-dark">
        <span className="font-mono font-medium text-ink">
          {COMMUNITY_PATCHES.length} more refs
        </span>{" "}
        by maintainers and the community move the same checks. The full
        record, re-verified against the GitHub API by machinery, lives in
        the{" "}
        <Link
          href="/ledger"
          className="text-skylight-deep underline underline-offset-2 hover:text-ink"
        >
          ledger
        </Link>
        .
      </p>
    </section>
  );
}
