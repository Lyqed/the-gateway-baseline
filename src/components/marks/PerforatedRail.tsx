/**
 * Perforated rail — the mesh railing as a dot-grid texture band,
 * used as a section divider. Decorative only.
 */
export function PerforatedRail({ className = "" }: { className?: string }) {
  return (
    <div
      aria-hidden="true"
      className={`perf-rail mx-auto h-8 w-full max-w-6xl px-6 ${className}`}
    />
  );
}
