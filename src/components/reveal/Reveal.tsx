"use client";

import { useEffect, useRef } from "react";

type RevealProps = {
  /**
   * "fade" moves the machined layer (fade + small translate);
   * "draw" strokes the hand layer (SVG paths with pathLength=1 and
   * the `draw-path` class draw themselves);
   * "still" is the stillness register — a slow linear opacity fade
   * (1200ms, Kubrick pacing) with no translate at all.
   */
  mode?: "fade" | "draw" | "still";
  /** Transition delay in ms, for stagger. */
  delay?: number;
  className?: string;
  children: React.ReactNode;
};

/**
 * The site's only client component. Adds `is-visible` when the
 * wrapper enters the viewport; all visuals live in CSS, gated behind
 * both a `js` class on <html> and `prefers-reduced-motion`, so
 * no-JS and reduced-motion users simply see everything.
 */
export function Reveal({
  mode = "fade",
  delay = 0,
  className,
  children,
}: RevealProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      node.classList.add("is-visible");
      return;
    }
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            node.classList.add("is-visible");
            observer.disconnect();
          }
        }
      },
      // Monolith bands wait until they hold more of the viewport, so
      // the slow fade lands while the band is actually on screen.
      mode === "still"
        ? { threshold: 0.3 }
        : { threshold: 0.1, rootMargin: "0px 0px -48px 0px" },
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, [mode]);

  return (
    <div
      ref={ref}
      data-reveal={mode === "fade" ? "" : undefined}
      data-draw={mode === "draw" ? "" : undefined}
      data-still={mode === "still" ? "" : undefined}
      className={className}
      style={
        delay
          ? ({ "--reveal-delay": `${delay}ms` } as React.CSSProperties)
          : undefined
      }
    >
      {children}
    </div>
  );
}
