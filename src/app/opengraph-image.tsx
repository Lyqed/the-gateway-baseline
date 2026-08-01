import { readFile } from "node:fs/promises";
import path from "node:path";
import { ImageResponse } from "next/og";
import { CRITERIA } from "@/lib/gateways";
import { SITE_CONFIG } from "@/lib/site-config";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt =
  "The Gateway Baseline — nine checks, GB-1 through GB-9, verified against public documentation";

/**
 * Hex approximations of the oklch tokens in globals.css; Satori
 * cannot parse oklch(). Floor-dark ground, display title, mono GB
 * chip row — per the brief.
 */
const C = {
  floor: "#24252D",
  atrium: "#F8F6F1",
  steel: "#B4B8C2",
  steelDark: "#757B89",
  monarch: "#E8813A",
};

function loadFont(file: string) {
  return readFile(path.join(process.cwd(), "src/lib/og-fonts", file));
}

export default async function OpengraphImage() {
  const [grotesk, mono] = await Promise.all([
    loadFont("space-grotesk-600.ttf"),
    loadFont("plex-mono-400.ttf"),
  ]);

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          backgroundColor: C.floor,
          padding: "64px 72px",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          {/* The ring + dot mark */}
          <div style={{ display: "flex", position: "relative", width: 56, height: 56 }}>
            <div
              style={{
                position: "absolute",
                left: 6,
                top: 10,
                width: 40,
                height: 40,
                border: `5px solid ${C.atrium}`,
                borderRadius: 999,
              }}
            />
            <div
              style={{
                position: "absolute",
                right: 0,
                top: 0,
                width: 16,
                height: 16,
                backgroundColor: C.monarch,
                borderRadius: 999,
              }}
            />
          </div>
          <div
            style={{
              fontFamily: "IBM Plex Mono",
              fontSize: 22,
              letterSpacing: 2,
              color: C.steelDark,
            }}
          >
            THEGATEWAYBASELINE.COM
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{
              fontFamily: "Space Grotesk",
              fontSize: 104,
              lineHeight: 0.95,
              letterSpacing: -3,
              color: C.atrium,
              textTransform: "uppercase",
            }}
          >
            The Gateway Baseline
          </div>
          <div
            style={{
              marginTop: 28,
              fontFamily: "IBM Plex Mono",
              fontSize: 24,
              color: C.steel,
            }}
          >
            {SITE_CONFIG.tagline}
          </div>
        </div>

        <div style={{ display: "flex", gap: 10 }}>
          {CRITERIA.map((criterion) => (
            <div
              key={criterion.code}
              style={{
                display: "flex",
                fontFamily: "IBM Plex Mono",
                fontSize: 20,
                color: C.steel,
                border: `1.5px solid ${C.steelDark}`,
                padding: "8px 16px",
              }}
            >
              {criterion.code}
            </div>
          ))}
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [
        {
          name: "Space Grotesk",
          data: grotesk,
          style: "normal",
          weight: 600,
        },
        {
          name: "IBM Plex Mono",
          data: mono,
          style: "normal",
          weight: 400,
        },
      ],
    },
  );
}
