/**
 * Keyboard skip link. Visually hidden until focused, then anchored
 * top-left so keyboard users can jump past the nav to main content.
 */
export function SkipLink() {
  return (
    <a
      href="#main"
      className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:bg-floor focus:px-4 focus:py-2 focus:font-mono focus:text-sm focus:text-atrium"
    >
      Skip to content
    </a>
  );
}
