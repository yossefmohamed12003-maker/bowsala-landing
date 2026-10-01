import React from "react";
import { AbsoluteFill, Img, interpolate, staticFile, useCurrentFrame } from "remotion";
import { ARABIC_MARK, MONOGRAM, WORDMARK } from "../brand/marks";
import { C, F, OUT } from "../brand/theme";

const clamp = { extrapolateLeft: "clamp", extrapolateRight: "clamp" } as const;

type Mark = { viewBox: string; d: string };
const ratio = (m: Mark) => {
  const [, , w, h] = m.viewBox.split(" ").map(Number);
  return w / h;
};

const Vector: React.FC<{ mark: Mark; width: number; color: string; style?: React.CSSProperties }> = ({
  mark,
  width,
  color,
  style,
}) => (
  <svg
    viewBox={mark.viewBox}
    width={width}
    height={width / ratio(mark)}
    style={{ display: "block", overflow: "visible", ...style }}
  >
    <path fillRule="evenodd" fill={color} d={mark.d} />
  </svg>
);

// Wordmark / monogram / Arabic mark — flat, approved colourways only, no effects.
export const Wordmark: React.FC<{ width: number; color: string; style?: React.CSSProperties }> = (p) => (
  <Vector mark={WORDMARK} {...p} />
);
export const Monogram: React.FC<{ width: number; color: string; style?: React.CSSProperties }> = (p) => (
  <Vector mark={MONOGRAM} {...p} />
);
export const ArabicMark: React.FC<{ width: number; color: string; style?: React.CSSProperties }> = (p) => (
  <Vector mark={ARABIC_MARK} {...p} />
);

// Headline style from the live posts: heavy, extended, uppercase.
export const headline = (size: number, color: string): React.CSSProperties => ({
  fontFamily: F.headline,
  fontWeight: 900,
  fontStretch: "125%",
  fontSize: size,
  letterSpacing: "-0.02em",
  textTransform: "uppercase",
  lineHeight: 0.9,
  color,
  whiteSpace: "nowrap",
});

// A headline line that slams up out of a mask on its frame.
export const Slam: React.FC<{
  at: number;
  children: React.ReactNode;
  size: number;
  color: string;
  dur?: number;
  style?: React.CSSProperties;
}> = ({ at, children, size, color, dur = 7, style }) => {
  const frame = useCurrentFrame();
  if (frame < at) return null;
  return (
    <div style={{ overflow: "hidden", paddingBottom: size * 0.06, ...style }}>
      <div
        style={{
          ...headline(size, color),
          translate: `0 ${interpolate(frame, [at, at + dur], [105, 0], { ...clamp, easing: OUT })}%`,
          scale: interpolate(frame, [at, at + dur + 4], [1.1, 1], { ...clamp, easing: OUT }),
          transformOrigin: "left bottom",
        }}
      >
        {children}
      </div>
    </div>
  );
};

// Mono technical label (Geist Mono, uppercase) — the voice of the post overlays.
export const Mono: React.FC<{
  children: React.ReactNode;
  color: string;
  size?: number;
  at?: number;
  style?: React.CSSProperties;
}> = ({ children, color, size = 30, at = 0, style }) => {
  const frame = useCurrentFrame();
  if (frame < at) return null;
  return (
    <div
      style={{
        fontFamily: F.mono,
        fontWeight: 400,
        fontSize: size,
        letterSpacing: "0.04em",
        lineHeight: 1.35,
        textTransform: "uppercase",
        whiteSpace: "pre",
        color,
        opacity: interpolate(frame, [at, at + 2, at + 3, at + 4], [0, 1, 0.35, 1], clamp),
        ...style,
      }}
    >
      {children}
    </div>
  );
};

// Camera punch: a quick zoom kick on every listed hit frame.
export const Punch: React.FC<{ hits: number[]; amount?: number; children: React.ReactNode }> = ({
  hits,
  amount = 0.045,
  children,
}) => {
  const frame = useCurrentFrame();
  const last = hits.filter((h) => h <= frame).pop();
  const k = last === undefined ? 0 : Math.exp(-(frame - last) / 3.2);
  return <AbsoluteFill style={{ scale: 1 + amount * k }}>{children}</AbsoluteFill>;
};

// Campaign photo plate (warehouse set from the teaser posts) with slow push and a shade.
export const Plate: React.FC<{
  src: string;
  shade?: number;
  push?: [number, number];
  frames?: number;
  origin?: string;
}> = ({ src, shade = 0.55, push = [1.04, 1.12], frames = 60, origin = "50% 50%" }) => {
  const frame = useCurrentFrame();
  return (
    <AbsoluteFill style={{ overflow: "hidden", backgroundColor: C.ink }}>
      <Img
        src={staticFile(src)}
        style={{
          width: "100%",
          height: "100%",
          objectFit: "cover",
          scale: interpolate(frame, [0, frames], push, clamp),
          transformOrigin: origin,
        }}
      />
      <AbsoluteFill style={{ backgroundColor: C.ink, opacity: shade }} />
    </AbsoluteFill>
  );
};

// Frost Field — monogram tiled at ~7% as a surface texture (never behind wordmark/photos).
export const FrostField: React.FC<{ color: string; opacity?: number; drift?: number }> = ({
  color,
  opacity = 0.07,
  drift = 0,
}) => {
  const frame = useCurrentFrame();
  const cell = 120;
  const rows = Array.from({ length: 19 });
  const cols = Array.from({ length: 11 });
  return (
    <AbsoluteFill style={{ opacity, overflow: "hidden" }}>
      <div style={{ position: "absolute", left: -60, top: -60 - ((frame * drift) % cell) }}>
        {rows.map((_, r) => (
          <div key={r} style={{ display: "flex", height: cell, marginLeft: r % 2 ? cell / 2 : 0 }}>
            {cols.map((__, c) => (
              <div key={c} style={{ width: cell, display: "flex", alignItems: "center", justifyContent: "center" }}>
                <Monogram width={44} color={color} />
              </div>
            ))}
          </div>
        ))}
      </div>
    </AbsoluteFill>
  );
};

// 1-frame colour flash used on hard cuts.
export const Flash: React.FC<{ at: number; color: string; frames?: number }> = ({ at, color, frames = 1 }) => {
  const frame = useCurrentFrame();
  if (frame < at || frame >= at + frames) return null;
  return <AbsoluteFill style={{ backgroundColor: color }} />;
};

export { clamp };
