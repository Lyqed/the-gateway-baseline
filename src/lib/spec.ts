/**
 * The Gateway Baseline specification, version GB/1.0.
 *
 * This module is the single source of truth for the normative text
 * rendered at /spec. The tracker (lib/gateways.ts) scores rows against
 * these pages and nothing else. Nine checks are normative in GB/1.0;
 * three candidates sit in the provisional track and cannot score for
 * one full verification cycle.
 *
 * Version rules: the meaning of a check is frozen within a major
 * version. Corrections ship as dated errata in SPEC_CHANGELOG and
 * cannot change what a check means; breaking changes require a new
 * major.
 */

export type SpecSide = "control" | "invoice" | "operations";

export type EvidenceClass = {
  /** Stable id referenced from SpecCheck.evidence. */
  id: string;
  name: string;
  description: string;
};

export type SpecCheck = {
  /** Coded check, e.g. "GB-1". */
  code: string;
  /** URL slug under /spec, e.g. "gb-1". */
  slug: string;
  /** Tracker cell key this check scores (matches lib/gateways.ts). */
  key: string;
  /** Plain-language title. */
  title: string;
  /** Short column label used by the tracker. */
  short: string;
  side: SpecSide;
  /** Numbered normative clauses, RFC keywords, one requirement each. */
  normative: readonly string[];
  /** The single falsifiable condition a verifier decides from evidence. */
  passCondition: string;
  /** What scores partial. */
  partialMeans: string;
  /** Evidence class ids this check accepts. */
  evidence: readonly string[];
  /** Non-normative why, plain prose. */
  rationale: readonly string[];
};

export type SpecCandidate = {
  code: string;
  slug: string;
  title: string;
  /** The proposed requirement, stated as it would enter the bar. */
  statement: string;
  /** Unresolved admission questions, stated plainly. */
  openQuestions: readonly string[];
};

export type SpecChange = {
  /** ISO date the change to the bar shipped. */
  date: string;
  note: string;
};

export const SPEC_VERSION = "GB/1.0";
/** ISO date the nine checks froze as normative. */
export const SPEC_FROZEN = "2026-08-05";

export const SIDE_LABEL: Record<SpecSide, string> = {
  control: "Control",
  invoice: "Invoice",
  operations: "Operations",
};

export const SPEC_INTRO: readonly string[] = [
  "The Gateway Baseline is a conformance standard for LLM gateways, scoped to money and the controls around it. It defines what a gateway does so that every unit of spend is attributed to a spender, capped before it runs away, and lands, named, on the cloud provider's own bill.",
  "It is written for the team that answers for the bill and the incident: the platform engineer who fields the finance question about last month's invoice, and the on-call who explains why a caller was cut off mid-stream. The checks are the questions those two people ask, made decidable.",
  "Conformance means passing a check as written on these pages. A check passes, scores partial, or fails against named evidence drawn from the classes defined below; each check lists the classes it accepts, and its pass condition states what that evidence must show, including when more than one class is required together. There is no credit for roadmap, intent, or vendor assurance. Nine checks, GB-1 through GB-9, are normative in GB/1.0. Three candidates, GB-10 through GB-12, sit in a provisional track and do not score.",
  "The tracker is a separate artifact. Any gateway's row on it is scored against these pages and nothing else. The spec is the ruler; the tracker is a measurement taken with it."
];

export const VERSION_RULES: readonly string[] = [
  "Within a major version, the meaning of a check MUST NOT change.",
  "Corrections ship as dated errata. An erratum MAY fix wording, links, or an ambiguity with one honest reading; it MUST NOT change what a check means, and it MUST NOT change the score of any row already published on the tracker: a correction that would change a published score is a meaning change and requires a new major version.",
  "A change that alters what a check means, adds a normative check, or retires one MUST ship as a new major version.",
  "Every change to the bar, including errata, MUST appear as a dated entry in the changelog."
];

