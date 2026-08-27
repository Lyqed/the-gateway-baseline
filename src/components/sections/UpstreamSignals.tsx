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
 * Community first: the strongest evidence a bar is real is the field
 * moving toward it on its own — maintainers and unaffiliated contributors
 * pushing the same checks, with no connection to the standard. Those are
 * listed in full, first. Our own upstream patches follow, held to the
 * same citation. Every ref carries its real status on the date shown,
 * re-verified against the GitHub API.
 */

/** Landed refs (merged) lead; then open, then closed — most-shipped first. */
function byImpact(a: PatchRef, b: PatchRef): number {
  const rank = (r: PatchRef) =>
    r.expectedState === "merged" ? 0 : r.expectedState === "open" ? 1 : 2;
  return rank(a) - rank(b);
}

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
            The field is moving toward the bar.
          </h2>
          <p className="mt-6 leading-relaxed text-steel-dark">
            The strongest proof a bar is real is not that we push on it — it
            is that the field moves toward it on its own. These are the
            patches and issues from maintainers and the wider community,
            with no tie to this standard, that move the same cells on the
            scoreboard. They come first. Our own upstream patches follow,
            held to the same citation. Every ref carries its real status on
            the date shown.
          </p>
        </div>
        <p className="mono-label text-steel-dark">
          Statuses verified {PATCH_STATUS_DATE}
        </p>
      </div>

      {/* Community — the field moving on its own, listed first and in full */}
      <div className="mt-10 flex items-baseline justify-between border-t border-steel/40 pt-6">
        <p className="mono-label text-steel-dark">
          Community · the field moving on its own
        </p>
        <p className="font-mono text-sm text-steel-dark">
          {COMMUNITY_PATCHES.length}
        </p>
      </div>
      <ul>
        {[...COMMUNITY_PATCHES].sort(byImpact).map((signal) => (
          <Reveal key={`${signal.repo}#${signal.number}`}>
            <SignalRow signal={signal} />
          </Reveal>
        ))}
      </ul>

      {/* Ours — patches written to move the field onto the standard */}
      <div className="mt-14 flex items-baseline justify-between border-t border-steel/40 pt-6">
        <p className="mono-label text-steel-dark">
          Ours · patches written upstream to move the field
        </p>
        <p className="font-mono text-sm text-steel-dark">
          {OUR_PATCHES.length}
        </p>
      </div>
      <ul>
        {[...OUR_PATCHES].sort(byImpact).map((signal) => (
          <Reveal key={`${signal.repo}#${signal.number}`}>
            <SignalRow signal={signal} />
          </Reveal>
        ))}
      </ul>

      <p className="mt-8 max-w-2xl text-sm leading-relaxed text-steel-dark">
        The full record, re-verified against the GitHub API by machinery,
        lives in the{" "}
        <Link
          href="/record"
          className="text-skylight-deep underline underline-offset-2 hover:text-ink"
        >
          record
        </Link>
        .
      </p>
    </section>
  );
}
