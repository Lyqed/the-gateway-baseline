/**
 * The cost-attribution requirements.
 *
 * Cost attribution for AI traffic is not a dashboard. It is a set of
 * requirements a gateway either meets or does not. These six are stated
 * plainly, in the operator's terms, drawn from the author's own work.
 * The sixth is the sharp one: the operator-owned attribution reaches the
 * cloud provider's own invoice as an authoritative dollar figure.
 */

export type Requirement = {
  /** Stable slug, used as the section anchor (#the-tag). */
  id: string;
  /** Short mono index label, e.g. "01". */
  index: string;
  /** Plain-language title of what is required. */
  title: string;
  /** What is required and why it matters, in prose. */
  body: string;
  /**
   * The one line that carries the requirement on its own. Set on the
   * sharpest requirements; rendered as a pulled statement.
   */
  emphasis?: string;
};

export const REQUIREMENTS: readonly Requirement[] = [
  {
    id: "every-request-owned",
    index: "01",
    title: "Every request is tagged with who it is for",
    body: "The gateway requires each request to carry the attribution it needs, which app, which team, before it will pass. A request with no owner does not reach the model. Attribution is not something reconstructed after the fact; it is the condition of the request getting through at all.",
  },
  {
    id: "operator-owned-tag",
    index: "02",
    title: "The tag is operator-owned, never trusted from the caller",
    body: "The value that will drive chargeback is assigned by the operator, pinned to an app, a route, or the key issued to it. It is not believed from a header the caller can set to anything. The gateway assigns the tag; it does not take the caller's word for it.",
    emphasis: "The gateway assigns the tag. It does not take the caller's word for it.",
  },
  {
    id: "rejection-in-your-words",
    index: "03",
    title: "A blocked request says why, in the operator's words",
    body: "When the gateway refuses a request, for missing attribution or a hit limit, it returns an operator-defined message, not a bare 4xx. A rejection that reads as policy, telling the developer what happened and what to do, is what makes the hard refusals livable.",
  },
  {
    id: "cap-by-default",
    index: "04",
    title: "Every spender has a cap by default",
    body: "Each attribution value carries a spend limit without anyone having to set one per app. The default is a cap, not unlimited. A new team that spends is bounded from its first request, not discovered on next month's bill.",
  },
  {
    id: "told-when-capped",
    index: "05",
    title: "Someone is told when a cap is hit",
    body: "The limit is not silent. When a spender reaches its cap, an alert fires from the enforcement layer itself, not reconstructed later from logs. The layer that stopped the spend is the layer that says so.",
  },
  {
    id: "the-invoice",
    index: "06",
    title: "The tag reaches the cloud provider's own bill",
    body: "This is the sharp requirement: invoice-grade attribution. The operator-set value rides all the way onto the cloud provider's invoice, on AWS via session tags on the assumed credentials, on Google Cloud via billing labels on the request, so finance slices real, authoritative dollar amounts straight from the provider's cost report. Not an estimate reconstructed in a third-party dashboard. The exact dollar figure, on the provider's bill, attributed to the team that spent it.",
    emphasis: "The exact dollar figure, on the provider's bill.",
  },
] as const;