export const ADMISSION_RULES: readonly string[] = [
  "A new check MUST be decidable from the evidence classes defined in this spec: public documentation, a conformance-run transcript, or a cloud billing artifact. Vendor intent is not evidence.",
  "A new check MUST measure money truth observable at the caller or on the invoice. A check that rewards an implementation shape does not qualify, however good the shape.",
  "At least two independent implementations, at most one of them maintained by the spec's authors, MUST plausibly be able to pass within twelve months of admission; the admission changelog entry MUST name both implementations and record the basis for plausibility.",
  "A candidate enters the provisional track on admission and MUST NOT score until at least one full verification cycle (a dated, changelog-recorded scoring pass over every tracked gateway against the then-current normative checks) has completed after its admission date.",
  "A candidate MAY enter the provisional track while an admission rule remains in open question, with that question stated plainly on its listing; it MUST satisfy every admission rule before it can freeze as normative and score."
];

export const EVIDENCE_CLASSES: readonly EvidenceClass[] = [
  {
    "id": "public-doc",
    "name": "Public documentation citation",
    "description": "A citation to public documentation, versioned or dated, that states the behavior plainly enough for the check to be decided from the text alone."
  },
  {
    "id": "transcript",
    "name": "Conformance-run transcript",
    "description": "The raw request and response from a conformance run, with enough recorded configuration that a third party can reproduce it."
  },
  {
    "id": "billing-artifact",
    "name": "Cloud billing artifact",
    "description": "A line from an AWS Cost and Usage Report or a row from a GCP billing export showing the operator-resolved attribution value on the provider's own bill, traceable to a request made through the gateway under test: the artifact's account, time window, and usage type MUST match a request recorded in a conformance-run transcript."
  }
];

export const NON_GOALS: readonly string[] = [
  "The Baseline does not score routing quality, model coverage, latency, agent connectivity, MCP or tool orchestration, semantic caching, prompt or content safety, or dashboards.",
  "It measures whether the money is controlled and lands, named, on the bill. Gateways that do those other things well can also pass this bar; the bar is silent about them."
];

