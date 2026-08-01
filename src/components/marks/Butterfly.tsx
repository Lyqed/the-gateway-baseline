/**
 * The monarch — one butterfly, used at most once per site, at the
 * moment of transformation. On the Baseline that moment is the
 * matrix: where claims become verified cells. Hand-drawn path
 * quality, monarch + floor-dark, per the brief's vocabulary.
 */
export function Butterfly({ className = "" }: { className?: string }) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 120 110"
      fill="none"
      className={className}
    >
      {/* Antennae */}
      <path
        d="M 57 40 C 52 31 46 25 41 22 M 63 40 C 68 31 74 25 79 22"
        stroke="var(--floor)"
        strokeWidth="2"
        strokeLinecap="round"
      />
      {/* Upper wings */}
      <path
        d="M 57 52 C 44 24 16 10 9 25 C 2 41 24 57 54 59 Z"
        fill="var(--monarch)"
        stroke="var(--floor)"
        strokeWidth="2.5"
        strokeLinejoin="round"
      />
      <path
        d="M 63 52 C 76 24 104 10 111 25 C 118 41 96 57 66 59 Z"
        fill="var(--monarch)"
        stroke="var(--floor)"
        strokeWidth="2.5"
        strokeLinejoin="round"
      />
      {/* Lower wings */}
      <path
        d="M 55 62 C 38 66 24 84 34 93 C 44 101 56 82 58 66 Z"
        fill="var(--monarch)"
        stroke="var(--floor)"
        strokeWidth="2.5"
        strokeLinejoin="round"
      />
      <path
        d="M 65 62 C 82 66 96 84 86 93 C 76 101 64 82 62 66 Z"
        fill="var(--monarch)"
        stroke="var(--floor)"
        strokeWidth="2.5"
        strokeLinejoin="round"
      />
      {/* Wing spots */}
      <circle cx="26" cy="31" r="2.6" fill="var(--floor)" />
      <circle cx="94" cy="31" r="2.6" fill="var(--floor)" />
      <circle cx="40" cy="84" r="2.2" fill="var(--floor)" />
      <circle cx="80" cy="84" r="2.2" fill="var(--floor)" />
      {/* Body */}
      <ellipse cx="60" cy="58" rx="4.5" ry="17" fill="var(--floor)" />
    </svg>
  );
}
