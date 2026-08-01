/**
 * The ring — the circular gallery, cropped by the viewport. A large
 * circular outline laid behind hero content. Decorative only.
 */
export function Ring({ className }: { className?: string }) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 800 800"
      fill="none"
      className={className}
    >
      <circle cx="400" cy="400" r="396" stroke="var(--steel)" strokeWidth="1.5" />
      <circle
        cx="400"
        cy="400"
        r="330"
        stroke="var(--steel)"
        strokeWidth="1"
        opacity="0.6"
      />
      {/* The dot on the ring — the mark. */}
      <circle cx="680" cy="120" r="14" fill="var(--monarch)" />
    </svg>
  );
}

/**
 * Ring segment — a short arc used as a timeline marker (the gallery
 * ring, quartered). Decorative; the dated text carries the meaning.
 */
export function RingSegment({ className }: { className?: string }) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 32 32"
      fill="none"
      className={className}
    >
      <path
        d="M 28 16 A 12 12 0 1 1 16 4"
        stroke="var(--steel-dark)"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <circle cx="16" cy="4" r="3" fill="var(--monarch)" />
    </svg>
  );
}
