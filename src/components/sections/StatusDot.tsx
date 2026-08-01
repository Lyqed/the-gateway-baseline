import type { SupportStatus } from "@/lib/gateways";

/** Plain-words status labels; paint never carries information alone. */
export const STATUS_LABEL: Record<SupportStatus, string> = {
  yes: "Conforms",
  partial: "Partial",
  no: "Missing",
  unknown: "Not verified",
};

/** AA-safe text color class per status (derived family members). */
export const STATUS_TEXT_CLASS: Record<SupportStatus, string> = {
  yes: "text-teal-deep",
  partial: "text-gold-deep",
  no: "text-blossom-deep",
  unknown: "text-steel-dark",
};

type StatusDotProps = {
  status: SupportStatus;
  /** Rendered square size in px. */
  size?: number;
};

/**
 * The matrix glyphs, per the binding legend: teal filled dot =
 * conforms, gold half dot = partial, blossom open dot = missing,
 * steel dash = not verified. Always paired with sr-only or visible
 * text by the caller.
 *
 * Non-text contrast (WCAG 1.4.11, 3:1 floor) governs the fills, since
 * the shape is the real encoding and color is secondary. The verified
 * and partial glyphs use the `-deep` family so every glyph clears 3:1
 * against both the panel well (`bg-panel`) and the table's atrium
 * ground (`bg-atrium`). Measured, fill vs. panel / atrium:
 *   yes    teal-deep     6.12 / 6.69
 *   partial gold-deep    5.58 / 6.10 (with a steel ring for shape read)
 *   no     blossom       4.03 / 4.41
 *   unknown steel-dark   4.69 / 5.12
 */
export function StatusDot({ status, size = 14 }: StatusDotProps) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      width={size}
      height={size}
      fill="none"
      className="inline-block align-middle"
    >
      {status === "yes" && (
        <circle cx="12" cy="12" r="8.5" fill="var(--teal-deep)" />
      )}
      {status === "partial" && (
        <>
          <circle
            cx="12"
            cy="12"
            r="7.5"
            stroke="var(--steel-dark)"
            strokeWidth="1.5"
          />
          <path d="M 12 4.5 A 7.5 7.5 0 0 0 12 19.5 Z" fill="var(--gold-deep)" />
        </>
      )}
      {status === "no" && (
        <circle
          cx="12"
          cy="12"
          r="7.5"
          stroke="var(--blossom)"
          strokeWidth="2.5"
        />
      )}
      {status === "unknown" && (
        <line
          x1="6"
          y1="12"
          x2="18"
          y2="12"
          stroke="var(--steel-dark)"
          strokeWidth="2.5"
          strokeLinecap="round"
        />
      )}
    </svg>
  );
}