export const SPEC_CHECKS: readonly SpecCheck[] = [
  {
    "code": "GB-1",
    "slug": "gb-1",
    "key": "enforced-keys",
    "title": "Every request is tagged with who it is for",
    "short": "Enforced keys",
    "side": "control",
    "normative": [
      "The operator MUST be able to declare the attribution keys every request is tagged with, as headers or equivalent request metadata.",
      "The gateway MUST reject any request it cannot attribute to a spender under the declared keys.",
      "The gateway MUST enforce attribution on every request, before the request reaches a provider.",
      "Enforcement MUST cover every request path the gateway exposes; a conformance run on one path does not establish paths it did not exercise, and a documented bypass path fails the check."
    ],
    "passCondition": "A conformance run shows a request the gateway cannot attribute under the declared keys rejected, with documentation or the run's recorded configuration establishing that no provider call is made for rejected requests, while an otherwise identical request the gateway can attribute (via a GB-2 verified token or a GB-3 operator-pinned value) is served.",
    "partialMeans": "The gateway can record attribution values but cannot be made to reject a request that lacks them; untagged traffic is metered or logged instead of stopped. Observation without refusal scores partial.",
    "evidence": [
      "public-doc",
      "transcript"
    ],
    "rationale": [
      "A spend figure with no name attached can be totaled but never answered for. The question of whether the spend was worth it cannot even be asked until every line of it has a spender, and attribution enforced at the gateway, on every request, is what makes the set of spenders complete by construction rather than by audit.",
      "The rejection is the enforcement. A gateway that logs a missing tag and forwards the request anyway has a reporting feature, not a control: the untagged traffic it waves through is exactly the spend nobody claims at the end of the month.",
      "The cloud providers say the same thing about their own tagging. Amazon Bedrock's per-request metadata documentation states that request metadata \"is supplied per call and is not enforced by Amazon Bedrock. Requests that omit it still succeed, and there is no service-side policy to require it. To guarantee coverage across an organization, set request metadata in a shared client or LLM gateway.\" The provider will record whatever the caller sends and will not refuse a request for sending nothing; the only place attribution can be made mandatory is the gateway, which is why this check exists and why it sits first."
    ]
  },
  {
    "code": "GB-2",
    "slug": "gb-2",
    "key": "jwt-values",
    "title": "The tag can be read from a verified login",
    "short": "JWT values",
    "side": "control",
    "normative": [
      "The gateway MUST be able to derive the attribution value for a caller that logs in from claims on a JWT the gateway itself validates.",
      "The gateway MUST evaluate that derivation on every request attributed under this mode, so that the value always reflects the verified claims of the token presented on that request; callers whose derivation-relevant claims differ yield different values, and callers the operator maps to the same claim value legitimately share one.",
      "The gateway MUST NOT attribute a request from claims on a token it did not validate."
    ],
    "passCondition": "A request carrying a valid JWT is attributed with a value derived from the token's verified claims, and the same request with an altered or unsigned token is either rejected or attributed only by a GB-3 operator-assigned value, never by any value read from the unvalidated token or from other caller-supplied content.",
    "partialMeans": "The gateway validates JWTs but cannot source the attribution value from the verified claims, so the login and the tag stay disconnected. A value read from claims the gateway never verified is not partial; that value is self-reported, and fails.",
    "evidence": [
      "public-doc",
      "transcript"
    ],
    "rationale": [
      "This is the proven mode. When the tag is derived from claims on a token the gateway validated, the tag is a fact about who logged in, not a string the caller chose to send. A different caller yields a different tag, checked on every request, so a shared or stolen value stops working the moment the token behind it does.",
      "The check requires the capability, not universal use of it. Every tag has exactly two possible origins: proven from a verified login here, or assigned by the operator under GB-3. Both origins have to be available; how far a team pushes verification across its callers is the team's decision, and the standard takes no position on it."
    ]
  },
  {
    "code": "GB-3",
    "slug": "gb-3",
    "key": "static-values",
    "title": "The tag can be assigned",
    "short": "Static values",
    "side": "control",
    "normative": [
      "The operator MUST be able to assign the attribution value for callers that do not log in by pinning it at a grain finer than the fleet: to an app, to a route, or to the key issued to that caller; any one of these grains satisfies this statement.",
      "The gateway MUST NOT allow any header, parameter, or body content supplied by the caller to set or change an assigned attribution value.",
      "The gateway MUST NOT attribute a request from a caller-supplied value unless that value is derived under GB-2 from a token the gateway validated."
    ],
    "passCondition": "With a value pinned by the operator, a request carrying a conflicting caller-supplied value is attributed with the operator's value, demonstrated by an effect observable in the named evidence (the attribution value echoed in the response, or a limit keyed to the pinned value firing on that request, recorded in the transcript), and no such effect keyed to the caller-supplied value.",
    "partialMeans": "Assignment exists but only at a single fleet-wide grain, so every caller that does not log in collapses into one spender. A pinned value that a caller-supplied header can still override is not partial; it fails.",
    "evidence": [
      "public-doc",
      "transcript"
    ],
    "rationale": [
      "Most fleet traffic does not log in. Batch jobs, internal services, and shipped applications call through issued keys, and their spend needs a name as much as any user's. Pinning the value to the app, the route, or the key puts the naming decision with the operator who answers for the bill.",
      "The value that will drive chargeback is assigned, not believed. A header the caller can set to anything is the caller's word, and a gateway that takes the caller's word has no attribution; it has a suggestion box. Together with GB-2 this closes the set: every tag is either proven from a login or assigned by the operator, and there is no third origin."
    ]
  },
  {
    "code": "GB-4",
    "slug": "gb-4",
    "key": "error-bodies",
    "title": "A blocked request says why, in your words",
    "short": "Error bodies",
    "side": "control",
    "normative": [
      "The gateway MUST return an operator-defined error body on every request it rejects for policy (missing attribution or a hit limit); rejections for malformed input, authentication failure, or transport error are out of scope for this check.",
      "The gateway MUST NOT answer a policy rejection with a bare status code and a generic or empty body.",
      "The gateway MUST end any stream it cuts mid-generation for policy with an operator-defined terminal event.",
      "Operator-defined means the operator authors the content as free text, optionally with variables; selecting among vendor-supplied fixed messages does not satisfy this check."
    ],
    "passCondition": "A rejected request returns a body whose content the operator defined, appearing verbatim in the response transcript; if the gateway cuts streams mid-generation for policy, a cut stream's transcript ends with the operator-defined terminal event; a gateway whose documentation states it never cuts running streams for policy satisfies the stream clause on that citation.",
    "partialMeans": "Operator-defined bodies cover plain HTTP rejections but a policy cut mid-stream ends in a bare disconnect or a generic event, or the body is customizable for one rejection class and not the other.",
    "evidence": [
      "public-doc",
      "transcript"
    ],
    "rationale": [
      "Hard rejections are livable only when they read as policy. A bare 429 is indistinguishable from an outage: it gets paged on, escalated, and root-caused before anyone thinks to check a budget. The same rejection in the operator's own words routes itself, because the message names the cap and says what to do next.",
      "Streams are where the discipline is easiest to drop and hardest to do without. A connection that dies mid-generation with no closing event looks exactly like infrastructure failure. An operator-defined terminal event turns the cut into a sentence the caller can act on."
    ]
  },
  {
    "code": "GB-5",
    "slug": "gb-5",
    "key": "default-limit",
    "title": "Every spender gets a cap by default",
    "short": "Default limit",
    "side": "control",
    "normative": [
      "The gateway MUST apply a fleet-wide default spend limit to every distinct value of each attribution key the operator declares, from that value's first request, with no per-spender action by the operator; documentation MUST state whether limits additionally apply per key combination.",
      "The operator MUST be able to override the default for specific values.",
      "The operator MUST be able to denominate the default limit in tokens, in a currency amount, or in a budget stated in one of those units; a limit expressible solely in request counts, or in a vendor-defined unit with no stated conversion to tokens or currency, does not satisfy this check."
    ],
    "passCondition": "An attribution value never seen before makes its first request and the fleet default, denominated in tokens, a currency amount, or a budget stated in one of those units, is enforced against it with no prior operator action for that value, shown either by documentation stating the default binds from the first request inclusive, or by a conformance run in which a sufficiently small default causes that value's traffic to be rejected.",
    "partialMeans": "Per-spender limits exist but each spender has to be enrolled by hand, or the only denomination available is request counts or a vendor unit with no stated conversion to tokens or currency. A cap the operator has to remember to create is a cap the newest spender does not have.",
    "evidence": [
      "public-doc",
      "transcript"
    ],
    "rationale": [
      "The default is a cap, not unlimited. A new value under the attribution keys, whether it names an app, a team, a user, or a customer, is bounded from its first request instead of discovered on next month's bill. Any scheme that depends on the operator enrolling each spender fails on the spender the operator forgot, which is always the one that runs away.",
      "Request counts are the wrong denominator for this bar. One request can cost a fraction of a cent or several dollars depending on the model and the context it drags in. A cap that speaks in tokens, cost, or budget speaks the language the bill is written in."
    ]
  },
  {
    "code": "GB-6",
    "slug": "gb-6",
    "key": "alerts",
    "title": "Someone is told when a cap is hit",
    "short": "Alerts",
    "side": "control",
    "normative": [
      "The gateway MUST push a notification to an operator-configured destination outside the gateway's own UI, logs, and metrics (for example a webhook, an email address, or a chat channel) when a spender hits a limit, within a delivery bound the gateway states; a record the operator must poll, scrape, or open the gateway to see is not a notification.",
      "The gateway MUST emit that notification from the layer that enforced the limit, without requiring a separate monitoring stack to be wired first."
    ],
    "passCondition": "Crossing a limit produces a pushed notification at the operator-configured destination, emitted within its stated delivery bound by the gateway that enforced the limit, with no external monitoring pipeline in the path.",
    "partialMeans": "The limit event exists only as a log line, a metric an external system has to scrape and alert on, or an in-product inbox the operator has to open. Raw material for a notification is not a notification.",
    "evidence": [
      "public-doc",
      "transcript"
    ],
    "rationale": [
      "The layer that stopped the spend is the layer that says so. When a cap fires, two parties need to hear about it: the caller, which GB-4 covers, and the person who answers for the budget, which this check covers. A limit that fires silently is a limit the operator learns about from the complaint.",
      "Exposing the event as a metric and calling it done pushes the real work onto a monitoring stack that many fleets have not wired to the gateway and some do not have at all. The notification has to come from the enforcement point itself, or the default outcome of hitting a cap is silence."
    ]
  },
  {
    "code": "GB-7",
    "slug": "gb-7",
    "key": "aws-invoice",
    "title": "The tag reaches the AWS bill",
    "short": "AWS invoice",
    "side": "invoice",
    "normative": [
      "The gateway MUST carry the attribution value into AWS billing records for every request it routes to AWS Bedrock, such that the cost of every request lands in the Cost and Usage Report under the operator-resolved value (the report aggregates line items by tag, principal, and usage type over time; it carries no per-request identifier, and none is required); session tags and the role session name on the credentials for the upstream call are the reference mechanisms, and any mechanism that lands the value on the report satisfies this statement.",
      "The gateway MUST resolve the value that lands in the Cost and Usage Report in the proven mode (GB-2) or the assigned mode (GB-3).",
      "The gateway MUST NOT forward a caller-supplied value onto the bill without operator resolution."
    ],
    "passCondition": "A Cost and Usage Report line for a Bedrock request made through the gateway shows the attribution value, and the mechanism, shown by documentation or a conformance run, resolves that value at the gateway in the proven mode (GB-2) or the assigned mode (GB-3), rather than copying caller input the gateway did not validate.",
    "partialMeans": "The value reaches the Cost and Usage Report but is passed through from the caller rather than set or derived by the operator, or it lands for only part of the gateway's Bedrock traffic (for example on non-streaming calls but not on streams): a bill that names only some of the spend scores partial.",
    "evidence": [
      "public-doc",
      "transcript",
      "billing-artifact"
    ],
    "rationale": [
      "A spend figure computed from a price table is an estimate. The number AWS charges is in the Cost and Usage Report, and it is the only number that ends a billing dispute. A gateway can meter tokens and multiply by prices, and finance can build chargeback on that arithmetic, but the first discrepancy turns the whole chargeback into a negotiation. When the attribution value rides to the bill itself, the cost per spender is a fact before anyone asks whether the spend was worth it.",
      "The mechanism that gets the value there does more than label a line. On Bedrock, the value can travel on the credentials for the upstream call, as session tags or the role session name on a role the gateway assumes per request. When the gateway assumes that role, workloads stop holding long-lived cloud credentials of their own; credential management collapses into one role in one place. Because the value is on every request's billing record, every cent of Bedrock spend has a named backer. And because the session identity differs per caller, callers become distinguishable in the cloud audit trail, where a single shared gateway role used to make every one of them look identical. Cost attribution is also identity attribution.",
      "The value must be the operator's because a tag the caller chooses is a chargeback line the spender can rewrite. A bill annotated with self-reported names settles nothing, which is why a caller-supplied value that reaches the report scores partial and no better."
    ]
  },
  {
    "code": "GB-8",
    "slug": "gb-8",
    "key": "vertex-invoice",
    "title": "The tag reaches the Vertex bill",
    "short": "Vertex invoice",
    "side": "invoice",
    "normative": [
      "The gateway MUST carry the attribution value into Google billing records for every request it routes to Google Vertex AI, such that the cost of every request lands in the GCP billing export under the operator-resolved value (the export aggregates by label and SKU over time; no per-request identifier is required); billing labels on the native Vertex request are the reference mechanism, and any mechanism that lands the value in the export satisfies this statement.",
      "The gateway MUST resolve the value that lands in the GCP billing export in the proven mode (GB-2) or the assigned mode (GB-3).",
      "The gateway MUST NOT forward a caller-supplied value onto the bill without operator resolution."
    ],
    "passCondition": "A GCP billing export row for a Vertex AI request made through the gateway shows the attribution value, and the mechanism, shown by documentation or a conformance run, resolves that value at the gateway in the proven mode (GB-2) or the assigned mode (GB-3), rather than copying caller input the gateway did not validate.",
    "partialMeans": "The label reaches the billing export but carries a caller-supplied value the gateway forwarded unresolved, or it lands for only part of the gateway's Vertex traffic: a bill that names only some of the spend scores partial.",
    "evidence": [
      "public-doc",
      "transcript",
      "billing-artifact"
    ],
    "rationale": [
      "The invoice argument does not change between clouds: the GCP billing export is the number Google charges, and a spend figure derived from a price table is an estimate of it. What changes is the mechanism, which is why each cloud gets its own check. On Vertex, the reference mechanism rides the attribution value on the native request as billing labels, landing as a row in the billing export. Passing GB-7 says nothing about passing this one; the reference transports do not overlap.",
      "The consequences carry over. When the gateway holds the service credentials for Vertex, workloads stop carrying keys of their own and credential management collapses into one identity in one place. Every row in the export names who the spend was for, so no cent is anonymous. And because attribution is applied per request, the callers behind one gateway identity stop being interchangeable in the provider's own records. The same value that prices the request identifies it.",
      "As with GB-7, the label is the operator's. A value the caller supplies and the gateway forwards is a chargeback line the spender controls; it reaches the bill, and it scores partial, because the bill it produces cannot settle a dispute between the operator and the spender."
    ]
  },
  {
    "code": "GB-9",
    "slug": "gb-9",
    "key": "live-changes",
    "title": "The rules can change while it runs",
    "short": "Live changes",
    "side": "operations",
    "normative": [
      "The gateway MUST apply changes to each of spend caps, attribution keys, and rejection messages while running, without a redeploy.",
      "The gateway MUST NOT drop in-flight requests, including streams mid-generation, when a policy change applies; \"drop\" means termination without the operator-defined terminal event GB-4 requires, and a mid-stream policy cut delivered with that terminal event is enforcement, not a drop.",
      "The gateway MAY let streams already running when a change applies finish under the rules in force when they began.",
      "The gateway MUST state a finite, time-denominated bound on how long superseded rules can remain in effect after a change applies; a claimed bound of zero MUST be accompanied by documentation of the mechanism that achieves it over in-flight streams, and absent that documentation the claim scores partial."
    ],
    "passCondition": "Evidence shows changes to caps, attribution keys, and rejection messages taking effect on a running gateway with no redeploy and no dropped in-flight requests, and a stated finite, time-denominated bound on how long superseded rules can remain in effect.",
    "partialMeans": "The change applies live for some policy surfaces but not all three (caps, attribution keys, rejection messages), or it applies live with no stated finite bound on how long superseded rules can linger, or with a claimed zero bound and no documented mechanism behind it. A reload that drops in-flight streams is a fail, not a partial.",
    "evidence": [
      "public-doc",
      "transcript"
    ],
    "rationale": [
      "Caps, tags, and rejection messages change weekly in a real fleet. When changing a limit means redeploying the gateway, every adjustment becomes a change ticket with a deploy window, and the team stops adjusting. The caps drift out of date, and a control that looked strong on paper goes stale in practice.",
      "The staleness bound is the honest half of the check. Instant enforcement over streaming traffic is a hard promise: a stream opened under the old cap is already generating when the new one lands. A gateway that states how long old rules can linger makes a claim that can be tested. A zero claim is a claim about in-flight streams, and it stands only with the mechanism behind it documented. Trust comes from declared edges."
    ]
  }
];


