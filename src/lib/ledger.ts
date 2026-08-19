import refs from "./ledger-refs.json";

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
  /**
   * The machine-checkable state behind the prose. CI re-verifies every
   * ref against the GitHub API nightly and fails on drift, so a stale
   * status is caught by machinery, not by a reader.
   */
  expectedState: "merged" | "open" | "closed";
  /** True when the contribution is ours. */
  ours: boolean;
  url: string;
};

/** ISO date every patch-ledger status below was verified against the GitHub API. */
export const PATCH_STATUS_DATE = "2026-08-19";

export const PASSES: readonly VerificationPass[] = [
  {
    date: "2026-08-19",
    note: "Third verification: every patch-ledger ref re-checked against the GitHub API with zero drift, agentgateway #2508 (dynamic RoleSessionName, merged 2026-07-16) added to the record, LiteLLM #32797 confirmed still open, and the tracker's dated cells re-read where documentation moved.",
  },
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

/**
 * The patch data lives in ledger-refs.json, one home for prose and the
 * machine-checkable state: this module renders it, and CI verifies it
 * (.github/workflows/verify-ledger.yml).
 */
export const PATCH_LEDGER: readonly PatchRef[] = refs as PatchRef[];

/** Patches I personally wrote upstream to move the field onto the standard. */
export const OUR_PATCHES: readonly PatchRef[] = PATCH_LEDGER.filter(
  (r) => r.ours,
);

/** Issues and pull requests by others that move the same checks. */
export const COMMUNITY_PATCHES: readonly PatchRef[] = PATCH_LEDGER.filter(
  (r) => !r.ours,
);

/** The dispute protocol, stated plainly. */
export const DISPUTE_PROTOCOL: readonly string[] = [
  "A dispute is a claim that a cell is wrong, backed by evidence from the same classes the specification accepts: a public documentation citation, a conformance-run transcript, or a cloud billing artifact.",
  "Every dispute is re-verified against its evidence, and the adjudication is recorded here, dated, whichever direction the score moves. A dispute that stands corrects the cell and enters the corrections list; a dispute that fails is recorded with the reason.",
  "Our own row is disputed the same way and has no special standing. The first entry in the corrections list above was self-inflicted, and that is the standard the rest of the board is held to.",
] as const;
