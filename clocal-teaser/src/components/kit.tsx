import React from "react";
import { AbsoluteFill, interpolate, useCurrentFrame } from "remotion";
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

// A display word that slams up out of a mask on its frame.
export const Slam: React.FC<{
  at: number;
  children: React.ReactNode;
  size: number;
  color: string;
  weight?: number;
  dur?: number;
  style?: React.CSSProperties;
}> = ({ at, children, size, color, weight = 900, dur = 7, style }) => {
  const frame = useCurrentFrame();
  if (frame < at) return null;
  return (
    <div style={{ overflow: "hidden", lineHeight: 0.92, paddingBottom: size * 0.08, ...style }}>
      <div
        style={{
          fontFamily: F.display,
          fontWeight: weight,
          fontSize: size,
          letterSpacing: "-0.035em",
          color,
          whiteSpace: "nowrap",
          translate: `0 ${interpolate(frame, [at, at + dur], [100, 0], { ...clamp, easing: OUT })}%`,
          scale: interpolate(frame, [at, at + dur + 4], [1.12, 1], { ...clamp, easing: OUT }),
          transformOrigin: "left bottom",
        }}
      >
        {children}
      </div>
    </div>
  );
};

// Geist technical label: always UPPERCASE, +0.16em tracking.
export const Label: React.FC<{
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
        fontFamily: F.tech,
        fontWeight: 500,
        fontSize: size,
        letterSpacing: "0.16em",
        textTransform: "uppercase",
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

// Persistent HUD: monogram, chapter counter (orange = technical), footer lines.
export const Hud: React.FC<{ tone: "light" | "dark"; index: string; footer?: string }> = ({
  tone,
  index,
  footer = "Quiet luxury in the streets",
}) => {
  const fg = tone === "dark" ? C.cream : C.ink;
  const dim = tone === "dark" ? C.gray300 : C.gray500;
  return (
    <AbsoluteFill style={{ padding: "110px 80px", justifyContent: "space-between", pointerEvents: "none" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <Monogram width={70} color={fg} />
        <Label color={C.orange} size={26}>
          {index}
        </Label>
      </div>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <Label color={dim} size={22}>
          {footer}
        </Label>
        <Label color={dim} size={22}>
          Cairo · Est. 2023
        </Label>
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