export const CANDIDATES_INTRO: readonly string[] = [
  "Three checks enter GB/1.0 as candidates. They are published, worded, and open to argument, and they do not score. A candidate sits in the provisional track for at least one full verification cycle, the dated, changelog-recorded scoring pass defined under admission, before it can freeze as normative, and it can be reworded or withdrawn while it sits there.",
  "Each candidate is listed with its open questions stated plainly. A question listed here is unresolved; the wording beside it is a draft, not a bar."
];

export const CANDIDATES: readonly SpecCandidate[] = [
  {
    "code": "GB-10",
    "slug": "gb-10",
    "title": "The fleet is managed the way teams already manage clusters",
    "statement": "Fleet policy lives as desired state in Git, and a reconciler converges the running fleet to it. Changes are proposed as diffs, reviewed, merged, and applied by machinery, and the running state can always be compared against the declared one.",
    "openQuestions": [
      "It observes an implementation shape rather than something visible at the caller or on the invoice, which strains admission rule 2. The case for it is that a fleet whose policy cannot be diffed and reviewed cannot show what its rules were on a given date, and that is a money question. The case is not yet decisive.",
      "It has to be worded so that a hosted control plane with exported, diffable, reviewable desired state could plausibly pass. Worded to require Git itself, it fails admission rule 3."
    ]
  },
  {
    "code": "GB-11",
    "slug": "gb-11",
    "title": "Every traffic shape the gateway carries is metered and attributed",
    "statement": "Whatever shapes a gateway chooses to carry (SSE streams, realtime sessions, MCP tool calls, agent fan-out), every one of them is metered and attributed. Nothing escapes the meter, and where the meter is inexact, the inexactness is stated, never silent. A gateway that does not carry a shape takes N/A on that shape, not a fail.",
    "openQuestions": [
      "The wording has to score metering truth and never feature presence: a gateway gains nothing for carrying a shape and loses nothing for declining one. Holding that line in normative text is the open drafting problem.",
      "Deciding from public evidence whether a gateway does not carry a shape, or carries it unmetered, is unresolved."
    ]
  },
  {
    "code": "GB-12",
    "slug": "gb-12",
    "title": "The spend figure is the bill's, not a guess",
    "statement": "The spend figure the gateway reports comes from provider-authoritative usage. No dollar figure is fabricated, and where an estimate appears, it carries a stated error bound.",
    "openQuestions": [
      "It overlaps GB-7 and GB-8, which already require the attribution value to land on the provider's own bill.",
      "The alternative under consideration is to record the same facts as a classification column on the tracker (attribution source: operator-resolved or caller-asserted; dollar source: provider invoice or price table) instead of a scored check. That adjudication is open, not decided."
    ]
  }
];

