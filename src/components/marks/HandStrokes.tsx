/**
 * Hand strokes — the mural voice's line work: circle-an-item
 * ellipses and underline swashes. Stroke-drawn (pathLength=1 +
 * `draw-path` reveals inside a <Reveal mode="draw"> wrapper).
 * Decorative; the words they annotate carry the meaning.
 */

/** Wraps an inline word with a hand-wobbled violet ellipse. */
export function HandCircle({ children }: { children: React.ReactNode }) {
  return (
    <span className="relative inline-block whitespace-nowrap">
      {children}
      <svg
        aria-hidden="true"
        viewBox="0 0 140 60"
        fill="none"
        preserveAspectRatio="none"
        className="pointer-events-none absolute -left-[12%] -top-[32%] h-[164%] w-[124%]"
      >
        <path
          pathLength={1}
          className="draw-path"
          d="M 14 30 C 10 15 40 6 70 6 C 108 6 132 14 130 30 C 128 46 96 55 60 54 C 28 53 14 46 13 34"
          stroke="var(--violet)"
          strokeWidth="2.2"
          strokeLinecap="round"
        />
      </svg>
    </span>
  );
}

/** A short hand-drawn underline swash. */
export function HandUnderline({ className = "" }: { className?: string }) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 180 12"
      fill="none"
      preserveAspectRatio="none"
      className={`block h-2.5 w-full ${className}`}
    >
      <path
        pathLength={1}
        className="draw-path"
        d="M 3 8 C 40 3 92 3 122 5 C 148 7 166 7 177 5"
        stroke="var(--violet)"
        strokeWidth="2.5"
        strokeLinecap="round"
      />
    </svg>
  );
}

/** Tiny 4-point hand star. Sparse. */
export function Spark({ className = "" }: { className?: string }) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      fill="none"
      className={className}
    >
      <path
        d="M 12 1.5 C 12.8 6.4 13.7 9.6 14.6 10.4 C 15.5 11.2 18.4 11.9 22.5 12.3 C 18.2 13 15.3 13.8 14.4 14.6 C 13.6 15.4 12.8 18.2 12.1 22.5 C 11.3 18 10.5 15.2 9.6 14.4 C 8.8 13.6 6 12.9 1.5 12.1 C 5.9 11.5 8.8 10.8 9.7 9.9 C 10.6 9 11.3 6.2 12 1.5 Z"
        fill="var(--violet)"
      />
    </svg>
  );
}
