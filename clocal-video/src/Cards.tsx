import React from "react";
import {
  AbsoluteFill,
  Easing,
  Img,
  interpolate,
  staticFile,
  useCurrentFrame,
} from "remotion";
import { C, arabic, display, technical } from "./brand";

const rise = (frame: number, delay = 0, dur = 7) =>
  interpolate(frame - delay, [0, dur], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.cubic),
  });

type Tone = "blue" | "cream" | "ink";
const BG: Record<Tone, string> = { blue: C.blue, cream: C.cream, ink: C.ink };
const FG: Record<Tone, string> = { blue: C.cream, cream: C.blue, ink: C.cream };

// Full-screen Arabic statement, words landing one after another.
export const WordCard: React.FC<{
  tone: Tone;
  words: string[];
  size?: number;
  stagger?: number;
  label?: string;
}> = ({ tone, words, size = 190, stagger = 4, label }) => {
  const frame = useCurrentFrame();
  return (
    <AbsoluteFill
      style={{ backgroundColor: BG[tone], justifyContent: "center", alignItems: "center" }}
    >
      <div
        dir="rtl"
        style={{
          fontFamily: arabic,
          fontWeight: 700,
          fontSize: size,
          lineHeight: 1.15,
          color: FG[tone],
          width: 900,
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "center",
          columnGap: size * 0.28,
        }}
      >
        {words.map((w, i) => {
          const p = rise(frame, i * stagger);
          return (
            <span
              key={i}
              style={{ opacity: p, transform: `translateY(${(1 - p) * 30}px)`, display: "inline-block" }}
            >
              {w.replace(/الـ(?=[A-Za-z])/g, "الـ ")}
            </span>
          );
        })}
      </div>
      {label ? (
        <div
          style={{
            position: "absolute",
            bottom: 420,
            fontFamily: technical,
            fontWeight: 500,
            fontSize: 30,
            letterSpacing: "0.18em",
            color: tone === "blue" ? C.cream : C.orange,
            opacity: rise(frame, 6),
          }}
        >
          {label}
        </div>
      ) : null}
    </AbsoluteFill>
  );
};

// Latin display statement (Satoshi stand-in), sentence case, tight tracking.
export const LatinCard: React.FC<{ tone: Tone; lines: string[] }> = ({ tone, lines }) => {
  const frame = useCurrentFrame();
  return (
    <AbsoluteFill
      style={{ backgroundColor: BG[tone], justifyContent: "center", alignItems: "center" }}
    >
      <div style={{ fontFamily: display, fontWeight: 900, fontSize: 150, lineHeight: 0.98, letterSpacing: "-0.03em", color: FG[tone], textAlign: "center" }}>
        {lines.map((l, i) => {
          const p = rise(frame, i * 5);
          return (
            <div key={i} style={{ opacity: p, transform: `translateY(${(1 - p) * 30}px)` }}>
              {l}
            </div>
          );
        })}
      </div>
    </AbsoluteFill>
  );
};

// Logo lockup card: wordmark / monogram / Arabic mark, with optional Arabic line.
export const MarkCard: React.FC<{
  tone: Tone;
  mark: "wordmark" | "monogram" | "arabic";
  color: string;
  width: number;
  line?: string;
  footer?: string;
}> = ({ tone, mark, color, width, line, footer }) => {
  const frame = useCurrentFrame();
  const p = rise(frame, 0, 9);
  const src = staticFile(`brand/${mark}.svg`);
  return (
    <AbsoluteFill
      style={{ backgroundColor: BG[tone], justifyContent: "center", alignItems: "center" }}
    >
      <div
        style={{
          width,
          aspectRatio: mark === "wordmark" ? "329 / 75" : mark === "monogram" ? "74 / 61" : "218 / 79",
          backgroundColor: color,
          WebkitMaskImage: `url(${src})`,
          WebkitMaskSize: "contain",
          WebkitMaskRepeat: "no-repeat",
          WebkitMaskPosition: "center",
          opacity: p,
          transform: `scale(${0.94 + 0.06 * p})`,
        }}
      />
      {/* Preload so the mask is ready on the first rendered frame */}
      <Img src={src} style={{ position: "absolute", width: 1, height: 1, opacity: 0 }} />
      {line ? (
        <div
          dir="rtl"
          style={{
            marginTop: 70,
            fontFamily: arabic,
            fontWeight: 700,
            fontSize: 72,
            color: tone === "cream" ? C.ink : C.cream,
            opacity: rise(frame, 5),
            transform: `translateY(${(1 - rise(frame, 5)) * 20}px)`,
          }}
        >
          {line}
        </div>
      ) : null}
      {footer ? (
        <div
          style={{
            position: "absolute",
            bottom: 300,
            fontFamily: technical,
            fontWeight: 500,
            fontSize: 26,
            letterSpacing: "0.26em",
            color: tone === "cream" ? C.gray500 : C.cream,
            opacity: rise(frame, 10),
          }}
        >
          {footer}
        </div>
      ) : null}
    </AbsoluteFill>
  );
};