export const SPEC_CHANGELOG: readonly SpecChange[] = [
  {
    "date": "2026-08-22",
    "note": "Erratum to GB-7 and GB-8: the phrase \"lands, per request, in\" the billing report is replaced with \"the cost of every request lands in\" the report under the operator-resolved value, with a note that the reports aggregate by tag, principal, and usage type over time and carry no per-request identifier. AWS documented on 2026-08-21 that neither CUR nor CUR 2.0 carries one. The meaning is unchanged (every request's spend is attributed; the report sums it) and no published score moves. GB-1 rationale gains AWS's own statement that request attribution is not enforced by Bedrock and must be made mandatory at the gateway."
  },
  {
    "date": "2026-08-19",
    "note": "GB-10, GB-11, and GB-12 return to the provisional track, reversing the same-day withdrawal below. Candidates are argued in public, not erased in private; they remain published, worded, and unscored. The reference row stays retired."
  },
  {
    "date": "2026-08-19",
    "note": "GB-10, GB-11, and GB-12 withdrawn from the provisional track before scoring. The Baseline is GB-1 through GB-9. The reference implementation's row is retired from the tracker; the standard is scored against shipping gateways only."
  },
  {
    "date": "2026-08-05",
    "note": "GB/1.0 frozen. Nine checks, GB-1 through GB-9, are normative. GB-10, GB-11, and GB-12 enter the provisional candidates track and do not score for one full verification cycle."
  },
  {
    "date": "2026-08-05",
    "note": "Pre-freeze review applied: pass conditions bound to decidable evidence, GB-7 and GB-8 made mechanism-neutral with named reference transports, GB-9 reconciled with GB-4 on mid-stream cuts, admission and evidence rules aligned with the three evidence classes, verification cycle defined."
  },
  {
    "date": "2026-07-14",
    "note": "GB-9 added: policy changes apply to a running gateway without a redeploy and without dropping in-flight requests."
  },
  {
    "date": "2026-07-13",
    "note": "GB-7 and GB-8 tightened: the value on the bill is set or derived by the operator; caller passthrough scores partial."
  },
  {
    "date": "2026-07-13",
    "note": "GB-7 and GB-8 added: invoice-grade attribution, one check per cloud."
  },
  {
    "date": "2026-07-13",
    "note": "Version 1: six checks named and coded."
  }
];

export function checkBySlug(slug: string): SpecCheck | undefined {
  return SPEC_CHECKS.find((c) => c.slug === slug);
}
