#!/usr/bin/env node
/**
 * Verify every ref in src/lib/ledger-refs.json against the GitHub API.
 *
 * The ledger asserts facts that reality can change under us: a pull
 * request we recorded as open can merge or close any day. This script
 * compares each ref's expectedState with what the API reports and exits
 * non-zero on any drift, so a stale ledger fails CI instead of waiting
 * for a reader to notice. This is the machinery that would have caught
 * the #32797 mistake within a day.
 */
import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const here = dirname(fileURLToPath(import.meta.url));
const refs = JSON.parse(
  readFileSync(join(here, "../src/lib/ledger-refs.json"), "utf8"),
);

const headers = { accept: "application/vnd.github+json" };
if (process.env.GITHUB_TOKEN) {
  headers.authorization = `Bearer ${process.env.GITHUB_TOKEN}`;
}

async function actualState(ref) {
  const path = ref.kind === "pr" ? "pulls" : "issues";
  const url = `https://api.github.com/repos/${ref.repo}/${path}/${ref.number}`;
  const res = await fetch(url, { headers });
  if (!res.ok) throw new Error(`${url} -> HTTP ${res.status}`);
  const data = await res.json();
  if (ref.kind === "pr" && data.merged_at) return "merged";
  if (data.state === "open") return "open";
  if (data.state === "closed") return "closed";
  throw new Error(`${url} -> unrecognized state ${JSON.stringify(data.state)}`);
}

let drift = 0;
for (const ref of refs) {
  const id = `${ref.repo}#${ref.number}`;
  try {
    const actual = await actualState(ref);
    if (actual === ref.expectedState) {
      console.log(`ok      ${id} ${actual}`);
    } else {
      drift += 1;
      console.error(
        `DRIFT   ${id} recorded ${ref.expectedState}, GitHub says ${actual}. ` +
          `Update ledger-refs.json (status prose and expectedState) and record ` +
          `the movement in the ledger.`,
      );
    }
  } catch (err) {
    drift += 1;
    console.error(`ERROR   ${id} ${err.message}`);
  }
}

if (drift > 0) {
  console.error(`\n${drift} ref(s) drifted or failed. The ledger is stale.`);
  process.exit(1);
}
console.log(`\nAll ${refs.length} refs match reality.`);
