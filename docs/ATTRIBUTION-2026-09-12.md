# General attribution framing, 12 September 2026

The homepage now frames attribution across requests, application/team/person
ownership, usage, policy decisions, operational investigations, and provider
billing. The hero remains:

> Know where the money went.

Its bold introductory sentence is:

> To know that, you have to attribute requests properly.

The following copy explains the connection:

> Know which application, team or person each request belongs to. Carry that
> context through usage, policy decisions and provider billing.

Updated the hero introduction, Why section, trust examples, control-group
description, scoreboard heading, footer, shared metadata, and README. GB/1.0's
normative checks, scores, evidence, and historical records retain their previous
source hashes. This is a framing change, not a new conformance version.

Build and lint both pass. Existing internal anchors in the hero and header were
converted to Next.js Link components to satisfy lint; an unused robots import
was removed. The existing robots policy was not altered.

Chromium and WebKit checks passed at 390 and 1440 pixels locally and live. They
verified the hero, broader attribution copy, nine check links, and horizontal
containment. Local checks also exercised navigation to the specification.

Published deployment: `dpl_FVrT1BC2uFTjXNL7dpJhPjvngZ73`.

Previous deployment: `dpl_57kgY1BKfrqex17XgvmdHVHXASpx`.

Project: `prj_VAFi8HbAJlR96GuVcuopickHm9p6`.

Both apex and www aliases were explicitly moved after validating the ready
deployment and its 47-file source manifest. The CLI's additional `public`
entry was verified to be an empty directory, not a source file.

Release records: `/tmp/opencode/gateway-attribution-release-PFtur3/`.
They include rollback, source/upload manifests, the ten changed source paths,
deployment metadata, and the verified publication record.
