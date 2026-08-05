/**
 * The verification ledger: the dated record behind the tracker.
 *
 * Three kinds of entries. Passes are full verifications of the board.
 * Corrections are mistakes in our own record, stated and kept, never
 * erased. The patch ledger is every upstream contribution the standard
 * has produced, with its real status on the date shown. The ledger only
 * grows; nothing in it is rewritten after the fact.
 */

export type VerificationPass = {
  /** ISO date the pass completed. */
  date: string;
  note: string;
};

export type Correction = {
  /** ISO date the correction shipped. */
  date: string;
  /** The cell or claim that was wrong. */
  subject: string;
  /** What the record said, what the evidence shows, what changed. */
  note: string;
};

export type PatchRef = {
  repo: string;
  number: number;
  kind: "pr" | "issue";
  title: string;
  /** What this moves on the bar, in plain words. */
  moves: string;
  /** Status on statusDate, stated plainly. */
  status: string;
  /** True when the contribution is ours. */
  ours: boolean;
  url: string;
};

/** ISO date every patch-ledger status below was verified against the GitHub API. */
export const PATCH_STATUS_DATE = "2026-08-05";

export const PASSES: readonly VerificationPass[] = [
  {
    date: "2026-08-03",
    note: "Second full verification: every cell re-checked against current vendor documentation, GB-9 resolved for every gateway, and our own reference row added, scored from the code and held to the same bar.",
  },
  {
    date: "2026-07-13",
    note: "First full verification: every gateway checked against public documentation, the same day the checks were sharpened and the two invoice checks were added.",
  },
] as const;

export const CORRECTIONS: readonly Correction[] = [
  {
    date: "2026-08-05",
    subject: "LiteLLM, GB-7 (the tag reaches the AWS bill)",
    note: "The 2026-08-03 pass recorded PR #32797 (STS session tags on AssumeRole) as merged and scored the cell partial. The GitHub API shows the pull request open and unmerged. The cell returns to no, the mistaken entry stays in the changelog, and this entry records the correction. The mistake had scored a competitor's row higher than its documentation supports.",
  },
] as const;

export const PATCH_LEDGER: readonly PatchRef[] = [
  {
    repo: "agentgateway/agentgateway",
    number: 2435,
    kind: "pr",
    title: "Session tags on Bedrock routes",
    moves: "Operator-set tags riding to the AWS invoice (GB-7)",
    status: "Merged 2026-07-06",
    ours: true,
    url: "https://github.com/agentgateway/agentgateway/pull/2435",
  },
  {
    repo: "agentgateway/agentgateway",
    number: 2447,
    kind: "pr",
    title: "Per-request app and team values on cloud credentials",
    moves: "Per-request tags on AWS credentials, fresh for every caller (GB-7)",
    status: "Merged 2026-07-08",
    ours: true,
    url: "https://github.com/agentgateway/agentgateway/pull/2447",
  },
  {
    repo: "agentgateway/agentgateway",
    number: 2806,
    kind: "pr",
    title: "Operator-set billing labels on native Vertex requests",
    moves: "Billing labels riding to the Vertex invoice (GB-8)",
    status: "Open",
    ours: true,
    url: "https://github.com/agentgateway/agentgateway/pull/2806",
  },
  {
    repo: "BerriAI/litellm",
    number: 32797,
    kind: "pr",
    title: "STS session tags for Bedrock AssumeRole paths",
    moves: "Operator-set tags riding to the AWS invoice (GB-7)",
    status: "Open since 2026-07-10, checks passing, no maintainer review as of 2026-08-05",
    ours: true,
    url: "https://github.com/BerriAI/litellm/pull/32797",
  },
  {
    repo: "Portkey-AI/gateway",
    number: 1728,
    kind: "pr",
    title: "Session tags on Bedrock credentials",
    moves: "Operator-set tags riding to the AWS invoice (GB-7)",
    status: "Open",
    ours: true,
    url: "https://github.com/Portkey-AI/gateway/pull/1728",
  },
  {
    repo: "BerriAI/litellm",
    number: 13692,
    kind: "issue",
    title: "Vertex AI label passthrough",
    moves: "Billing labels riding to the Vertex invoice (GB-8)",
    status: "Closed",
    ours: false,
    url: "https://github.com/BerriAI/litellm/issues/13692",
  },
] as const;

/** The dispute protocol, stated plainly. */
export const DISPUTE_PROTOCOL: readonly string[] = [
  "Anyone can dispute any cell, including a vendor disputing its own row in either direction. A dispute is a claim that a cell is wrong, backed by evidence from the same classes the specification accepts: a public documentation citation, a conformance-run transcript, or a cloud billing artifact.",
  "Every dispute is re-verified against its evidence, and the adjudication is recorded here, dated, whichever direction the score moves. A dispute that stands corrects the cell and enters the corrections list; a dispute that fails is recorded with the reason.",
  "Our own row is disputed the same way and has no special standing. The first entry in the corrections list above was self-inflicted, and that is the standard the rest of the board is held to.",
] as const;
