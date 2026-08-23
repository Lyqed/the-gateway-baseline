/**
 * Frozen point-in-time copies of the matrix, one per verification pass.
 *
 * A snapshot records that day's judgment, mistakes included: the
 * 2026-08-03 snapshot carries the LiteLLM GB-7 cell as it was recorded
 * (partial), because the 2026-08-05 correction is a record entry, not a
 * rewrite of history. Statuses only; reasoning notes live with the live
 * matrix. This is the data the future diff-between-passes view draws
 * from, and the custody home for pass data after the personal-site copy
 * was retired on 2026-08-05.
 */

import type { CheckStatus } from "@/lib/gateways";

export type MatrixSnapshot = {
  /** ISO date the snapshot was frozen, matching a verification pass. */
  date: string;
  /** One line on what this snapshot records. */
  note: string;
  /** gatewayId -> checkKey -> status at the snapshot date. */
  cells: Record<string, Record<string, CheckStatus>>;
};

export const SNAPSHOTS: readonly MatrixSnapshot[] = [
  {
    date: "2026-08-03",
    note: "Second full verification: nine gateways against all twelve checks (108 cells), our own reference row added and scored from the code. Recorded as judged that day: the LiteLLM GB-7 cell reads partial here; the 2026-08-05 correction to no is recorded on the record page, not rewritten into this snapshot.",
    cells: {
      "the-gateway-baseline": {
        "enforced-keys": "yes",
        "jwt-values": "partial",
        "static-values": "yes",
        "error-bodies": "yes",
        "default-limit": "yes",
        alerts: "yes",
        "aws-invoice": "yes",
        "vertex-invoice": "yes",
        "live-changes": "yes",
        "fleet-gitops": "yes",
        "metered-shapes": "partial",
        "invoice-true": "yes",
      },
      agentgateway: {
        "enforced-keys": "yes",
        "jwt-values": "yes",
        "static-values": "yes",
        "error-bodies": "partial",
        "default-limit": "partial",
        alerts: "no",
        "aws-invoice": "yes",
        "vertex-invoice": "no",
        "live-changes": "yes",
        "fleet-gitops": "partial",
        "metered-shapes": "partial",
        "invoice-true": "partial",
      },
      litellm: {
        "enforced-keys": "partial",
        "jwt-values": "partial",
        "static-values": "yes",
        "error-bodies": "partial",
        "default-limit": "yes",
        alerts: "yes",
        "aws-invoice": "partial",
        "vertex-invoice": "partial",
        "live-changes": "partial",
        "fleet-gitops": "no",
        "metered-shapes": "partial",
        "invoice-true": "partial",
      },
      portkey: {
        "enforced-keys": "partial",
        "jwt-values": "partial",
        "static-values": "yes",
        "error-bodies": "no",
        "default-limit": "partial",
        alerts: "partial",
        "aws-invoice": "no",
        "vertex-invoice": "yes",
        "live-changes": "yes",
        "fleet-gitops": "no",
        "metered-shapes": "partial",
        "invoice-true": "partial",
      },
      kong: {
        "enforced-keys": "partial",
        "jwt-values": "partial",
        "static-values": "yes",
        "error-bodies": "partial",
        "default-limit": "partial",
        alerts: "partial",
        "aws-invoice": "partial",
        "vertex-invoice": "no",
        "live-changes": "yes",
        "fleet-gitops": "partial",
        "metered-shapes": "partial",
        "invoice-true": "partial",
      },
      "envoy-ai": {
        "enforced-keys": "partial",
        "jwt-values": "yes",
        "static-values": "yes",
        "error-bodies": "yes",
        "default-limit": "partial",
        alerts: "no",
        "aws-invoice": "no",
        "vertex-invoice": "no",
        "live-changes": "yes",
        "fleet-gitops": "partial",
        "metered-shapes": "partial",
        "invoice-true": "yes",
      },
      "cloudflare-ai": {
        "enforced-keys": "partial",
        "jwt-values": "partial",
        "static-values": "partial",
        "error-bodies": "no",
        "default-limit": "partial",
        alerts: "no",
        "aws-invoice": "no",
        "vertex-invoice": "no",
        "live-changes": "yes",
        "fleet-gitops": "no",
        "metered-shapes": "partial",
        "invoice-true": "partial",
      },
      bifrost: {
        "enforced-keys": "yes",
        "jwt-values": "partial",
        "static-values": "yes",
        "error-bodies": "partial",
        "default-limit": "partial",
        alerts: "yes",
        "aws-invoice": "partial",
        "vertex-invoice": "no",
        "live-changes": "partial",
        "fleet-gitops": "no",
        "metered-shapes": "partial",
        "invoice-true": "partial",
      },
      helicone: {
        "enforced-keys": "no",
        "jwt-values": "no",
        "static-values": "no",
        "error-bodies": "no",
        "default-limit": "partial",
        alerts: "yes",
        "aws-invoice": "no",
        "vertex-invoice": "no",
        "live-changes": "no",
        "fleet-gitops": "no",
        "metered-shapes": "partial",
        "invoice-true": "partial",
      },
    },
  },
  {
    date: "2026-07-13",
    note: "First full verification: eight gateways against the then-eight checks (64 cells), the same day the checks were sharpened and the two invoice checks were added.",
    cells: {
      agentgateway: {
        "enforced-keys": "yes",
        "jwt-values": "yes",
        "static-values": "yes",
        "error-bodies": "partial",
        "default-limit": "partial",
        alerts: "no",
        "aws-invoice": "yes",
        "vertex-invoice": "no",
      },
      litellm: {
        "enforced-keys": "partial",
        "jwt-values": "partial",
        "static-values": "yes",
        "error-bodies": "partial",
        "default-limit": "yes",
        alerts: "yes",
        "aws-invoice": "no",
        "vertex-invoice": "partial",
      },
      portkey: {
        "enforced-keys": "partial",
        "jwt-values": "partial",
        "static-values": "yes",
        "error-bodies": "no",
        "default-limit": "partial",
        alerts: "partial",
        "aws-invoice": "no",
        "vertex-invoice": "yes",
      },
      kong: {
        "enforced-keys": "partial",
        "jwt-values": "partial",
        "static-values": "yes",
        "error-bodies": "yes",
        "default-limit": "partial",
        alerts: "partial",
        "aws-invoice": "partial",
        "vertex-invoice": "no",
      },
      "envoy-ai": {
        "enforced-keys": "partial",
        "jwt-values": "yes",
        "static-values": "yes",
        "error-bodies": "yes",
        "default-limit": "partial",
        alerts: "no",
        "aws-invoice": "no",
        "vertex-invoice": "no",
      },
      "cloudflare-ai": {
        "enforced-keys": "partial",
        "jwt-values": "no",
        "static-values": "partial",
        "error-bodies": "no",
        "default-limit": "yes",
        alerts: "no",
        "aws-invoice": "no",
        "vertex-invoice": "no",
      },
      bifrost: {
        "enforced-keys": "yes",
        "jwt-values": "partial",
        "static-values": "yes",
        "error-bodies": "partial",
        "default-limit": "partial",
        alerts: "partial",
        "aws-invoice": "partial",
        "vertex-invoice": "no",
      },
      helicone: {
        "enforced-keys": "no",
        "jwt-values": "no",
        "static-values": "partial",
        "error-bodies": "no",
        "default-limit": "partial",
        alerts: "yes",
        "aws-invoice": "no",
        "vertex-invoice": "no",
      },
    },
  },
] as const;

export function snapshotFor(date: string): MatrixSnapshot | undefined {
  return SNAPSHOTS.find((s) => s.date === date);
}

export function snapshotCellCount(s: MatrixSnapshot): number {
  return Object.values(s.cells).reduce(
    (n, row) => n + Object.keys(row).length,
    0,
  );
}
