"use client";

import { useEffect } from "react";

/**
 * The monarch orbits the ring in the favicon, in step with the header
 * mark. Both derive their phase from the wall clock (epoch time modulo
 * the period), so the tab icon and the in-page icon are always at the
 * same point of the same lap — across tabs, reloads, and windows.
 *
 * Browsers do not animate SVG favicons on their own; the only reliable
 * mechanism is swapping the <link rel="icon"> href. Frames are cheap
 * (one small data URI), updates pause while the tab is hidden, and
 * under prefers-reduced-motion the lap slows from 16s to 64s.
 */
const BASE_PERIOD_MS = 16_000;
const ORBIT_R = 12.02; /* the dot's distance from center in icon.svg */
const START_ANGLE = -Math.PI / 4; /* icon.svg's dot sits at the ring's 1:30 */

export function FaviconOrbit() {
  useEffect(() => {
    const reduce = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    const period = reduce ? BASE_PERIOD_MS * 4 : BASE_PERIOD_MS;
    const step = reduce ? 1000 : 250;

    let link = document.querySelector<HTMLLinkElement>('link[rel="icon"]');
    if (!link) {
      link = document.createElement("link");
      link.rel = "icon";
      document.head.appendChild(link);
    }
    link.type = "image/svg+xml";

    const draw = () => {
      const a = START_ANGLE + 2 * Math.PI * ((Date.now() % period) / period);
      const x = (16 + ORBIT_R * Math.cos(a)).toFixed(2);
      const y = (16 + ORBIT_R * Math.sin(a)).toFixed(2);
      const svg =
        `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32">` +
        `<circle cx="16" cy="16" r="10.5" fill="none" stroke="%231F2029" stroke-width="3"/>` +
        `<circle cx="${x}" cy="${y}" r="4.5" fill="%23E8813A"/></svg>`;
      link!.href = `data:image/svg+xml,${svg}`;
    };

    draw();
    const id = setInterval(() => {
      if (!document.hidden) draw();
    }, step);
    const onVis = () => {
      if (!document.hidden) draw();
    };
    document.addEventListener("visibilitychange", onVis);
    return () => {
      clearInterval(id);
      document.removeEventListener("visibilitychange", onVis);
    };
  }, []);

  return null;
}
