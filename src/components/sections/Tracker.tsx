import Link from "next/link";
import {
  CHECKS,
  NORMATIVE_CHECKS,
  GATEWAYS,
  LAST_VERIFIED,
  type GatewayRow,
} from "@/lib/gateways";
import { SIDE_LABEL, SPEC_CHECKS } from "@/lib/spec";
import { TrackerBoard, type BoardCheck, type BoardRow } from "./TrackerBoard";

/**
 * The scoreboard: the product. One large white card on the ground, the
 * gateways across the top like models being compared, the nine checks
 * down the side, a word in each cell. Every cell opens its sourced
 * reasoning. The rigor is unchanged and lives under every tap.
 */

function verifiedCount(g: GatewayRow): number {
  return NORMATIVE_CHECKS.filter((c) => g.cells[c.key]?.status === "yes")
    .length;
}

function weight(g: GatewayRow): number {
  return NORMATIVE_CHECKS.reduce((acc, c) => {
    const s = g.cells[c.key]?.status;
    return acc + (s === "yes" ? 1 : s === "partial" ? 0.01 : 0);
  }, 0);
}

export function Tracker() {
  const sorted = [...GATEWAYS].sort((a, b) => weight(b) - weight(a));
  const max = NORMATIVE_CHECKS.length;
  const rows: BoardRow[] = sorted.map((g) => ({
    id: g.id,
    name: g.name,
    kind: g.kind,
    url: g.url,
    lastVerified: g.lastVerified,
    verified: verifiedCount(g),
    cells: Object.fromEntries(
      CHECKS.map((c) => [c.key, g.cells[c.key] ?? { status: "no", note: "" }]),
    ),
  }));
  const checks: BoardCheck[] = CHECKS.map((c) => {
    const spec = SPEC_CHECKS.find((s) => s.key === c.key);
    return {
      key: c.key,
      code: c.code,
      short: c.short,
      title: c.title,
      slug: spec?.slug ?? null,
      side: spec ? SIDE_LABEL[spec.side] : "",
    };
  });

  return (
    <section
      id="tracker"
      aria-labelledby="tracker-heading"
      className="scroll-mt-16"
    >
      <div className="mx-auto w-full max-w-6xl px-6 py-[var(--space-section)]">
        <div className="max-w-3xl">
          <p className="mono-label text-steel-dark">The scoreboard</p>
          <h2 id="tracker-heading" className="text-section mt-3 text-ink">
            Which gateway can put your name on the bill?
          </h2>
          <p className="mt-5 text-[1.0625rem] leading-relaxed text-steel-dark">
            Every gateway against the same nine checks, read from its public
            documentation. Tap any cell for the sourced reasoning. Verified{" "}
            {LAST_VERIFIED}.
          </p>
        </div>

        <TrackerBoard rows={rows} checks={checks} max={max} />

        <p className="mt-6 max-w-3xl text-[0.875rem] leading-relaxed text-steel-dark">
          Scored against{" "}
          <Link href="/spec" className="text-skylight hover:underline">
            GB/1.0
          </Link>{" "}
          and nothing else. A cell is a reading of what the docs say a gateway
          does, not a claim about what a deployment achieves. Every judgment is
          sourced and every adjudication is dated in the{" "}
          <Link href="/record" className="text-skylight hover:underline">
            record
          </Link>
          . The three provisional candidates{" "}
          <Link href="/spec/candidates" className="text-skylight hover:underline">
            do not score
          </Link>
          .
        </p>
      </div>
    </section>
  );
}
