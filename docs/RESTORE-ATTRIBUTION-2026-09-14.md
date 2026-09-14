# Restore the attribution framing, 14 September 2026

The broader request-attribution homepage was published by CLI on 12 September
as `dpl_FVrT1BC2uFTjXNL7dpJhPjvngZ73`. Its application, team and person ownership
copy was present in the local worktree but had not been committed to Git.

Two README commits on 13 September triggered Git production deployments from
the older committed application source. The latest, commit
`04969e3894acf6e82d04853a5fb8f20161c25c47`, produced
`dpl_7dGY7EnjbKtvCNscLRwYC5zAW5qq` at 20:46 UTC. Both public hosts were on that
deployment when investigated. The old cost-attribution introduction and
“Which gateway can put your name on the bill?” heading were back in the live
HTML. This was a regression from an automatic Git deployment, rather than
evidence that the September 12 publication had never happened.

The repair restores and commits the previously published attribution changes
described in [the September 12 record](ATTRIBUTION-2026-09-12.md). The homepage
connects identity and ownership to requests, controls, usage records,
investigations and billing. The existing “Know where the money went.” headline
remains, as it did in that version. The normative GB/1.0 checks, scores,
evidence and historical records are outside this copy repair.

The two later README commits are retained in history, including removal of
the README title. The README introduction describes the restored broader
scope. Publishing the repair through the connected Git branch makes the
deployed copy reproducible by subsequent Git builds; it no longer depends
on an uncommitted local overlay.

`pnpm lint` and `pnpm build` pass for the restored source. Chromium and WebKit
passed at 390 and 1440 pixels against the production build, checking the
attribution copy, nine distinct specification links, navigation to the
specification and horizontal containment. The browser report and screenshots
are in `/tmp/gateway-attribution-restore-check-59O4dJ/`.

Investigation records are in `/tmp/gateway-baseline-current-alias.json` and
`/tmp/gateway-baseline-deployments.json`. The September 12 publication manifest
and verification are also preserved locally in
`/tmp/opencode/gateway-attribution-release-PFtur3/`.
